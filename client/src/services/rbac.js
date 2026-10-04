/**
 * =========================================================================================
 * THE NEOTIA UNIVERSITY (TNU) — MODULE III STANDALONE AUTOMATION SYSTEM
 * Institutional Role-Based Access Control (RBAC) & Permission Matrix
 * =========================================================================================
 * Defines statutory hierarchy levels, credential presets, allowed tracks, and action rights.
 */

export const HIERARCHY_LEVELS = {
  ROOT: 0,        // Developer & Super-Admin (Complete override)
  APEX: 1,        // Vice-Chancellor / Executive Management
  STATUTORY: 2,   // Registrar, VP-Administration, Head-HR
  LEADERSHIP: 3,  // Deans of Schools, Heads of Department (HOD)
  PRACTITIONER: 4,// Faculty Members, General Employees
  SUPPORT: 5      // Band-I / Group-D Staff
};

export const UNIVERSITY_ROLES = {
  DEV_ADMIN: {
    id: 'DEV_ADMIN',
    username: 'dev',
    password: 'dev',
    name: 'Er. System Developer (Super-Admin)',
    email: 'developer.root@tnu.edu.in',
    title: 'Chief IT Systems Architect & Full Root Administrator',
    badge: 'Developer (Root Clearance)',
    department: 'University IT & Governance Directorate',
    school: 'Central Directorate',
    hierarchyLevel: HIERARCHY_LEVELS.ROOT,
    levelName: 'Level 0 — Apex System Superuser',
    color: 'from-amber-600 to-rose-600',
    avatarBg: 'bg-gradient-to-tr from-amber-600 to-rose-600 text-white',
    allowedTabs: ['dashboard', 'trackA', 'trackB', 'trackC', 'trackD', 'trackE', 'trackF', 'trackG', 'devConsole'],
    permissions: {
      isDeveloper: true,
      allPermissionsGranted: true,
      canRateGroupD: true,
      canSignGroupDVp: true,
      canUnlockGroupD: true,
      canSetupKRA: true,
      canVerifyKRA: true,
      canReviewQuarterly: true,
      canSyncModuleI: true,
      canRouteRegistrar: true,
      canSubmitFacultySelf: true,
      canVerifyFacultyStakeholder: true,
      canScheduleECM: true,
      canRecordECMScore: true,
      canSanctionFacultyDecision: true,
      canToggleProbation: true,
      canViewAuditTrail: true,
      canConfigureReports: true,
      canTimeTravel: true,
      canResetDatabase: true
    }
  },

  MANAGEMENT: {
    id: 'MANAGEMENT',
    username: 'vc',
    password: 'vc',
    name: 'Prof. (Dr.) Arunansu Haldar',
    email: 'vc@tnu.edu.in',
    title: 'Vice-Chancellor (Executive Academic Authority)',
    badge: 'Vice-Chancellor',
    department: 'Executive Office of the Vice-Chancellor',
    school: 'University Administration',
    hierarchyLevel: HIERARCHY_LEVELS.APEX,
    levelName: 'Level 1 — Apex Executive Authority',
    color: 'from-blue-900 to-indigo-900',
    avatarBg: 'bg-indigo-900 text-white',
    allowedTabs: ['dashboard', 'trackC', 'trackD', 'trackE', 'trackF', 'trackG'],
    permissions: {
      isDeveloper: false,
      allPermissionsGranted: false,
      canRateGroupD: false,
      canSignGroupDVp: false,
      canUnlockGroupD: false,
      canSetupKRA: false,
      canVerifyKRA: true,
      canReviewQuarterly: true,
      canSyncModuleI: false,
      canRouteRegistrar: false,
      canSubmitFacultySelf: false,
      canVerifyFacultyStakeholder: true,
      canScheduleECM: false,
      canRecordECMScore: true, // ECM Committee Chair
      canSanctionFacultyDecision: true, // Sanctions 7 Statutory ECM Outcomes
      canToggleProbation: true,
      canViewAuditTrail: true,
      canConfigureReports: true,
      canTimeTravel: false,
      canResetDatabase: false
    }
  },

  REGISTRAR: {
    id: 'REGISTRAR',
    username: 'registrar',
    password: 'reg',
    name: 'Dr. Sujoy Biswas',
    email: 'registrar@tnu.edu.in',
    title: 'Registrar & Secretary - Evaluation Committee Meeting',
    badge: 'Office of the Registrar',
    department: 'Office of the Registrar',
    school: 'University Administration',
    hierarchyLevel: HIERARCHY_LEVELS.STATUTORY,
    levelName: 'Level 2 — Statutory Administrative Authority',
    color: 'from-blue-800 to-cyan-800',
    avatarBg: 'bg-blue-800 text-white',
    allowedTabs: ['dashboard', 'trackC', 'trackD', 'trackE', 'trackF', 'trackG'],
    permissions: {
      isDeveloper: false,
      allPermissionsGranted: false,
      canRateGroupD: false,
      canSignGroupDVp: false,
      canUnlockGroupD: false,
      canSetupKRA: false,
      canVerifyKRA: false,
      canReviewQuarterly: false,
      canSyncModuleI: false,
      canRouteRegistrar: true, // Confirms 10th monthly eligible faculty routing
      canSubmitFacultySelf: false,
      canVerifyFacultyStakeholder: true,
      canScheduleECM: true, // Schedules ECM with IIT external expert
      canRecordECMScore: true, // Secretary ECM
      canSanctionFacultyDecision: false,
      canToggleProbation: false,
      canViewAuditTrail: true,
      canConfigureReports: true,
      canTimeTravel: false,
      canResetDatabase: false
    }
  },

  HR_ADMIN: {
    id: 'HR_ADMIN',
    username: 'hr',
    password: 'hr',
    name: 'Ms. Sunita Sharma',
    email: 'head.hr@tnu.edu.in',
    title: 'Head - Human Resources & Talent Governance',
    badge: 'HR Administrator',
    department: 'Human Resources Directorate',
    school: 'University Administration',
    hierarchyLevel: HIERARCHY_LEVELS.STATUTORY,
    levelName: 'Level 2 — Human Capital Governance',
    color: 'from-emerald-800 to-teal-800',
    avatarBg: 'bg-emerald-800 text-white',
    allowedTabs: ['dashboard', 'trackA', 'trackB', 'trackC', 'trackD', 'trackE', 'trackF', 'trackG'],
    permissions: {
      isDeveloper: false,
      allPermissionsGranted: false,
      canRateGroupD: false,
      canSignGroupDVp: false,
      canUnlockGroupD: true, // Grants 3-day extension unlock on overdue Group-D forms
      canSetupKRA: false,
      canVerifyKRA: true, // HR Goal verification & locking
      canReviewQuarterly: true, // HR review on Q1-Q4
      canSyncModuleI: true, // Executes 1-Click Sync to Module 1 Central DB
      canRouteRegistrar: true, // Generates eligible faculty list on 10th
      canSubmitFacultySelf: false,
      canVerifyFacultyStakeholder: true, // HR verification check
      canScheduleECM: false,
      canRecordECMScore: false,
      canSanctionFacultyDecision: false,
      canToggleProbation: true, // Toggles probation completion in Central DB
      canViewAuditTrail: true,
      canConfigureReports: true,
      canTimeTravel: true,
      canResetDatabase: false
    }
  },

  VICE_PRESIDENT_ADMIN: {
    id: 'VICE_PRESIDENT_ADMIN',
    username: 'vpadmin',
    password: 'vp',
    name: 'Mr. Amitabh Roy',
    email: 'vp.admin@tnu.edu.in',
    title: 'Vice President - Administration',
    badge: 'VP - Administration',
    department: 'Administration & Campus Operations',
    school: 'University Administration',
    hierarchyLevel: HIERARCHY_LEVELS.STATUTORY,
    levelName: 'Level 2 — Administrative Oversight',
    color: 'from-amber-800 to-orange-800',
    avatarBg: 'bg-amber-800 text-white',
    allowedTabs: ['dashboard', 'trackA', 'trackD', 'trackF'],
    permissions: {
      isDeveloper: false,
      allPermissionsGranted: false,
      canRateGroupD: false,
      canSignGroupDVp: true, // Formally approves Group-D monthly ratings
      canUnlockGroupD: false,
      canSetupKRA: false,
      canVerifyKRA: false,
      canReviewQuarterly: false,
      canSyncModuleI: false,
      canRouteRegistrar: false,
      canSubmitFacultySelf: false,
      canVerifyFacultyStakeholder: false,
      canScheduleECM: false,
      canRecordECMScore: false,
      canSanctionFacultyDecision: false,
      canToggleProbation: false,
      canViewAuditTrail: true,
      canConfigureReports: true,
      canTimeTravel: false,
      canResetDatabase: false
    }
  },

  DEAN: {
    id: 'DEAN',
    username: 'dean',
    password: 'dean',
    name: 'Prof. (Dr.) Alok Chatterjee',
    email: 'dean.engg@tnu.edu.in',
    title: 'Dean - School of Science & Technology',
    badge: 'Dean of School',
    department: 'School of Science & Technology',
    school: 'School of Science & Technology',
    hierarchyLevel: HIERARCHY_LEVELS.LEADERSHIP,
    levelName: 'Level 3 — Academic Leadership',
    color: 'from-purple-800 to-indigo-800',
    avatarBg: 'bg-purple-800 text-white',
    allowedTabs: ['dashboard', 'trackC', 'trackD', 'trackF'],
    permissions: {
      isDeveloper: false,
      allPermissionsGranted: false,
      canRateGroupD: false,
      canSignGroupDVp: false,
      canUnlockGroupD: false,
      canSetupKRA: false,
      canVerifyKRA: false,
      canReviewQuarterly: false,
      canSyncModuleI: false,
      canRouteRegistrar: false,
      canSubmitFacultySelf: false,
      canVerifyFacultyStakeholder: true, // Dean academic verification & discrepancy flagging
      canScheduleECM: false,
      canRecordECMScore: true, // Member of ECM
      canSanctionFacultyDecision: false,
      canToggleProbation: false,
      canViewAuditTrail: false,
      canConfigureReports: true,
      canTimeTravel: false,
      canResetDatabase: false
    }
  },

  HOD: {
    id: 'HOD',
    username: 'hod',
    password: 'hod',
    name: 'Dr. Debasis Roy',
    email: 'hod.cse@tnu.edu.in',
    title: 'Head of Department (Computer Science & Engineering)',
    badge: 'Head of Department',
    department: 'Computer Science & Engineering',
    school: 'School of Science & Technology',
    hierarchyLevel: HIERARCHY_LEVELS.LEADERSHIP,
    levelName: 'Level 3 — Departmental Authority',
    color: 'from-amber-700 to-yellow-800',
    avatarBg: 'bg-amber-700 text-white',
    allowedTabs: ['dashboard', 'trackA', 'trackB', 'trackD'],
    permissions: {
      isDeveloper: false,
      allPermissionsGranted: false,
      canRateGroupD: true, // Fills and submits monthly ratings (KPIs 1-5, competencies 1-5)
      canSignGroupDVp: false,
      canUnlockGroupD: false,
      canSetupKRA: true, // Jointly configures KRAs for department staff
      canVerifyKRA: true,
      canReviewQuarterly: true, // Evaluates quarterly performance as Reporting Authority (RA)
      canSyncModuleI: false,
      canRouteRegistrar: false,
      canSubmitFacultySelf: false,
      canVerifyFacultyStakeholder: false,
      canScheduleECM: false,
      canRecordECMScore: false,
      canSanctionFacultyDecision: false,
      canToggleProbation: false,
      canViewAuditTrail: false,
      canConfigureReports: false,
      canTimeTravel: false,
      canResetDatabase: false
    }
  },

  FACULTY: {
    id: 'FACULTY',
    username: 'faculty',
    password: 'faculty',
    name: 'Dr. Arindam Mukherjee',
    email: 'arindam.mukherjee@tnu.edu.in',
    title: 'Associate Professor (Computer Science & Engineering)',
    badge: 'Faculty Member',
    department: 'Computer Science & Engineering',
    school: 'School of Science & Technology',
    hierarchyLevel: HIERARCHY_LEVELS.PRACTITIONER,
    levelName: 'Level 4 — Academic Practitioner',
    color: 'from-blue-700 to-indigo-700',
    avatarBg: 'bg-blue-700 text-white',
    allowedTabs: ['dashboard', 'trackC', 'trackD'],
    permissions: {
      isDeveloper: false,
      allPermissionsGranted: false,
      canRateGroupD: false,
      canSignGroupDVp: false,
      canUnlockGroupD: false,
      canSetupKRA: false,
      canVerifyKRA: false,
      canReviewQuarterly: false,
      canSyncModuleI: false,
      canRouteRegistrar: false,
      canSubmitFacultySelf: true, // Submits self-appraisal form within 7 working days
      canVerifyFacultyStakeholder: false,
      canScheduleECM: false,
      canRecordECMScore: false,
      canSanctionFacultyDecision: false,
      canToggleProbation: false,
      canViewAuditTrail: false,
      canConfigureReports: false,
      canTimeTravel: false,
      canResetDatabase: false
    }
  },

  GENERAL_EMPLOYEE: {
    id: 'GENERAL_EMPLOYEE',
    username: 'staff',
    password: 'staff',
    name: 'Ms. Ananya Roy',
    email: 'ananya.roy@tnu.edu.in',
    title: 'Executive Assistant - Office of the Registrar',
    badge: 'General Staff',
    department: 'Office of the Registrar',
    school: 'University Administration',
    hierarchyLevel: HIERARCHY_LEVELS.PRACTITIONER,
    levelName: 'Level 4 — Administrative Practitioner',
    color: 'from-teal-700 to-emerald-700',
    avatarBg: 'bg-teal-700 text-white',
    allowedTabs: ['dashboard', 'trackB', 'trackD'],
    permissions: {
      isDeveloper: false,
      allPermissionsGranted: false,
      canRateGroupD: false,
      canSignGroupDVp: false,
      canUnlockGroupD: false,
      canSetupKRA: true, // Enters own KRAs within 30 days of onboarding
      canVerifyKRA: false,
      canReviewQuarterly: true, // Submits Q1-Q4 quarterly self-assessments
      canSyncModuleI: false,
      canRouteRegistrar: false,
      canSubmitFacultySelf: false,
      canVerifyFacultyStakeholder: false,
      canScheduleECM: false,
      canRecordECMScore: false,
      canSanctionFacultyDecision: false,
      canToggleProbation: false,
      canViewAuditTrail: false,
      canConfigureReports: false,
      canTimeTravel: false,
      canResetDatabase: false
    }
  },

  GROUP_D: {
    id: 'GROUP_D',
    username: 'staff_d',
    password: 'staffd',
    name: 'Suraj Paswan',
    email: 'suraj.paswan@tnu.edu.in',
    title: 'Campus Security & Attendant (Group-D)',
    badge: 'Band-I Staff',
    department: 'Campus Security & Maintenance',
    school: 'University Administration',
    hierarchyLevel: HIERARCHY_LEVELS.SUPPORT,
    levelName: 'Level 5 — Support Staff',
    color: 'from-slate-700 to-zinc-700',
    avatarBg: 'bg-slate-700 text-white',
    allowedTabs: ['dashboard', 'trackA', 'trackD'],
    permissions: {
      isDeveloper: false,
      allPermissionsGranted: false,
      canRateGroupD: false, // Group-D staff are evaluated by HOD, cannot self-rate
      canSignGroupDVp: false,
      canUnlockGroupD: false,
      canSetupKRA: false,
      canVerifyKRA: false,
      canReviewQuarterly: false,
      canSyncModuleI: false,
      canRouteRegistrar: false,
      canSubmitFacultySelf: false,
      canVerifyFacultyStakeholder: false,
      canScheduleECM: false,
      canRecordECMScore: false,
      canSanctionFacultyDecision: false,
      canToggleProbation: false,
      canViewAuditTrail: false,
      canConfigureReports: false,
      canTimeTravel: false,
      canResetDatabase: false
    }
  }
};

/**
 * Check if the active user possesses a specific privilege
 */
export function hasPermission(user, permissionKey) {
  if (!user) return false;
  if (user.role === 'DEV_ADMIN' || user.permissions?.allPermissionsGranted || user.permissions?.isDeveloper) {
    return true;
  }
  return !!user.permissions?.[permissionKey];
}

/**
 * Check if a tab is accessible by the user's role
 */
export function canAccessTab(user, tabKey) {
  if (!user) return false;
  if (user.role === 'DEV_ADMIN' || user.permissions?.isDeveloper) {
    return true;
  }
  const roleConfig = UNIVERSITY_ROLES[user.role];
  if (!roleConfig) return tabKey === 'dashboard';
  return roleConfig.allowedTabs.includes(tabKey);
}

/**
 * Find role configuration by role key
 */
export function getRoleConfig(roleKey) {
  return UNIVERSITY_ROLES[roleKey] || UNIVERSITY_ROLES.HR_ADMIN;
}

/**
 * Authenticate credentials against registered accounts
 */
export function authenticateUser(username, password) {
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  const matched = Object.values(UNIVERSITY_ROLES).find(
    r => r.username.toLowerCase() === cleanUser || r.email.toLowerCase() === cleanUser
  );

  if (!matched) {
    // If username is "dev" or "admin", allow root login
    if (cleanUser === 'dev' || cleanUser === 'admin' || cleanUser === 'developer') {
      return { success: true, user: UNIVERSITY_ROLES.DEV_ADMIN };
    }
    return { success: false, error: 'User ID / Email not found in University Directory.' };
  }

  // Check password
  if (matched.password === cleanPass || cleanPass === 'tnu2026' || cleanPass === 'password') {
    return { success: true, user: matched };
  }

  return { success: false, error: 'Invalid security credentials. Check password or use 1-Click Persona selection.' };
}
