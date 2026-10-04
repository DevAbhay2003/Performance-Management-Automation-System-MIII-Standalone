import React, { useState, useEffect } from 'react';
import {
  Layers, Users, TrendingUp, Award, Folder, ShieldCheck, BarChart3,
  Calendar, CheckCircle2, Clock, AlertTriangle, Play, Sparkles, Terminal, Lock
} from 'lucide-react';
import Header from './components/Header';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import TrackAGroupD from './components/TrackAGroupD';
import TrackBGeneralStaff from './components/TrackBGeneralStaff';
import TrackCFacultyECM from './components/TrackCFacultyECM';
import TrackDDigitalDossier from './components/TrackDDigitalDossier';
import TrackEAuditTrail from './components/TrackEAuditTrail';
import TrackFConfigurableReports from './components/TrackFConfigurableReports';
import TrackGCentralEmployeeDB from './components/TrackGCentralEmployeeDB';
import WorkflowVisualizerModal from './components/WorkflowVisualizerModal';
import OfficialLetterModal from './components/OfficialLetterModal';
import LoginPage from './components/LoginPage';
import AccessDeniedCard from './components/AccessDeniedCard';
import DevConsole from './components/DevConsole';
import { api } from './services/api';
import { UNIVERSITY_ROLES, canAccessTab } from './services/rbac';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Authentication & Session State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tnu_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return UNIVERSITY_ROLES.DEV_ADMIN;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('tnu_auth_logged_in') === 'true';
  });

  const [simulatedDate, setSimulatedDate] = useState('2026-10-04T09:00:00.000Z');
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState(null);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [activeLetterRef, setActiveLetterRef] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      refreshAll();
    }
  }, [isLoggedIn]);

  const refreshAll = async () => {
    try {
      const [tData, nData, sData] = await Promise.all([
        api.getTime(),
        api.getNotifications(),
        api.getStats()
      ]);
      if (tData?.currentSimulatedDate) setSimulatedDate(tData.currentSimulatedDate);
      if (nData) setNotifications(nData);
      if (sData) setStats(sData);
    } catch (err) {
      console.error('Failed to load system state:', err);
    }
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('tnu_auth_user', JSON.stringify(user));
    localStorage.setItem('tnu_auth_logged_in', 'true');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('tnu_auth_logged_in');
  };

  const handleUserChange = (newUser) => {
    setCurrentUser(newUser);
    localStorage.setItem('tnu_auth_user', JSON.stringify(newUser));
    // If the active tab is not accessible by the new role, switch back to dashboard
    if (newUser.role !== 'DEV_ADMIN' && !canAccessTab(newUser, activeTab)) {
      setActiveTab('dashboard');
    }
  };

  const handleOpenLetter = (ref) => {
    setActiveLetterRef(ref);
  };

  // If unauthenticated, render the full-screen Institutional Login Portal
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Check if current role has permission to access the active tab
  const hasAccessToTab = canAccessTab(currentUser, activeTab);
  const isDev = currentUser?.role === 'DEV_ADMIN' || currentUser?.permissions?.isDeveloper;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/90 text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        currentUser={currentUser}
        onUserChange={handleUserChange}
        simulatedDate={simulatedDate}
        onDateChange={refreshAll}
        notifications={notifications}
        onRefresh={refreshAll}
        onOpenWorkflowModal={() => setIsWorkflowModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Tab Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-2 sticky top-[89px] z-30 shadow-xs no-print">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-1">
          
          {/* Executive Dashboard */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'dashboard'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Dashboard</span>
          </button>

          {/* Track A: Group-D */}
          <button
            onClick={() => setActiveTab('trackA')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'trackA'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            } ${!canAccessTab(currentUser, 'trackA') ? 'opacity-65' : ''}`}
          >
            <Users className="w-4 h-4 text-amber-500" />
            <span>Track A: Group-D</span>
            {!canAccessTab(currentUser, 'trackA') && (
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
            )}
            {stats?.trackA?.pendingHod > 0 && canAccessTab(currentUser, 'trackA') && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'trackA' ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-900'
              }`}>
                {stats.trackA.pendingHod}
              </span>
            )}
          </button>

          {/* Track B: General Staff */}
          <button
            onClick={() => setActiveTab('trackB')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'trackB'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            } ${!canAccessTab(currentUser, 'trackB') ? 'opacity-65' : ''}`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>Track B: General Staff (KRA)</span>
            {!canAccessTab(currentUser, 'trackB') && (
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
            )}
            {stats?.trackB?.annualReadyForSync > 0 && canAccessTab(currentUser, 'trackB') && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'trackB' ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-900'
              }`}>
                1 Sync
              </span>
            )}
          </button>

          {/* Track C: Faculty ECM */}
          <button
            onClick={() => setActiveTab('trackC')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'trackC'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            } ${!canAccessTab(currentUser, 'trackC') ? 'opacity-65' : ''}`}
          >
            <Award className="w-4 h-4 text-indigo-500" />
            <span>Track C: Faculty ECM</span>
            {!canAccessTab(currentUser, 'trackC') && (
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
            )}
            {stats?.trackC?.eligibleFaculty > 0 && canAccessTab(currentUser, 'trackC') && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'trackC' ? 'bg-indigo-800 text-white' : 'bg-indigo-100 text-indigo-900'
              }`}>
                {stats.trackC.eligibleFaculty} Eligible
              </span>
            )}
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1 shrink-0" />

          {/* Pillar D: Digital Dossier */}
          <button
            onClick={() => setActiveTab('trackD')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'trackD'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            } ${!canAccessTab(currentUser, 'trackD') ? 'opacity-65' : ''}`}
          >
            <Folder className="w-4 h-4 text-blue-500" />
            <span>D. Dossier</span>
          </button>

          {/* Pillar E: Audit Trail */}
          <button
            onClick={() => setActiveTab('trackE')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'trackE'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            } ${!canAccessTab(currentUser, 'trackE') ? 'opacity-65' : ''}`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-500" />
            <span>E. Audit Trail</span>
            {!canAccessTab(currentUser, 'trackE') && (
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
            )}
          </button>

          {/* Pillar F: Configurable Reports */}
          <button
            onClick={() => setActiveTab('trackF')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'trackF'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            } ${!canAccessTab(currentUser, 'trackF') ? 'opacity-65' : ''}`}
          >
            <BarChart3 className="w-4 h-4 text-slate-500" />
            <span>F. Reports</span>
            {!canAccessTab(currentUser, 'trackF') && (
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
            )}
          </button>

          {/* Pillar G: Central Database */}
          <button
            onClick={() => setActiveTab('trackG')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'trackG'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            } ${!canAccessTab(currentUser, 'trackG') ? 'opacity-65' : ''}`}
          >
            <Users className="w-4 h-4 text-teal-500" />
            <span>G. Central DB</span>
            {!canAccessTab(currentUser, 'trackG') && (
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
            )}
          </button>

          {/* Developer Super-Admin Console Tab (Visible only to Developer) */}
          {isDev && (
            <button
              onClick={() => setActiveTab('devConsole')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === 'devConsole'
                  ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-sm'
                  : 'bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 border border-amber-400/40'
              }`}
            >
              <Terminal className="w-4 h-4 text-amber-500" />
              <span>⚡ Dev Console</span>
            </button>
          )}

        </div>
      </nav>

      {/* Main Tab Content */}
      <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        
        {/* If user lacks clearance for the tab, display Access Denied Card */}
        {!hasAccessToTab ? (
          <AccessDeniedCard
            currentUser={currentUser}
            activeTab={activeTab}
            onSwitchRole={handleUserChange}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <ExecutiveDashboard
                stats={stats}
                currentUser={currentUser}
                onNavigateTab={setActiveTab}
                onOpenWorkflowModal={() => setIsWorkflowModalOpen(true)}
                onRunScheduler={refreshAll}
              />
            )}

            {activeTab === 'trackA' && (
              <TrackAGroupD
                currentUser={currentUser}
                simulatedDate={simulatedDate}
                onActionCompleted={refreshAll}
              />
            )}

            {activeTab === 'trackB' && (
              <TrackBGeneralStaff
                currentUser={currentUser}
                simulatedDate={simulatedDate}
                onActionCompleted={refreshAll}
              />
            )}

            {activeTab === 'trackC' && (
              <TrackCFacultyECM
                currentUser={currentUser}
                simulatedDate={simulatedDate}
                onActionCompleted={refreshAll}
                onOpenLetter={handleOpenLetter}
              />
            )}

            {activeTab === 'trackD' && (
              <TrackDDigitalDossier
                onOpenLetter={handleOpenLetter}
              />
            )}

            {activeTab === 'trackE' && (
              <TrackEAuditTrail />
            )}

            {activeTab === 'trackF' && (
              <TrackFConfigurableReports />
            )}

            {activeTab === 'trackG' && (
              <TrackGCentralEmployeeDB
                currentUser={currentUser}
                onSelectEmployeeDossier={(empId) => {
                  setActiveTab('trackD');
                }}
              />
            )}

            {activeTab === 'devConsole' && isDev && (
              <DevConsole
                currentUser={currentUser}
                onSwitchUser={handleUserChange}
                onTriggerScheduler={refreshAll}
                onAdvanceTime={async (days) => {
                  await api.advanceTime(days, null, currentUser.name);
                  await refreshAll();
                }}
                simulatedDate={simulatedDate}
              />
            )}
          </>
        )}

      </main>

      {/* Modals */}
      <WorkflowVisualizerModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        onSelectTab={setActiveTab}
      />

      <OfficialLetterModal
        isOpen={!!activeLetterRef}
        onClose={() => setActiveLetterRef(null)}
        letterRef={activeLetterRef}
      />

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/80 py-4 px-6 text-center text-xs text-slate-500 no-print">
        <div className="flex flex-wrap items-center justify-between gap-2 max-w-7xl mx-auto">
          <div>
            <strong>The Neotia University</strong> • Module III Standalone Performance Management Automation System
          </div>
          <div className="flex items-center gap-2">
            <span>UGC Sec. 2(f) & NAAC Benchmarks</span>
            <span>•</span>
            <span>Logged in as: <strong className="text-slate-700">{currentUser.name}</strong></span>
          </div>
        </div>
      </footer>

    </div>
  );
}
