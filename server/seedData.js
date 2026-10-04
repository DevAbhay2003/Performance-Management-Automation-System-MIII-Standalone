/**
 * =========================================================================================
 * THE NEOTIA UNIVERSITY (TNU) — MODULE III STANDALONE AUTOMATION SYSTEM
 * Performance Management System (Complete Workflow Data & Initial Records)
 * 
 * Compliant with:
 * - WhatsApp Workflow Architecture (Sheet 2 / Complete Workflow)
 * - Module III Requirement Brief (Group-D Monthly SOP, General KRA/KPI Quarters, Faculty ECM)
 * =========================================================================================
 */

const initialData = {
  systemSettings: {
    universityName: "The Neotia University",
    portalTitle: "Module 3 — Performance Management Automation System",
    academicYear: "2026-2027",
    currentSimulatedDate: "2026-10-04T09:00:00.000Z",
    groupDDueDay: 7,
    groupDGracePeriodDueDay: 10,
    facultyRegistrarRoutingDay: 10,
    facultySelfAppraisalWorkingDays: 7,
    generalEmployeeGoalSettingDays: 30,
    quarterReviewReminderDays: 20,
    quarterReviewSubmissionDays: 15,
    compensationSlabsGroupD: [
      { minScore: 90, grade: "Slab A+ (Score >= 90%)", incrementPct: 12, label: "Outstanding Performance - Merit Increment" },
      { minScore: 80, grade: "Slab A (Score 80-89%)", incrementPct: 10, label: "Very Good Performance - Standard Merit" },
      { minScore: 70, grade: "Slab B (Score 70-79%)", incrementPct: 7, label: "Good Performance - Regular Increment" },
      { minScore: 55, grade: "Slab C (Score 55-69%)", incrementPct: 4, label: "Satisfactory Performance - Minimal Revision" },
      { minScore: 0, grade: "Slab D (Score < 55%)", incrementPct: 0, label: "Unsatisfactory - Warning / PIP (No Increment)" }
    ]
  },

  // Central Employee Database (Standalone Module I Foundation)
  employees: [
    {
      id: "DEV-001",
      empCode: "TNU-DEV-ROOT",
      name: "Er. System Developer (Super-Admin)",
      email: "developer.root@tnu.edu.in",
      phone: "+91 99999 00000",
      role: "DEV_ADMIN",
      category: "SUPERADMIN",
      designation: "Chief IT Systems Architect & Root Administrator",
      level: "Level 0 (Root)",
      department: "University IT & Digital Governance Directorate",
      school: "Central Directorate",
      location: "Sarisa Campus & Topsia City Office",
      reportingAuthorityId: null,
      reportingAuthorityName: "Executive Governing Council",
      salary: 300000,
      doj: "2020-01-01",
      probationStatus: "COMPLETED",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Super-Administrator Security Clearance Docket", date: "2020-01-01", type: "OFFICIAL_ORDER" }
      ]
    },
    // Senior Management & University Leadership
    {
      id: "EMP-001",
      empCode: "TNU-MGMT-001",
      name: "Prof. (Dr.) Arunansu Haldar",
      email: "vc@tnu.edu.in",
      phone: "+91 98300 11001",
      role: "SENIOR_MANAGEMENT",
      category: "MANAGEMENT",
      designation: "Vice-Chancellor",
      level: "L-16 (Apex)",
      department: "Executive Office",
      school: "University Administration",
      location: "Sarisa Campus, Diamond Harbour Road, 24 Pgs (S) - 743368",
      reportingAuthorityId: null,
      reportingAuthorityName: "Shri Harshavardhan Neotia (Chancellor & Chairman, Ambuja Neotia Group)",
      salary: 285000,
      doj: "2021-06-01",
      probationStatus: "COMPLETED",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Statutory Appointment & Service Order", date: "2021-06-01", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-002",
      empCode: "TNU-MGMT-002",
      name: "Mr. Amitabh Roy",
      email: "vp.admin@tnu.edu.in",
      phone: "+91 98300 11002",
      role: "VICE_PRESIDENT_ADMIN",
      category: "MANAGEMENT",
      designation: "Vice President - Administration",
      level: "L-15",
      department: "Administration",
      school: "University Administration",
      location: "Sarisa Campus, Diamond Harbour Road, 24 Pgs (S) - 743368",
      reportingAuthorityId: "EMP-001",
      reportingAuthorityName: "Prof. (Dr.) Arunansu Haldar",
      salary: 225000,
      doj: "2022-02-01",
      probationStatus: "COMPLETED",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Administrative Directorate Order", date: "2022-02-01", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-003",
      empCode: "TNU-ADMIN-001",
      name: "Dr. Sujoy Biswas",
      email: "registrar@tnu.edu.in",
      phone: "+91 98300 11003",
      role: "REGISTRAR",
      category: "MANAGEMENT",
      designation: "Registrar",
      level: "L-14",
      department: "Office of the Registrar",
      school: "University Administration",
      location: "Sarisa Campus, Diamond Harbour Road, 24 Pgs (S) - 743368",
      reportingAuthorityId: "EMP-001",
      reportingAuthorityName: "Prof. (Dr.) Arunansu Haldar",
      salary: 195000,
      doj: "2022-04-15",
      probationStatus: "COMPLETED",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Registrar Appointment Docket", date: "2022-04-15", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-004",
      empCode: "TNU-HR-001",
      name: "Ms. Sunita Sharma",
      email: "head.hr@tnu.edu.in",
      phone: "+91 98300 11004",
      role: "HR_ADMIN",
      category: "STAFF",
      designation: "Head - Human Resources",
      level: "L-13",
      department: "Human Resources",
      school: "University Administration",
      location: "Sarisa Campus, Diamond Harbour Road, 24 Pgs (S) - 743368",
      reportingAuthorityId: "EMP-002",
      reportingAuthorityName: "Mr. Amitabh Roy",
      salary: 165000,
      doj: "2022-08-01",
      probationStatus: "COMPLETED",
      status: "ACTIVE",
      digitalDossier: [
        { title: "HR Head Appointment Docket", date: "2022-08-01", type: "OFFICIAL_ORDER" }
      ]
    },

    // Deans & Academic HODs
    {
      id: "EMP-005",
      empCode: "TNU-ACAD-001",
      name: "Prof. (Dr.) Alok Chatterjee",
      email: "dean.engg@tnu.edu.in",
      phone: "+91 98300 11005",
      role: "HOD",
      category: "FACULTY",
      designation: "Dean & Professor - School of Engineering & Technology",
      level: "L-15",
      department: "Computer Science & Engineering",
      school: "School of Engineering & Technology",
      location: "Sarisa Campus, Diamond Harbour Road, 24 Pgs (S) - 743368",
      reportingAuthorityId: "EMP-001",
      reportingAuthorityName: "Prof. (Dr.) Arunansu Haldar",
      salary: 210000,
      doj: "2020-03-01",
      probationStatus: "COMPLETED",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Deanship Sanction Order", date: "2020-03-01", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-006",
      empCode: "TNU-ACAD-002",
      name: "Dr. Debasis Roy",
      email: "hod.cse@tnu.edu.in",
      phone: "+91 98300 11006",
      role: "HOD",
      category: "FACULTY",
      designation: "Head of Department (CSE)",
      level: "L-13A",
      department: "Computer Science & Engineering",
      school: "School of Engineering & Technology",
      location: "Sarisa Campus, Diamond Harbour Road, 24 Pgs (S) - 743368",
      reportingAuthorityId: "EMP-005",
      reportingAuthorityName: "Prof. (Dr.) Alok Chatterjee",
      salary: 155000,
      doj: "2022-07-01",
      probationStatus: "COMPLETED",
      status: "ACTIVE",
      digitalDossier: [
        { title: "HOD Appointment Order", date: "2022-07-01", type: "OFFICIAL_ORDER" }
      ]
    },

    // TRACK A: GROUP-D / BAND I EMPLOYEES
    {
      id: "EMP-G01",
      empCode: "TNU-GRPD-001",
      name: "Mr. Ramesh Kumar",
      email: "ramesh.kumar@staff.tnu.edu.in",
      phone: "+91 98300 22001",
      role: "GROUP_D",
      category: "GROUP_D",
      designation: "Senior Office Attendant",
      level: "Band-I (L-1)",
      department: "Administration",
      school: "University Administration",
      location: "Main Campus, Admin Block",
      reportingAuthorityId: "EMP-002",
      reportingAuthorityName: "Mr. Amitabh Roy (VP - Administration)",
      salary: 18000,
      doj: "2025-08-15",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2026-02-14",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Appointment Order - Office Attendant", date: "2025-08-15", type: "OFFICIAL_ORDER" },
        { title: "Probation Clearance Certificate", date: "2026-02-15", type: "CONFIRMATION" }
      ]
    },
    {
      id: "EMP-G02",
      empCode: "TNU-GRPD-002",
      name: "Mr. Bikash Mondal",
      email: "bikash.mondal@staff.tnu.edu.in",
      phone: "+91 98300 22002",
      role: "GROUP_D",
      category: "GROUP_D",
      designation: "Laboratory Bearer / Attendant",
      level: "Band-I (L-2)",
      department: "Computer Science & Engineering",
      school: "School of Engineering & Technology",
      location: "Main Campus, Tech Block B",
      reportingAuthorityId: "EMP-006",
      reportingAuthorityName: "Dr. Debasis Roy (HOD - CSE)",
      salary: 19500,
      doj: "2025-09-01",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2026-03-01",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Appointment Order - Lab Attendant", date: "2025-09-01", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-G03",
      empCode: "TNU-GRPD-003",
      name: "Mr. Suraj Paswan",
      email: "suraj.paswan@staff.tnu.edu.in",
      phone: "+91 98300 22003",
      role: "GROUP_D",
      category: "GROUP_D",
      designation: "Campus Security Guard",
      level: "Band-I (L-1)",
      department: "Campus Security",
      school: "University Administration",
      location: "Main Campus, Main Gate Post",
      reportingAuthorityId: "EMP-002",
      reportingAuthorityName: "Mr. Amitabh Roy (VP - Administration)",
      salary: 16000,
      doj: "2026-03-01",
      probationStatus: "IN_PROBATION", // Demonstrates probation validation!
      probationCompletedDate: null,
      status: "ACTIVE",
      digitalDossier: [
        { title: "Security Guard Appointment Letter", date: "2026-03-01", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-G04",
      empCode: "TNU-GRPD-004",
      name: "Mr. Gopal Das",
      email: "gopal.das@staff.tnu.edu.in",
      phone: "+91 98300 22004",
      role: "GROUP_D",
      category: "GROUP_D",
      designation: "Heavy Vehicle Driver (Campus Bus Fleet)",
      level: "Band-I (L-3)",
      department: "Transport Services",
      school: "University Administration",
      location: "Main Campus, Garage & Logistics",
      reportingAuthorityId: "EMP-002",
      reportingAuthorityName: "Mr. Amitabh Roy (VP - Administration)",
      salary: 22000,
      doj: "2024-10-10",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2025-04-10",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Commercial Driver Appointment Letter", date: "2024-10-10", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-G05",
      empCode: "TNU-GRPD-005",
      name: "Ms. Mina Rani",
      email: "mina.rani@staff.tnu.edu.in",
      phone: "+91 98300 22005",
      role: "GROUP_D",
      category: "GROUP_D",
      designation: "Housekeeping & Facilities Assistant",
      level: "Band-I (L-1)",
      department: "Facilities & Estate",
      school: "University Administration",
      location: "Main Campus, Academic Complex",
      reportingAuthorityId: "EMP-002",
      reportingAuthorityName: "Mr. Amitabh Roy (VP - Administration)",
      salary: 17500,
      doj: "2025-06-20",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2025-12-20",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Housekeeping Appointment Letter", date: "2025-06-20", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-G06",
      empCode: "TNU-GRPD-006",
      name: "Mr. Dilip Mondal",
      email: "dilip.mondal@staff.tnu.edu.in",
      phone: "+91 98300 22006",
      role: "GROUP_D",
      category: "GROUP_D",
      designation: "Electrician & Maintenance Technician",
      level: "Band-I (L-2)",
      department: "Maintenance & Engineering",
      school: "University Administration",
      location: "Main Campus, Substation & Power Plant",
      reportingAuthorityId: "EMP-002",
      reportingAuthorityName: "Mr. Amitabh Roy (VP - Administration)",
      salary: 20500,
      doj: "2025-11-05",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2026-05-05",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Maintenance Electrician Appointment Letter", date: "2025-11-05", type: "OFFICIAL_ORDER" }
      ]
    },

    // TRACK B: GENERAL EMPLOYEES (NON-FACULTY)
    {
      id: "EMP-S01",
      empCode: "TNU-STAFF-001",
      name: "Ms. Ananya Roy",
      email: "ananya.roy@tnu.edu.in",
      phone: "+91 98300 33001",
      role: "GENERAL_EMPLOYEE",
      category: "STAFF",
      designation: "Executive Assistant - Registrar Office",
      level: "L-7",
      department: "Office of the Registrar",
      school: "University Administration",
      location: "Main Campus, Registrar Wing",
      reportingAuthorityId: "EMP-003",
      reportingAuthorityName: "Dr. Sujoy Biswas (Registrar)",
      salary: 38000,
      doj: "2026-09-12", // Joined < 30 days ago! New Joiner KRA trigger
      probationStatus: "IN_PROBATION",
      probationCompletedDate: null,
      status: "ACTIVE",
      digitalDossier: [
        { title: "Offer of Appointment - Executive Assistant", date: "2026-09-12", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-S02",
      empCode: "TNU-STAFF-002",
      name: "Mr. Debanjan Ghosh",
      email: "debanjan.ghosh@tnu.edu.in",
      phone: "+91 98300 33002",
      role: "GENERAL_EMPLOYEE",
      category: "STAFF",
      designation: "Assistant Accounts Officer",
      level: "L-8",
      department: "Finance & Accounts",
      school: "University Administration",
      location: "Main Campus, Finance Wing",
      reportingAuthorityId: "EMP-002",
      reportingAuthorityName: "Mr. Amitabh Roy (VP - Administration)",
      salary: 45000,
      doj: "2025-11-01",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2026-05-01",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Accounts Officer Appointment Order", date: "2025-11-01", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-S03",
      empCode: "TNU-STAFF-003",
      name: "Ms. Sneha Mukherjee",
      email: "sneha.mukherjee@tnu.edu.in",
      phone: "+91 98300 33003",
      role: "GENERAL_EMPLOYEE",
      category: "STAFF",
      designation: "Senior Technical Assistant (Electronics & Labs)",
      level: "L-9",
      department: "Computer Science & Engineering",
      school: "School of Engineering & Technology",
      location: "Main Campus, Hardware & Robotics Lab",
      reportingAuthorityId: "EMP-006",
      reportingAuthorityName: "Dr. Debasis Roy (HOD - CSE)",
      salary: 48000,
      doj: "2025-04-10",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2025-10-10",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Technical Staff Appointment", date: "2025-04-10", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-S04",
      empCode: "TNU-STAFF-004",
      name: "Mr. Tanmoy Dutta",
      email: "tanmoy.dutta@tnu.edu.in",
      phone: "+91 98300 33004",
      role: "GENERAL_EMPLOYEE",
      category: "STAFF",
      designation: "Admissions & Outreach Manager",
      level: "L-9",
      department: "Admissions & Outreach",
      school: "University Administration",
      location: "City Office & Main Campus",
      reportingAuthorityId: "EMP-002",
      reportingAuthorityName: "Mr. Amitabh Roy (VP - Administration)",
      salary: 52000,
      doj: "2026-02-15",
      probationStatus: "IN_PROBATION",
      probationCompletedDate: null,
      status: "ACTIVE",
      digitalDossier: [
        { title: "Admissions Manager Appointment", date: "2026-02-15", type: "OFFICIAL_ORDER" }
      ]
    },

    // TRACK C: FACULTY MEMBERS
    {
      id: "EMP-F01",
      empCode: "TNU-FAC-001",
      name: "Dr. Arindam Mukherjee",
      email: "arindam.mukherjee@tnu.edu.in",
      phone: "+91 98300 44001",
      role: "FACULTY",
      category: "FACULTY",
      designation: "Associate Professor",
      level: "L-13A1 (AGP 9000)",
      department: "Computer Science & Engineering",
      school: "School of Engineering & Technology",
      location: "Main Campus, Academic Complex",
      reportingAuthorityId: "EMP-006",
      reportingAuthorityName: "Dr. Debasis Roy (HOD - CSE)",
      salary: 125000,
      doj: "2024-05-10",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2025-05-10",
      lastAppraisalDate: "2025-07-15",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Associate Professor Appointment Letter", date: "2024-05-10", type: "OFFICIAL_ORDER" },
        { title: "Statutory Service Confirmation Letter", date: "2025-05-15", type: "CONFIRMATION" }
      ]
    },
    {
      id: "EMP-F02",
      empCode: "TNU-FAC-002",
      name: "Dr. Sharmistha Sen",
      email: "sharmistha.sen@tnu.edu.in",
      phone: "+91 98300 44002",
      role: "FACULTY",
      category: "FACULTY",
      designation: "Assistant Professor (Senior Scale)",
      level: "L-11 (AGP 7000)",
      department: "School of Biotechnology",
      school: "School of Life Sciences",
      location: "Main Campus, BioTech Block",
      reportingAuthorityId: "EMP-005",
      reportingAuthorityName: "Prof. (Dr.) Alok Chatterjee (Dean)",
      salary: 92000,
      doj: "2024-08-01",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2025-08-01",
      lastAppraisalDate: "2025-08-10",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Assistant Professor Appointment", date: "2024-08-01", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-F03",
      empCode: "TNU-FAC-003",
      name: "Prof. (Dr.) Subhashis Ray",
      email: "subhashis.ray@tnu.edu.in",
      phone: "+91 98300 44003",
      role: "FACULTY",
      category: "FACULTY",
      designation: "Professor",
      level: "L-14 (AGP 10000)",
      department: "Mechanical Engineering",
      school: "School of Engineering & Technology",
      location: "Main Campus, Mechanical Labs",
      reportingAuthorityId: "EMP-005",
      reportingAuthorityName: "Prof. (Dr.) Alok Chatterjee (Dean)",
      salary: 165000,
      doj: "2023-01-15",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2024-01-15",
      lastAppraisalDate: "2025-09-05",
      status: "ACTIVE",
      digitalDossier: [
        { title: "Professor of Practice Order", date: "2023-01-15", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-F04",
      empCode: "TNU-FAC-004",
      name: "Dr. Poulomi Chatterjee",
      email: "poulomi.chatterjee@tnu.edu.in",
      phone: "+91 98300 44004",
      role: "FACULTY",
      category: "FACULTY",
      designation: "Assistant Professor",
      level: "L-10 (AGP 6000)",
      department: "Humanities & Social Sciences",
      school: "School of Humanities & Management",
      location: "Main Campus, Academic Complex",
      reportingAuthorityId: "EMP-005",
      reportingAuthorityName: "Prof. (Dr.) Alok Chatterjee (Dean)",
      salary: 78000,
      doj: "2026-01-15",
      probationStatus: "IN_PROBATION", // Ineligible for ECM: probation not done!
      probationCompletedDate: null,
      lastAppraisalDate: null,
      status: "ACTIVE",
      digitalDossier: [
        { title: "Assistant Professor Appointment", date: "2026-01-15", type: "OFFICIAL_ORDER" }
      ]
    },
    {
      id: "EMP-F05",
      empCode: "TNU-FAC-005",
      name: "Dr. Vikramaditya Das",
      email: "vikram.das@tnu.edu.in",
      phone: "+91 98300 44005",
      role: "FACULTY",
      category: "FACULTY",
      designation: "Assistant Professor",
      level: "L-10 (AGP 6000)",
      department: "School of Law",
      school: "School of Legal Studies",
      location: "Main Campus, Law Wing",
      reportingAuthorityId: "EMP-003",
      reportingAuthorityName: "Dr. Sujoy Biswas (Registrar)",
      salary: 82000,
      doj: "2026-04-10",
      probationStatus: "COMPLETED",
      probationCompletedDate: "2026-09-10",
      lastAppraisalDate: null, // Ineligible for ECM: only 6 months since DOJ! Needs >= 12 mos
      status: "ACTIVE",
      digitalDossier: [
        { title: "Faculty Appointment Letter", date: "2026-04-10", type: "OFFICIAL_ORDER" }
      ]
    }
  ],

  // Track A: Group-D Standardized Form Templates (Configurable by HR with Versioning)
  groupDFormTemplates: [
    {
      id: "TPL-GRPD-OFFICE",
      roleName: "Office Attendant / Peon",
      version: "v2.0 (2026 Revised)",
      lastModifiedBy: "Ms. Sunita Sharma (Head HR)",
      lastModifiedAt: "2026-08-15T10:00:00.000Z",
      kpis: [
        { id: "k-1", name: "Punctuality & Shift Attendance", maxScore: 5, weightagePct: 25, description: "Reporting on time, adhering to duty shifts, zero unexcused absenteeism." },
        { id: "k-2", name: "Document & Dispatch Handling", maxScore: 5, weightagePct: 25, description: "Prompt delivery of departmental files, notices, dockets without damage or loss." },
        { id: "k-3", name: "Office Tidiness & Material Readiness", maxScore: 5, weightagePct: 25, description: "Ensuring desks, meeting rooms, stationery, and water facilities are arranged before working hours." },
        { id: "k-4", name: "Responsiveness & Task Turnaround", maxScore: 5, weightagePct: 25, description: "Prompt completion of errands, photocopying, courier dispatch, and support tasks." }
      ],
      competencies: [
        { id: "c-1", name: "Courtesy, Decorum & Respectful Conduct", maxScore: 5, weightagePct: 25, description: "Respectful demeanor towards faculty, officers, students and visitors." },
        { id: "c-2", name: "Honesty & Confidentiality", maxScore: 5, weightagePct: 25, description: "Safeguarding office keys, confidential paperwork, and exam-related material." },
        { id: "c-3", name: "Teamwork & Interdepartmental Willingness", maxScore: 5, weightagePct: 25, description: "Readiness to assist during university events, convocations, admissions, and inspections." },
        { id: "c-4", name: "Personal Hygiene & University Uniform Dress Code", maxScore: 5, weightagePct: 25, description: "Clean uniform, ID card display, neat turnout every working day." }
      ]
    },
    {
      id: "TPL-GRPD-LAB",
      roleName: "Laboratory Bearer / Technical Attendant",
      version: "v1.1 (2026)",
      lastModifiedBy: "Ms. Sunita Sharma (Head HR)",
      lastModifiedAt: "2026-07-10T11:00:00.000Z",
      kpis: [
        { id: "k-1", name: "Lab Readiness & Equipment Setup", maxScore: 5, weightagePct: 30, description: "Opening labs 30 mins before practical classes, connecting power, cables, glassware, and instruments." },
        { id: "k-2", name: "Safe Handling & Inventory Maintenance", maxScore: 5, weightagePct: 25, description: "Proper storage of reagents, delicate components, zero accidental breakage, daily log update." },
        { id: "k-3", name: "Cleanliness & Safety Compliance", maxScore: 5, weightagePct: 25, description: "Spill cleaning, fire extinguisher checks, waste segregation, fume hood checks." },
        { id: "k-4", name: "Assistance to Faculty & Students", maxScore: 5, weightagePct: 20, description: "Prompt issuing and retrieving of tool kits, breadboards, testing meters." }
      ],
      competencies: [
        { id: "c-1", name: "Safety Protocol Adherence", maxScore: 5, weightagePct: 30, description: "Strict compliance with electrical and chemical lab safety guidelines." },
        { id: "c-2", name: "Technical Alertness & Asset Care", maxScore: 5, weightagePct: 30, description: "Immediate reporting of faulty switches, broken glassware or water leaks." },
        { id: "c-3", name: "Discipline & Attendance", maxScore: 5, weightagePct: 20, description: "Reliable presence during student lab sessions and practical examinations." },
        { id: "c-4", name: "Cooperation with Technical Officers", maxScore: 5, weightagePct: 20, description: "Constructive teamwork with lab technicians and subject teachers." }
      ]
    },
    {
      id: "TPL-GRPD-DRIVER",
      roleName: "Commercial / Heavy Vehicle Driver",
      version: "v1.0 (Standard)",
      lastModifiedBy: "Ms. Sunita Sharma (Head HR)",
      lastModifiedAt: "2026-06-01T09:00:00.000Z",
      kpis: [
        { id: "k-1", name: "Safe Driving & Accident-Free Record", maxScore: 5, weightagePct: 35, description: "Strict obedience of traffic laws, zero rash driving, zero campus speed violations." },
        { id: "k-2", name: "Schedule & Route Punctuality", maxScore: 5, weightagePct: 30, description: "Operating student/staff shuttles strictly to published timetables." },
        { id: "k-3", name: "Vehicle Maintenance & Daily Logbook", maxScore: 5, weightagePct: 20, description: "Daily checks of tire pressure, oil, coolant, battery; accurate logbook entries for fuel and km." },
        { id: "k-4", name: "Vehicle Cleanliness", maxScore: 5, weightagePct: 15, description: "Clean interior, spotless seats, washed exterior." }
      ],
      competencies: [
        { id: "c-1", name: "Passenger Courtesy & Patient Behavior", maxScore: 5, weightagePct: 40, description: "Polite communication with students, senior faculty, guests, and women passengers." },
        { id: "c-2", name: "Sobriety & Zero Tolerance Adherence", maxScore: 5, weightagePct: 30, description: "Complete sobriety on and off duty; clean statutory background." },
        { id: "c-3", name: "Emergency Readiness", maxScore: 5, weightagePct: 30, description: "Handling breakdown, tire punctures, first aid kit maintenance efficiently." }
      ]
    },
    {
      id: "TPL-GRPD-SECURITY",
      roleName: "Campus Security Guard",
      version: "v1.0 (Standard)",
      lastModifiedBy: "Ms. Sunita Sharma (Head HR)",
      lastModifiedAt: "2026-06-01T09:00:00.000Z",
      kpis: [
        { id: "k-1", name: "Gate Access Control & Visitor Logging", maxScore: 5, weightagePct: 35, description: "Strict vehicle checking, visitor badges, CCTV monitoring compliance." },
        { id: "k-2", name: "Patrolling & Perimeter Vigilance", maxScore: 5, weightagePct: 25, description: "Regular night rounds, fence integrity checks, reporting suspicious activity." },
        { id: "k-3", name: "Incident Prevention & Fire Watch", maxScore: 5, weightagePct: 20, description: "Locking all buildings after hours, inspecting electrical panels." },
        { id: "k-4", name: "Attendance & Shift Handover", maxScore: 5, weightagePct: 20, description: "Prompt relief handover at post, zero unauthorized post abandonment." }
      ],
      competencies: [
        { id: "c-1", name: "Firm Yet Courteous Demeanor", maxScore: 5, weightagePct: 35, description: "Enforcing university campus rules firmly without rude behavior." },
        { id: "c-2", name: "Alertness & Physical Fitness", maxScore: 5, weightagePct: 35, description: "High vigilance on duty, disciplined turnout in uniform." },
        { id: "c-3", name: "Integrity & Anti-Pilferage Watch", maxScore: 5, weightagePct: 30, description: "Checking materials entering and exiting campus with gate passes." }
      ]
    }
  ],

  // Track A: Monthly Evaluation Records
  groupDMonthlyEvaluations: [
    // 1. Pending HOD completion: Ramesh Kumar (Administration)
    {
      id: "EVAL-GD-2026-09-01",
      cycleMonth: "September 2026",
      monthYear: "2026-09",
      employeeId: "EMP-G01",
      employeeName: "Mr. Ramesh Kumar",
      department: "Administration",
      roleName: "Senior Office Attendant",
      templateId: "TPL-GRPD-OFFICE",
      hodId: "EMP-002",
      hodName: "Mr. Amitabh Roy (VP - Administration)",
      dueDate: "2026-10-07",
      graceDueDate: "2026-10-10",
      status: "PENDING_HOD",
      kpiScores: [
        { id: "k-1", score: 5, maxScore: 5 },
        { id: "k-2", score: 5, maxScore: 5 },
        { id: "k-3", score: 4, maxScore: 5 },
        { id: "k-4", score: 5, maxScore: 5 }
      ],
      competencyScores: [
        { id: "c-1", score: 5, maxScore: 5 },
        { id: "c-2", score: 5, maxScore: 5 },
        { id: "c-3", score: 4, maxScore: 5 },
        { id: "c-4", score: 5, maxScore: 5 }
      ],
      totalKpiScore: 19,
      totalCompetencyScore: 19,
      overallCompositeScore: 95.0,
      positiveObservations: "Excellent diligence during the University Foundation Day preparations. Always reliable.",
      negativeObservations: "None observed during this cycle.",
      hodComments: "One of the most dedicated office attendants in the central administration block.",
      submissionDate: null,
      vpAdminApproval: null,
      isAutoLocked: false,
      lockReason: null
    },

    // 2. Submitted by HOD, waiting for VP Admin Approval: Bikash Mondal (CSE)
    {
      id: "EVAL-GD-2026-09-02",
      cycleMonth: "September 2026",
      monthYear: "2026-09",
      employeeId: "EMP-G02",
      employeeName: "Mr. Bikash Mondal",
      department: "Computer Science & Engineering",
      roleName: "Laboratory Bearer / Technical Attendant",
      templateId: "TPL-GRPD-LAB",
      hodId: "EMP-006",
      hodName: "Dr. Debasis Roy (HOD - CSE)",
      dueDate: "2026-10-07",
      graceDueDate: "2026-10-10",
      status: "SUBMITTED_HOD",
      kpiScores: [
        { id: "k-1", score: 5, maxScore: 5 },
        { id: "k-2", score: 4, maxScore: 5 },
        { id: "k-3", score: 5, maxScore: 5 },
        { id: "k-4", score: 4, maxScore: 5 }
      ],
      competencyScores: [
        { id: "c-1", score: 5, maxScore: 5 },
        { id: "c-2", score: 4, maxScore: 5 },
        { id: "c-3", score: 5, maxScore: 5 },
        { id: "c-4", score: 4, maxScore: 5 }
      ],
      totalKpiScore: 18,
      totalCompetencyScore: 18,
      overallCompositeScore: 90.0,
      positiveObservations: "Ensured 100% lab uptime during external mid-term practical examinations.",
      negativeObservations: "Should proactively label newly arrived patch cords before storage.",
      hodComments: "Recommended for sign-off. High commitment to laboratory upkeep.",
      submissionDate: "2026-10-03T14:30:00.000Z",
      vpAdminApproval: null, // Ready for VP Admin to click Approve!
      isAutoLocked: false,
      lockReason: null
    },

    // 3. Approved by VP Admin (August 2026 cycle): Dilip Mondal (Electrician)
    {
      id: "EVAL-GD-2026-08-01",
      cycleMonth: "August 2026",
      monthYear: "2026-08",
      employeeId: "EMP-G06",
      employeeName: "Mr. Dilip Mondal",
      department: "Maintenance & Engineering",
      roleName: "Electrician & Maintenance Technician",
      templateId: "TPL-GRPD-OFFICE",
      hodId: "EMP-002",
      hodName: "Mr. Amitabh Roy (VP - Administration)",
      dueDate: "2026-09-07",
      graceDueDate: "2026-09-10",
      status: "APPROVED_VP_ADMIN",
      kpiScores: [
        { id: "k-1", score: 5, maxScore: 5 },
        { id: "k-2", score: 5, maxScore: 5 },
        { id: "k-3", score: 4, maxScore: 5 },
        { id: "k-4", score: 5, maxScore: 5 }
      ],
      competencyScores: [
        { id: "c-1", score: 5, maxScore: 5 },
        { id: "c-2", score: 5, maxScore: 5 },
        { id: "c-3", score: 5, maxScore: 5 },
        { id: "c-4", score: 4, maxScore: 5 }
      ],
      totalKpiScore: 19,
      totalCompetencyScore: 19,
      overallCompositeScore: 95.0,
      positiveObservations: "Repaired main DG sync switchboard during storm within 45 minutes.",
      negativeObservations: "None.",
      hodComments: "Key asset for campus power distribution maintenance.",
      submissionDate: "2026-09-05T11:00:00.000Z",
      vpAdminApproval: {
        approvedBy: "Mr. Amitabh Roy (VP - Administration)",
        approvedAt: "2026-09-06T15:20:00.000Z",
        remarks: "Approved as submitted. Excellent emergency electrical work noted."
      },
      isAutoLocked: false,
      lockReason: null
    },

    // 4. AUTO-LOCKED OVERDUE (Past 10th Grace Cutoff): Gopal Das (Driver) - August 2026
    {
      id: "EVAL-GD-2026-08-02",
      cycleMonth: "August 2026",
      monthYear: "2026-08",
      employeeId: "EMP-G04",
      employeeName: "Mr. Gopal Das",
      department: "Transport Services",
      roleName: "Heavy Vehicle Driver (Campus Bus Fleet)",
      templateId: "TPL-GRPD-DRIVER",
      hodId: "EMP-002",
      hodName: "Mr. Amitabh Roy (VP - Administration)",
      dueDate: "2026-09-07",
      graceDueDate: "2026-09-10",
      status: "LOCKED_NOT_SUBMITTED",
      kpiScores: [],
      competencyScores: [],
      totalKpiScore: 0,
      totalCompetencyScore: 0,
      overallCompositeScore: 0,
      positiveObservations: "",
      negativeObservations: "",
      hodComments: "",
      submissionDate: null,
      vpAdminApproval: null,
      isAutoLocked: true,
      lockReason: "System auto-lock enforced: Evaluation form was not submitted prior to grace period deadline of 10th September 2026. Flagged for HR review."
    }
  ],

  // Track A: Group-D Annual Reports & Compensation Review (Collated after 1 Year)
  groupDAnnualReports: [
    {
      id: "GD-ANN-2026-001",
      employeeId: "EMP-G01",
      employeeName: "Mr. Ramesh Kumar",
      department: "Administration",
      roleName: "Senior Office Attendant",
      evaluationYear: "2025-2026",
      doj: "2025-08-15",
      completedYears: 1,
      probationStatus: "COMPLETED",
      probationCheckPassed: true,
      monthlyCollatedScores: [
        { month: "2025-09", score: 92 },
        { month: "2025-10", score: 90 },
        { month: "2025-11", score: 94 },
        { month: "2025-12", score: 93 },
        { month: "2026-01", score: 91 },
        { month: "2026-02", score: 95 },
        { month: "2026-03", score: 92 },
        { month: "2026-04", score: 94 },
        { month: "2026-05", score: 96 },
        { month: "2026-06", score: 91 },
        { month: "2026-07", score: 93 },
        { month: "2026-08", score: 95 }
      ],
      annualWeightedAverageScore: 93.0,
      currentSalary: 18000,
      recommendedCompensationSlab: {
        slabName: "Slab A+ (Score >= 90%)",
        incrementPercentage: 10,
        proposedNewSalary: 19800
      },
      managementReviewStatus: "APPROVED",
      managementDecisionDate: "2026-09-20T10:00:00.000Z",
      managementNotes: "Probation completed. High score of 93.0% achieved. 10% increment approved for October salary roll.",
      compensationWorkflowActivated: true
    },
    {
      id: "GD-ANN-2026-002",
      employeeId: "EMP-G03",
      employeeName: "Mr. Suraj Paswan",
      department: "Campus Security",
      roleName: "Campus Security Guard",
      evaluationYear: "2025-2026",
      doj: "2026-03-01",
      completedYears: 0.5,
      probationStatus: "IN_PROBATION",
      probationCheckPassed: false, // Mandatory probation check failure demonstration!
      monthlyCollatedScores: [
        { month: "2026-04", score: 84 },
        { month: "2026-05", score: 86 },
        { month: "2026-06", score: 82 },
        { month: "2026-07", score: 85 },
        { month: "2026-08", score: 88 }
      ],
      annualWeightedAverageScore: 85.0,
      currentSalary: 16000,
      recommendedCompensationSlab: null,
      managementReviewStatus: "BLOCKED_PROBATION_INCOMPLETE",
      managementDecisionDate: null,
      managementNotes: "SOP Policy Enforcement: Member is currently in probation. Compensation review cannot be activated until probation confirmation.",
      compensationWorkflowActivated: false
    }
  ],

  // Track B: General Employees KRA/KPI Goal Setting (Within 30 Days of Joining)
  generalEmployeeGoals: [
    // 1. New Joiner within 30-day window: Ms. Ananya Roy
    {
      id: "GOAL-2026-S01",
      employeeId: "EMP-S01",
      employeeName: "Ms. Ananya Roy",
      designation: "Executive Assistant - Registrar Office",
      department: "Office of the Registrar",
      doj: "2026-09-12",
      goalSettingDeadline: "2026-10-12", // 30 days SLA
      submissionDate: "2026-09-28",
      slaAdherence: "ON_TIME_WITHIN_30_DAYS",
      status: "PENDING_HR_VERIFICATION", // Ready for HR verification!
      kpiItems: [
        { id: "k-1", kra: "Council Minutes & University Gazette Documentation", metric: "Publish Syndicate & Academic Council minutes within 48 hours", weight: 35, target: "100% compliance (<48h)" },
        { id: "k-2", kra: "Statutory Regulatory Filings (UGC / AICTE / BCI)", metric: "Zero delay in annual affiliation and compliance upload submissions", weight: 25, target: "On-time submission" },
        { id: "k-3", kra: "Faculty Grievance & Service Record Archival", metric: "Digital file turnaround time under 24 hours", weight: 20, target: "< 24 hours TAT" },
        { id: "k-4", kra: "Interdepartmental Coordination & Office Protocol", metric: "Quality index on administrative memos and notices", weight: 20, target: "Zero rework error" }
      ],
      hrVerified: false,
      hrVerifiedBy: null,
      hrVerifiedAt: null,
      mgmtVerified: false,
      mgmtVerifiedBy: null,
      mgmtVerifiedAt: null,
      lockedAt: null
    },

    // 2. Sneha Mukherjee: Goals Locked by HR & Management
    {
      id: "GOAL-2026-S03",
      employeeId: "EMP-S03",
      employeeName: "Ms. Sneha Mukherjee",
      designation: "Senior Technical Assistant (Electronics & Labs)",
      department: "Computer Science & Engineering",
      doj: "2025-04-10",
      goalSettingDeadline: "2025-05-10",
      submissionDate: "2025-04-25",
      slaAdherence: "WITHIN_30_DAYS",
      status: "MGMT_LOCKED",
      kpiItems: [
        { id: "k-1", kra: "Robotics & IoT Laboratory Maintenance", metric: "99% availability of sensor boards and hardware tools", weight: 35, target: "99% uptime" },
        { id: "k-2", kra: "Student Project & Hackathon Hardware Support", metric: "Assist student teams in prototype building", weight: 30, target: "Support 25+ teams" },
        { id: "k-3", kra: "Safety Protocols & Equipment Calibration", metric: "Monthly calibration of oscilloscopes and power sources", weight: 20, target: "100% calibrated" },
        { id: "k-4", kra: "Procurement & Consumable Inventory Control", metric: "Zero stockouts of soldering tools and microcontrollers", weight: 15, target: "Optimal inventory" }
      ],
      hrVerified: true,
      hrVerifiedBy: "Ms. Sunita Sharma (Head HR)",
      hrVerifiedAt: "2025-04-28T14:00:00.000Z",
      mgmtVerified: true,
      mgmtVerifiedBy: "Mr. Amitabh Roy (VP - Admin)",
      mgmtVerifiedAt: "2025-04-30T16:30:00.000Z",
      lockedAt: "2025-04-30T16:30:00.000Z"
    },

    // 3. Debanjan Ghosh: Goals Locked
    {
      id: "GOAL-2026-S02",
      employeeId: "EMP-S02",
      employeeName: "Mr. Debanjan Ghosh",
      designation: "Assistant Accounts Officer",
      department: "Finance & Accounts",
      doj: "2025-11-01",
      goalSettingDeadline: "2025-12-01",
      submissionDate: "2025-11-20",
      slaAdherence: "WITHIN_30_DAYS",
      status: "MGMT_LOCKED",
      kpiItems: [
        { id: "k-1", kra: "Monthly Payroll Processing & Statutory Deductions", metric: "Disburse salary on 1st of month with zero PF/ESI errors", weight: 40, target: "100% on-time" },
        { id: "k-2", kra: "Vendor Invoice Settlement SLA", metric: "Process approved vendor vouchers within 7 working days", weight: 30, target: "< 7 days TAT" },
        { id: "k-3", kra: "Student Fee Reconciliation", metric: "Bi-weekly bank reconciliation of online fee payments", weight: 20, target: "Zero unmapped entries" },
        { id: "k-4", kra: "Internal Audit Compliance", metric: "Prompt submission of quarterly trial balance", weight: 10, target: "Zero audit observations" }
      ],
      hrVerified: true,
      hrVerifiedBy: "Ms. Sunita Sharma",
      hrVerifiedAt: "2025-11-25T11:00:00.000Z",
      mgmtVerified: true,
      mgmtVerifiedBy: "Mr. Amitabh Roy",
      mgmtVerifiedAt: "2025-11-27T15:00:00.000Z",
      lockedAt: "2025-11-27T15:00:00.000Z"
    }
  ],

  // Track B: Quarterly Reviews (Q1 @ 90d, Q2 @ 180d, Q3 @ 270d, Q4 @ 360d)
  quarterlyReviews: [
    // Debanjan Ghosh (Accounts): Q1, Q2, Q3 completed; Q4 in progress (submitted to RA)
    {
      id: "QR-2026-S02-Q1",
      employeeId: "EMP-S02",
      employeeName: "Mr. Debanjan Ghosh",
      quarter: "Q1",
      targetDaysMark: 90,
      dueDate: "2026-02-15",
      submittedAt: "2026-02-10",
      employeeAchievements: "Successfully transitioned payroll tax deductions to new statutory income tax slabs without any discrepancies.",
      selfScore: 92,
      supportingDocsUrl: "dossier/EMP-S02/Q1_TaxReconciliation_Report.pdf",
      reportingAuthorityReview: {
        verifiedBy: "Mr. Amitabh Roy (VP - Admin)",
        verifiedAt: "2026-02-14",
        score: 93,
        comments: "Prompt and accurate financial ledger maintenance."
      },
      hrReview: {
        reviewedBy: "Ms. Sunita Sharma (Head HR)",
        reviewedAt: "2026-02-18",
        recommendation: "Met and exceeded quarterly targets."
      },
      mgmtReview: {
        reviewedBy: "Prof. (Dr.) Arunansu Haldar (VC)",
        reviewedAt: "2026-02-22",
        decision: "APPROVED"
      },
      status: "COMPLETED"
    },
    {
      id: "QR-2026-S02-Q2",
      employeeId: "EMP-S02",
      employeeName: "Mr. Debanjan Ghosh",
      quarter: "Q2",
      targetDaysMark: 180,
      dueDate: "2026-05-15",
      submittedAt: "2026-05-12",
      employeeAchievements: "Completed fiscal year-end closing entries and coordinated external audit schedules flawlessly.",
      selfScore: 94,
      supportingDocsUrl: "dossier/EMP-S02/Q2_AuditReadiness_Docket.pdf",
      reportingAuthorityReview: {
        verifiedBy: "Mr. Amitabh Roy (VP - Admin)",
        verifiedAt: "2026-05-16",
        score: 95,
        comments: "High diligence during annual statutory audit."
      },
      hrReview: {
        reviewedBy: "Ms. Sunita Sharma (Head HR)",
        reviewedAt: "2026-05-20",
        recommendation: "High reliability."
      },
      mgmtReview: {
        reviewedBy: "Prof. (Dr.) Arunansu Haldar (VC)",
        reviewedAt: "2026-05-24",
        decision: "APPROVED"
      },
      status: "COMPLETED"
    },
    {
      id: "QR-2026-S02-Q3",
      employeeId: "EMP-S02",
      employeeName: "Mr. Debanjan Ghosh",
      quarter: "Q3",
      targetDaysMark: 270,
      dueDate: "2026-08-15",
      submittedAt: "2026-08-11",
      employeeAchievements: "Automated student fee reconciliation gateway reducing manual voucher entries by 60%.",
      selfScore: 91,
      supportingDocsUrl: "dossier/EMP-S02/Q3_Gateway_Automation.pdf",
      reportingAuthorityReview: {
        verifiedBy: "Mr. Amitabh Roy (VP - Admin)",
        verifiedAt: "2026-08-14",
        score: 92,
        comments: "Proactive fintech integration."
      },
      hrReview: {
        reviewedBy: "Ms. Sunita Sharma (Head HR)",
        reviewedAt: "2026-08-18",
        recommendation: "Excellent technical innovation in accounting."
      },
      mgmtReview: {
        reviewedBy: "Prof. (Dr.) Arunansu Haldar (VC)",
        reviewedAt: "2026-08-22",
        decision: "APPROVED"
      },
      status: "COMPLETED"
    },
    {
      id: "QR-2026-S02-Q4",
      employeeId: "EMP-S02",
      employeeName: "Mr. Debanjan Ghosh",
      quarter: "Q4",
      targetDaysMark: 360,
      dueDate: "2026-11-15",
      submittedAt: "2026-10-02", // Submitted early!
      employeeAchievements: "Full year zero vendor backlog achieved. Streamlined EPF and ESI challans with 100% compliance.",
      selfScore: 95,
      supportingDocsUrl: "dossier/EMP-S02/Q4_Statutory_Compliance_Report.pdf",
      reportingAuthorityReview: null, // Ready for RA verification!
      hrReview: null,
      mgmtReview: null,
      status: "SUBMITTED_TO_RA"
    },

    // Sneha Mukherjee: All 4 quarters completed! Ready for Post-Q4 Annual Appraisal
    {
      id: "QR-2026-S03-Q1",
      employeeId: "EMP-S03",
      employeeName: "Ms. Sneha Mukherjee",
      quarter: "Q1",
      targetDaysMark: 90,
      dueDate: "2025-07-25",
      submittedAt: "2025-07-20",
      employeeAchievements: "Set up 40 IoT kits for semester practical exams with zero hardware failures.",
      selfScore: 92,
      supportingDocsUrl: "dossier/EMP-S03/Q1_LabLog.pdf",
      reportingAuthorityReview: { verifiedBy: "Dr. Debasis Roy", score: 92, comments: "Very diligent." },
      hrReview: { reviewedBy: "Ms. Sunita Sharma", recommendation: "Satisfactory." },
      mgmtReview: { reviewedBy: "Prof. (Dr.) Arunansu Haldar", decision: "APPROVED" },
      status: "COMPLETED"
    },
    {
      id: "QR-2026-S03-Q2",
      employeeId: "EMP-S03",
      employeeName: "Ms. Sneha Mukherjee",
      quarter: "Q2",
      targetDaysMark: 180,
      dueDate: "2025-10-25",
      submittedAt: "2025-10-18",
      employeeAchievements: "Coordinated Smart India Hackathon internal hardware trials.",
      selfScore: 95,
      supportingDocsUrl: "dossier/EMP-S03/Q2_Hackathon.pdf",
      reportingAuthorityReview: { verifiedBy: "Dr. Debasis Roy", score: 95, comments: "Exceptional assistance to student teams." },
      hrReview: { reviewedBy: "Ms. Sunita Sharma", recommendation: "Commended." },
      mgmtReview: { reviewedBy: "Prof. (Dr.) Arunansu Haldar", decision: "APPROVED" },
      status: "COMPLETED"
    },
    {
      id: "QR-2026-S03-Q3",
      employeeId: "EMP-S03",
      employeeName: "Ms. Sneha Mukherjee",
      quarter: "Q3",
      targetDaysMark: 270,
      dueDate: "2026-01-25",
      submittedAt: "2026-01-20",
      employeeAchievements: "Calibrated 35 digital oscilloscopes and automated lab safety logbooks.",
      selfScore: 93,
      supportingDocsUrl: "dossier/EMP-S03/Q3_Calibration.pdf",
      reportingAuthorityReview: { verifiedBy: "Dr. Debasis Roy", score: 94, comments: "High precision." },
      hrReview: { reviewedBy: "Ms. Sunita Sharma", recommendation: "Approved." },
      mgmtReview: { reviewedBy: "Prof. (Dr.) Arunansu Haldar", decision: "APPROVED" },
      status: "COMPLETED"
    },
    {
      id: "QR-2026-S03-Q4",
      employeeId: "EMP-S03",
      employeeName: "Ms. Sneha Mukherjee",
      quarter: "Q4",
      targetDaysMark: 360,
      dueDate: "2026-04-25",
      submittedAt: "2026-04-18",
      employeeAchievements: "Supervised national robotics contest arena and managed 100% equipment return.",
      selfScore: 96,
      supportingDocsUrl: "dossier/EMP-S03/Q4_Robotics.pdf",
      reportingAuthorityReview: { verifiedBy: "Dr. Debasis Roy", score: 96, comments: "Top performing technical staff member." },
      hrReview: { reviewedBy: "Ms. Sunita Sharma", recommendation: "Recommended for Annual Appraisal promotion." },
      mgmtReview: { reviewedBy: "Prof. (Dr.) Arunansu Haldar", decision: "APPROVED" },
      status: "COMPLETED"
    }
  ],

  // Track B: Post-Q4 Annual Appraisal & Module I Integration Engine
  generalAnnualAppraisals: [
    {
      id: "GAA-2026-S03",
      employeeId: "EMP-S03",
      employeeName: "Ms. Sneha Mukherjee",
      department: "Computer Science & Engineering",
      currentDesignation: "Senior Technical Assistant (Electronics & Labs)",
      currentSalary: 48000,
      year: "2025-2026",
      quarterScores: [92, 95, 94, 96],
      compositeAnnualScore: 94.25,
      hrSummaryRecommendation: "Promote to Senior Technical Officer (Level 10) with ₹7,500 monthly salary increment.",
      managementDecision: "APPROVED_PROMOTION_AND_INCREMENT",
      managementDecisionDetails: {
        changeType: "DESIGNATION_AND_SALARY",
        proposedDesignation: "Senior Technical Officer",
        proposedSalary: 55500,
        salaryIncreaseAmount: 7500,
        effectiveDate: "2026-11-01"
      },
      syncedToModuleIChangeRequest: false, // Ready to click "Initialize in Module I"!
      linkedChangeRequestId: null,
      status: "READY_FOR_MODULE_1_SYNC"
    }
  ],

  // Track C: Faculty ECM-Based Annual Performance Appraisal
  facultyEcmAppraisals: [
    // 1. Dr. Arindam Mukherjee: Scored at ECM (282/300), Matrix compiled, Awaiting Management Decision
    {
      id: "ECM-2026-F01",
      cycleMonthYear: "2026-09",
      employeeId: "EMP-F01",
      employeeName: "Dr. Arindam Mukherjee",
      designation: "Associate Professor",
      department: "Computer Science & Engineering",
      doj: "2024-05-10",
      probationCompleted: true,
      monthsSinceLastAppraisalOrDoj: 14,
      isAutoEligible: true,
      eligibilityRoutedToRegistrarDate: "2026-09-10",
      selfAppraisalFormIssuedDate: "2026-09-10",
      selfAppraisalSubmissionDeadline: "2026-09-17",
      selfAppraisalSubmittedDate: "2026-09-15",
      selfAppraisalData: {
        teachingAndPedagogy: {
          coursesTaught: "Machine Learning (CSE-601), Distributed Cloud Systems (CSE-802)",
          studentFeedbackRating: 4.85,
          teachingHoursCompleted: 512,
          innovativeMethods: "Flipped classroom, Docker lab environments, open-source portfolio assignments.",
          scoreSelf: 95
        },
        researchAndPublications: {
          scopusIeeePapers: 5,
          citationsAdded: 110,
          booksChapters: 2,
          hIndex: 12,
          scoreSelf: 96
        },
        sponsoredResearchAndGrants: {
          grantTitle: "SERB-CRG: AI Edge Inference in Smart Grid IoT",
          grantAmountLakhs: 28.4,
          industryConsultancyRevenue: "₹4,20,000 from Tata Consultancy Services",
          scoreSelf: 92
        },
        institutionalContribution: {
          duties: "School NAAC Criterion-3 Coordinator, ACM Student Chapter Faculty Sponsor, Curriculum Revision Committee",
          scoreSelf: 94
        }
      },
      stakeholderVerifications: [
        {
          stakeholder: "SCHOOL_DEAN",
          name: "Prof. (Dr.) Alok Chatterjee (Dean - Engg)",
          status: "VERIFIED",
          verifiedAt: "2026-09-18T10:00:00.000Z",
          remarks: "Academic delivery, class attendance, and student feedback authenticated. Top 5% in school."
        },
        {
          stakeholder: "RD_CELL",
          name: "Director - Research & Development",
          status: "VERIFIED",
          verifiedAt: "2026-09-19T14:00:00.000Z",
          remarks: "Scopus and IEEE Xplore indexing verified. SERB grant sanction letter ₹28.4L verified in university account."
        },
        {
          stakeholder: "PLACEMENT_CELL",
          name: "Head - Corporate Relations & Placements",
          status: "VERIFIED",
          verifiedAt: "2026-09-20T11:30:00.000Z",
          remarks: "Directly placed 28 final year students through industry coding mentors."
        },
        {
          stakeholder: "HR_DEPARTMENT",
          name: "Ms. Sunita Sharma (Head HR)",
          status: "VERIFIED",
          verifiedAt: "2026-09-21T16:00:00.000Z",
          remarks: "Leave, conduct, and UGC minimum eligibility verified."
        }
      ],
      ecmMeeting: {
        scheduledBy: "Dr. Sujoy Biswas (Registrar)",
        scheduledDate: "2026-09-26T11:00:00.000Z",
        venueMode: "Conference Room 1 (Hybrid Zoom)",
        committeeMembers: [
          "Prof. (Dr.) Arunansu Haldar (Vice-Chancellor - Chairperson)",
          "Dr. Sujoy Biswas (Registrar - Secretary)",
          "Prof. (Dr.) Alok Chatterjee (Dean - School of Engineering)",
          "Prof. P. K. Sinha (External Subject Expert - IIT Kharagpur)",
          "Ms. Sunita Sharma (Head HR - Observer)"
        ],
        status: "CONCLUDED"
      },
      digitalEcmScoreSheet: {
        teachingScore100: 94,
        researchScore100: 96,
        consultancyGrantScore50: 45,
        institutionalDevScore50: 47,
        totalTnuProtocolScore: 282, // Total out of 300
        tnuPercentage: 94.0,
        committeeRemarks: "Unanimously commended. Research output and SERB grant execution reflect high institutional leadership. Strongly recommended for promotion to Professor & compensation revision."
      },
      evaluationMatrixCompiled: {
        previousIncrementDetails: "Last increment granted at annual cycle (July 2025): +8% merit. Current CTC: ₹1,25,000/month.",
        matrixScore: 94.0,
        rankingInSchool: "1st of 24 faculty candidates",
        compiledDate: "2026-09-27T10:00:00.000Z",
        routedToManagementDate: "2026-09-27T12:00:00.000Z"
      },
      managementDecision: null, // Ready for Management Decision!
      status: "AWAITING_MGMT_DECISION"
    },

    // 2. Dr. Sharmistha Sen: All 4 Stakeholders Verified, Ready for ECM Scheduling by Registrar
    {
      id: "ECM-2026-F02",
      cycleMonthYear: "2026-09",
      employeeId: "EMP-F02",
      employeeName: "Dr. Sharmistha Sen",
      designation: "Assistant Professor (Senior Scale)",
      department: "School of Biotechnology",
      doj: "2024-08-01",
      probationCompleted: true,
      monthsSinceLastAppraisalOrDoj: 13,
      isAutoEligible: true,
      eligibilityRoutedToRegistrarDate: "2026-09-10",
      selfAppraisalFormIssuedDate: "2026-09-11",
      selfAppraisalSubmissionDeadline: "2026-09-18",
      selfAppraisalSubmittedDate: "2026-09-16",
      selfAppraisalData: {
        teachingAndPedagogy: {
          coursesTaught: "Molecular Biology (BT-401), Bio-process Engineering (BT-602)",
          studentFeedbackRating: 4.7,
          teachingHoursCompleted: 460,
          innovativeMethods: "Virtual lab simulations and CRISPR case study tutorials.",
          scoreSelf: 92
        },
        researchAndPublications: {
          scopusIeeePapers: 4,
          citationsAdded: 76,
          booksChapters: 1,
          hIndex: 9,
          scoreSelf: 90
        },
        sponsoredResearchAndGrants: {
          grantTitle: "DBT Bio-care: Biofilm Degradation Enzymes",
          grantAmountLakhs: 18.5,
          industryConsultancyRevenue: "₹1,50,000",
          scoreSelf: 88
        },
        institutionalContribution: {
          duties: "Departmental IQAC Coordinator, Biotech Lab Safety Officer",
          scoreSelf: 90
        }
      },
      stakeholderVerifications: [
        { stakeholder: "SCHOOL_DEAN", name: "Prof. (Dr.) Alok Chatterjee (Dean)", status: "VERIFIED", verifiedAt: "2026-09-20", remarks: "Curriculum requirements fulfilled." },
        { stakeholder: "RD_CELL", name: "Director R&D", status: "VERIFIED", verifiedAt: "2026-09-21", remarks: "DBT grant verified." },
        { stakeholder: "PLACEMENT_CELL", name: "Head Placements", status: "VERIFIED", verifiedAt: "2026-09-22", remarks: "Internship tie-ups with Biocon." },
        { stakeholder: "HR_DEPARTMENT", name: "Head HR", status: "VERIFIED", verifiedAt: "2026-09-23", remarks: "All service conditions cleared." }
      ],
      ecmMeeting: null, // Ready for Registrar to schedule ECM!
      digitalEcmScoreSheet: null,
      evaluationMatrixCompiled: null,
      managementDecision: null,
      status: "READY_FOR_ECM_SCHEDULING"
    },

    // 3. Dr. Subhashis Ray: DISCREPANCY CASE demonstrating the Return to Faculty loop!
    {
      id: "ECM-2026-F03",
      cycleMonthYear: "2026-09",
      employeeId: "EMP-F03",
      employeeName: "Prof. (Dr.) Subhashis Ray",
      designation: "Professor",
      department: "Mechanical Engineering",
      doj: "2023-01-15",
      probationCompleted: true,
      monthsSinceLastAppraisalOrDoj: 13,
      isAutoEligible: true,
      eligibilityRoutedToRegistrarDate: "2026-09-10",
      selfAppraisalFormIssuedDate: "2026-09-11",
      selfAppraisalSubmissionDeadline: "2026-09-18",
      selfAppraisalSubmittedDate: "2026-09-17",
      selfAppraisalData: {
        teachingAndPedagogy: {
          coursesTaught: "Computational Fluid Dynamics, Thermodynamics",
          studentFeedbackRating: 4.6,
          teachingHoursCompleted: 440,
          innovativeMethods: "Ansys simulations and wind-tunnel lab demos.",
          scoreSelf: 90
        },
        researchAndPublications: {
          scopusIeeePapers: 3,
          citationsAdded: 60,
          booksChapters: 0,
          hIndex: 14,
          scoreSelf: 88
        },
        sponsoredResearchAndGrants: {
          grantTitle: "DRDO Composite Armor Aerodynamics Study",
          grantAmountLakhs: 35.0,
          industryConsultancyRevenue: "₹2,00,000",
          scoreSelf: 92
        },
        institutionalContribution: {
          duties: "Central Workshop In-Charge, NAAC Steering Committee Member",
          scoreSelf: 92
        }
      },
      stakeholderVerifications: [
        { stakeholder: "SCHOOL_DEAN", name: "Prof. (Dr.) Alok Chatterjee (Dean)", status: "VERIFIED", verifiedAt: "2026-09-22", remarks: "Teaching load validated." },
        { stakeholder: "RD_CELL", name: "Director R&D", status: "DISCREPANCY_FOUND", verifiedAt: "2026-09-24", remarks: "Discrepancy: The DRDO grant sanction letter lacks Annexure B co-PI expenditure endorsement. Kindly update submission with university finance countersignature." },
        { stakeholder: "PLACEMENT_CELL", name: "Head Placements", status: "VERIFIED", verifiedAt: "2026-09-22", remarks: "Core engg placements supported." },
        { stakeholder: "HR_DEPARTMENT", name: "Head HR", status: "PENDING", verifiedAt: null, remarks: "" }
      ],
      discrepancyDetails: {
        flaggedBy: "RD_CELL",
        flaggedAt: "2026-09-24T14:30:00.000Z",
        reason: "DRDO grant sanction letter lacks Annexure B co-PI expenditure endorsement. Form returned to faculty for updated upload.",
        resubmissionPending: true
      },
      ecmMeeting: null,
      digitalEcmScoreSheet: null,
      evaluationMatrixCompiled: null,
      managementDecision: null,
      status: "DISCREPANCY_RETURNED_TO_FACULTY"
    },

    // 4. Past Completed Faculty ECM with Official Issued Order Letter (August 2026)
    {
      id: "ECM-2026-PAST-001",
      cycleMonthYear: "2026-08",
      employeeId: "EMP-005",
      employeeName: "Prof. (Dr.) Alok Chatterjee",
      designation: "Professor & Dean",
      department: "Computer Science & Engineering",
      doj: "2020-03-01",
      probationCompleted: true,
      monthsSinceLastAppraisalOrDoj: 12,
      isAutoEligible: true,
      eligibilityRoutedToRegistrarDate: "2026-08-10",
      selfAppraisalFormIssuedDate: "2026-08-10",
      selfAppraisalSubmissionDeadline: "2026-08-17",
      selfAppraisalSubmittedDate: "2026-08-14",
      selfAppraisalData: {
        teachingAndPedagogy: { coursesTaught: "Advanced Operating Systems", studentFeedbackRating: 4.9, scoreSelf: 98 },
        researchAndPublications: { scopusIeeePapers: 8, citationsAdded: 210, scoreSelf: 98 },
        sponsoredResearchAndGrants: { grantTitle: "DST Indo-German AI Consortium", grantAmountLakhs: 65.0, scoreSelf: 96 },
        institutionalContribution: { duties: "Dean of Engineering, University Academic Council", scoreSelf: 98 }
      },
      stakeholderVerifications: [
        { stakeholder: "SCHOOL_DEAN", name: "Self / Executive Dean", status: "VERIFIED", verifiedAt: "2026-08-18", remarks: "Verified by Board." },
        { stakeholder: "RD_CELL", name: "Director R&D", status: "VERIFIED", verifiedAt: "2026-08-19", remarks: "All grants verified." },
        { stakeholder: "PLACEMENT_CELL", name: "Head Placements", status: "VERIFIED", verifiedAt: "2026-08-20", remarks: "100% placement record." },
        { stakeholder: "HR_DEPARTMENT", name: "Head HR", status: "VERIFIED", verifiedAt: "2026-08-21", remarks: "Exemplary record." }
      ],
      ecmMeeting: {
        scheduledBy: "Dr. Sujoy Biswas (Registrar)",
        scheduledDate: "2026-08-25T11:00:00.000Z",
        venueMode: "Board Room, Vice-Chancellor Secretariat",
        committeeMembers: [
          "Prof. (Dr.) Arunansu Haldar (VC - Chair)",
          "Dr. Sujoy Biswas (Registrar - Secretary)",
          "Prof. D. Sen (External Expert - Jadavpur University)",
          "Ms. Sunita Sharma (HR Rep)"
        ],
        status: "CONCLUDED"
      },
      digitalEcmScoreSheet: {
        teachingScore100: 97,
        researchScore100: 98,
        consultancyGrantScore50: 48,
        institutionalDevScore50: 49,
        totalTnuProtocolScore: 292,
        tnuPercentage: 97.3,
        committeeRemarks: "Outstanding institutional leadership and research volume. Recommended for Senior Professorship award and special compensation allowance."
      },
      evaluationMatrixCompiled: {
        previousIncrementDetails: "Senior academic scale.",
        matrixScore: 97.3,
        rankingInSchool: "1st",
        compiledDate: "2026-08-26",
        routedToManagementDate: "2026-08-26"
      },
      managementDecision: {
        decisionType: "REWARDS_AND_COMPENSATION_REVISION",
        newDesignation: "Dean & Senior Professor of Excellence",
        newMonthlySalary: 235000,
        salaryIncreaseAmount: 25000,
        effectiveSalaryCycleMonth: "September 2026",
        decidedBy: "Prof. (Dr.) Arunansu Haldar (Vice-Chancellor)",
        decisionDate: "2026-08-28T16:00:00.000Z",
        remarks: "Sanctioned ₹25,000 monthly allowance for extraordinary research and NIRF ranking enhancement.",
        officialLetterGenerated: true,
        letterReferenceNumber: "TNU/REG/ECM/2026/842",
        routedToPayroll: true,
        payrollRoutingDate: "2026-08-29T10:00:00.000Z"
      },
      status: "COMPLETED"
    }
  ],

  // Module I Integration Engine (Service Condition Change Requests flowing directly from Appraisals)
  changeRequests: [
    {
      id: "CR-2026-001",
      reqNumber: "CR-2026-001",
      sourceModule: "MODULE_III_ECM",
      employeeId: "EMP-005",
      employeeName: "Prof. (Dr.) Alok Chatterjee",
      department: "Computer Science & Engineering",
      changeType: "SALARY_REVISION",
      changeField: "salary",
      currentValue: "210000",
      proposedValue: "235000",
      justification: "Annual ECM Performance Outcome: Scored 292/300 (97.3%). Sanctioned by VC.",
      effectiveDate: "2026-09-01",
      status: "EFFECTIVE_APPLIED",
      requestedBy: "Module III ECM Automation Engine",
      requestedAt: "2026-08-28T16:00:00.000Z",
      hrStatus: "APPROVED",
      managementStatus: "APPROVED",
      managementRemarks: "Executed into live payroll."
    }
  ],

  // System Notifications
  notifications: [
    {
      id: "NOTIF-001",
      targetRole: "HOD",
      title: "Group-D Monthly Evaluations Due Soon (7th Due Date)",
      message: "Monthly evaluation forms for September 2026 are due on 7th October. Grace period extends to 10th October.",
      timestamp: "2026-10-01T08:00:00.000Z",
      type: "DEADLINE_WARNING",
      read: false
    },
    {
      id: "NOTIF-002",
      targetRole: "REGISTRAR",
      title: "Faculty ECM Eligibility List Generated",
      message: "System has generated the eligible Faculty list for the upcoming October ECM cycle. Ready for routing.",
      timestamp: "2026-10-02T09:30:00.000Z",
      type: "ACTION_REQUIRED",
      read: false
    },
    {
      id: "NOTIF-003",
      targetRole: "VICE_PRESIDENT_ADMIN",
      title: "HOD Submission Pending Approval",
      message: "Dr. Debasis Roy (HOD - CSE) submitted monthly evaluation for Bikash Mondal (Lab Attendant). VP sign-off requested.",
      timestamp: "2026-10-03T15:00:00.000Z",
      type: "APPROVAL_REQUEST",
      read: false
    },
    {
      id: "NOTIF-004",
      targetRole: "HR_ADMIN",
      title: "30-Day KRA Onboarding SLA Tracking",
      message: "New joiner Ms. Ananya Roy (Executive Assistant) submitted KRAs on Day 16. Pending HR & Management verification.",
      timestamp: "2026-09-29T10:00:00.000Z",
      type: "SLA_ALERT",
      read: true
    }
  ],

  // Audit Logs (Statutory Audit Trail & Version History)
  auditLogs: [
    {
      id: "AUD-M3-001",
      entityType: "FACULTY_ECM_APPRAISAL",
      entityId: "ECM-2026-PAST-001",
      action: "ECM_MANAGEMENT_DECISION_EXECUTED",
      actorName: "Prof. (Dr.) Arunansu Haldar",
      actorRole: "VICE_CHANCELLOR",
      timestamp: "2026-08-28T16:00:00.000Z",
      previousState: { status: "AWAITING_MGMT_DECISION" },
      newState: { status: "COMPLETED", letterReferenceNumber: "TNU/REG/ECM/2026/842" },
      remarks: "Sanctioned ₹25,000 monthly allowance for Prof. Alok Chatterjee. Routed to Payroll.",
      ip: "192.168.1.10"
    },
    {
      id: "AUD-M3-002",
      entityType: "GROUP_D_EVALUATION",
      entityId: "EVAL-GD-2026-08-01",
      action: "VP_ADMIN_APPROVED_MONTHLY_FORM",
      actorName: "Mr. Amitabh Roy",
      actorRole: "VICE_PRESIDENT_ADMIN",
      timestamp: "2026-09-06T15:20:00.000Z",
      previousState: { status: "SUBMITTED_HOD" },
      newState: { status: "APPROVED_VP_ADMIN" },
      remarks: "Approved August monthly evaluation for Dilip Mondal (Electrician). Filed into digital dossier.",
      ip: "192.168.1.12"
    },
    {
      id: "AUD-M3-003",
      entityType: "GROUP_D_EVALUATION",
      entityId: "EVAL-GD-2026-08-02",
      action: "AUTO_LOCK_GRACE_PERIOD_EXCEEDED",
      actorName: "System Automated Scheduler",
      actorRole: "SYSTEM",
      timestamp: "2026-09-11T00:01:00.000Z",
      previousState: { status: "PENDING_HOD" },
      newState: { status: "LOCKED_NOT_SUBMITTED", isAutoLocked: true },
      remarks: "Grace period expired on 10th Sep. Form auto-locked and flagged as Not Submitted for HR visibility.",
      ip: "127.0.0.1"
    },
    {
      id: "AUD-M3-004",
      entityType: "FACULTY_ECM_APPRAISAL",
      entityId: "ECM-2026-F03",
      action: "DISCREPANCY_FLAGGED_AND_RETURNED",
      actorName: "Director - R&D",
      actorRole: "RD_CELL",
      timestamp: "2026-09-24T14:30:00.000Z",
      previousState: { status: "UNDER_VERIFICATION" },
      newState: { status: "DISCREPANCY_RETURNED_TO_FACULTY" },
      remarks: "DRDO grant document lacking Annexure B endorsement. Returned to Prof. Subhashis Ray for resubmission.",
      ip: "192.168.2.45"
    }
  ]
};

module.exports = initialData;
