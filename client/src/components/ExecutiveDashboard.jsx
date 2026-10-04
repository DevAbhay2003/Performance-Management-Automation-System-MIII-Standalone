import React from 'react';
import {
  Layers, Users, CheckCircle2, Clock, AlertTriangle, ShieldCheck,
  TrendingUp, Award, DollarSign, Calendar, ArrowRight, Map, Play, Sparkles,
  Folder, Zap, Key, Shield, ChevronRight, Lock, Unlock, FileText
} from 'lucide-react';
import { hasPermission } from '../services/rbac';

export default function ExecutiveDashboard({
  stats,
  currentUser,
  onNavigateTab,
  onOpenWorkflowModal,
  onRunScheduler
}) {
  if (!stats) {
    return (
      <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-3xl shadow-sm border border-slate-200">
        <div className="inline-block animate-spin mb-3">
          <Clock className="w-6 h-6 text-blue-600" />
        </div>
        <p className="font-semibold">Loading real-time institutional metrics from central database...</p>
      </div>
    );
  }

  const isDev = currentUser?.role === 'DEV_ADMIN' || currentUser?.permissions?.isDeveloper;

  return (
    <div className="space-y-6">
      
      {/* University Campus Grand Entrance Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 text-white group">
        {/* Background Image of TNU Main Entrance Canopy */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/the-neotia-university-banner-photo.webp"
            alt="The Neotia University Campus Entrance Canopy"
            className="w-full h-full object-cover opacity-35 object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-blue-950/50" />
        </div>

        {/* Ambient Gradient Flares */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 p-6 lg:p-10 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase bg-amber-400 text-slate-950 tracking-wider shadow-xs">
                Ambuja Neotia Initiative
              </span>
              <span className="px-3.5 py-1 rounded-full text-[11px] font-bold bg-white/15 text-white border border-white/20 backdrop-blur-md">
                ज्ञानम् आत्म प्रदीपाय
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                UGC Sec. 2(f) Recognized
              </span>
              {isDev && (
                <span className="px-3 py-1 rounded-full text-[11px] font-black bg-rose-500/30 text-rose-300 border border-rose-400/40 animate-pulse">
                  ⚡ Dev Root Active
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-white leading-tight font-crest">
              THE NEOTIA UNIVERSITY
            </h1>

            <p className="text-xs lg:text-sm text-slate-200/90 leading-relaxed font-medium">
              Sarisa, Diamond Harbour Road, 24 Parganas (South), West Bengal - 743368 • Module III Performance Management Automation System (Complete Multi-Track SOP Governance)
            </p>

            {/* University Key Leadership Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md shadow-xs">
                <span className="text-[10px] uppercase font-bold text-amber-300 block tracking-wider">Chancellor</span>
                <span className="font-bold text-white text-sm">Shri Harshavardhan Neotia</span>
                <span className="text-[10px] text-slate-400 block">Chairman, Ambuja Neotia</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md shadow-xs">
                <span className="text-[10px] uppercase font-bold text-blue-300 block tracking-wider">Vice-Chancellor</span>
                <span className="font-bold text-white text-sm">Prof. (Dr.) Arunansu Haldar</span>
                <span className="text-[10px] text-slate-400 block">Chief Academic Executive</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md shadow-xs">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block tracking-wider">Registrar</span>
                <span className="font-bold text-white text-sm">Dr. Sujoy Biswas</span>
                <span className="text-[10px] text-slate-400 block">Secretary - ECM Secretariat</span>
              </div>
            </div>

            {/* Active User Clearance Status */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1.5 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700 text-slate-200 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  Active Authority: <strong className="text-white">{currentUser.name}</strong> ({currentUser.badge})
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-md bg-white/10 font-mono text-amber-300">
                  {currentUser.levelName || 'Hierarchy Level'}
                </span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onOpenWorkflowModal}
              className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Map className="w-4 h-4" />
              <span>Explore SOP Architecture</span>
            </button>
            <button
              onClick={onRunScheduler}
              className="w-full sm:w-auto px-5 py-3 bg-slate-900/95 hover:bg-slate-800 text-slate-200 hover:text-white rounded-2xl text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>Run Scheduler Engine</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards Grid (Across All Tracks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Track A Metric */}
        <div
          onClick={() => onNavigateTab('trackA')}
          className="glass-card rounded-2xl border-t-4 border-t-amber-500 p-5 cursor-pointer card-hover glow-amber"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-200">
              Track A • Group-D Staff
            </span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{stats.trackA.total}</div>
          <div className="text-xs font-semibold text-slate-700 mt-0.5">Monthly Attendant Evaluations</div>
          
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Pending HOD: <strong className="text-amber-700 font-bold">{stats.trackA.pendingHod}</strong></span>
            <span>Auto-Locked: <strong className="text-rose-700 font-bold">{stats.trackA.lockedOverdue}</strong></span>
          </div>
        </div>

        {/* Track B Metric */}
        <div
          onClick={() => onNavigateTab('trackB')}
          className="glass-card rounded-2xl border-t-4 border-t-emerald-500 p-5 cursor-pointer card-hover glow-emerald"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Track B • General Staff
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{stats.trackB.totalGoals}</div>
          <div className="text-xs font-semibold text-slate-700 mt-0.5">KRA/KPI Onboarding Goals</div>
          
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Locked Goals: <strong className="text-emerald-700 font-bold">{stats.trackB.goalsLocked}</strong></span>
            <span>Quarterly Q1-Q4: <strong className="text-slate-800 font-bold">{stats.trackB.quarterlyReviews}</strong></span>
          </div>
        </div>

        {/* Track C Metric */}
        <div
          onClick={() => onNavigateTab('trackC')}
          className="glass-card rounded-2xl border-t-4 border-t-indigo-500 p-5 cursor-pointer card-hover glow-indigo"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-900 bg-indigo-100/90 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Track C • Faculty ECM
            </span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {stats.trackC.eligibleFaculty} <span className="text-lg font-normal text-slate-400">/ {stats.trackC.totalFaculty}</span>
          </div>
          <div className="text-xs font-semibold text-slate-700 mt-0.5">Faculty Auto-Eligible (Probation + 12mo)</div>
          
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Active Pipeline: <strong className="text-indigo-700 font-bold">{stats.trackC.activeAppraisals}</strong></span>
            <span>Decisions Sanctioned: <strong className="text-emerald-700 font-bold">{stats.trackC.ecmAwaitingDecision}</strong></span>
          </div>
        </div>

        {/* Governance & Audit Metric */}
        <div
          onClick={() => onNavigateTab('trackE')}
          className="glass-card rounded-2xl border-t-4 border-t-purple-500 p-5 cursor-pointer card-hover glow-blue"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-900 bg-purple-100/90 px-2.5 py-0.5 rounded-full border border-purple-200">
              Statutory Governance
            </span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{stats.auditEventsCount}</div>
          <div className="text-xs font-semibold text-slate-700 mt-0.5">Immutable Audit Trail Events</div>
          
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Alerts: <strong className="text-blue-700 font-bold">{stats.unreadNotifications}</strong></span>
            <span>Module I Sync: <strong className="text-emerald-700 font-bold">Enabled</strong></span>
          </div>
        </div>

      </div>

      {/* Role-Specific Actionable Task Center */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Key className="w-3 h-3" />
              Statutory Action Pipeline
            </div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Action Items Designated for: {currentUser.badge} ({currentUser.name})
            </h3>
            <p className="text-xs text-slate-500">Tasks requiring immediate attention or signature under your designated authority.</p>
          </div>
          
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Role Clearance: <strong className="text-indigo-900">{currentUser.levelName || 'Standard'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Action 1: Track A */}
          <div
            onClick={() => onNavigateTab('trackA')}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Track A: Group-D Monthly SOP</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              {currentUser.role === 'HOD' ? 'Complete pending online evaluations for departmental attendants before 7th cutoff.' :
               currentUser.role === 'VICE_PRESIDENT_ADMIN' ? 'Review & formally sign off submitted monthly evaluations into digital dossiers.' :
               currentUser.role === 'HR_ADMIN' ? 'Review overdue locked forms and authorize 3-day extension unlock.' :
               isDev ? 'Root bypass: rate forms, sign as VP-Admin, and unlock overdue forms.' :
               'View monthly attendance and annual weighted average performance scorecards.'}
            </p>
          </div>

          {/* Action 2: Track B */}
          <div
            onClick={() => onNavigateTab('trackB')}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Track B: General Staff KRAs</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              {currentUser.role === 'HR_ADMIN' ? 'Verify 30-day onboarding KRAs and execute 1-click sync to Module I Central Database.' :
               currentUser.role === 'GENERAL_EMPLOYEE' ? 'Submit quarterly achievements with evidence links within 15-day SLA.' :
               currentUser.role === 'HOD' ? 'Evaluate quarterly self-scores within 7-day Reporting Authority SLA.' :
               isDev ? 'Root bypass: setup KRAs, lock goals, evaluate quarters, and sync to Module I.' :
               'Review 4-Quarter Annual Appraisals and management recommendations.'}
            </p>
          </div>

          {/* Action 3: Track C */}
          <div
            onClick={() => onNavigateTab('trackC')}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>Track C: Faculty ECM Protocol</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              {currentUser.role === 'REGISTRAR' ? 'Schedule ECM meeting with external IIT expert and issue formal university orders.' :
               currentUser.role === 'FACULTY' ? 'Submit 7-day annual self-appraisal form or respond to flagged discrepancies.' :
               currentUser.role === 'MANAGEMENT' ? 'Chair Evaluation Committee Meeting and sanction 7 statutory outcomes.' :
               currentUser.role === 'DEAN' ? 'Perform Dean academic verification and grade teaching/research parameters.' :
               isDev ? 'Root bypass: route on 10th, verify stakeholders, record ECM scores, and issue letters.' :
               'Monitor monthly 10th eligible faculty routing and evaluation matrices.'}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
