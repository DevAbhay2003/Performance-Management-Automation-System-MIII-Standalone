import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, Clock, AlertTriangle, ShieldCheck, ArrowRight, Layers, FileText, UserCheck, Award } from 'lucide-react';

export default function WorkflowVisualizerModal({ isOpen, onClose, onSelectTab }) {
  const [activeTab, setActiveTab] = useState('diagram');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600/30 rounded-lg border border-blue-400/30">
              <Layers className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Module 3 — Performance Management Automation System</h2>
              <p className="text-xs text-blue-200/80">Official SOP Architecture Flowchart & Operational Lifecycle</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex bg-slate-800 p-1 rounded-lg text-xs font-medium">
              <button
                onClick={() => setActiveTab('diagram')}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'diagram' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
              >
                Original SOP Flowchart
              </button>
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'interactive' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
              >
                Interactive Workflow Map
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {activeTab === 'diagram' ? (
            <div className="flex flex-col items-center">
              <div className="mb-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Architectural Blueprint
                </span>
                <h3 className="text-sm font-semibold text-slate-700 mt-1">
                  Complete Multi-Track Performance Automation Process Flow
                </h3>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-300 shadow-md bg-white max-w-4xl w-full">
                <img
                  src="/assets/workflow-diagram.jpeg"
                  alt="Module 3 Performance Management Automation System Complete Workflow"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Interactive Multi-Track Architecture Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Track A Card */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                      Track A
                    </span>
                    <button
                      onClick={() => { onSelectTab('trackA'); onClose(); }}
                      className="text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 underline"
                    >
                      Open Track <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Group-D / Band I Employees</h4>
                  <p className="text-xs text-slate-600 mb-3">Monthly Evaluation, Annual Report & Compensation</p>
                  
                  <ol className="text-xs space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <span><strong>Form Repository:</strong> Role-specific KPIs & competencies, versioned with audit trail.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <span><strong>HOD Evaluation:</strong> Routes monthly form to HOD based on central DB hierarchy.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <span><strong>VP – Admin Sign-off:</strong> Review & approve monthly form before final collation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                      <span><strong>Submission Timeline:</strong> Due on 7th, 3-day grace to 10th. Auto-locks if not submitted.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">5</span>
                      <span><strong>Annual Collation:</strong> Triggers on 1 year completion; computes weighted average.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">6</span>
                      <span><strong>Compensation Review:</strong> Predefined slabs. Strictly requires completed probation!</span>
                    </li>
                  </ol>
                </div>

                {/* Track B Card */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-200/80 px-2.5 py-0.5 rounded-full">
                      Track B
                    </span>
                    <button
                      onClick={() => { onSelectTab('trackB'); onClose(); }}
                      className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 underline"
                    >
                      Open Track <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">General Employees (Non-Faculty)</h4>
                  <p className="text-xs text-slate-600 mb-3">KRA/KPI, Quarterly Review & Annual Appraisal</p>
                  
                  <ol className="text-xs space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <span><strong>Onboarding Goal Setting:</strong> Notification to employee & RA within 30 days of DOJ.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <span><strong>HR & Mgmt Verification:</strong> Verified by HR & Management before goals are locked.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <span><strong>4 Quarters (90d, 180d, 270d, 360d):</strong> Submissions within 15 days; 20-day auto-reminder.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                      <span><strong>RA Verification:</strong> Verified and forwarded to HR within 7-day SLA.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">5</span>
                      <span><strong>Post-Q4 Annual Appraisal:</strong> HR compiles 4 quarters; Management records recommendation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">6</span>
                      <span><strong>Module I Direct Feed:</strong> Initializes salary/designation change without duplicate data entry.</span>
                    </li>
                  </ol>
                </div>

                {/* Track C Card */}
                <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 bg-indigo-200/80 px-2.5 py-0.5 rounded-full">
                      Track C
                    </span>
                    <button
                      onClick={() => { onSelectTab('trackC'); onClose(); }}
                      className="text-xs text-indigo-800 hover:text-indigo-950 font-semibold flex items-center gap-1 underline"
                    >
                      Open Track <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Faculty Members (ECM Route)</h4>
                  <p className="text-xs text-slate-600 mb-3">ECM Based Annual Performance Appraisal</p>
                  
                  <ol className="text-xs space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <span><strong>Eligibility Check:</strong> Probation completed + at least 12 months service since last appraisal.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <span><strong>Registrar Routing:</strong> Auto-generates list & routes to Registrar by 10th of every month.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <span><strong>Self-Appraisal (7 Days):</strong> Teaching, Scopus/IEEE papers, Grants, Institutional work.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                      <span><strong>Verification & Discrepancy Loop:</strong> Dean, R&D, Placement, HR. Return to faculty if discrepancy found.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">5</span>
                      <span><strong>Digital ECM Score Sheet:</strong> Scored on TNU Protocol (Teaching 100, Research 100, Consultancy 50, Inst 50 = 300).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">6</span>
                      <span><strong>Management Decision & Letter:</strong> Auto-generates official order letter & routes to Payroll. Supports 7 statutory outcomes.</span>
                    </li>
                  </ol>
                </div>

              </div>

              {/* Bottom 4 Foundation Pillars */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Enterprise Architectural Pillars</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                      <FileText className="w-4 h-4 text-blue-600" /> D. Digital Employee Dossier
                    </div>
                    <p className="text-slate-600">All evaluation forms, monthly and annual reports, and official letters stored in employee's digital file.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" /> E. Audit Trail & Versioning
                    </div>
                    <p className="text-slate-600">Time-stamped audit logs with actor name, role, IP address, before/after diffs, and form versioning.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                      <Award className="w-4 h-4 text-emerald-600" /> F. Real-Time Reporting
                    </div>
                    <p className="text-slate-600">Monthly/Annual reports, KRA SLA compliance, Faculty matrices with CSV, JSON and Print export.</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                      <UserCheck className="w-4 h-4 text-purple-600" /> G. Central DB & Module I
                    </div>
                    <p className="text-slate-600">Single source of truth with probation tracking and direct service condition integration.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
