# The Neotia University (TNU) — Module III Standalone Performance Management Automation System

> **Official Standalone Web Production Release — Complete SOP Multi-Track Implementation**  
> *Statutory Compliance: UGC Regulations, NAAC Quality Benchmarks & University Governance SOPs*

---

## 🏛️ Executive Summary & Architecture Overview

The **Module III — Performance Management Automation System** is an end-to-end, real-time, auditable university governance platform engineered specifically for **The Neotia University**. It digitizes, automates, and interlinks every performance evaluation milestone across Group-D staff, General non-faculty employees, and Faculty members without manual paperwork or redundant data entry.

The system is built as a complete **standalone application** matching the official architecture blueprint from the workflow flowchart and requirement brief:
1. **Track A**: Group-D / Band I Employees (Monthly Evaluation SOP, VP Admin Sign-off, 7th/10th Grace Deadlines, Auto-Lock, Annual Reports & Slabs)
2. **Track B**: General Employees Non-Faculty (30-Day Onboarding KRA/KPI Goal-Setting, HR & Mgmt Verification Locking, Q1–Q4 Quarterly Reviews, Post-Q4 Module I Direct Feed)
3. **Track C**: Faculty Members (Auto-Eligibility Determination, Monthly 10th Registrar Routing, 7-Day Self-Appraisal SLA, Multi-Stakeholder Verification with Discrepancy Return Loops, ECM Live Scoring on TNU Protocol 300 Pts, Official Order Letters)
4. **Pillar D**: Central Digital Employee Personal File (Dossier) Integration
5. **Pillar E**: Immutable Timestamped Audit Trail & Version History
6. **Pillar F**: Configurable Real-Time Reporting Engine with CSV, JSON & Print/PDF export
7. **Pillar G**: Central Employee Database & Interactive Time Machine Simulator

---

## 🧭 Multi-Track Workflow Breakdown

### 🔹 Track A: Group-D / Band I Employees
1. **Evaluation Form Repository**:
   - Standardized role-specific forms for Office Attendants, Laboratory Bearers, Commercial Drivers, Campus Security Guards, Housekeeping.
   - Captures role-specific KPIs (punctuality, task turnaround, equipment maintenance) and competencies (decorum, honesty, teamwork).
   - Configurable and version-controlled by HR (with audit trail).
2. **Monthly Routing to HODs**:
   - System automatically routes forms to departmental HODs based on the Central Employee Database hierarchy.
3. **HOD Completes & Submits Online**:
   - Rates KPIs (1 to 5) and competencies (1 to 5), records concrete positive and negative observations, and submits online.
4. **Vice President – Administration Approval**:
   - Formally reviewed and signed off by VP – Administration before final archiving into the employee's personal dossier.
5. **Submission Timeline & Auto-Lock Rules**:
   - Due date: **7th of every month**.
   - Grace period: **3 additional days (up to the 10th)**.
   - **Auto-Lock Mechanism**: Forms not submitted by the 10th are automatically locked, marked "Not Submitted", with reasons visible to HR in the overdue register.
6. **Monthly Performance Reports**:
   - Automatic collation of all approved monthly forms into pre-defined university report templates without manual compilation.
7. **Annual Report Generation**:
   - Automatically triggered upon completion of 1 year of employment based on Date of Joining in Central DB.
   - Collates 12 monthly reports and computes the weighted average score.
8. **Compensation Review Workflow & Mandatory Probation Check**:
   - Applies predefined compensation slabs against weighted performance score:
     - Slab A+ (Score ≥ 90%): +12% Merit Increment
     - Slab A (Score 80-89%): +10% Standard Merit
     - Slab B (Score 70-79%): +7% Regular Revision
     - Slab C (Score 55-69%): +4% Minimal Revision
     - Slab D (Score < 55%): Unsatisfactory / Warning (No Increment)
   - **Mandatory Policy Rule**: The system strictly validates probation status from Central DB (`probationStatus`). The compensation-change workflow CANNOT be activated unless probation period is marked as mandatorily completed.

---

### 🔹 Track B: General Employees (Non-Faculty)
1. **Stage 1 (Onboarding & 30-Day Goal Setting)**:
   - System triggers intimation on joining. Employee and Reporting Authority enter KRAs, metrics, targets, and weights (totaling 100%) within 30 days of DOJ.
   - Dual verification by HR and Management before goals are permanently locked (`MGMT_LOCKED`).
2. **Stage 2 (Quarterly Review Cycles Q1–Q4)**:
   - Milestone notifications at 90, 180, 270, and 360 days from DOJ.
   - Employee submits review with achievements, self-score, and supporting document links within 15 days (auto-reminder after 20 days if pending).
   - Reporting Authority verifies within 7-day SLA.
   - HR reviews and records observations.
   - Management endorses and approves quarter closure.
3. **Stage 3 (Annual Appraisal & Module I Integration)**:
   - Post-Q4 compilation collates all 4 quarters into an overall composite annual rating.
   - HR formulates promotion or increment recommendation; Management sanctions decision.
   - **Close-the-Loop Integration**: 1-Click "Sync to Module I" feeds the approved service change directly into the Central Employee Database without duplicate manual re-entry.

---

### 🔹 Track C: Faculty Members (ECM Protocol)
1. **Stage 1 (Eligibility Check)**:
   - Auto-identifies faculty members who completed probation AND have ≥ 12 months service since DOJ or previous appraisal.
2. **Stage 2 (Monthly 10th Registrar Routing)**:
   - Auto-generates eligible faculty list and routes from HR to Office of the Registrar by the **10th of every month**.
3. **Stage 3 (Self-Appraisal Submission - 7 Working Days SLA)**:
   - Auto-issues form capturing Teaching/Pedagogy, Research Publications (Scopus/IEEE), Sponsored Research Grants, and Institutional Contribution.
4. **Stage 4 (Multi-Stakeholder Verification & Discrepancy Return Loop)**:
   - Verified by School Dean, R&D Cell, Placement Cell, and HR Dept.
   - **Discrepancy Loop**: Any stakeholder can flag an issue (e.g. missing grant co-PI endorsement), returning the form to faculty for correction and resubmission.
5. **Stage 5 (ECM Scheduling)**:
   - Registrar schedules monthly ECM with Vice-Chancellor (Chair), Registrar (Secretary), Dean, and External Subject Expert (from IIT/ISI).
6. **Stage 6 (Digital ECM Score Sheet - TNU Protocol 300 Pts)**:
   - Teaching & Pedagogy: max 100 points
   - Research & Grants: max 100 points
   - Consultancy: max 50 points
   - Institutional Development: max 50 points
   - Total: 300 points (calculates TNU percentage).
7. **Stage 7 (Management Decision & Implementation)**:
   - Supports 7 statutory outcomes: Confirmation, Extension of probation, Rewards & recognition, Compensation revision, Additional responsibilities, PIP, Reprimand.
   - **Auto-generates official university order letter** with letterhead and reference number (e.g. `TNU/REG/ECM/2026/842`).
   - Automatically routes to HR and Payroll for execution in next salary cycle.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Backend API** | Node.js + Express | RESTful API, background scheduler daemon, ACID JSON database persistence |
| **Frontend SPA** | React 19 + Vite 8 + Tailwind CSS v4 | High-performance responsive UI, Lucide icons, interactive modals, print stylesheet |
| **Database** | File-based JSON Persistence | Atomic writes with backup in `data/module3_db.json`, auto-seed engine |
| **Containerization** | Multi-Stage Dockerfile + Compose | Production container with non-root security and volume mounts |

---

## 🔐 Authentication, Dev Root Account & Institutional RBAC Hierarchy

Module III enforces a strict institutional Role-Based Access Control (RBAC) hierarchy. Every account has permissions strictly according to its statutory authority:

| Clearance Level | Role Key | Persona / Title | Default Login | Permissions & Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Level 0 (Root)** | `DEV_ADMIN` | **Er. System Developer (Super-Admin)** | `dev` / `dev` | **Full Unrestricted Root Authority**: All tracks, bypass locks, trigger scheduler, reset DB, masquerade as any persona on the fly, and access the dedicated **⚡ Dev Console**. |
| **Level 1 (Apex)** | `MANAGEMENT` | **Prof. (Dr.) Arunansu Haldar** (Vice-Chancellor) | `vc` / `vc` | Executive Dashboard, ECM Chair, Sanctions 7 Statutory ECM Outcomes, Executive Reports & Audit Trail. |
| **Level 2 (Statutory)** | `REGISTRAR` | **Dr. Sujoy Biswas** (Registrar) | `registrar` / `reg` | Receives 10th Monthly Faculty list, schedules ECM with external IIT expert, issues official gazette orders. |
| **Level 2 (Statutory)** | `HR_ADMIN` | **Ms. Sunita Sharma** (Head - HR) | `hr` / `hr` | Unlocks 3-day Group-D extensions, verifies KRAs, quarterly HR review, 1-Click Module I sync, Central DB probation toggle. |
| **Level 2 (Statutory)** | `VICE_PRESIDENT_ADMIN` | **Mr. Amitabh Roy** (VP - Administration) | `vpadmin` / `vp` | Final formal sign-off on Group-D monthly evaluations into digital personal dossiers. |
| **Level 3 (Leadership)** | `DEAN` | **Prof. (Dr.) Alok Chatterjee** (Dean - Science & Tech) | `dean` / `dean` | Academic verification on faculty grants/publications, ECM scoring member. |
| **Level 3 (Leadership)** | `HOD` | **Dr. Debasis Roy** (HOD - CSE) | `hod` / `hod` | Rates monthly Group-D KPIs/competencies (1-5), sets departmental staff KRAs, Reporting Authority 7-day quarterly assessment. |
| **Level 4 (Practitioner)** | `FACULTY` | **Dr. Arindam Mukherjee** (Associate Professor) | `faculty` / `faculty` | 7-day self-appraisal form submission, discrepancy return response, views own digital dossier. |
| **Level 4 (Practitioner)** | `GENERAL_EMPLOYEE` | **Ms. Ananya Roy** (Executive Assistant) | `staff` / `staff` | 30-day onboarding KRA setup, Q1-Q4 quarterly self-scores & evidence attachments. |
| **Level 5 (Support)** | `GROUP_D` | **Suraj Paswan** (Campus Security & Attendant) | `staff_d` / `staffd` | Views own monthly scorecards and annual increment slabs. (Evaluated by HOD, cannot self-rate). |

---

## 🚀 Quick Start Guide

### 1. Launch on Windows (1-Click)
Double-click `start.bat` in the project root:
```cmd
start.bat
```
This launches the backend server and opens `http://localhost:5000` in your default browser.

### 2. Launch via NPM
```bash
# Start backend server (serves both API and pre-built frontend)
npm start

# Or develop client with hot reload:
npm run client
```

### 3. Launch with Docker
```bash
docker compose up -d --build
```
Access the application at `http://localhost:5000`.

---

## 🧪 Interactive Walkthrough Scenarios to Test

1. **Test Dedicated Login Portal & Dev Root Access**:
   - Access `http://localhost:5000`.
   - The Institutional Login Page displays the grand university entrance canopy, Sanskrit motto *"ज्ञानम् आत्म प्रदीपाय"*, and credentials form.
   - Click the prominent **"⚡ System Developer & Super-Admin (Launch Root)"** button.
   - You are logged in with Root Clearance Level 0! Notice the **"⚡ Dev Console"** tab and the ability to operate across all tracks without restriction.

2. **Test Role Hierarchy & Access Denied Protection**:
   - In Header profile menu, switch persona to **Dr. Arindam Mukherjee (Faculty Member)**.
   - Try clicking **Track A: Group-D** or **Track G: Central DB**.
   - Notice the **"Statutory Security Clearance Gate"** renders an informative card stating that Faculty cannot modify Group-D or central employee records, showing authorized roles with 1-click switch options.

3. **Test Group-D Auto-Lock & HR Unlock**:
   - In Header Time Machine, click **"11th (Auto-Lock)"**.
   - Switch to **Track A -> Deadlines & Auto-Lock Monitor**. Notice overdue unsubmitted forms are automatically locked.
   - Switch to **Ms. Sunita Sharma (HR)** or **Developer**, and click **"HR Unlock"** to grant an authorized 3-day extension.

4. **Test Mandatory Probation Check in Compensation Review**:
   - Go to **Track A -> Annual Reports & Slabs**.
   - Inspect **Suraj Paswan (Campus Security Guard)** who is marked as `IN_PROBATION`.
   - Click **"Test Probation Gate"** — the system strictly enforces the SOP policy rule and prevents compensation review from activating!
   - Navigate to **Pillar G: Central DB**, click **"Toggle: Mark COMPLETED"** (requires HR or Dev role).
   - Return to Track A and observe that the compensation review workflow is now unlocked!

5. **Test Faculty Discrepancy Return Loop**:
   - Go to **Track C: Faculty ECM -> Self-Appraisal & Verification Pipeline**.
   - View **Prof. Subhashis Ray** — R&D Cell flagged a discrepancy regarding grant endorsements.
   - As faculty, review the feedback and click **"Resubmit Corrected Docs"** to reactivate verification.

6. **Test 1-Click Module I Direct Feed (Closing the Loop)**:
   - Go to **Track B: General Staff -> Annual Appraisal & Module I Feed**.
   - View **Ms. Sneha Mukherjee** who completed all 4 quarters.
   - Click **"Sync to Module I Central DB"** — the system generates change order `CR-2026-002`, updates Sneha's salary in the Central Database, and logs the service integration event!

7. **Test Official Letter Generation & Print**:
   - Go to **Track C: Faculty ECM -> Management Outcomes & Official Letters**.
   - Click **"View Official Letter"** on Prof. Alok Chatterjee's completed ECM.
   - The formal University Letterhead order appears with reference number, ready for 1-click browser printing / PDF download.

---

## AUTHOR
- **Project Lead**: **Abhishek Basu**
- **GitHub**: [DevAbhay2003](https://github.com/DevAbhay2003?tab=repositories)
- **LinkedIn**: [https://linkedin.com/in/your-profile](https://www.linkedin.com/in/abhishek-basu-68b1b1342/)
- **Email**: devabhishekbasu03@gmail.com
