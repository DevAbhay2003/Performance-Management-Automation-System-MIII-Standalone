import React, { useState, useEffect } from 'react';
import {
  Terminal, ShieldCheck, Zap, Database, Clock, RefreshCw, AlertTriangle,
  Play, Users, CheckCircle, Code, Layers, FileText, Lock, Unlock, Cpu
} from 'lucide-react';
import { api } from '../services/api';
import { UNIVERSITY_ROLES } from '../services/rbac';

export default function DevConsole({ currentUser, onSwitchUser, onTriggerScheduler, onAdvanceTime, simulatedDate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [activeJsonTab, setActiveJsonTab] = useState('summary');
  const [rawDbData, setRawDbData] = useState(null);

  useEffect(() => {
    loadConsoleData();
  }, []);

  const loadConsoleData = async () => {
    setLoading(true);
    try {
      const [sData, emps] = await Promise.all([
        api.getStats(),
        api.getEmployees()
      ]);
      setStats(sData);
      setRawDbData({ stats: sData, employeesCount: emps?.length });
    } catch (err) {
      console.error('Failed to load dev data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunScheduler = async () => {
    setLoading(true);
    try {
      const res = await api.runScheduler();
      setActionMessage(`Scheduler Engine Ran Successfully! Processed auto-locks & alerts at ${new Date().toLocaleTimeString()}`);
      await onTriggerScheduler();
      await loadConsoleData();
    } catch (err) {
      setActionMessage(`Scheduler error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Dev Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Zap className="w-7 h-7 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Apex Developer & Root Administrator Console
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Level 0 Clearance
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Module III System Architecture & Diagnostics
              </h1>
              <p className="text-xs text-purple-200/80">
                Logged in as <strong>{currentUser.name}</strong> • All institutional boundaries bypassed • Unrestricted CRUD authority
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunScheduler}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Trigger Scheduler Daemon</span>
            </button>
            <button
              onClick={loadConsoleData}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Grid: Diagnostics & Fast Personas Switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Quick Persona Masquerading */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Instant Masquerade (Role Switching)</h2>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Bypass logout / login cycle</span>
          </div>

          <div className="space-y-2">
            {Object.values(UNIVERSITY_ROLES).map(role => (
              <div
                key={role.id}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  currentUser.role === role.id
                    ? 'bg-amber-50/70 border-amber-300'
                    : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${role.avatarBg || 'bg-slate-800 text-white'}`}>
                    {role.badge.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{role.name}</span>
                      {currentUser.role === role.id && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-amber-200 text-amber-900">ACTIVE</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {role.badge} • <span className="font-mono text-indigo-700">{role.username}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSwitchUser(role)}
                  disabled={currentUser.role === role.id}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentUser.role === role.id
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-white hover:bg-slate-900 hover:text-white text-slate-800 border border-slate-300 shadow-2xs'
                  }`}
                >
                  Assume Role
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Root System Controls & Fast Forward */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Quick SLA Time Machine Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <h2 className="text-sm font-bold text-slate-900">SLA Time Travel & Automation Triggers</h2>
              </div>
              <span className="text-xs font-mono font-bold text-slate-700">
                {new Date(simulatedDate).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <button
                onClick={() => onAdvanceTime(1)}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center font-bold text-xs text-slate-800 transition-all cursor-pointer"
              >
                +1 Day
              </button>
              <button
                onClick={() => onAdvanceTime(3)}
                className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-center font-bold text-xs text-amber-900 transition-all cursor-pointer"
              >
                +3 Days (Grace)
              </button>
              <button
                onClick={() => onAdvanceTime(30)}
                className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-center font-bold text-xs text-purple-900 transition-all cursor-pointer"
              >
                +30 Days (KRA)
              </button>
              <button
                onClick={() => onAdvanceTime(90)}
                className="p-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-center font-bold text-xs text-indigo-900 transition-all cursor-pointer"
              >
                +90 Days (Qtr)
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Advancing time triggers the automated scheduler daemon which checks 7th due date, 10th grace cutoff, Group-D auto-locks, 30-day KRA SLAs, and monthly 10th faculty eligibility lists.
            </p>
          </div>

          {/* Database Live Metric Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900">Real-Time Central Database Ledger</h2>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800">
                ACID JSON Engine
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xl font-black text-slate-900">{stats?.trackA?.total || 0}</div>
                <div className="text-[11px] text-slate-500 font-medium">Group-D Forms</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xl font-black text-slate-900">{stats?.trackB?.totalGoals || 0}</div>
                <div className="text-[11px] text-slate-500 font-medium">Staff KRA Goals</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xl font-black text-slate-900">{stats?.trackC?.totalFaculty || 0}</div>
                <div className="text-[11px] text-slate-500 font-medium">Faculty Appraisals</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Audit Trail Events Logged:</span>
              <span className="font-mono font-bold text-slate-900">{stats?.auditEventsCount || 0} Events</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
