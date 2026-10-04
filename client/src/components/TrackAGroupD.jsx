import React, { useState, useEffect } from 'react';
import {
  FileText, CheckCircle2, AlertCircle, Clock, Lock, Unlock, ArrowRight,
  ShieldAlert, Award, TrendingUp, DollarSign, Eye, Plus, Check, X, Printer, Download, RefreshCw, Calendar
} from 'lucide-react';
import { api } from '../services/api';
import { hasPermission } from '../services/rbac';

export default function TrackAGroupD({ currentUser, simulatedDate, onActionCompleted }) {
  const [activeSubTab, setActiveSubTab] = useState('monthly');
  const [templates, setTemplates] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [annualReports, setAnnualReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showCompensationModal, setShowCompensationModal] = useState(false);
  const [selectedAnnualReport, setSelectedAnnualReport] = useState(null);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Form states for HOD evaluation
  const [formKpiScores, setFormKpiScores] = useState({});
  const [formCompScores, setFormCompScores] = useState({});
  const [formPositiveObs, setFormPositiveObs] = useState('');
  const [formNegativeObs, setFormNegativeObs] = useState('');
  const [formHodComments, setFormHodComments] = useState('');

  // Form state for HR unlock
  const [unlockReason, setUnlockReason] = useState('');

  // Form state for Compensation Review
  const [compIncreasePct, setCompIncreasePct] = useState(10);
  const [compRemarks, setCompRemarks] = useState('');

  // Form state for Template Versioning
  const [tplRoleName, setTplRoleName] = useState('');
  const [tplVersion, setTplVersion] = useState('v2.1 (2026)');
  const [tplKpiName, setTplKpiName] = useState('');
  const [tplKpis, setTplKpis] = useState([
    { id: 'k-1', name: 'Punctuality & Shift Attendance', maxScore: 5, weightagePct: 30, description: 'Prompt attendance on shifts' },
    { id: 'k-2', name: 'Task Turnaround & Accuracy', maxScore: 5, weightagePct: 35, description: 'Execution of assigned duties' },
    { id: 'k-3', name: 'Equipment & Campus Care', maxScore: 5, weightagePct: 35, description: 'Proper handling of physical assets' }
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tplData, evalData, annData] = await Promise.all([
        api.getGroupDTemplates(),
        api.getGroupDEvaluations(),
        api.getGroupDAnnualReports()
      ]);
      setTemplates(tplData || []);
      setEvaluations(evalData || []);
      setAnnualReports(annData || []);
    } catch (err) {
      console.error('Failed to load Track A data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInitiateCycle = async () => {
    try {
      setActionError('');
      const currentMonth = new Date(simulatedDate || Date.now()).toLocaleString('default', { month: 'long', year: 'numeric' });
      const currentMonthYear = new Date(simulatedDate || Date.now()).toISOString().slice(0, 7);
      const res = await api.initiateGroupDCycle({ cycleMonth: currentMonth, monthYear: currentMonthYear, initiatedBy: currentUser.name });
      setActionSuccess(`Initiated ${res.count} monthly forms for ${currentMonth}! Routed to respective HODs.`);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleOpenEvalForm = (ev) => {
    setSelectedEvaluation(ev);
    const initialKpis = {};
    (ev.kpiScores || []).forEach(k => { initialKpis[k.id] = k.score || 5; });
    const initialComps = {};
    (ev.competencyScores || []).forEach(c => { initialComps[c.id] = c.score || 5; });
    
    setFormKpiScores(initialKpis);
    setFormCompScores(initialComps);
    setFormPositiveObs(ev.positiveObservations || 'Diligently maintained departmental premises and assisted faculty.');
    setFormNegativeObs(ev.negativeObservations || 'None.');
    setFormHodComments(ev.hodComments || 'Consistently dependable and punctual worker.');
    setShowEvalModal(true);
    setActionError('');
  };

  const handleSubmitEvaluation = async () => {
    if (!selectedEvaluation) return;
    if (!hasPermission(currentUser, 'canRateGroupD')) {
      setActionError('Institutional Hierarchy Restriction: Only designated Head of Department (HOD) or Developer can submit performance ratings for Group-D employees.');
      return;
    }
    try {
      setActionError('');
      const kpiArray = Object.keys(formKpiScores).map(kId => ({
        id: kId,
        score: formKpiScores[kId],
        maxScore: 5
      }));
      const compArray = Object.keys(formCompScores).map(cId => ({
        id: cId,
        score: formCompScores[cId],
        maxScore: 5
      }));

      await api.submitGroupDEvaluation(selectedEvaluation.id, {
        kpiScores: kpiArray,
        competencyScores: compArray,
        positiveObservations: formPositiveObs,
        negativeObservations: formNegativeObs,
        hodComments: formHodComments,
        hodName: currentUser.name
      });

      setActionSuccess(`Evaluation submitted for ${selectedEvaluation.employeeName}! Routed to VP - Administration.`);
      setShowEvalModal(false);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleVpAdminApproval = async (evalId, decision) => {
    if (!hasPermission(currentUser, 'canSignGroupDVp')) {
      setActionError('Institutional Hierarchy Restriction: Only Vice President - Administration or Developer can formally sign off on Group-D monthly evaluations.');
      return;
    }
    try {
      setActionError('');
      await api.vpApproveGroupDEvaluation(evalId, {
        decision,
        remarks: decision === 'APPROVE' ? 'Approved by VP - Administration. Merits confirmed.' : 'Returned to HOD for clarification.',
        approvedBy: currentUser.name
      });
      setActionSuccess(`VP - Administration signed off on evaluation (${decision})! Added to employee digital dossier.`);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleUnlockEvaluation = async () => {
    if (!selectedEvaluation) return;
    if (!hasPermission(currentUser, 'canUnlockGroupD')) {
      setActionError('Institutional Hierarchy Restriction: Only Head - Human Resources or Developer can grant 3-day extension unlocks on auto-locked records.');
      return;
    }
    try {
      setActionError('');
      await api.unlockGroupDEvaluation(selectedEvaluation.id, {
        reason: unlockReason || 'HR approved extension for valid emergency duty.',
        unlockedBy: currentUser.name
      });
      setActionSuccess(`Evaluation for ${selectedEvaluation.employeeName} unlocked successfully with 3-day grace extension.`);
      setShowUnlockModal(false);
      setUnlockReason('');
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleCompensationReview = async () => {
    if (!selectedAnnualReport) return;
    try {
      setActionError('');
      const res = await api.submitGroupDCompensationReview({
        annualReportId: selectedAnnualReport.id,
        decision: 'APPROVE',
        percentageIncrease: compIncreasePct,
        remarks: compRemarks || `Sanctioned +${compIncreasePct}% revision following weighted score of ${selectedAnnualReport.annualWeightedAverageScore}%.`,
        approvedBy: currentUser.name
      });
      setActionSuccess(`Compensation revision approved for ${selectedAnnualReport.employeeName}! New salary ₹${res.employee.salary} updated in Central DB.`);
      setShowCompensationModal(false);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleCreateTemplate = async () => {
    if (!tplRoleName) return;
    try {
      setActionError('');
      await api.createGroupDTemplate({
        roleName: tplRoleName,
        version: tplVersion,
        kpis: tplKpis,
        competencies: [
          { id: 'c-1', name: 'Workplace Conduct & Courtesy', maxScore: 5, weightagePct: 50, description: 'Respectful behavior' },
          { id: 'c-2', name: 'Team Collaboration & Willingness', maxScore: 5, weightagePct: 50, description: 'Assisting in campus events' }
        ],
        modifiedBy: currentUser.name
      });
      setActionSuccess(`Standardized Form Template created for ${tplRoleName} (${tplVersion})!`);
      setShowTemplateModal(false);
      setTplRoleName('');
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Track Banner & Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white rounded-2xl p-6 shadow-md border border-amber-700/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-amber-400 text-amber-950 tracking-wider">
                Track A SOP
              </span>
              <span className="text-xs text-amber-200">Standard Operating Procedure for Band-I</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-black">Group-D / Band I Employees Automation</h2>
            <p className="text-xs lg:text-sm text-amber-100/90 mt-1 max-w-3xl leading-relaxed">
              Automates monthly evaluation routing to HODs, VP – Administration approval, 7th due date & 10th grace auto-lock enforcement, annual weighted score collation, and probation-validated compensation reviews.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInitiateCycle}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Initiate Monthly Cycle</span>
            </button>
            <button
              onClick={loadData}
              className="p-2 bg-amber-950/60 hover:bg-amber-900 text-amber-200 hover:text-white rounded-xl text-xs transition-colors cursor-pointer border border-amber-700/60"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* SOP Lifecycle Progression Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-5 text-[11px] pt-4 border-t border-amber-700/40">
          <div className="flex items-center gap-1.5 text-amber-200">
            <span className="w-4 h-4 rounded-full bg-amber-700/80 font-bold flex items-center justify-center text-[10px]">1</span>
            <span>Form Repository</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-200">
            <span className="w-4 h-4 rounded-full bg-amber-700/80 font-bold flex items-center justify-center text-[10px]">2</span>
            <span>Route to HOD</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-200">
            <span className="w-4 h-4 rounded-full bg-amber-700/80 font-bold flex items-center justify-center text-[10px]">3</span>
            <span>HOD Submission</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-200">
            <span className="w-4 h-4 rounded-full bg-amber-700/80 font-bold flex items-center justify-center text-[10px]">4</span>
            <span>VP – Admin Sign-off</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-200">
            <span className="w-4 h-4 rounded-full bg-amber-700/80 font-bold flex items-center justify-center text-[10px]">5</span>
            <span>7th/10th Auto-Lock</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-200">
            <span className="w-4 h-4 rounded-full bg-amber-700/80 font-bold flex items-center justify-center text-[10px]">6</span>
            <span>Annual Slabs Review</span>
          </div>
        </div>
      </div>

      {/* Notifications / Alerts */}
      {actionSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess('')} className="text-emerald-700 hover:text-emerald-900 font-bold text-xs cursor-pointer">Dismiss</button>
        </div>
      )}
      {actionError && (
        <div className="p-3.5 bg-rose-50 border border-rose-300 text-rose-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{actionError}</span>
          </div>
          <button onClick={() => setActionError('')} className="text-rose-700 hover:text-rose-900 font-bold text-xs cursor-pointer">Dismiss</button>
        </div>
      )}

      {/* Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-white p-1 rounded-xl shadow-xs">
        <button
          onClick={() => setActiveSubTab('monthly')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'monthly' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Monthly Evaluations ({evaluations.length})
        </button>
        <button
          onClick={() => setActiveSubTab('vp_approval')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'vp_approval' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          VP – Admin Sign-off Queue ({evaluations.filter(e => e.status === 'SUBMITTED_HOD').length})
        </button>
        <button
          onClick={() => setActiveSubTab('auto_lock')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'auto_lock' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Deadlines & Auto-Lock Monitor ({evaluations.filter(e => e.isAutoLocked).length})
        </button>
        <button
          onClick={() => setActiveSubTab('annual_compensation')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'annual_compensation' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Annual Reports & Slabs ({annualReports.length})
        </button>
        <button
          onClick={() => setActiveSubTab('templates')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'templates' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Form Repository & Versioning ({templates.length})
        </button>
      </div>

      {/* SUB-TAB 1: MONTHLY EVALUATIONS */}
      {activeSubTab === 'monthly' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Monthly Evaluations Repository</h3>
              <p className="text-xs text-slate-500">Live HOD submission queue with 7th due date & 10th grace tracking.</p>
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Due Date: <span className="font-bold text-amber-700">7th of month</span> | Grace: <span className="font-bold text-amber-700">10th cutoff</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Evaluation ID & Month</th>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Role & Department</th>
                  <th className="py-3 px-4">HOD / Reporting Authority</th>
                  <th className="py-3 px-4">Deadlines</th>
                  <th className="py-3 px-4">Status & Score</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {evaluations.map(ev => {
                  const isSubmitted = ev.status === 'SUBMITTED_HOD' || ev.status === 'APPROVED_VP_ADMIN';
                  return (
                    <tr key={ev.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        {ev.id}
                        <div className="text-[11px] font-sans font-normal text-slate-500">{ev.cycleMonth}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{ev.employeeName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{ev.employeeId}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-700">{ev.roleName}</div>
                        <div className="text-[11px] text-slate-500">{ev.department}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {ev.hodName}
                      </td>
                      <td className="py-3.5 px-4 text-[11px]">
                        <div>Due: <span className="font-semibold text-slate-700">{ev.dueDate}</span></div>
                        <div className="text-amber-700">Grace: <span className="font-semibold">{ev.graceDueDate}</span></div>
                      </td>
                      <td className="py-3.5 px-4">
                        {ev.isAutoLocked ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            <Lock className="w-3 h-3" /> AUTO-LOCKED OVERDUE
                          </span>
                        ) : ev.status === 'APPROVED_VP_ADMIN' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> APPROVED ({ev.overallCompositeScore}%)
                          </span>
                        ) : ev.status === 'SUBMITTED_HOD' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            <Clock className="w-3 h-3" /> SUBMITTED ({ev.overallCompositeScore}%)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3" /> PENDING HOD
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {ev.isAutoLocked ? (
                          <button
                            onClick={() => { setSelectedEvaluation(ev); setShowUnlockModal(true); }}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-lg text-[11px] font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <Unlock className="w-3 h-3" /> HR Unlock
                          </button>
                        ) : ev.status === 'PENDING_HOD' ? (
                          <button
                            onClick={() => handleOpenEvalForm(ev)}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3" /> Complete Online Form
                          </button>
                        ) : ev.status === 'SUBMITTED_HOD' ? (
                          <button
                            onClick={() => setActiveSubTab('vp_approval')}
                            className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            VP Sign-off Pending
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenEvalForm(ev)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            View Form
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: VP ADMIN SIGN-OFF QUEUE */}
      {activeSubTab === 'vp_approval' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>Vice President – Administration Approval Gateway:</strong> All monthly HOD submissions require formal sign-off before being finalized and collated into monthly reports.
              </span>
            </div>
            <span className="font-bold bg-blue-200/80 px-2 py-0.5 rounded text-[11px]">
              {evaluations.filter(e => e.status === 'SUBMITTED_HOD').length} Awaiting Sign-off
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluations.filter(e => e.status === 'SUBMITTED_HOD').length === 0 ? (
              <div className="col-span-2 p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                No monthly evaluations currently awaiting VP – Administration approval.
              </div>
            ) : (
              evaluations.filter(e => e.status === 'SUBMITTED_HOD').map(ev => (
                <div key={ev.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-blue-700">{ev.id}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800">
                        Score: {ev.overallCompositeScore}%
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{ev.employeeName}</h4>
                    <p className="text-xs text-slate-500 mb-3">{ev.roleName} • {ev.department}</p>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1.5 mb-4">
                      <div><strong className="text-slate-700">Submitted By:</strong> {ev.hodName}</div>
                      <div><strong className="text-slate-700">Positive Observations:</strong> {ev.positiveObservations || 'Not recorded.'}</div>
                      <div><strong className="text-slate-700">HOD Remarks:</strong> {ev.hodComments || 'Recommended for sign-off.'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleVpAdminApproval(ev.id, 'APPROVE')}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve & Sign-off
                    </button>
                    <button
                      onClick={() => handleVpAdminApproval(ev.id, 'REJECT')}
                      className="py-2 px-3 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Return
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: DEADLINES & AUTO-LOCK MONITOR */}
      {activeSubTab === 'auto_lock' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-rose-950 to-slate-900 text-white rounded-xl p-5 border border-rose-800 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-600/30 rounded-lg border border-rose-500/40">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Statutory Submission Timeline & Auto-Lock Governance</h4>
                <p className="text-xs text-rose-200/90 mt-1 leading-relaxed">
                  As mandated by University Performance Management SOP: Form submission due date is <strong>7th of every month</strong>. An automated grace period of <strong>3 additional days (up to the 10th)</strong> is provided. If not submitted by the 10th, the system enforces an <strong>immutable auto-lock</strong>, flagging the evaluation as "Not Submitted" with reason recorded and visible to HR.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 font-bold text-xs text-slate-700">
              Auto-Locked & Delinquent Evaluations Register
            </div>
            <div className="divide-y divide-slate-100">
              {evaluations.filter(e => e.isAutoLocked).length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Zero auto-locked evaluations. All active departments are currently compliant with submission timelines.
                </div>
              ) : (
                evaluations.filter(e => e.isAutoLocked).map(ev => (
                  <div key={ev.id} className="p-4 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-rose-700">{ev.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                          AUTO-LOCKED PAST 10th
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">{ev.employeeName} ({ev.roleName} - {ev.department})</h4>
                      <p className="text-xs text-slate-600 mt-1"><strong className="text-slate-800">Recorded Reason:</strong> {ev.lockReason}</p>
                    </div>

                    <button
                      onClick={() => { setSelectedEvaluation(ev); setShowUnlockModal(true); }}
                      className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Unlock className="w-3.5 h-3.5" /> HR Extension Unlock
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ANNUAL REPORTS & COMPENSATION REVIEW */}
      {activeSubTab === 'annual_compensation' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 leading-relaxed">
            <strong>Annual Collation & Compensation Review Workflow:</strong> Automatically triggered on completion of 1 year of employment based on Central Employee Database DOJ. Collatest 12 monthly reports, computes weighted average, applies predefined compensation slabs, and <strong>strictly validates probation status (must be completed)</strong> before activating salary revision!
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {annualReports.map(ann => {
              const isProbationOk = ann.probationStatus === 'COMPLETED';
              return (
                <div key={ann.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-emerald-800">{ann.id}</span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                        Weighted Avg: {ann.annualWeightedAverageScore}%
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base">{ann.employeeName}</h4>
                    <p className="text-xs text-slate-500">{ann.roleName} • {ann.department}</p>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-slate-500">Date of Joining:</span>
                        <div className="font-semibold text-slate-800">{ann.doj}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Probation Status:</span>
                        <div className={`font-bold ${isProbationOk ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {ann.probationStatus} {isProbationOk ? '✓' : '⚠️ Incomplete'}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500">Current Salary:</span>
                        <div className="font-semibold text-slate-800">₹{ann.currentSalary.toLocaleString()}/mo</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Completed Service:</span>
                        <div className="font-semibold text-slate-800">{ann.completedYears} Year(s)</div>
                      </div>
                    </div>

                    {/* Probation Gate Warning */}
                    {!isProbationOk && (
                      <div className="mt-3 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 flex items-start gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>SOP Policy Enforcement Gate:</strong> Member is under probation. Compensation review cannot be activated unless probation period is marked as mandatorily completed in Central DB.
                        </div>
                      </div>
                    )}

                    {ann.managementNotes && (
                      <p className="text-xs text-slate-600 mt-3 bg-slate-50 p-2.5 rounded border border-slate-200">
                        <strong>Management Decision:</strong> {ann.managementNotes}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      Status: <strong className="text-slate-800">{ann.managementReviewStatus}</strong>
                    </span>

                    <button
                      onClick={() => { setSelectedAnnualReport(ann); setShowCompensationModal(true); }}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
                        isProbationOk ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      }`}
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{isProbationOk ? 'Review Compensation' : 'Test Probation Gate'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: FORM REPOSITORY & VERSIONING */}
      {activeSubTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Digital Evaluation Form Repository (Role-Specific)</h3>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add / Version Form Template
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map(tpl => (
              <div key={tpl.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-amber-800">{tpl.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    {tpl.version}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{tpl.roleName}</h4>
                <p className="text-[11px] text-slate-500 mb-3">Modified by {tpl.lastModifiedBy}</p>

                <div className="text-xs space-y-2">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Standardized Role KPIs:</div>
                  <div className="space-y-1">
                    {tpl.kpis.map((k, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-medium text-slate-800">{k.name}</span>
                        <span className="text-slate-500 font-mono text-[11px]">Max: {k.maxScore} (Weight: {k.weightagePct}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: HOD ONLINE EVALUATION FORM (With Auto-Lock Check) */}
      {/* ======================================================== */}
      {showEvalModal && selectedEvaluation && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-amber-900 to-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/30 text-amber-300">
                  HOD Online Evaluation Form
                </span>
                <h3 className="text-base font-bold mt-1">{selectedEvaluation.employeeName} ({selectedEvaluation.cycleMonth})</h3>
                <p className="text-xs text-amber-200/80">{selectedEvaluation.roleName} • {selectedEvaluation.department}</p>
              </div>
              <button onClick={() => setShowEvalModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              
              {/* Auto-Lock warning if applicable */}
              {selectedEvaluation.isAutoLocked && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-rose-600 shrink-0" />
                  <span><strong>Form Locked!</strong> This evaluation exceeded the 10th grace period and cannot be submitted.</span>
                </div>
              )}

              {/* KPI Scoring Section */}
              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 text-amber-900">
                  Part I: Role-Specific KPIs (Rating: 1 = Unsatisfactory, 5 = Outstanding)
                </h4>
                <div className="space-y-3">
                  {(selectedEvaluation.kpiScores || []).map(k => (
                    <div key={k.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800">{k.id.toUpperCase()}: Core Duty Parameter</span>
                        <div className="text-[11px] text-slate-500">Assessed on punctuality, task quality & asset safety.</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            disabled={selectedEvaluation.isAutoLocked}
                            onClick={() => setFormKpiScores(prev => ({ ...prev, [k.id]: star }))}
                            className={`w-7 h-7 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                              (formKpiScores[k.id] || 5) >= star ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {star}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Positive Observations */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Specific Positive Observations / Good Work:</label>
                <textarea
                  rows="2"
                  disabled={selectedEvaluation.isAutoLocked}
                  value={formPositiveObs}
                  onChange={(e) => setFormPositiveObs(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  placeholder="Record instances of exceptional attendance, reliability, or emergency task completion..."
                />
              </div>

              {/* Negative Observations */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Areas for Improvement / Negative Observations:</label>
                <textarea
                  rows="2"
                  disabled={selectedEvaluation.isAutoLocked}
                  value={formNegativeObs}
                  onChange={(e) => setFormNegativeObs(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  placeholder="Record areas needing counseling, uniform dress compliance, or punctuality..."
                />
              </div>

              {/* HOD Recommendation */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">HOD Final Recommendation & Comments:</label>
                <textarea
                  rows="2"
                  disabled={selectedEvaluation.isAutoLocked}
                  value={formHodComments}
                  onChange={(e) => setFormHodComments(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  placeholder="Overall summary for Vice President – Administration review..."
                />
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowEvalModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={selectedEvaluation.isAutoLocked}
                onClick={handleSubmitEvaluation}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-400 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Submit to VP – Administration
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: HR UNLOCK MODAL FOR AUTO-LOCKED FORMS           */}
      {/* ======================================================== */}
      {showUnlockModal && selectedEvaluation && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 text-rose-800 rounded-xl">
                <Unlock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">HR Unlock Authorization</h3>
                <p className="text-xs text-slate-500">Provide formal justification for reopening grace period.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <div><strong>Employee:</strong> {selectedEvaluation.employeeName}</div>
              <div><strong>Cycle Month:</strong> {selectedEvaluation.cycleMonth}</div>
              <div><strong>Locked Reason:</strong> {selectedEvaluation.lockReason}</div>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Statutory Reason for Extension / Unlock:</label>
              <textarea
                rows="3"
                value={unlockReason}
                onChange={(e) => setUnlockReason(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
                placeholder="e.g. Employee was deputed on official off-campus convocation logistics duty; HOD was on approved medical leave..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowUnlockModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUnlockEvaluation}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Unlock className="w-3.5 h-3.5" /> Confirm Unlock (+3 Days Extension)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: COMPENSATION REVIEW WORKFLOW (PROBATION CHECK) */}
      {/* ======================================================== */}
      {showCompensationModal && selectedAnnualReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Annual Compensation Review Workflow</h3>
                <p className="text-xs text-slate-500">Apply predefined salary slabs against weighted score.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div><strong>Employee:</strong> {selectedAnnualReport.employeeName}</div>
              <div><strong>Role:</strong> {selectedAnnualReport.roleName} ({selectedAnnualReport.department})</div>
              <div><strong>Annual Weighted Score:</strong> <span className="font-bold text-emerald-700">{selectedAnnualReport.annualWeightedAverageScore}%</span></div>
              <div><strong>Current Basic Salary:</strong> ₹{selectedAnnualReport.currentSalary.toLocaleString()}/month</div>
              <div>
                <strong>Probation Status:</strong>{' '}
                <span className={`font-bold ${selectedAnnualReport.probationStatus === 'COMPLETED' ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {selectedAnnualReport.probationStatus}
                </span>
              </div>
            </div>

            {/* MANDATORY PROBATION VALIDATION WARNING */}
            {selectedAnnualReport.probationStatus !== 'COMPLETED' ? (
              <div className="p-3 bg-rose-50 border border-rose-300 text-rose-900 rounded-xl text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-700">
                  <AlertCircle className="w-4 h-4" /> SOP Policy Violation Check Triggered:
                </div>
                <p className="text-[11px] leading-relaxed">
                  Compensation-change workflow cannot be activated unless the probation period is marked as <strong>COMPLETED</strong> in the Central Employee Database. This member is currently marked as <strong>{selectedAnnualReport.probationStatus}</strong>.
                </p>
                <p className="text-[10px] text-rose-800 font-semibold mt-1">
                  (Tip: Switch to the 'Central Employee DB' tab and clear probation if confirmed.)
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="font-bold text-xs text-slate-800 block mb-1">Predefined Compensation Increment Percentage (%):</label>
                  <select
                    value={compIncreasePct}
                    onChange={(e) => setCompIncreasePct(parseFloat(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value={12}>Slab A+ (Score &gt;= 90%): +12% Merit Increment</option>
                    <option value={10}>Slab A (Score 80-89%): +10% Standard Merit</option>
                    <option value={7}>Slab B (Score 70-79%): +7% Regular Revision</option>
                    <option value={4}>Slab C (Score 55-69%): +4% Minimal Revision</option>
                  </select>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Computed New Monthly Salary:</span>
                  <span className="font-bold text-emerald-800 text-sm">
                    ₹{Math.round(selectedAnnualReport.currentSalary * (1 + compIncreasePct / 100)).toLocaleString()}/month
                  </span>
                </div>

                <div>
                  <label className="font-bold text-xs text-slate-800 block mb-1">Management Decision Notes:</label>
                  <textarea
                    rows="2"
                    value={compRemarks}
                    onChange={(e) => setCompRemarks(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Enter approval notes for October payroll cycle..."
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCompensationModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              {selectedAnnualReport.probationStatus === 'COMPLETED' ? (
                <button
                  onClick={handleCompensationReview}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" /> Approve & Update Central DB
                </button>
              ) : (
                <button
                  onClick={handleCompensationReview}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Attempt Workflow (Test Rejection)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: TEMPLATE CONFIGURATION & VERSIONING MODAL        */}
      {/* ======================================================== */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-sm text-slate-900">Configure Form Template & Version</h3>
              </div>
              <button onClick={() => setShowTemplateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Group-D Role Name:</label>
              <input
                type="text"
                value={tplRoleName}
                onChange={(e) => setTplRoleName(e.target.value)}
                placeholder="e.g. Library Attendant / Electrician Grade-I"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Version Number & Tag:</label>
              <input
                type="text"
                value={tplVersion}
                onChange={(e) => setTplVersion(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Configured KPIs ({tplKpis.length}):</label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {tplKpis.map((k, i) => (
                  <div key={i} className="p-2 bg-slate-50 border border-slate-200 rounded text-xs flex justify-between items-center">
                    <span className="font-semibold text-slate-800">{k.name}</span>
                    <span className="text-slate-500 font-mono">Weight: {k.weightagePct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTemplate}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Save Template & Audit Log
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
