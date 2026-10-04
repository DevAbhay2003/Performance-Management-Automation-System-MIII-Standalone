import React, { useState, useEffect } from 'react';
import { Award, FileText, Download, Printer, Filter, RefreshCw, BarChart3, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function TrackFConfigurableReports() {
  const [selectedReportType, setSelectedReportType] = useState('group-d-monthly');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const reportTypes = [
    { id: 'group-d-monthly', label: 'Group-D Monthly Performance Master Report', track: 'Track A' },
    { id: 'group-d-annual', label: 'Group-D Annual Collation & Slabs Report', track: 'Track A' },
    { id: 'general-kra-sla', label: 'General Employees 30-Day KRA Setup SLA Compliance', track: 'Track B' },
    { id: 'general-quarterly', label: 'General Employees Quarter-Wise Submission Status Report', track: 'Track B' },
    { id: 'faculty-eligibility', label: 'Faculty ECM Auto-Eligibility Roster (10th Routing)', track: 'Track C' },
    { id: 'faculty-ecm-matrix', label: 'Faculty ECM Compiled Evaluation Matrix per Cycle', track: 'Track C' }
  ];

  useEffect(() => {
    loadReport(selectedReportType);
  }, [selectedReportType]);

  const loadReport = async (type) => {
    setLoading(true);
    try {
      const data = await api.getReport(type);
      setReportData(data);
    } catch (err) {
      console.error('Failed to load report:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    if (!reportData || !reportData.data || reportData.data.length === 0) return;
    const items = reportData.data;
    const headers = Object.keys(items[0]).filter(k => typeof items[0][k] !== 'object');
    const rows = items.map(it => headers.map(h => `"${String(it[h] || '').replace(/"/g, '""')}"`).join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedReportType}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-blue-500/30 text-blue-300 border border-blue-400/30 tracking-wider">
                Pillar F
              </span>
              <span className="text-xs text-blue-200">Real-Time Executive Analytics</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-black">Configurable Statutory Reports & Analytics</h2>
            <p className="text-xs lg:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Provides real-time report generation across Group-D monthly evaluations, annual collations, general employee KRA onboarding SLAs, quarter-wise submissions, and faculty ECM matrices with one-click export and print formatting.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700"
            >
              <Printer className="w-4 h-4" />
              <span>Print Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Selector Pills */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center gap-2 text-xs no-print">
        {reportTypes.map(r => (
          <button
            key={r.id}
            onClick={() => setSelectedReportType(r.id)}
            className={`px-3 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedReportType === r.id ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
              selectedReportType === r.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {r.track}
            </span>
            <span>{r.label}</span>
          </button>
        ))}
      </div>

      {/* Rendered Report Paper View */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 print-page">
        {loading || !reportData ? (
          <div className="p-12 text-center text-xs text-slate-500">Generating report...</div>
        ) : (
          <div className="space-y-6">
            
            {/* Report Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-black text-slate-900">{reportData.title}</h3>
                <p className="text-xs text-slate-500">
                  The Neotia University • Generated on: {new Date(reportData.generatedAt).toLocaleString()}
                </p>
              </div>

              <div className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                Total Records: {reportData.count}
              </div>
            </div>

            {/* Dynamic Table based on report data */}
            <div className="overflow-x-auto">
              {reportData.data.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No records available for this report type.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      {selectedReportType === 'group-d-monthly' && (
                        <>
                          <th className="py-2.5 px-3">Form ID</th>
                          <th className="py-2.5 px-3">Month</th>
                          <th className="py-2.5 px-3">Employee</th>
                          <th className="py-2.5 px-3">Department</th>
                          <th className="py-2.5 px-3">HOD</th>
                          <th className="py-2.5 px-3">Score</th>
                          <th className="py-2.5 px-3">VP Sign-off</th>
                        </>
                      )}
                      {selectedReportType === 'group-d-annual' && (
                        <>
                          <th className="py-2.5 px-3">Report ID</th>
                          <th className="py-2.5 px-3">Employee</th>
                          <th className="py-2.5 px-3">Department</th>
                          <th className="py-2.5 px-3">Service</th>
                          <th className="py-2.5 px-3">Probation</th>
                          <th className="py-2.5 px-3">Weighted Avg</th>
                          <th className="py-2.5 px-3">Status</th>
                        </>
                      )}
                      {selectedReportType === 'general-kra-sla' && (
                        <>
                          <th className="py-2.5 px-3">Goal ID</th>
                          <th className="py-2.5 px-3">Employee</th>
                          <th className="py-2.5 px-3">Department</th>
                          <th className="py-2.5 px-3">DOJ</th>
                          <th className="py-2.5 px-3">30-Day Deadline</th>
                          <th className="py-2.5 px-3">SLA Compliance</th>
                          <th className="py-2.5 px-3">Status</th>
                        </>
                      )}
                      {selectedReportType === 'general-quarterly' && (
                        <>
                          <th className="py-2.5 px-3">Review ID</th>
                          <th className="py-2.5 px-3">Employee</th>
                          <th className="py-2.5 px-3">Quarter</th>
                          <th className="py-2.5 px-3">Milestone</th>
                          <th className="py-2.5 px-3">Self Score</th>
                          <th className="py-2.5 px-3">RA Score</th>
                          <th className="py-2.5 px-3">Status</th>
                        </>
                      )}
                      {selectedReportType === 'faculty-eligibility' && (
                        <>
                          <th className="py-2.5 px-3">Employee ID</th>
                          <th className="py-2.5 px-3">Faculty Name</th>
                          <th className="py-2.5 px-3">Department</th>
                          <th className="py-2.5 px-3">Designation</th>
                          <th className="py-2.5 px-3">Service Months</th>
                          <th className="py-2.5 px-3">Probation</th>
                          <th className="py-2.5 px-3">Eligible for ECM</th>
                        </>
                      )}
                      {selectedReportType === 'faculty-ecm-matrix' && (
                        <>
                          <th className="py-2.5 px-3">ECM ID</th>
                          <th className="py-2.5 px-3">Faculty Candidate</th>
                          <th className="py-2.5 px-3">Department</th>
                          <th className="py-2.5 px-3">Teaching (100)</th>
                          <th className="py-2.5 px-3">Research (100)</th>
                          <th className="py-2.5 px-3">Total / 300</th>
                          <th className="py-2.5 px-3">Outcome</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reportData.data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        {selectedReportType === 'group-d-monthly' && (
                          <>
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{row.id}</td>
                            <td className="py-2.5 px-3">{row.cycleMonth}</td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">{row.employeeName}</td>
                            <td className="py-2.5 px-3">{row.department}</td>
                            <td className="py-2.5 px-3 text-slate-600">{row.hodName}</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-800">{row.overallCompositeScore}%</td>
                            <td className="py-2.5 px-3 text-emerald-700 font-semibold">{row.status}</td>
                          </>
                        )}
                        {selectedReportType === 'group-d-annual' && (
                          <>
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{row.id}</td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">{row.employeeName}</td>
                            <td className="py-2.5 px-3">{row.department}</td>
                            <td className="py-2.5 px-3">{row.completedYears} Year(s)</td>
                            <td className="py-2.5 px-3 font-semibold">{row.probationStatus}</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-800">{row.annualWeightedAverageScore}%</td>
                            <td className="py-2.5 px-3 font-semibold text-slate-700">{row.managementReviewStatus}</td>
                          </>
                        )}
                        {selectedReportType === 'general-kra-sla' && (
                          <>
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{row.id}</td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">{row.employeeName}</td>
                            <td className="py-2.5 px-3">{row.department}</td>
                            <td className="py-2.5 px-3">{row.doj}</td>
                            <td className="py-2.5 px-3">{row.goalSettingDeadline}</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-800">{row.slaAdherence}</td>
                            <td className="py-2.5 px-3 font-semibold">{row.status}</td>
                          </>
                        )}
                        {selectedReportType === 'general-quarterly' && (
                          <>
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{row.id}</td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">{row.employeeName}</td>
                            <td className="py-2.5 px-3 font-bold">{row.quarter}</td>
                            <td className="py-2.5 px-3">{row.targetDaysMark} Days</td>
                            <td className="py-2.5 px-3">{row.selfScore}%</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-800">{row.reportingAuthorityReview?.score || '—'}%</td>
                            <td className="py-2.5 px-3 font-semibold">{row.status}</td>
                          </>
                        )}
                        {selectedReportType === 'faculty-eligibility' && (
                          <>
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{row.id}</td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">{row.name}</td>
                            <td className="py-2.5 px-3">{row.department}</td>
                            <td className="py-2.5 px-3">{row.designation}</td>
                            <td className="py-2.5 px-3">{row.monthsSinceDoj} mos</td>
                            <td className="py-2.5 px-3 font-semibold">{row.probationStatus}</td>
                            <td className="py-2.5 px-3 font-bold">
                              {row.isEligible ? <span className="text-emerald-700">✓ YES</span> : <span className="text-rose-700">✗ NO</span>}
                            </td>
                          </>
                        )}
                        {selectedReportType === 'faculty-ecm-matrix' && (
                          <>
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{row.id}</td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">{row.employeeName}</td>
                            <td className="py-2.5 px-3">{row.department}</td>
                            <td className="py-2.5 px-3">{row.digitalEcmScoreSheet?.teachingScore100}</td>
                            <td className="py-2.5 px-3">{row.digitalEcmScoreSheet?.researchScore100}</td>
                            <td className="py-2.5 px-3 font-bold text-indigo-900">
                              {row.digitalEcmScoreSheet?.totalTnuProtocolScore}/300 ({row.digitalEcmScoreSheet?.tnuPercentage}%)
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-emerald-700">
                              {row.managementDecision?.decisionType || 'In Evaluation'}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
