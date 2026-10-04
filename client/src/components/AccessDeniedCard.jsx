import React from 'react';
import { ShieldAlert, ArrowLeft, KeyRound, UserCheck, Lock } from 'lucide-react';
import { UNIVERSITY_ROLES } from '../services/rbac';

export default function AccessDeniedCard({ currentUser, activeTab, onSwitchRole, onBackToDashboard }) {
  // Find which roles are permitted for this tab
  const permittedRoles = Object.values(UNIVERSITY_ROLES).filter(r => r.allowedTabs.includes(activeTab));

  const tabLabels = {
    trackA: 'Track A: Group-D / Band-I Monthly Evaluation & Slabs',
    trackB: 'Track B: General Staff 30-Day KRA & Quarterly Reviews',
    trackC: 'Track C: Faculty Annual Appraisal & ECM Protocol (300 Pts)',
    trackD: 'Pillar D: Central Digital Dossier Vault',
    trackE: 'Pillar E: Immutable Timestamped Audit Trail Ledger',
    trackF: 'Pillar F: Configurable Institutional Performance Reports',
    trackG: 'Pillar G: Central Employee Database & Service Profiles'
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-rose-200/80 text-center animate-in fade-in zoom-in-95 duration-200">
      
      {/* Icon with Glowing Ring */}
      <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-5 shadow-xs">
        <ShieldAlert className="w-8 h-8 text-rose-600 animate-pulse" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
        <Lock className="w-3 h-3" />
        Statutory Security Clearance Gate
      </div>

      <h2 className="text-xl font-black text-slate-900 tracking-tight">
        Access Restricted by University Hierarchy
      </h2>
      
      <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
        Your current role as <strong>{currentUser.badge} ({currentUser.name})</strong> is classified as{' '}
        <span className="font-semibold text-slate-800">{currentUser.levelName || 'Staff Practitioner'}</span> and does not possess administrative clearance to access{' '}
        <span className="font-semibold text-rose-900">{tabLabels[activeTab] || activeTab}</span>.
      </p>

      {/* Permitted Roles Section */}
      <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-left">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
          Authorized Institutional Roles for this Section:
        </div>
        <div className="flex flex-wrap gap-2">
          {permittedRoles.map(role => (
            <button
              key={role.id}
              onClick={() => onSwitchRole && onSwitchRole(role)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-700 hover:text-indigo-900 font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title={`Switch to ${role.name} to view this section`}
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>{role.badge}</span>
              <span className="text-[10px] text-slate-400">({role.username})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onBackToDashboard}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Executive Dashboard</span>
        </button>

        {onSwitchRole && (
          <button
            onClick={() => onSwitchRole(UNIVERSITY_ROLES.DEV_ADMIN)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>⚡ Masquerade as Developer (Root Clearance)</span>
          </button>
        )}
      </div>

    </div>
  );
}
