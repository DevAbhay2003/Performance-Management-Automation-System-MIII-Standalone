import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, CheckCircle2, Clock, DollarSign, Folder, RefreshCw, ShieldAlert, Award } from 'lucide-react';
import { api } from '../services/api';
import { hasPermission } from '../services/rbac';

export default function TrackGCentralEmployeeDB({ currentUser, onSelectEmployeeDossier }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await api.getEmployees();
      setEmployees(data || []);
    } catch (err) {
      console.error('Failed to load employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleProbation = async (emp) => {
    if (!hasPermission(currentUser, 'canToggleProbation')) {
      setActionError('Institutional Hierarchy Restriction: Only Head - Human Resources, Vice-Chancellor, or Developer can update employee statutory probation status.');
      return;
    }
    const newStatus = emp.probationStatus === 'COMPLETED' ? 'IN_PROBATION' : 'COMPLETED';
    try {
      setActionError('');
      await api.updateProbation(emp.id, newStatus, currentUser.name);
      setActionSuccess(`Updated probation status for ${emp.name} to ${newStatus}!`);
      await loadEmployees();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const filtered = employees.filter(e => {
    const matchesSearch = !searchTerm ||
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.empCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.designation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !categoryFilter || e.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-purple-800/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-purple-400 text-purple-950 tracking-wider">
                Pillar G
              </span>
              <span className="text-xs text-purple-200">Central Employee Master Database (Module I Foundation)</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-black">Central Employee Database & Hierarchy</h2>
            <p className="text-xs lg:text-sm text-purple-100/90 mt-1 max-w-3xl leading-relaxed">
              Maintains official employee records, Date of Joining (DOJ), department structure, reporting relationships, current CTC, and statutory probation clearance. Use the interactive probation toggle to test workflow validation gates in real time!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadEmployees}
              className="p-2 bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white rounded-xl text-xs transition-colors cursor-pointer border border-purple-700/60"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess('')} className="text-emerald-700 font-bold text-xs cursor-pointer">Dismiss</button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center gap-3 text-xs">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, code, designation, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-700 cursor-pointer"
        >
          <option value="">All Categories ({employees.length})</option>
          <option value="GROUP_D">Group-D / Band I Staff</option>
          <option value="STAFF">General Non-Faculty Staff</option>
          <option value="FACULTY">Faculty Members</option>
          <option value="MANAGEMENT">University Leadership / Deans</option>
        </select>

        <div className="text-slate-500 font-semibold">
          Showing {filtered.length} employees
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(emp => {
          const isProbationCompleted = emp.probationStatus === 'COMPLETED';
          return (
            <div key={emp.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-slate-600">{emp.empCode}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    emp.category === 'GROUP_D' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                    emp.category === 'FACULTY' ? 'bg-indigo-100 text-indigo-900 border border-indigo-200' :
                    emp.category === 'STAFF' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' :
                    'bg-purple-100 text-purple-900 border border-purple-200'
                  }`}>
                    {emp.category}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-base">{emp.name}</h4>
                <p className="text-xs text-slate-600 mb-3">{emp.designation}</p>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1 mb-3">
                  <div><strong className="text-slate-700">Department:</strong> {emp.department}</div>
                  <div><strong className="text-slate-700">Date of Joining:</strong> {emp.doj}</div>
                  <div><strong className="text-slate-700">Reporting To:</strong> {emp.reportingAuthorityName || 'Executive Directorate'}</div>
                  <div><strong className="text-slate-700">Current CTC:</strong> <span className="font-bold text-emerald-800">₹{emp.salary?.toLocaleString()}/mo</span></div>
                </div>

                {/* Probation Toggle Card */}
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Probation Status</span>
                    <span className={`text-xs font-bold ${isProbationCompleted ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {emp.probationStatus}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleProbation(emp)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer border ${
                      isProbationCompleted
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                    }`}
                    title="Click to toggle probation status to test validation rules"
                  >
                    Toggle: {isProbationCompleted ? 'Mark IN_PROBATION' : 'Mark COMPLETED'}
                  </button>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onSelectEmployeeDossier(emp.id)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Folder className="w-3.5 h-3.5 text-blue-600" />
                  <span>View Digital File</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
