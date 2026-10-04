import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Filter, Download, Clock, ArrowRight, Eye, RefreshCw, X } from 'lucide-react';
import { api } from '../services/api';

export default function TrackEAuditTrail() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [inspectLog, setInspectLog] = useState(null);

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      const data = await api.getAuditTrail({ limit: 300 });
      setLogs(data || []);
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(l => {
    const matchesSearch = !searchTerm ||
      l.remarks.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.entityId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEntity = !selectedEntity || l.entityType === selectedEntity;
    const matchesRole = !selectedRole || l.actorRole === selectedRole;

    return matchesSearch && matchesEntity && matchesRole;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Timestamp', 'EntityType', 'EntityID', 'Action', 'ActorName', 'ActorRole', 'IP', 'Remarks'];
    const rows = filteredLogs.map(l => [
      l.id,
      l.timestamp,
      l.entityType,
      l.entityId,
      l.action,
      `"${l.actorName}"`,
      l.actorRole,
      l.ip,
      `"${(l.remarks || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TNU_Module3_Audit_Trail_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 tracking-wider">
                Pillar E
              </span>
              <span className="text-xs text-indigo-200">Statutory Governance & Compliance</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-black">Statutory Audit Trail & Version History</h2>
            <p className="text-xs lg:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Every evaluation, HOD online submission, VP sign-off, SLA auto-lock enforcement, quarterly review, ECM digital score, and management decision is time-stamped with actor name, role, IP address, and before/after state diffs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={loadAuditLogs}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs transition-colors cursor-pointer border border-slate-700"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center gap-3 text-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit trail by actor, action, remarks, entity ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <select
          value={selectedEntity}
          onChange={(e) => setSelectedEntity(e.target.value)}
          className="p-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-700 cursor-pointer"
        >
          <option value="">All Entity Types</option>
          <option value="GROUP_D_EVALUATION">Group-D Evaluations</option>
          <option value="GROUP_D_TEMPLATE">Group-D Templates</option>
          <option value="EMPLOYEE_GOAL_SETTING">General KRA Goals</option>
          <option value="QUARTERLY_REVIEW">Quarterly Reviews</option>
          <option value="FACULTY_ECM_APPRAISAL">Faculty ECM Appraisals</option>
          <option value="HR_CHANGE_REQUEST">Module I Change Requests</option>
          <option value="SYSTEM_TIME_MACHINE">Time Machine Events</option>
        </select>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-700 cursor-pointer"
        >
          <option value="">All Actor Roles</option>
          <option value="HOD">Head of Department (HOD)</option>
          <option value="VICE_PRESIDENT_ADMIN">VP – Administration</option>
          <option value="HR_ADMIN">HR Administrator</option>
          <option value="REGISTRAR">Registrar</option>
          <option value="FACULTY">Faculty Member</option>
          <option value="EMPLOYEE">General Employee</option>
          <option value="EVALUATION_COMMITTEE">Evaluation Committee</option>
          <option value="VICE_CHANCELLOR">Senior Management / VC</option>
          <option value="SYSTEM">Automated Scheduler Engine</option>
        </select>

        <div className="text-slate-500 font-semibold">
          Showing {filteredLogs.length} of {logs.length} events
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Event ID & Timestamp</th>
                <th className="py-3 px-4">Entity Type & ID</th>
                <th className="py-3 px-4">Action Executed</th>
                <th className="py-3 px-4">Actor & Role</th>
                <th className="py-3 px-4">Remarks & Audit Summary</th>
                <th className="py-3 px-4 text-right">State Diff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono">
                    <span className="font-bold text-slate-800">{log.id}</span>
                    <div className="text-[10px] text-slate-400 font-sans">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 font-mono">
                      {log.entityType}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">{log.entityId}</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {log.action}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{log.actorName}</div>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                      {log.actorRole}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 max-w-sm text-[11px] leading-relaxed">
                    {log.remarks}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setInspectLog(log)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Diff
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diff Inspector Modal */}
      {inspectLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Audit State Diff: {inspectLog.id}</h3>
              </div>
              <button onClick={() => setInspectLog(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1">
              <div><strong>Action:</strong> {inspectLog.action}</div>
              <div><strong>Actor:</strong> {inspectLog.actorName} ({inspectLog.actorRole}) • IP: {inspectLog.ip}</div>
              <div><strong>Timestamp:</strong> {new Date(inspectLog.timestamp).toISOString()}</div>
              <div><strong>Remarks:</strong> {inspectLog.remarks}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="font-bold text-slate-700 font-sans block mb-1">Previous State:</span>
                <pre className="p-3 bg-slate-100 rounded-lg max-h-48 overflow-y-auto text-[11px] text-slate-700 whitespace-pre-wrap">
                  {inspectLog.previousState ? JSON.stringify(inspectLog.previousState, null, 2) : 'null (Fresh Creation)'}
                </pre>
              </div>
              <div>
                <span className="font-bold text-emerald-800 font-sans block mb-1">New State:</span>
                <pre className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg max-h-48 overflow-y-auto text-[11px] text-emerald-900 whitespace-pre-wrap">
                  {inspectLog.newState ? JSON.stringify(inspectLog.newState, null, 2) : 'null'}
                </pre>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectLog(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
