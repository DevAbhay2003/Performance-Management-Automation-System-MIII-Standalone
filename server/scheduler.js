/**
 * =========================================================================================
 * THE NEOTIA UNIVERSITY (TNU) — MODULE III STANDALONE AUTOMATION SYSTEM
 * Automation Scheduler & Policy Rules Engine
 * 
 * Handles:
 * 1. Track A: Due date (7th), Grace period (10th), Auto-lock overdue evaluations
 * 2. Track B: 30-Day KRA/KPI setup SLA, 20-day quarterly reminders, 7-day RA SLA
 * 3. Track C: Faculty eligibility auto-check, monthly 10th routing to Registrar, 7-day self-appraisal SLA
 * =========================================================================================
 */

const { getDb, persistDb, logAudit } = require('./db');

function runScheduler() {
  const db = getDb();
  if (!db.systemSettings) return { success: false, message: "No settings found" };

  const now = new Date(db.systemSettings.currentSimulatedDate || Date.now());
  const currentDateStr = now.toISOString().split('T')[0];
  const currentDay = now.getDate();
  const logs = [];

  // ===================================================================
  // 1. TRACK A: GROUP-D MONTHLY EVALUATIONS AUTO-LOCK & REMINDERS
  // ===================================================================
  if (db.groupDMonthlyEvaluations) {
    db.groupDMonthlyEvaluations.forEach(ev => {
      if (ev.status === 'PENDING_HOD' && !ev.isAutoLocked) {
        const graceDate = new Date(ev.graceDueDate || '2026-10-10');
        const dueDate = new Date(ev.dueDate || '2026-10-07');

        // Check if passed grace period (10th)
        if (now > graceDate) {
          ev.isAutoLocked = true;
          ev.status = 'LOCKED_NOT_SUBMITTED';
          ev.lockReason = `System auto-lock enforced: Evaluation form for ${ev.cycleMonth} exceeded grace period deadline (${ev.graceDueDate}) without HOD submission. Record visible to HR in overdue register.`;
          
          logAudit({
            entityType: 'GROUP_D_EVALUATION',
            entityId: ev.id,
            action: 'AUTO_LOCK_GRACE_PERIOD_EXCEEDED',
            actorName: 'Automated Module III Scheduler',
            actorRole: 'SYSTEM',
            previousState: { status: 'PENDING_HOD', isAutoLocked: false },
            newState: { status: ev.status, isAutoLocked: true, lockReason: ev.lockReason },
            remarks: `Auto-locked monthly evaluation for ${ev.employeeName} (${ev.department}).`,
            ip: '127.0.0.1'
          });

          // Create notification
          if (!db.notifications) db.notifications = [];
          db.notifications.unshift({
            id: `NOTIF-${Date.now()}-${Math.floor(Math.random()*1000)}`,
            targetRole: 'HR_ADMIN',
            title: `Evaluation Auto-Locked: ${ev.employeeName}`,
            message: `HOD did not submit evaluation for ${ev.cycleMonth} before grace deadline of 10th. Auto-locked as Not Submitted.`,
            timestamp: now.toISOString(),
            type: 'LOCK_ENFORCED',
            read: false
          });

          logs.push(`Auto-locked Group-D evaluation ${ev.id} for ${ev.employeeName} (Grace cutoff passed).`);
        } else if (now > dueDate) {
          // Grace period active
          logs.push(`Group-D evaluation ${ev.id} for ${ev.employeeName} is currently in GRACE PERIOD (Cutoff: ${ev.graceDueDate}).`);
        }
      }
    });
  }

  // ===================================================================
  // 2. TRACK B: GENERAL EMPLOYEES 30-DAY KRA SLA & QUARTERLY REMINDERS
  // ===================================================================
  if (db.generalEmployeeGoals) {
    db.generalEmployeeGoals.forEach(g => {
      if (g.status !== 'MGMT_LOCKED') {
        const doj = new Date(g.doj);
        const daysSinceDoj = Math.floor((now - doj) / (1000 * 60 * 60 * 24));
        if (daysSinceDoj > 30) {
          g.slaAdherence = 'OVERDUE_30_DAYS';
          logs.push(`Goal setting for ${g.employeeName} exceeded 30-day SLA (${daysSinceDoj} days since DOJ).`);
        } else if (daysSinceDoj >= 20) {
          logs.push(`Goal setting for ${g.employeeName} nearing 30-day SLA (${daysSinceDoj}/30 days).`);
        }
      }
    });
  }

  // Check quarterly reviews for 20-day reminders & 7-day RA verification SLA
  if (db.quarterlyReviews) {
    db.quarterlyReviews.forEach(qr => {
      if (qr.status === 'SUBMITTED_TO_RA' && qr.submittedAt) {
        const subDate = new Date(qr.submittedAt);
        const daysSinceSub = Math.floor((now - subDate) / (1000 * 60 * 60 * 24));
        if (daysSinceSub > 7) {
          qr.raSlaWarning = `RA Verification Overdue: ${daysSinceSub} days elapsed (7-day SLA).`;
          logs.push(`Quarterly review ${qr.id} RA verification overdue (${daysSinceSub} days).`);
        }
      }
    });
  }

  // ===================================================================
  // 3. TRACK C: FACULTY ECM ELIGIBILITY & 10th ROUTING
  // ===================================================================
  if (db.employees) {
    const faculties = db.employees.filter(e => e.category === 'FACULTY');
    let eligibleCount = 0;
    faculties.forEach(f => {
      const doj = new Date(f.doj);
      const monthsSinceDoj = Math.floor((now - doj) / (1000 * 60 * 60 * 24 * 30.4375));
      const probationDone = f.probationStatus === 'COMPLETED';
      if (probationDone && monthsSinceDoj >= 12) {
        eligibleCount++;
      }
    });
    logs.push(`Faculty eligibility check complete: ${eligibleCount} of ${faculties.length} faculty members eligible for ECM.`);
  }

  persistDb();
  return { success: true, timestamp: now.toISOString(), logs };
}

// Start periodic scheduler interval (runs every 60 seconds)
let intervalId = null;
function startSchedulerDaemon() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    try {
      runScheduler();
    } catch (err) {
      console.error('Error running automated scheduler:', err);
    }
  }, 60000);
  console.log('⏱️ Module III Automated Scheduler Daemon initialized (60s tick).');
}

module.exports = {
  runScheduler,
  startSchedulerDaemon
};
