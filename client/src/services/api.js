/**
 * API Service Client for Module III Standalone Performance Management Automation
 */

const BASE_URL = '/api';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  const config = {
    ...options,
    headers
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || `HTTP error ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // System Health & Time Machine
  getHealth: () => request('/health'),
  getStats: () => request('/system/stats'),
  getTime: () => request('/system/time'),
  advanceTime: (days, newDate, actorName) => request('/system/time/advance', {
    method: 'POST',
    body: JSON.stringify({ days, newDate, actorName })
  }),
  runScheduler: () => request('/system/run-scheduler', { method: 'POST' }),
  
  // Notifications
  getNotifications: () => request('/notifications'),
  markNotificationRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' }),

  // Central Employees & Dossier
  getEmployees: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/employees${q ? `?${q}` : ''}`);
  },
  getEmployee: (id) => request(`/employees/${id}`),
  updateProbation: (id, probationStatus, actorName) => request(`/employees/${id}/probation`, {
    method: 'PUT',
    body: JSON.stringify({ probationStatus, actorName })
  }),
  getEmployeeDossier: (id) => request(`/employees/${id}/dossier`),

  // Track A: Group-D / Band I
  getGroupDTemplates: () => request('/performance/group-d/templates'),
  createGroupDTemplate: (data) => request('/performance/group-d/templates', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getGroupDEvaluations: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/performance/group-d/evaluations${q ? `?${q}` : ''}`);
  },
  initiateGroupDCycle: (data) => request('/performance/group-d/evaluations/initiate-cycle', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  submitGroupDEvaluation: (id, data) => request(`/performance/group-d/evaluations/${id}/submit`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  vpApproveGroupDEvaluation: (id, data) => request(`/performance/group-d/evaluations/${id}/vp-approve`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  unlockGroupDEvaluation: (id, data) => request(`/performance/group-d/evaluations/${id}/unlock`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getGroupDMonthlyReport: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/performance/group-d/reports/monthly${q ? `?${q}` : ''}`);
  },
  getGroupDAnnualReports: () => request('/performance/group-d/reports/annual'),
  submitGroupDCompensationReview: (data) => request('/performance/group-d/compensation-review', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Track B: General Employees Non-Faculty
  getGeneralGoals: () => request('/performance/general/goals'),
  submitGeneralGoals: (data) => request('/performance/general/goals', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  verifyGeneralGoals: (id, data) => request(`/performance/general/goals/${id}/verify`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  getQuarterlyReviews: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/performance/general/quarterly${q ? `?${q}` : ''}`);
  },
  submitQuarterlyReview: (id, data) => request(`/performance/general/quarterly/${id}/submit`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  raVerifyQuarterly: (id, data) => request(`/performance/general/quarterly/${id}/ra-verify`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  hrReviewQuarterly: (id, data) => request(`/performance/general/quarterly/${id}/hr-review`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  mgmtReviewQuarterly: (id, data) => request(`/performance/general/quarterly/${id}/mgmt-review`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  getGeneralAnnualAppraisals: () => request('/performance/general/annual-appraisal'),
  generateGeneralAnnualAppraisal: (data) => request('/performance/general/annual-appraisal/generate', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  syncToModuleI: (data) => request('/performance/general/sync-to-module-1', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Track C: Faculty Members ECM
  getFacultyEligibility: () => request('/performance/faculty/eligibility'),
  routeEligibleFacultyToRegistrar: (data) => request('/performance/faculty/route-to-registrar', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getFacultyAppraisals: () => request('/performance/faculty/appraisals'),
  issueFacultySelfAppraisal: (data) => request('/performance/faculty/issue-self-appraisal', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  submitFacultySelfAppraisal: (id, data) => request(`/performance/faculty/appraisals/${id}/submit`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  verifyFacultyStakeholder: (id, data) => request(`/performance/faculty/appraisals/${id}/verify`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  resubmitFacultyDiscrepancy: (id, data) => request(`/performance/faculty/appraisals/${id}/resubmit`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  scheduleFacultyEcm: (data) => request('/performance/faculty/schedule-ecm', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  recordFacultyEcmScore: (data) => request('/performance/faculty/ecm-score', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  submitFacultyMgmtDecision: (data) => request('/performance/faculty/mgmt-decision', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getFacultyLetter: (ref) => request(`/performance/faculty/letters/${encodeURIComponent(ref)}`),

  // Track E & F: Audit & Reports
  getAuditTrail: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/audit-trail${q ? `?${q}` : ''}`);
  },
  getReport: (type) => request(`/reports/${type}`)
};
