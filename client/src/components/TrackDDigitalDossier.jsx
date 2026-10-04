import React, { useState, useEffect } from 'react';
import { FileText, User, Award, CheckCircle2, Calendar, DollarSign, Printer, Search, RefreshCw, Folder } from 'lucide-react';
import { api } from '../services/api';

export default function TrackDDigitalDossier({ onOpenLetter }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [dossierData, setDossierData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmpId) {
      loadDossier(selectedEmpId);
    }
  }, [selectedEmpId]);

  const loadEmployees = async () => {
    try {
      const data = await api.getEmployees();
      setEmployees(data || []);
      if (data && data.length > 0) {
        setSelectedEmpId(data[0].id);
      }
    } catch (err) {
      console.error('Failed to load employees:', err);
    }
  };

  const loadDossier = async (id) => {
    setLoading(true);
    try {
      const data = await api.getEmployeeDossier(id);
      setDossierData(data);
    } catch (err) {
      console.error('Failed to load employee dossier:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.empCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-blue-800/40">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-blue-400 text-blue-950 tracking-wider">
            Pillar D
          </span>
          <span className="text-xs text-blue-200">Central Digital Personal File Integration</span>
        </div>
        <h2 className="text-xl lg:text-2xl font-black">Digital Employee File & Service Dossier</h2>
        <p className="text-xs lg:text-sm text-blue-100/90 mt-1 max-w-3xl leading-relaxed">
          Every evaluation form, monthly performance report, quarterly review, annual appraisal, ECM score sheet, and official university order letter is automatically stored against the employee's central digital personal file. Fully linked at every point of decision.
        </p>
      </div>

      {/* Main Grid: Employee Selector Left + Dossier View Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Employee Directory Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Employee File</h3>
            <span className="text-[10px] text-slate-400 font-medium">{employees.length} Personnel</span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="max-h-[550px] overflow-y-auto space-y-1.5 divide-y divide-slate-100">
            {filteredEmployees.map(emp => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmpId(emp.id)}
                className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                  selectedEmpId === emp.id ? 'bg-blue-50/90 border border-blue-200 text-blue-950' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold text-xs">{emp.name}</div>
                  <div className="text-[10px] text-slate-500">{emp.designation} • {emp.department}</div>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                  emp.category === 'GROUP_D' ? 'bg-amber-100 text-amber-800' :
                  emp.category === 'FACULTY' ? 'bg-indigo-100 text-indigo-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {emp.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active Employee Dossier */}
        <div className="lg:col-span-2 space-y-5">
          {loading || !dossierData ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
              Loading dossier records...
            </div>
          ) : (
            <div className="space-y-5">
              
              {/* Profile Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-700 text-white font-black flex items-center justify-center text-lg shadow-sm">
                      {dossierData.employee.name.split(' ').map(n=>n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{dossierData.employee.name}</h3>
                      <p className="text-xs text-slate-500">{dossierData.employee.designation} • {dossierData.employee.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                      {dossierData.employee.empCode}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                      dossierData.employee.probationStatus === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      Probation: {dossierData.employee.probationStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Date of Joining</span>
                    <span className="font-semibold text-slate-900">{dossierData.employee.doj}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Monthly Salary</span>
                    <span className="font-bold text-emerald-800">₹{dossierData.employee.salary?.toLocaleString()}/mo</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Reporting Authority</span>
                    <span className="font-semibold text-slate-900 truncate block">{dossierData.employee.reportingAuthorityName || 'Executive Directorate'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                    <span className="font-semibold text-slate-900">{dossierData.employee.location}</span>
                  </div>
                </div>
              </div>

              {/* Digital Dossier Document Repository */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Archived Dossier Documents & Service Milestone Records
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {dossierData.digitalDossier.length} Statutory Records
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {dossierData.digitalDossier.map((doc, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between text-xs hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{doc.title}</div>
                          <div className="text-[10px] text-slate-400">Archived Date: {doc.date} • Type: {doc.type}</div>
                        </div>
                      </div>

                      {doc.type === 'ECM_OFFICIAL_ORDER' && (
                        <button
                          onClick={() => onOpenLetter('TNU/REG/ECM/2026/044')}
                          className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 border border-purple-200"
                        >
                          <Printer className="w-3 h-3" /> View Order
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Linked Track Records Overview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Linked Performance Automation Records
                </h4>

                {/* Group-D Records */}
                {dossierData.records.groupDEvaluations?.length > 0 && (
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs space-y-1">
                    <span className="font-bold text-amber-900 block">Monthly Group-D Evaluations ({dossierData.records.groupDEvaluations.length}):</span>
                    {dossierData.records.groupDEvaluations.map(e => (
                      <div key={e.id} className="text-[11px] text-slate-700 flex justify-between">
                        <span>{e.cycleMonth} Form ({e.id})</span>
                        <span className="font-bold text-amber-800">{e.status} • Score: {e.overallCompositeScore}%</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* General Employee Records */}
                {dossierData.records.generalQuarterly?.length > 0 && (
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs space-y-1">
                    <span className="font-bold text-emerald-900 block">Quarterly Review Cycles ({dossierData.records.generalQuarterly.length}):</span>
                    {dossierData.records.generalQuarterly.map(q => (
                      <div key={q.id} className="text-[11px] text-slate-700 flex justify-between">
                        <span>{q.quarter} Review ({q.targetDaysMark} Days)</span>
                        <span className="font-bold text-emerald-800">{q.status} • Self: {q.selfScore}%</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Faculty Records */}
                {dossierData.records.facultyAppraisals?.length > 0 && (
                  <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200 text-xs space-y-1">
                    <span className="font-bold text-indigo-900 block">Faculty ECM Appraisals ({dossierData.records.facultyAppraisals.length}):</span>
                    {dossierData.records.facultyAppraisals.map(f => (
                      <div key={f.id} className="text-[11px] text-slate-700 flex justify-between">
                        <span>Cycle {f.cycleMonthYear} ({f.id})</span>
                        <span className="font-bold text-indigo-800">{f.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
