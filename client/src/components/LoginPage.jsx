import React, { useState } from 'react';
import {
  Lock, User, Key, ArrowRight, ShieldCheck, Sparkles, Building,
  CheckCircle2, AlertCircle, Eye, EyeOff, Zap, Award, Layers, Users, BookOpen
} from 'lucide-react';
import { UNIVERSITY_ROLES, authenticateUser } from '../services/rbac';

export default function LoginPage({ onLoginSuccess }) {
  const [activeMode, setActiveMode] = useState('persona'); // 'persona' or 'credentials'
  const [username, setUsername] = useState('dev');
  const [password, setPassword] = useState('dev');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = authenticateUser(username, password);
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 300);
  };

  const handleQuickPersonaSelect = (roleKey) => {
    setError('');
    const selected = UNIVERSITY_ROLES[roleKey];
    if (selected) {
      onLoginSuccess(selected);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950 font-sans overflow-hidden">
      
      {/* Background Campus Entrance Image with Deep Navy & Slate Ambient Gradients */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 filter blur-[2px]"
        style={{ backgroundImage: "url('/assets/tnu-campus-banner.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-blue-950/80 to-slate-950/90" />

      {/* Decorative Floating Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Central Login Card Container */}
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl bg-slate-900/85">
        
        {/* Left Column: University Heritage & System Overview */}
        <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-b from-blue-950/90 via-slate-900/90 to-slate-950/95 border-b lg:border-b-0 lg:border-r border-white/10 text-white">
          
          <div>
            {/* University Crest & Brand */}
            <div className="flex items-center space-x-3.5 mb-6">
              <div className="bg-white p-2 rounded-2xl shadow-md border border-white/20 flex items-center justify-center shrink-0">
                <img
                  src="/assets/tnu-official-logo.jpg"
                  alt="The Neotia University Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                  Ambuja Neotia Initiative
                </div>
                <div className="text-lg font-black tracking-wide leading-tight">
                  THE NEOTIA UNIVERSITY
                </div>
                <div className="text-[11px] font-serif italic text-blue-200">
                  "ज्ञानम् आत्म प्रदीपाय"
                </div>
              </div>
            </div>

            {/* Portal Title & Subtitle */}
            <div className="space-y-2 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Building className="w-3 h-3" /> Module III Official Release
              </span>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                Performance Management Automation System
              </h1>
              <p className="text-xs text-blue-100/80 leading-relaxed pt-1">
                Complete workflow automation for Group-D monthly evaluations, General staff KRA quarterly reviews, and Faculty Evaluation Committee Meetings (ECM).
              </p>
            </div>

            {/* Statutory Compliance Highlights */}
            <div className="mt-8 space-y-3">
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Statutory Governance:</strong> Enforces UGC 2(f) regulations, NAAC IQAC appraisal benchmarks, and West Bengal Act XXIII of 2014.
                </span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Strict Role Hierarchy:</strong> Granular permissions configured from Chancellor/VC to Departmental Heads and Staff.
                </span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Zero Redundant Paperwork:</strong> 1-Click Module I direct feed, digital dossiers, and auto-generated university orders.
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Campus Address Footnote */}
          <div className="pt-8 border-t border-white/10 mt-8 text-[11px] text-slate-400 space-y-1">
            <div><strong>Main Campus:</strong> Sarisa, Diamond Harbour Road, 24 Parganas (S), WB - 743368</div>
            <div><strong>Kolkata City Office:</strong> Vishwakarma, 86C Topsia Road (S), Kolkata - 700046</div>
          </div>

        </div>

        {/* Right Column: Interactive Login Portal */}
        <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between bg-slate-900/60 backdrop-blur-md">
          
          <div>
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-white tracking-tight">Institutional Single Sign-On</h2>
                <p className="text-xs text-slate-400">Select your authorized authentication method</p>
              </div>

              <div className="flex p-1 bg-slate-800/80 rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveMode('persona')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMode === 'persona'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🎭 Quick Personas
                </button>
                <button
                  onClick={() => setActiveMode('credentials')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMode === 'credentials'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔐 User Credentials
                </button>
              </div>
            </div>

            {/* Error Message Alert */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Mode 1: 1-Click Interactive Persona Switcher */}
            {activeMode === 'persona' && (
              <div className="space-y-4">
                
                {/* Developer Account Prominent Banner */}
                <div
                  onClick={() => handleQuickPersonaSelect('DEV_ADMIN')}
                  className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-amber-500/20 border-2 border-amber-400/50 hover:border-amber-400 hover:scale-[1.01] transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-amber-300 uppercase tracking-widest">
                            ⚡ System Developer & Super-Admin
                          </span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30">
                            Root Access
                          </span>
                        </div>
                        <div className="text-sm font-bold text-white">Er. System Developer</div>
                        <div className="text-[11px] text-slate-300">
                          Complete unrestricted permissions: all tracks, approval overrides, time simulator & dev tools
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm">
                      <span>Launch Root</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pt-2 flex items-center justify-between">
                  <span>Select University Authority Persona:</span>
                  <span className="text-slate-500 font-normal">Ranked by Statutory Hierarchy</span>
                </div>

                {/* Grid of Other University Personas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                  
                  {/* Vice-Chancellor */}
                  <button
                    onClick={() => handleQuickPersonaSelect('MANAGEMENT')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-blue-400/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-900/80 text-indigo-300 border border-indigo-700/50 flex items-center justify-center font-black text-xs shrink-0">
                        VC
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-blue-300 truncate">
                          Prof. (Dr.) Arunansu Haldar
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">Vice-Chancellor • Apex Authority</div>
                      </div>
                    </div>
                  </button>

                  {/* Registrar */}
                  <button
                    onClick={() => handleQuickPersonaSelect('REGISTRAR')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-blue-400/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-900/80 text-blue-300 border border-blue-700/50 flex items-center justify-center font-black text-xs shrink-0">
                        REG
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-blue-300 truncate">
                          Dr. Sujoy Biswas
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">Registrar • ECM Secretary</div>
                      </div>
                    </div>
                  </button>

                  {/* Head - HR */}
                  <button
                    onClick={() => handleQuickPersonaSelect('HR_ADMIN')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-emerald-400/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 flex items-center justify-center font-black text-xs shrink-0">
                        HR
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                          Ms. Sunita Sharma
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">Head - HR & Talent Governance</div>
                      </div>
                    </div>
                  </button>

                  {/* VP - Administration */}
                  <button
                    onClick={() => handleQuickPersonaSelect('VICE_PRESIDENT_ADMIN')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-amber-400/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-900/80 text-amber-300 border border-amber-700/50 flex items-center justify-center font-black text-xs shrink-0">
                        VP
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-amber-300 truncate">
                          Mr. Amitabh Roy
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">VP - Administration (Group-D Signoff)</div>
                      </div>
                    </div>
                  </button>

                  {/* Dean */}
                  <button
                    onClick={() => handleQuickPersonaSelect('DEAN')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-purple-400/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-900/80 text-purple-300 border border-purple-700/50 flex items-center justify-center font-black text-xs shrink-0">
                        DN
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-purple-300 truncate">
                          Prof. (Dr.) Alok Chatterjee
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">Dean - School of Science & Tech</div>
                      </div>
                    </div>
                  </button>

                  {/* HOD */}
                  <button
                    onClick={() => handleQuickPersonaSelect('HOD')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-yellow-400/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-yellow-900/80 text-yellow-300 border border-yellow-700/50 flex items-center justify-center font-black text-xs shrink-0">
                        HOD
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-yellow-300 truncate">
                          Dr. Debasis Roy
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">HOD - Computer Science (Rater)</div>
                      </div>
                    </div>
                  </button>

                  {/* Faculty */}
                  <button
                    onClick={() => handleQuickPersonaSelect('FACULTY')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-blue-400/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-900/80 text-blue-300 border border-blue-700/50 flex items-center justify-center font-black text-xs shrink-0">
                        FAC
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-blue-300 truncate">
                          Dr. Arindam Mukherjee
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">Associate Professor (Self-Appraiser)</div>
                      </div>
                    </div>
                  </button>

                  {/* General Staff */}
                  <button
                    onClick={() => handleQuickPersonaSelect('GENERAL_EMPLOYEE')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-teal-400/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-teal-900/80 text-teal-300 border border-teal-700/50 flex items-center justify-center font-black text-xs shrink-0">
                        GEN
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-teal-300 truncate">
                          Ms. Ananya Roy
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">Executive Assistant (KRA Q1-Q4)</div>
                      </div>
                    </div>
                  </button>

                  {/* Group-D Staff */}
                  <button
                    onClick={() => handleQuickPersonaSelect('GROUP_D')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-slate-400/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center font-black text-xs shrink-0">
                        GR-D
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-slate-300 truncate">
                          Suraj Paswan
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">Campus Security (Band-I Staff)</div>
                      </div>
                    </div>
                  </button>

                </div>

              </div>
            )}

            {/* Mode 2: Standard Credentials Login Form */}
            {activeMode === 'credentials' && (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Official User ID / Institutional Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. dev, vc, registrar, hr, hod, faculty"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-white/10 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Preset shortcuts: <span className="font-mono text-blue-300">dev</span> (Root), <span className="font-mono text-blue-300">vc</span>, <span className="font-mono text-blue-300">registrar</span>, <span className="font-mono text-blue-300">hr</span>, <span className="font-mono text-blue-300">hod</span>, <span className="font-mono text-blue-300">faculty</span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Security Password
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter security password"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-800/90 border border-white/10 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Default password for all accounts: <span className="font-mono text-blue-300">dev</span> or <span className="font-mono text-blue-300">tnu2026</span>
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                  >
                    {loading ? (
                      <span>Verifying University Authority...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Sign In with Statutory Authority</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Login Footer Security Note */}
          <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>TLS 1.3 256-bit Encrypted Session</span>
            </div>
            <span>TNU Module III v1.0.0</span>
          </div>

        </div>

      </div>

    </div>
  );
}
