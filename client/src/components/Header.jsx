import React, { useState } from 'react';
import {
  Calendar, Clock, Bell, User, RefreshCw, CheckCircle, ChevronDown,
  Map, Shield, Play, LogOut, Zap, Key, Check, Info, Lock
} from 'lucide-react';
import { api } from '../services/api';
import { UNIVERSITY_ROLES } from '../services/rbac';

export default function Header({
  currentUser,
  onUserChange,
  simulatedDate,
  onDateChange,
  notifications,
  onRefresh,
  onOpenWorkflowModal,
  onLogout
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const handleAdvanceDays = async (days) => {
    setIsAdvancing(true);
    try {
      await api.advanceTime(days, null, currentUser.name);
      await onDateChange();
    } catch (err) {
      console.error('Error advancing time:', err);
    } finally {
      setIsAdvancing(false);
    }
  };

  const handleSetExactDate = async (dateStr) => {
    if (!dateStr) return;
    setIsAdvancing(true);
    try {
      await api.advanceTime(null, `${dateStr}T09:00:00.000Z`, currentUser.name);
      await onDateChange();
    } catch (err) {
      console.error('Error setting date:', err);
    } finally {
      setIsAdvancing(false);
    }
  };

  const handleRunScheduler = async () => {
    setIsAdvancing(true);
    try {
      await api.runScheduler();
      await onRefresh();
    } catch (err) {
      console.error('Error triggering scheduler:', err);
    } finally {
      setIsAdvancing(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const formattedDate = simulatedDate ? new Date(simulatedDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'Loading...';

  const isDev = currentUser?.role === 'DEV_ADMIN' || currentUser?.permissions?.isDeveloper;

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
      
      {/* Top University Brand Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white px-4 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
        
        {/* University Crest & Title */}
        <div className="flex items-center space-x-3.5">
          <div className="bg-white p-1 rounded-xl shadow-md border border-white/20 flex items-center justify-center shrink-0">
            <img
              src="/assets/tnu-official-logo.jpg"
              alt="The Neotia University"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-black tracking-wide text-sm lg:text-base text-white">THE NEOTIA UNIVERSITY</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                ज्ञानम् आत्म प्रदीपाय
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                UGC Sec. 2(f)
              </span>
            </div>
            <p className="text-[11px] text-blue-200/80 font-medium">
              Ambuja Neotia Initiative • Module III Standalone Performance Management Automation System
            </p>
          </div>
        </div>

        {/* Action Controls: Workflow Map, Dev Badge, Notifications & Profile Menu */}
        <div className="flex items-center space-x-3">
          
          {/* SOP Flowchart Diagram Button */}
          <button
            onClick={onOpenWorkflowModal}
            className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 hover:text-white border border-blue-400/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            title="Open Complete Workflow Architecture Diagram"
          >
            <Map className="w-3.5 h-3.5 text-blue-300" />
            <span className="hidden sm:inline">SOP Architecture</span>
          </button>

          {/* Root Developer Pill */}
          {isDev && (
            <div className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40 text-amber-300 text-xs font-black flex items-center gap-1.5 shadow-xs animate-pulse">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Root Privileges Active</span>
            </div>
          )}

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors relative cursor-pointer"
              title="System Alerts & Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">System Notifications</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{notifications.length} alerts</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">No active alerts.</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className={`p-3 text-xs hover:bg-slate-50 transition-colors ${!n.read ? 'bg-blue-50/50' : ''}`}>
                        <div className="flex items-center justify-between font-semibold text-slate-900 mb-0.5">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Active User Avatar & Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-2.5 p-1.5 pr-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all cursor-pointer text-left"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs ${currentUser.avatarBg || 'bg-blue-600 text-white'}`}>
                {currentUser.badge?.slice(0, 2).toUpperCase() || 'U'}
              </div>
              <div className="hidden sm:block text-left truncate max-w-[130px]">
                <div className="text-xs font-bold text-white truncate leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-blue-200/80 truncate leading-none">{currentUser.badge}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
            </button>

            {/* User Profile & Role Switcher Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                
                {/* User Header */}
                <div className="p-4 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        {currentUser.levelName || 'University Authority'}
                      </div>
                      <div className="text-sm font-black text-white mt-0.5">{currentUser.name}</div>
                      <div className="text-xs text-blue-200/90">{currentUser.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{currentUser.email}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-white/10 text-white border border-white/20">
                      {currentUser.badge}
                    </span>
                  </div>
                </div>

                {/* Quick Persona Switcher */}
                <div className="p-3 border-b border-slate-100 max-h-56 overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                    <span>Switch Active Persona</span>
                    <span className="text-[9px] text-indigo-600 font-bold">1-Click</span>
                  </div>
                  
                  <div className="space-y-1 mt-1">
                    {Object.values(UNIVERSITY_ROLES).map(role => (
                      <button
                        key={role.id}
                        onClick={() => {
                          onUserChange(role);
                          setShowUserMenu(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                          currentUser.role === role.id
                            ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <span className={`w-2 h-2 rounded-full ${currentUser.role === role.id ? 'bg-blue-600' : 'bg-slate-300'}`} />
                          <div className="truncate">
                            <div className="truncate">{role.badge}</div>
                            <div className="text-[10px] text-slate-400 font-normal truncate">{role.name}</div>
                          </div>
                        </div>
                        {currentUser.role === role.id && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logout Button */}
                <div className="p-2 bg-slate-50">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-rose-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Portal</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>

      {/* Sub-Header: Interactive Time Machine & Automated SLA Simulation Engine */}
      <div className="bg-slate-50/90 backdrop-blur-sm px-4 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 text-xs">
        
        {/* Date Display */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-blue-100/80 border border-blue-200 text-blue-900 font-bold shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-blue-700" />
            <span>Simulated Date: {formattedDate}</span>
          </div>
          <span className="hidden sm:inline text-slate-400 font-medium">| Authorized Persona: <span className="font-bold text-slate-800">{currentUser.badge}</span></span>
        </div>

        {/* Quick Time Travel Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-500 font-semibold mr-1 hidden md:inline">Time Machine:</span>
          
          <button
            onClick={() => handleAdvanceDays(1)}
            disabled={isAdvancing}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-bold hover:border-slate-400 transition-all cursor-pointer shadow-2xs"
            title="Advance simulated time by 1 day"
          >
            +1 Day
          </button>

          <button
            onClick={() => handleAdvanceDays(3)}
            disabled={isAdvancing}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-bold hover:border-slate-400 transition-all cursor-pointer shadow-2xs"
            title="Advance simulated time by 3 days"
          >
            +3 Days
          </button>

          <button
            onClick={() => handleSetExactDate('2026-10-08')}
            disabled={isAdvancing}
            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 rounded-lg font-bold transition-all cursor-pointer shadow-2xs"
            title="Simulate 8th of Month (Grace Period Reminder)"
          >
            8th (Grace)
          </button>

          <button
            onClick={() => handleSetExactDate('2026-10-11')}
            disabled={isAdvancing}
            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-800 rounded-lg font-bold transition-all cursor-pointer shadow-2xs"
            title="Simulate 11th of Month (Enforces Group-D Auto-Lock)"
          >
            11th (Auto-Lock)
          </button>

          <button
            onClick={() => handleAdvanceDays(30)}
            disabled={isAdvancing}
            className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-800 rounded-lg font-bold transition-all cursor-pointer shadow-2xs"
            title="Advance simulated time by 30 days (KRA 30-day SLA / Next Month)"
          >
            +30 Days
          </button>

          <button
            onClick={() => handleAdvanceDays(90)}
            disabled={isAdvancing}
            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-300 text-indigo-800 rounded-lg font-bold transition-all cursor-pointer shadow-2xs"
            title="Advance simulated time by 90 days (Quarterly Review Milestone)"
          >
            +90 Days
          </button>

          {/* Trigger Automation Daemon Check */}
          <button
            onClick={handleRunScheduler}
            disabled={isAdvancing}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ml-1"
            title="Run background scheduler now to enforce SLAs, auto-locks & reminders"
          >
            <Play className={`w-3 h-3 ${isAdvancing ? 'animate-spin' : ''}`} />
            <span>Run Engine</span>
          </button>
        </div>

      </div>

    </header>
  );
}
