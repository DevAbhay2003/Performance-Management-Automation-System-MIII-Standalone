import React, { useState, useEffect } from 'react';
import {
  Target, CheckCircle2, Clock, AlertTriangle, ShieldCheck, ArrowRight,
  TrendingUp, Award, FileText, Send, UserCheck, Check, X, RefreshCw, Sparkles, Database
} from 'lucide-react';
import { api } from '../services/api';
import { hasPermission } from '../services/rbac';

export default function TrackBGeneralStaff({ currentUser, simulatedDate, onActionCompleted }) {
  const [activeSubTab, setActiveSubTab] = useState('goals_onboarding');
  const [goals, setGoals] = useState([]);
  const [quarterlyReviews, setQuarterlyReviews] = useState([]);
  const [annualAppraisals, setAnnualAppraisals] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modals & form state
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showQuarterlyModal, setShowQuarterlyModal] = useState(false);
  const [showAnnualModal, setShowAnnualModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedAnnual, setSelectedAnnual] = useState(null);

  // Form states
  const [newGoalEmpId, setNewGoalEmpId] = useState('');
  const [newGoalKpis, setNewGoalKpis] = useState([
    { id: 'k-1', kra: 'Core Departmental Deliverables', metric: 'Deliver 100% scheduled administrative tasks', weight: 40, target: 'Zero backlog' },
    { id: 'k-2', kra: 'Process Automation & Efficiency', metric: 'Digital filing turnaround time', weight: 35, target: '< 24 hours TAT' },
    { id: 'k-3', kra: 'Compliance & Quality Standards', metric: 'Statutory adherence and zero error audits', weight: 25, target: '100% compliance' }
  ]);

  const [reviewAchievements, setReviewAchievements] = useState('');
  const [reviewSelfScore, setReviewSelfScore] = useState(92);
  const [reviewDocsUrl, setReviewDocsUrl] = useState('dossier/quarterly_proof.pdf');

  const [raScore, setRaScore] = useState(94);
  const [raComments, setRaComments] = useState('');

  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [gData, qData, aData, eData] = await Promise.all([
        api.getGeneralGoals(),
        api.getQuarterlyReviews(),
        api.getGeneralAnnualAppraisals(),
        api.getEmployees({ category: 'STAFF' })
      ]);
      setGoals(gData || []);
      setQuarterlyReviews(qData || []);
      setAnnualAppraisals(aData || []);
      setEmployees(eData || []);
    } catch (err) {
      console.error('Failed to load Track B data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyGoal = async (goalId, verifierType) => {
    try {
      setActionError('');
      await api.verifyGeneralGoals(goalId, {
        verifierType,
        verifierName: currentUser.name,
        remarks: `Goal verified by ${currentUser.name} (${verifierType}).`
      });
      setActionSuccess(`Goal verified by ${verifierType}! Status updated.`);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleCreateGoals = async () => {
    if (!newGoalEmpId) {
      setActionError('Please select an employee.');
      return;
    }
    try {
      setActionError('');
      await api.submitGeneralGoals({
        employeeId: newGoalEmpId,
        kpiItems: newGoalKpis,
        submittedBy: currentUser.name
      });
      setActionSuccess('KRAs & KPIs submitted within 30-day window! Routed to HR for verification.');
      setShowGoalModal(false);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleSubmitQuarterly = async () => {
    if (!selectedReview) return;
    try {
      setActionError('');
      await api.submitQuarterlyReview(selectedReview.id, {
        employeeAchievements: reviewAchievements,
        selfScore: reviewSelfScore,
        supportingDocsUrl: reviewDocsUrl,
        employeeName: currentUser.name
      });
      setActionSuccess(`Submitted ${selectedReview.quarter} review! Routed to Reporting Authority for 7-day SLA verification.`);
      setShowQuarterlyModal(false);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleRaVerify = async (reviewId) => {
    if (!hasPermission(currentUser, 'canReviewQuarterly')) {
      setActionError('Institutional Hierarchy Restriction: Only designated Reporting Authority (HOD) or Developer can verify quarterly submissions.');
      return;
    }
    try {
      setActionError('');
      await api.raVerifyQuarterly(reviewId, {
        score: raScore,
        comments: raComments || 'Performance verified within 7-day SLA. Forwarded to Head HR.',
        verifiedBy: currentUser.name
      });
      setActionSuccess('Reporting Authority verification complete! Forwarded to HR.');
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleHrReview = async (reviewId) => {
    if (!hasPermission(currentUser, 'canVerifyKRA')) {
      setActionError('Institutional Hierarchy Restriction: Only Head - Human Resources or Developer can conduct HR quarterly validation.');
      return;
    }
    try {
      setActionError('');
      await api.hrReviewQuarterly(reviewId, {
        recommendation: 'HR reviewed and validated. Meets institutional SLA benchmarks.',
        reviewedBy: currentUser.name
      });
      setActionSuccess('HR Review recorded! Routed to Senior Management.');
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleMgmtReview = async (reviewId) => {
    if (!hasPermission(currentUser, 'canSanctionFacultyDecision') && !hasPermission(currentUser, 'canVerifyFacultyStakeholder')) {
      setActionError('Institutional Hierarchy Restriction: Only Senior Management (Vice-Chancellor) or Developer can endorse quarter closure.');
      return;
    }
    try {
      setActionError('');
      await api.mgmtReviewQuarterly(reviewId, {
        decision: 'APPROVED',
        reviewedBy: currentUser.name
      });
      setActionSuccess('Management review endorsed! Quarter closed.');
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleSyncToModule1 = async (appraisalId) => {
    if (!hasPermission(currentUser, 'canSyncModuleI')) {
      setActionError('Institutional Hierarchy Restriction: Only Head - Human Resources or Developer can execute Module I Central Database sync.');
      return;
    }
    try {
      setActionError('');
      const res = await api.syncToModuleI({ appraisalId, syncedBy: currentUser.name });
      setActionSuccess(`Success! Closed the loop: Fed appraisal outcome directly into Module I / Central DB (CR: ${res.changeRequest.reqNumber})!`);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-2xl p-6 shadow-md border border-emerald-700/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-400 text-emerald-950 tracking-wider">
                Track B SOP
              </span>
              <span className="text-xs text-emerald-200">General Staff (Non-Faculty) Automation</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-black">KRA/KPI, Quarterly Review & Annual Appraisal</h2>
            <p className="text-xs lg:text-sm text-emerald-100/90 mt-1 max-w-3xl leading-relaxed">
              Automates 30-day onboarding goal-setting, dual HR & Management verification locking, Q1–Q4 quarterly milestones (15-day submission SLA, 7-day RA verification), and closes the loop by feeding post-Q4 appraisal outcomes directly into Module I as live service changes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGoalModal(true)}
              className="px-3.5 py-2 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Target className="w-4 h-4" />
              <span>Set Up New KRAs/KPIs</span>
            </button>
            <button
              onClick={loadData}
              className="p-2 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 hover:text-white rounded-xl text-xs transition-colors cursor-pointer border border-emerald-700/60"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Workflow Progression Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-5 text-[11px] pt-4 border-t border-emerald-700/40">
          <div className="flex items-center gap-1.5 text-emerald-200">
            <span className="w-4 h-4 rounded-full bg-emerald-700 font-bold flex items-center justify-center text-[10px]">1</span>
            <span>Join & 30d Notice</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-200">
            <span className="w-4 h-4 rounded-full bg-emerald-700 font-bold flex items-center justify-center text-[10px]">2</span>
            <span>Set KRAs / KPIs</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-200">
            <span className="w-4 h-4 rounded-full bg-emerald-700 font-bold flex items-center justify-center text-[10px]">3</span>
            <span>HR & Mgmt Lock</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-200">
            <span className="w-4 h-4 rounded-full bg-emerald-700 font-bold flex items-center justify-center text-[10px]">4</span>
            <span>4 Quarters Cycle</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-200">
            <span className="w-4 h-4 rounded-full bg-emerald-700 font-bold flex items-center justify-center text-[10px]">5</span>
            <span>Annual Appraisal</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-200">
            <span className="w-4 h-4 rounded-full bg-emerald-700 font-bold flex items-center justify-center text-[10px]">6</span>
            <span>Module I Sync</span>
          </div>
        </div>
      </div>

      {/* Action Alerts */}
      {actionSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess('')} className="text-emerald-700 font-bold text-xs cursor-pointer">Dismiss</button>
        </div>
      )}
      {actionError && (
        <div className="p-3.5 bg-rose-50 border border-rose-300 text-rose-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{actionError}</span>
          </div>
          <button onClick={() => setActionError('')} className="text-rose-700 font-bold text-xs cursor-pointer">Dismiss</button>
        </div>
      )}

      {/* Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-white p-1 rounded-xl shadow-xs">
        <button
          onClick={() => setActiveSubTab('goals_onboarding')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'goals_onboarding' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          1. 30-Day Goal Setting & Locking ({goals.length})
        </button>
        <button
          onClick={() => setActiveSubTab('quarterly_reviews')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'quarterly_reviews' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          2. Quarterly Review Cycles Q1–Q4 ({quarterlyReviews.length})
        </button>
        <button
          onClick={() => setActiveSubTab('annual_module1_sync')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'annual_module1_sync' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          3. Annual Appraisal & Module I Feed ({annualAppraisals.length})
        </button>
      </div>

      {/* SUB-TAB 1: 30-DAY GOAL SETTING & LOCKING */}
      {activeSubTab === 'goals_onboarding' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Stage 1 (Onboarding SLA):</strong> Goal setting (KRAs/KPIs) must be completed within <strong>30 days of Date of Joining (DOJ)</strong>. Verification by both HR and Management is required before goals are locked.
              </span>
            </div>
            <span className="font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px]">
              {goals.filter(g => g.status === 'MGMT_LOCKED').length} Locked / {goals.length} Total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map(g => {
              const isLocked = g.status === 'MGMT_LOCKED';
              const isHrDone = g.hrVerified;
              return (
                <div key={g.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-emerald-800">{g.id}</span>
                      {isLocked ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" /> GOALS LOCKED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3" /> PENDING VERIFICATION
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 text-base">{g.employeeName}</h4>
                    <p className="text-xs text-slate-500 mb-3">{g.designation} • {g.department}</p>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1 mb-4">
                      <div><strong className="text-slate-700">Date of Joining:</strong> {g.doj}</div>
                      <div><strong className="text-slate-700">30-Day SLA Deadline:</strong> {g.goalSettingDeadline} ({g.slaAdherence})</div>
                      <div><strong className="text-slate-700">Configured KRAs:</strong> {g.kpiItems.length} performance parameters</div>
                    </div>

                    <div className="space-y-1.5 mb-4">
                      {g.kpiItems.map((k, i) => (
                        <div key={i} className="p-2 bg-slate-50 rounded border border-slate-100 text-xs flex justify-between items-center">
                          <span className="font-medium text-slate-800 truncate mr-2">{k.kra}</span>
                          <span className="font-mono text-slate-500 text-[11px] shrink-0">{k.weight}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500 space-y-0.5">
                      <div>HR Verification: {isHrDone ? <span className="font-bold text-emerald-700">✓ Verified</span> : <span className="text-amber-700">Pending</span>}</div>
                      <div>Mgmt Verification: {isLocked ? <span className="font-bold text-emerald-700">✓ Locked</span> : <span className="text-amber-700">Pending</span>}</div>
                    </div>

                    {!isLocked && (
                      <div className="flex gap-1.5">
                        {!isHrDone && (
                          <button
                            onClick={() => handleVerifyGoal(g.id, 'HR')}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            HR Verify
                          </button>
                        )}
                        {isHrDone && !isLocked && (
                          <button
                            onClick={() => handleVerifyGoal(g.id, 'MANAGEMENT')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            Mgmt Verify & Lock
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: QUARTERLY REVIEW CYCLES (Q1-Q4) */}
      {activeSubTab === 'quarterly_reviews' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 leading-relaxed">
            <strong>Stage 2 (Quarterly Review Milestones):</strong> System intimation at 90, 180, 270, 360 days from DOJ. Employee submits achievements with supporting documents within <strong>15 days</strong> (auto-reminder after 20 days if pending). Reporting Authority verifies within <strong>7 days</strong>, followed by HR Review and Management review.
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Review ID & Quarter</th>
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Milestone</th>
                    <th className="py-3 px-4">Submission & Docs</th>
                    <th className="py-3 px-4">RA Review (7-Day SLA)</th>
                    <th className="py-3 px-4">HR & Management</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {quarterlyReviews.map(qr => (
                    <tr key={qr.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        {qr.id}
                        <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {qr.quarter}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{qr.employeeName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{qr.employeeId}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[11px]">
                        <div>{qr.targetDaysMark} Days Milestone</div>
                        <div className="text-slate-500">Due: {qr.dueDate}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        {qr.submittedAt ? (
                          <div>
                            <div className="font-medium text-slate-800 truncate">{qr.employeeAchievements}</div>
                            <div className="text-[10px] text-emerald-700 font-semibold">Self Score: {qr.selfScore}%</div>
                          </div>
                        ) : (
                          <span className="text-amber-700 font-semibold">Pending Employee Submission</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {qr.reportingAuthorityReview ? (
                          <div>
                            <span className="font-bold text-emerald-800 text-[11px]">Score: {qr.reportingAuthorityReview.score}%</span>
                            <div className="text-[10px] text-slate-500 truncate">{qr.reportingAuthorityReview.comments}</div>
                          </div>
                        ) : qr.status === 'SUBMITTED_TO_RA' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            <Clock className="w-3 h-3" /> Awaiting RA (7d SLA)
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[11px]">
                        {qr.status === 'COMPLETED' ? (
                          <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 text-[10px]">
                            ✓ COMPLETED
                          </span>
                        ) : qr.status === 'SUBMITTED_TO_HR' ? (
                          <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 text-[10px]">
                            Awaiting HR Review
                          </span>
                        ) : qr.status === 'SUBMITTED_TO_MGMT' ? (
                          <span className="px-2 py-0.5 rounded-full font-bold bg-purple-100 text-purple-800 text-[10px]">
                            Awaiting Mgmt Review
                          </span>
                        ) : (
                          <span className="text-slate-400">In Progress</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {qr.status === 'PENDING_SUBMISSION' ? (
                          <button
                            onClick={() => { setSelectedReview(qr); setShowQuarterlyModal(true); }}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            Submit Review
                          </button>
                        ) : qr.status === 'SUBMITTED_TO_RA' ? (
                          <button
                            onClick={() => handleRaVerify(qr.id)}
                            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            RA Verify (7d SLA)
                          </button>
                        ) : qr.status === 'SUBMITTED_TO_HR' ? (
                          <button
                            onClick={() => handleHrReview(qr.id)}
                            className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            HR Review
                          </button>
                        ) : qr.status === 'SUBMITTED_TO_MGMT' ? (
                          <button
                            onClick={() => handleMgmtReview(qr.id)}
                            className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            Mgmt Endorse
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-bold text-[11px]">✓ Closed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: POST-Q4 ANNUAL APPRAISAL & MODULE I SYNC */}
      {activeSubTab === 'annual_module1_sync' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-5 border border-teal-700 shadow-md">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-teal-600/30 rounded-xl border border-teal-400/40">
                <Database className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Stage 3: Close the Loop — HR Change Integration (Module I Direct Feed)</h4>
                <p className="text-xs text-teal-100/90 mt-1 leading-relaxed">
                  After completion of 4 quarters, the system triggers the Annual Appraisal compilation. Approved appraisal outcomes (salary increment, designation upgrade, grade promotion) are fed <strong>directly into Module I / Central Employee Database without redundant data entry</strong>!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {annualAppraisals.map(app => (
              <div key={app.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-teal-800">{app.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800">
                      Composite 4Q Score: {app.compositeAnnualScore}%
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base">{app.employeeName}</h4>
                  <p className="text-xs text-slate-500 mb-3">{app.currentDesignation} • {app.department}</p>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-1.5 mb-4">
                    <div><strong>Cycle Year:</strong> {app.year} (All 4 Quarters Completed)</div>
                    <div><strong>Quarterly Scores:</strong> [{app.quarterScores.join(', ')}]%</div>
                    <div><strong>HR Recommendation:</strong> {app.hrSummaryRecommendation}</div>
                    <div>
                      <strong>Approved Decision:</strong>{' '}
                      <span className="font-bold text-emerald-800">
                        {app.managementDecisionDetails.proposedDesignation} (New Salary: ₹{app.managementDecisionDetails.proposedSalary.toLocaleString()})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    {app.syncedToModuleIChangeRequest ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" /> Integrated in Module I (CR: {app.linkedChangeRequestId})
                      </span>
                    ) : (
                      <span className="text-xs text-amber-700 font-semibold">
                        Awaiting 1-Click Module I Sync
                      </span>
                    )}
                  </div>

                  {!app.syncedToModuleIChangeRequest && (
                    <button
                      onClick={() => handleSyncToModule1(app.id)}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Sync to Module I Central DB</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT NEW KRAS/KPIS */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Set Up KRAs & KPIs (30-Day Onboarding SLA)</h3>
              </div>
              <button onClick={() => setShowGoalModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Select General Employee (Non-Faculty):</label>
              <select
                value={newGoalEmpId}
                onChange={(e) => setNewGoalEmpId(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs"
              >
                <option value="">-- Choose Employee --</option>
                {employees.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name} ({e.designation} - {e.department}) [DOJ: {e.doj}]
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-xs text-slate-800 block">Performance Parameters (Target 100% Total):</label>
              {newGoalKpis.map((k, i) => (
                <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{k.kra}</span>
                    <span className="font-mono text-emerald-700">{k.weight}%</span>
                  </div>
                  <div className="text-slate-600 text-[11px]">{k.metric} (Target: {k.target})</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowGoalModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGoals}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Submit for HR & Mgmt Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT QUARTERLY REVIEW */}
      {showQuarterlyModal && selectedReview && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Submit {selectedReview.quarter} Review & Supporting Docs</h3>
              </div>
              <button onClick={() => setShowQuarterlyModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <div><strong>Employee:</strong> {selectedReview.employeeName}</div>
              <div><strong>Milestone Mark:</strong> {selectedReview.targetDaysMark} Days</div>
              <div><strong>Submission Window:</strong> Within 15 days of milestone</div>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Key Achievements & Deliverables during Quarter:</label>
              <textarea
                rows="3"
                value={reviewAchievements}
                onChange={(e) => setReviewAchievements(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                placeholder="Detail deliverables met against configured KRAs..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-xs text-slate-800 block mb-1">Self Assessment Score (0-100):</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={reviewSelfScore}
                  onChange={(e) => setReviewSelfScore(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold text-emerald-800"
                />
              </div>
              <div>
                <label className="font-bold text-xs text-slate-800 block mb-1">Supporting Evidence Link:</label>
                <input
                  type="text"
                  value={reviewDocsUrl}
                  onChange={(e) => setReviewDocsUrl(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs font-mono text-slate-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowQuarterlyModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitQuarterly}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Submit to Reporting Authority (7d SLA)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
