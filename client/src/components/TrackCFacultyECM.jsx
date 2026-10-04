import React, { useState, useEffect } from 'react';
import {
  GraduationCap, CheckCircle2, Clock, AlertTriangle, ShieldCheck, ArrowRight,
  Award, FileText, Send, Calendar, Users, DollarSign, Printer, Check, X, RefreshCw, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { hasPermission } from '../services/rbac';

export default function TrackCFacultyECM({ currentUser, simulatedDate, onActionCompleted, onOpenLetter }) {
  const [activeSubTab, setActiveSubTab] = useState('eligibility');
  const [eligibilityList, setEligibilityList] = useState([]);
  const [appraisals, setAppraisals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal States
  const [showSelfAppraisalModal, setShowSelfAppraisalModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showScoreSheetModal, setShowScoreSheetModal] = useState(false);
  const [showMgmtDecisionModal, setShowMgmtDecisionModal] = useState(false);
  const [showDiscrepancyModal, setShowDiscrepancyModal] = useState(false);
  const [selectedAppraisal, setSelectedAppraisal] = useState(null);

  // Self Appraisal Form Fields
  const [teachingHours, setTeachingHours] = useState(480);
  const [studentFeedback, setStudentFeedback] = useState(4.8);
  const [scopusPapers, setScopusPapers] = useState(5);
  const [citations, setCitations] = useState(85);
  const [grantTitle, setGrantTitle] = useState('DST-SERB IoT in Smart Agriculture');
  const [grantAmount, setGrantAmount] = useState(25.5);
  const [institutionalDuties, setInstitutionalDuties] = useState('NBA / NAAC Criterion-3 In-charge, Coding Club Mentor');

  // ECM Scheduling Fields
  const [ecmMeetingDate, setEcmMeetingDate] = useState('');
  const [ecmVenue, setEcmVenue] = useState('Conference Room 1 (Hybrid Zoom)');
  const [externalExpert, setExternalExpert] = useState('Prof. P. K. Sinha (External Subject Expert - IIT)');

  // Digital Score Sheet Fields (TNU Protocol 300 pts)
  const [scoreTeaching, setScoreTeaching] = useState(94);
  const [scoreResearch, setScoreResearch] = useState(95);
  const [scoreConsultancy, setScoreConsultancy] = useState(45);
  const [scoreInstitutional, setScoreInstitutional] = useState(46);
  const [committeeRemarks, setCommitteeRemarks] = useState('Outstanding academic performance and research grants.');

  // Management Decision Fields
  const [decisionType, setDecisionType] = useState('PROMOTION_AND_COMPENSATION_REVISION');
  const [newDesignation, setNewDesignation] = useState('Associate Professor (Stage-2)');
  const [newSalary, setNewSalary] = useState(135000);
  const [salaryIncrease, setSalaryIncrease] = useState(15000);
  const [decisionRemarks, setDecisionRemarks] = useState('Approved by Vice-Chancellor. High institutional contributor.');

  // Discrepancy Handling Fields
  const [discrepancyStakeholder, setDiscrepancyStakeholder] = useState('RD_CELL');
  const [discrepancyRemarks, setDiscrepancyRemarks] = useState('');
  const [resubmissionNotes, setResubmissionNotes] = useState('');

  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [elData, apData] = await Promise.all([
        api.getFacultyEligibility(),
        api.getFacultyAppraisals()
      ]);
      setEligibilityList(elData || []);
      setAppraisals(apData || []);
    } catch (err) {
      console.error('Failed to load Track C data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRouteToRegistrar = async () => {
    if (!hasPermission(currentUser, 'canRouteRegistrar')) {
      setActionError('Institutional Hierarchy Restriction: Only Head - Human Resources or Developer can route the monthly 10th eligible faculty list to Registrar.');
      return;
    }
    try {
      setActionError('');
      const cycle = new Date(simulatedDate || Date.now()).toISOString().slice(0, 7);
      await api.routeEligibleFacultyToRegistrar({ cycleMonthYear: cycle, routedBy: currentUser.name });
      setActionSuccess(`Eligible Faculty List routed from HR to Office of the Registrar on 10th for cycle ${cycle}!`);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleIssueSelfAppraisal = async (empId) => {
    try {
      setActionError('');
      await api.issueFacultySelfAppraisal({ employeeId: empId, issuedBy: currentUser.name });
      setActionSuccess('Official Self-Appraisal Form issued to faculty! 7-working-day countdown started.');
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleSubmitSelfAppraisal = async () => {
    if (!selectedAppraisal) return;
    if (!hasPermission(currentUser, 'canSubmitFacultySelf')) {
      setActionError('Institutional Hierarchy Restriction: Only designated Faculty Member or Developer can submit self-appraisal evaluations.');
      return;
    }
    try {
      setActionError('');
      await api.submitFacultySelfAppraisal(selectedAppraisal.id, {
        selfAppraisalData: {
          teachingAndPedagogy: {
            teachingHoursCompleted: teachingHours,
            studentFeedbackRating: studentFeedback,
            scoreSelf: 92
          },
          researchAndPublications: {
            scopusIeeePapers: scopusPapers,
            citationsAdded: citations,
            scoreSelf: 94
          },
          sponsoredResearchAndGrants: {
            grantTitle,
            grantAmountLakhs: grantAmount,
            scoreSelf: 90
          },
          institutionalContribution: {
            duties: institutionalDuties,
            scoreSelf: 90
          }
        },
        submittedBy: currentUser.name
      });
      setActionSuccess(`Self-Appraisal submitted by faculty! Routed to School Dean, R&D Cell, Placement Cell, HR.`);
      setShowSelfAppraisalModal(false);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleStakeholderVerify = async (appId, stakeholder, status, remarks) => {
    try {
      setActionError('');
      await api.verifyFacultyStakeholder(appId, {
        stakeholder,
        status,
        remarks: remarks || 'Verified supporting documents.',
        verifierName: currentUser.name
      });
      if (status === 'DISCREPANCY_FOUND') {
        setActionSuccess(`Discrepancy flagged by ${stakeholder}! Form returned to faculty for correction.`);
      } else {
        setActionSuccess(`${stakeholder} verification recorded (VERIFIED).`);
      }
      setShowDiscrepancyModal(false);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleFacultyResubmit = async (appId) => {
    try {
      setActionError('');
      await api.resubmitFacultyDiscrepancy(appId, {
        notes: resubmissionNotes || 'Updated grant sanction letter and attached university finance countersignature.',
        submittedBy: currentUser.name
      });
      setActionSuccess('Corrected documents resubmitted by faculty! Stakeholder verification re-activated.');
      setResubmissionNotes('');
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleScheduleEcm = async () => {
    if (!selectedAppraisal) return;
    if (!hasPermission(currentUser, 'canScheduleECM')) {
      setActionError('Institutional Hierarchy Restriction: Only Office of the Registrar or Developer can schedule Evaluation Committee Meetings (ECM).');
      return;
    }
    try {
      setActionError('');
      await api.scheduleFacultyEcm({
        appraisalId: selectedAppraisal.id,
        meetingDate: ecmMeetingDate || new Date(Date.now() + 4*24*60*60*1000).toISOString(),
        venueMode: ecmVenue,
        committeeMembers: [
          'Prof. (Dr.) Arunansu Haldar (Vice-Chancellor - Chair)',
          'Dr. Sujoy Biswas (Registrar - Secretary)',
          'Concerned Dean of School / Academic Head',
          externalExpert,
          'Head - HR & Compensation'
        ],
        scheduledBy: currentUser.name
      });
      setActionSuccess(`Registrar scheduled ECM meeting for ${selectedAppraisal.employeeName}! Faculty member notified.`);
      setShowScheduleModal(false);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleRecordEcmScore = async () => {
    if (!selectedAppraisal) return;
    if (!hasPermission(currentUser, 'canRecordECMScore')) {
      setActionError('Institutional Hierarchy Restriction: Only Evaluation Committee members (VC, Registrar, Dean) or Developer can record ECM digital scores.');
      return;
    }
    try {
      setActionError('');
      await api.recordFacultyEcmScore({
        appraisalId: selectedAppraisal.id,
        teachingScore: scoreTeaching,
        researchScore: scoreResearch,
        consultancyScore: scoreConsultancy,
        institutionalScore: scoreInstitutional,
        committeeRemarks,
        scoredBy: currentUser.name
      });
      setActionSuccess(`Evaluation Committee scores compiled! Evaluation Matrix generated and routed to Management.`);
      setShowScoreSheetModal(false);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleMgmtDecision = async () => {
    if (!selectedAppraisal) return;
    if (!hasPermission(currentUser, 'canSanctionFacultyDecision')) {
      setActionError('Institutional Hierarchy Restriction: Only the Vice-Chancellor / Apex Management or Developer can sanction ECM statutory decisions.');
      return;
    }
    try {
      setActionError('');
      const res = await api.submitFacultyMgmtDecision({
        appraisalId: selectedAppraisal.id,
        decisionType,
        newDesignation,
        newSalary,
        salaryIncrease,
        remarks: decisionRemarks,
        decidedBy: currentUser.name
      });
      setActionSuccess(`Management Decision finalized! Official Order ${res.letterReferenceNumber} generated & routed to Payroll.`);
      setShowMgmtDecisionModal(false);
      await loadData();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const eligibleCount = eligibilityList.filter(e => e.isEligible).length;

  return (
    <div className="space-y-6">
      
      {/* Track C Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md border border-indigo-700/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-indigo-400 text-indigo-950 tracking-wider">
                Track C SOP
              </span>
              <span className="text-xs text-indigo-200">Evaluation Committee Meeting (ECM) Protocol</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-black">Faculty Annual Performance Appraisal System</h2>
            <p className="text-xs lg:text-sm text-indigo-100/90 mt-1 max-w-3xl leading-relaxed">
              Auto-identifies faculty completing probation and 12+ months service, routes list to Office of the Registrar by the 10th, manages 7-day self-appraisals, executes multi-stakeholder verification with discrepancy loops, records digital ECM scores (TNU Protocol 300 pts), and auto-generates official order letters supporting 7 statutory outcomes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRouteToRegistrar}
              className="px-3.5 py-2 bg-indigo-400 hover:bg-indigo-300 text-indigo-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Route 10th List to Registrar</span>
            </button>
            <button
              onClick={loadData}
              className="p-2 bg-indigo-950/60 hover:bg-indigo-900 text-indigo-200 hover:text-white rounded-xl text-xs transition-colors cursor-pointer border border-indigo-700/60"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* 10-Step Workflow Progression Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5 mt-5 text-[10px] pt-4 border-t border-indigo-700/40 text-center">
          <div className="bg-indigo-800/40 p-1.5 rounded border border-indigo-700/30">1. Eligibility</div>
          <div className="bg-indigo-800/40 p-1.5 rounded border border-indigo-700/30">2. 10th Routing</div>
          <div className="bg-indigo-800/40 p-1.5 rounded border border-indigo-700/30">3. Self-Appraisal</div>
          <div className="bg-indigo-800/40 p-1.5 rounded border border-indigo-700/30">4. Verification</div>
          <div className="bg-indigo-800/40 p-1.5 rounded border border-indigo-700/30">5. Discrepancy</div>
          <div className="bg-indigo-800/40 p-1.5 rounded border border-indigo-700/30">6. ECM Schedule</div>
          <div className="bg-indigo-800/40 p-1.5 rounded border border-indigo-700/30">7. Score Sheet</div>
          <div className="bg-indigo-800/40 p-1.5 rounded border border-indigo-700/30">8. Matrix</div>
          <div className="bg-indigo-800/40 p-1.5 rounded border border-indigo-700/30">9. Decision</div>
          <div className="bg-indigo-800/40 p-1.5 rounded border border-indigo-700/30">10. Letter & Pay</div>
        </div>
      </div>

      {/* Alerts */}
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

      {/* Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-white p-1 rounded-xl shadow-xs">
        <button
          onClick={() => setActiveSubTab('eligibility')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'eligibility' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          1 & 2. Auto-Eligibility Check ({eligibleCount} Eligible)
        </button>
        <button
          onClick={() => setActiveSubTab('appraisals_pipeline')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'appraisals_pipeline' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          3, 4 & 5. Self-Appraisal & Verification Pipeline ({appraisals.length})
        </button>
        <button
          onClick={() => setActiveSubTab('ecm_scoring')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'ecm_scoring' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          6 & 7. ECM Scheduling & TNU Score Sheet (300 Pts)
        </button>
        <button
          onClick={() => setActiveSubTab('decisions_letters')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeSubTab === 'decisions_letters' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          8, 9 & 10. Management Outcomes & Official Letters
        </button>
      </div>

      {/* SUB-TAB 1: AUTO-ELIGIBILITY CHECK & 10th ROUTING */}
      {activeSubTab === 'eligibility' && (
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-900 leading-relaxed flex items-center justify-between">
            <div>
              <strong>Auto-Eligibility Identification Engine:</strong> Checks Central Employee Database for two mandatory statutory conditions:
              (1) <em>Probation period completed</em>, and (2) <em>At least 12 months of service since DOJ or previous appraisal</em>. The system automatically compiles the list and routes it from HR to the Office of the Registrar by the <strong>10th of every month</strong>.
            </div>
            <button
              onClick={handleRouteToRegistrar}
              className="ml-4 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs shrink-0 cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Route to Registrar
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Faculty Member</th>
                    <th className="py-3 px-4">Department & Role</th>
                    <th className="py-3 px-4">DOJ & Service Duration</th>
                    <th className="py-3 px-4">Probation Status</th>
                    <th className="py-3 px-4">Eligibility Determination</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {eligibilityList.map(f => (
                    <tr key={f.employeeId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{f.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{f.empCode}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-700">{f.designation}</div>
                        <div className="text-[11px] text-slate-500">{f.department}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[11px]">
                        <div>DOJ: <span className="font-medium text-slate-800">{f.doj}</span></div>
                        <div className="text-slate-500">{f.monthsSinceDoj} months total service</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          f.probationStatus === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {f.probationStatus === 'COMPLETED' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {f.probationStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {f.isEligible ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <Check className="w-3 h-3" /> AUTO-ELIGIBLE FOR ECM
                          </span>
                        ) : (
                          <div>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              <X className="w-3 h-3" /> NOT ELIGIBLE
                            </span>
                            <div className="text-[10px] text-rose-600 mt-0.5 max-w-xs">{f.ineligibilityReason}</div>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {f.isEligible && (
                          <button
                            onClick={() => handleIssueSelfAppraisal(f.employeeId)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3" /> Issue Self-Appraisal (7d SLA)
                          </button>
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

      {/* SUB-TAB 2: SELF-APPRAISAL & VERIFICATION PIPELINE */}
      {activeSubTab === 'appraisals_pipeline' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed">
            <strong>Stages 3, 4 & 5 (Self-Appraisal & Verification Routing):</strong> The faculty member submits their Self-Appraisal form within <strong>7 working days</strong>. The system automatically routes the form to 4 stakeholder divisions: <em>School Dean, R&D Cell, Placement Cell, and HR</em>. If any stakeholder flags a discrepancy, the system enters the <strong>Discrepancy Return Loop</strong> returning the form to faculty for correction!
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appraisals.map(app => {
              const isDiscrepancy = app.status === 'DISCREPANCY_RETURNED_TO_FACULTY';
              const isAwaitingSubmission = app.status === 'AWAITING_SELF_APPRAISAL';
              const isVerified = app.status === 'READY_FOR_ECM_SCHEDULING' || app.status === 'ECM_SCHEDULED' || app.status === 'AWAITING_MGMT_DECISION' || app.status === 'COMPLETED';

              return (
                <div key={app.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-indigo-800">{app.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isDiscrepancy ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                        isVerified ? 'bg-emerald-100 text-emerald-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base">{app.employeeName}</h4>
                    <p className="text-xs text-slate-500 mb-3">{app.designation} • {app.department}</p>

                    {/* Discrepancy Alert Banner */}
                    {isDiscrepancy && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 mb-3 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-rose-700">
                          <AlertTriangle className="w-4 h-4 text-rose-600" /> Discrepancy Return Loop Active:
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          <strong>Flagged By:</strong> {app.discrepancyDetails?.flaggedBy}
                        </p>
                        <p className="text-[11px] leading-relaxed text-rose-800">
                          {app.discrepancyDetails?.reason}
                        </p>
                      </div>
                    )}

                    {/* Stakeholder Verification Status Matrix */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2 mb-3 text-xs">
                      <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                        Multi-Stakeholder Verification Status:
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {(app.stakeholderVerifications || []).map((s, idx) => (
                          <div key={idx} className="p-2 bg-white rounded border border-slate-200 flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-slate-700">{s.stakeholder}</span>
                            <span className={`font-bold ${
                              s.status === 'VERIFIED' ? 'text-emerald-700' :
                              s.status === 'DISCREPANCY_FOUND' ? 'text-rose-700' :
                              'text-amber-700'
                            }`}>
                              {s.status === 'VERIFIED' ? '✓ OK' : s.status === 'DISCREPANCY_FOUND' ? '⚠️ Discrepancy' : 'Pending'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    {isAwaitingSubmission ? (
                      <button
                        onClick={() => { setSelectedAppraisal(app); setShowSelfAppraisalModal(true); }}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" /> Submit Self-Appraisal (Faculty)
                      </button>
                    ) : isDiscrepancy ? (
                      <div className="flex gap-2 w-full">
                        <input
                          type="text"
                          value={resubmissionNotes}
                          onChange={(e) => setResubmissionNotes(e.target.value)}
                          placeholder="Faculty correction notes..."
                          className="flex-1 p-2 border border-slate-300 rounded-lg text-xs"
                        />
                        <button
                          onClick={() => handleFacultyResubmit(app.id)}
                          className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
                        >
                          Resubmit Corrected Docs
                        </button>
                      </div>
                    ) : app.status === 'UNDER_VERIFICATION' ? (
                      <div className="flex gap-1.5 w-full justify-end">
                        <button
                          onClick={() => handleStakeholderVerify(app.id, 'RD_CELL', 'VERIFIED', 'All papers indexed.')}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold cursor-pointer"
                        >
                          Verify All Stakeholders
                        </button>
                        <button
                          onClick={() => { setSelectedAppraisal(app); setShowDiscrepancyModal(true); }}
                          className="px-2.5 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg text-[11px] font-bold cursor-pointer"
                        >
                          Flag Discrepancy
                        </button>
                      </div>
                    ) : app.status === 'READY_FOR_ECM_SCHEDULING' ? (
                      <button
                        onClick={() => { setSelectedAppraisal(app); setShowScheduleModal(true); }}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Registrar: Schedule ECM
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs">✓ Advanced to ECM Meeting</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ECM SCHEDULING & TNU PROTOCOL SCORE SHEET */}
      {activeSubTab === 'ecm_scoring' && (
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-900 leading-relaxed">
            <strong>Stages 6 & 7 (Evaluation Committee Meeting & Digital Score Sheet):</strong> The Evaluation Committee meets with the external subject expert (IIT/ISI). The Committee records digital scores strictly against configured <strong>TNU Protocol Parameters (300 Total Points)</strong>: Teaching (100), Research (100), Consultancy (50), and Institutional Development (50). The system compiles the Evaluation Matrix with previous increment history.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appraisals.filter(a => a.status === 'ECM_SCHEDULED' || a.digitalEcmScoreSheet).map(app => (
              <div key={app.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-indigo-800">{app.id}</span>
                    {app.digitalEcmScoreSheet ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        TNU Score: {app.digitalEcmScoreSheet.totalTnuProtocolScore}/300 ({app.digitalEcmScoreSheet.tnuPercentage}%)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                        ECM Scheduled
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 text-base">{app.employeeName}</h4>
                  <p className="text-xs text-slate-500 mb-3">{app.designation} • {app.department}</p>

                  {app.ecmMeeting && (
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1 mb-3">
                      <div><strong>Meeting Date:</strong> {new Date(app.ecmMeeting.scheduledDate).toLocaleString()}</div>
                      <div><strong>Venue:</strong> {app.ecmMeeting.venueMode}</div>
                      <div><strong>External Expert:</strong> Prof. P. K. Sinha (IIT Kharagpur)</div>
                    </div>
                  )}

                  {app.digitalEcmScoreSheet && (
                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-xs space-y-1 mb-3">
                      <div className="font-bold text-emerald-900 uppercase tracking-wider text-[10px]">TNU Protocol Breakdown (300 Pts):</div>
                      <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-700">
                        <div>Teaching & Pedagogy: <strong>{app.digitalEcmScoreSheet.teachingScore100}/100</strong></div>
                        <div>Research & Papers: <strong>{app.digitalEcmScoreSheet.researchScore100}/100</strong></div>
                        <div>Consultancy Grants: <strong>{app.digitalEcmScoreSheet.consultancyGrantScore50}/50</strong></div>
                        <div>Institutional Dev: <strong>{app.digitalEcmScoreSheet.institutionalDevScore50}/50</strong></div>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-1 italic">"{app.digitalEcmScoreSheet.committeeRemarks}"</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {!app.digitalEcmScoreSheet ? (
                    <button
                      onClick={() => { setSelectedAppraisal(app); setShowScoreSheetModal(true); }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" /> Record ECM Score Sheet (Live)
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-bold text-xs">✓ Score Sheet Compiled</span>
                  )}

                  {app.status === 'AWAITING_MGMT_DECISION' && (
                    <button
                      onClick={() => { setSelectedAppraisal(app); setShowMgmtDecisionModal(true); }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <DollarSign className="w-3.5 h-3.5" /> Management Decision
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MANAGEMENT DECISIONS & OFFICIAL LETTERS */}
      {activeSubTab === 'decisions_letters' && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-xs text-purple-900 leading-relaxed">
            <strong>Stages 8, 9 & 10 (Management Outcomes & Implementation):</strong> Supports all <strong>7 statutory outcomes</strong>: Confirmation of employment, Extension of probation, Rewards & recognition, Compensation revision, Additional responsibilities, PIP, or Reprimand. Auto-generates official order letters and tracks implementation in the next applicable salary cycle!
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appraisals.filter(a => a.managementDecision).map(app => (
              <div key={app.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-purple-800">
                      Letter Ref: {app.managementDecision.letterReferenceNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                      {app.managementDecision.decisionType}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base">{app.employeeName}</h4>
                  <p className="text-xs text-slate-500 mb-3">{app.designation} • {app.department}</p>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-1.5 mb-4">
                    <div><strong>Sanctioned Decision:</strong> {app.managementDecision.decisionType}</div>
                    {app.managementDecision.newMonthlySalary > 0 && (
                      <div><strong>Revised Monthly CTC:</strong> <span className="font-bold text-emerald-800">₹{app.managementDecision.newMonthlySalary.toLocaleString()}/month</span></div>
                    )}
                    {app.managementDecision.newDesignation && (
                      <div><strong>Revised Designation:</strong> {app.managementDecision.newDesignation}</div>
                    )}
                    <div><strong>Decided By:</strong> {app.managementDecision.decidedBy}</div>
                    <div><strong>Payroll Cycle:</strong> {app.managementDecision.effectiveSalaryCycleMonth}</div>
                    <p className="text-slate-600 italic">"{app.managementDecision.remarks}"</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Routed to HR / Payroll
                  </span>

                  <button
                    onClick={() => onOpenLetter(app.managementDecision.letterReferenceNumber)}
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" /> View Official Letter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: FACULTY SELF-APPRAISAL FORM SUBMISSION (7 DAYS) */}
      {/* ======================================================== */}
      {showSelfAppraisalModal && selectedAppraisal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300">
                  Annual Self-Appraisal Form (7 Working Days SLA)
                </span>
                <h3 className="text-base font-bold mt-1">{selectedAppraisal.employeeName}</h3>
                <p className="text-xs text-indigo-200/80">{selectedAppraisal.designation} • {selectedAppraisal.department}</p>
              </div>
              <button onClick={() => setShowSelfAppraisalModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 text-indigo-900">
                  Part I: Teaching & Pedagogy Deliverables
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Teaching Lecture Hours (Annual):</label>
                    <input
                      type="number"
                      value={teachingHours}
                      onChange={(e) => setTeachingHours(parseFloat(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Student Feedback Rating (out of 5.0):</label>
                    <input
                      type="number"
                      step="0.01"
                      value={studentFeedback}
                      onChange={(e) => setStudentFeedback(parseFloat(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 text-indigo-900">
                  Part II: Research Publications & Scholarly Output
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Scopus / IEEE / SCI Papers Published:</label>
                    <input
                      type="number"
                      value={scopusPapers}
                      onChange={(e) => setScopusPapers(parseInt(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">New Citations Added (Google Scholar / Scopus):</label>
                    <input
                      type="number"
                      value={citations}
                      onChange={(e) => setCitations(parseInt(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 text-indigo-900">
                  Part III: Sponsored Research Grants & Consultancy
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Sanctioned Project Title / Agency:</label>
                    <input
                      type="text"
                      value={grantTitle}
                      onChange={(e) => setGrantTitle(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Grant Amount (₹ in Lakhs):</label>
                    <input
                      type="number"
                      value={grantAmount}
                      onChange={(e) => setGrantAmount(parseFloat(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 text-indigo-900">
                  Part IV: Institutional Contributions & Governance
                </h4>
                <input
                  type="text"
                  value={institutionalDuties}
                  onChange={(e) => setInstitutionalDuties(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="e.g. NAAC Coordinator, Placement Cell In-Charge, Proctorial Board..."
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setShowSelfAppraisalModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitSelfAppraisal}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Submit for Multi-Stakeholder Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: STAKEHOLDER DISCREPANCY FLAGGING                */}
      {/* ======================================================== */}
      {showDiscrepancyModal && selectedAppraisal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 text-rose-800 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Flag Verification Discrepancy</h3>
                <p className="text-xs text-slate-500">Initiates Discrepancy Return Loop to Faculty.</p>
              </div>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Verifying Stakeholder:</label>
              <select
                value={discrepancyStakeholder}
                onChange={(e) => setDiscrepancyStakeholder(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs"
              >
                <option value="RD_CELL">R&D Cell (Publications & Grants)</option>
                <option value="SCHOOL_DEAN">School Dean (Teaching Load & Feedback)</option>
                <option value="PLACEMENT_CELL">Placement Cell (Corporate Links)</option>
                <option value="HR_DEPARTMENT">HR Department (Service & Attendance)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Specific Discrepancy Details & Required Correction:</label>
              <textarea
                rows="3"
                value={discrepancyRemarks}
                onChange={(e) => setDiscrepancyRemarks(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
                placeholder="e.g. Scopus paper 3 lacks university affiliation header, or grant letter lacks university finance stamp..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDiscrepancyModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStakeholderVerify(selectedAppraisal.id, discrepancyStakeholder, 'DISCREPANCY_FOUND', discrepancyRemarks)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs"
              >
                Return Form to Faculty
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: REGISTRAR SCHEDULES ECM                         */}
      {/* ======================================================== */}
      {showScheduleModal && selectedAppraisal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-800 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Schedule Evaluation Committee Meeting (ECM)</h3>
                <p className="text-xs text-slate-500">Office of the Registrar Scheduling Portal</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <div><strong>Faculty:</strong> {selectedAppraisal.employeeName} ({selectedAppraisal.designation})</div>
              <div><strong>Department:</strong> {selectedAppraisal.department}</div>
              <div><strong>Status:</strong> All 4 Stakeholders Verified (Dean, R&D, Placement, HR)</div>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Meeting Date & Time:</label>
              <input
                type="datetime-local"
                value={ecmMeetingDate}
                onChange={(e) => setEcmMeetingDate(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Venue & Meeting Mode:</label>
              <input
                type="text"
                value={ecmVenue}
                onChange={(e) => setEcmVenue(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">External Subject Expert:</label>
              <input
                type="text"
                value={externalExpert}
                onChange={(e) => setExternalExpert(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleEcm}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Confirm & Notify Faculty
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: DIGITAL ECM SCORE SHEET (TNU PROTOCOL 300 PTS)  */}
      {/* ======================================================== */}
      {showScoreSheetModal && selectedAppraisal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Digital ECM Score Sheet (TNU Protocol)</h3>
              </div>
              <button onClick={() => setShowScoreSheetModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <div><strong>Candidate:</strong> {selectedAppraisal.employeeName} ({selectedAppraisal.designation})</div>
              <div><strong>Evaluation Framework:</strong> Configured TNU Protocol Parameters (Max 300 Points)</div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">1. Teaching & Pedagogy (Max 100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scoreTeaching}
                  onChange={(e) => setScoreTeaching(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-800 block mb-1">2. Research & Grants (Max 100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scoreResearch}
                  onChange={(e) => setScoreResearch(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-800 block mb-1">3. Consultancy (Max 50):</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={scoreConsultancy}
                  onChange={(e) => setScoreConsultancy(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-800 block mb-1">4. Institutional Dev (Max 50):</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={scoreInstitutional}
                  onChange={(e) => setScoreInstitutional(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                />
              </div>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs flex justify-between items-center">
              <span className="font-bold text-slate-700">Total Computed TNU Protocol Score:</span>
              <span className="font-black text-indigo-900 text-sm">
                {(parseFloat(scoreTeaching)||0) + (parseFloat(scoreResearch)||0) + (parseFloat(scoreConsultancy)||0) + (parseFloat(scoreInstitutional)||0)} / 300 points (
                {Math.round((((parseFloat(scoreTeaching)||0) + (parseFloat(scoreResearch)||0) + (parseFloat(scoreConsultancy)||0) + (parseFloat(scoreInstitutional)||0)) / 300) * 1000) / 10}%)
              </span>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Evaluation Committee Collective Remarks:</label>
              <textarea
                rows="2"
                value={committeeRemarks}
                onChange={(e) => setCommitteeRemarks(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowScoreSheetModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRecordEcmScore}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" /> Submit Score Sheet & Compile Matrix
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: MANAGEMENT DECISION & STATUTORY OUTCOMES        */}
      {/* ======================================================== */}
      {showMgmtDecisionModal && selectedAppraisal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-800 rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Management Decision & Letter Generation</h3>
                <p className="text-xs text-slate-500">Supports all 7 University Statutory Outcomes</p>
              </div>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Select Statutory Performance Outcome:</label>
              <select
                value={decisionType}
                onChange={(e) => setDecisionType(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs font-semibold"
              >
                <option value="PROMOTION_AND_COMPENSATION_REVISION">1. Promotion & Compensation Revision</option>
                <option value="COMPENSATION_REVISION">2. Compensation Revision Only (Merit Increment)</option>
                <option value="CONFIRMATION_OF_EMPLOYMENT">3. Confirmation of Employment (Probation Clearance)</option>
                <option value="REWARDS_AND_RECOGNITION">4. Rewards & Recognition (Research Excellence Award)</option>
                <option value="ADDITIONAL_RESPONSIBILITIES">5. Additional Responsibilities (Dean / HOD Appointment)</option>
                <option value="EXTENSION_OF_PROBATION">6. Extension of Probation (Minimum Score Not Achieved)</option>
                <option value="PERFORMANCE_IMPROVEMENT_PLAN">7. Performance Improvement Plan (PIP - 90 Days)</option>
                <option value="REPRIMAND">8. Reprimand / Formal Caution</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">New Designation (if promoted):</label>
                <input
                  type="text"
                  value={newDesignation}
                  onChange={(e) => setNewDesignation(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">New Monthly CTC (₹):</label>
                <input
                  type="number"
                  value={newSalary}
                  onChange={(e) => setNewSalary(parseFloat(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-lg font-bold text-emerald-800"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-xs text-slate-800 block mb-1">Management Decision Remarks:</label>
              <textarea
                rows="2"
                value={decisionRemarks}
                onChange={(e) => setDecisionRemarks(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowMgmtDecisionModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleMgmtDecision}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Sanction & Auto-Generate Official Letter
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
