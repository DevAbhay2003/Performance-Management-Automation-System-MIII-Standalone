import React, { useState, useEffect } from 'react';
import { X, Printer, Download, Award, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function OfficialLetterModal({ isOpen, onClose, letterRef }) {
  const [letterData, setLetterData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (letterRef && isOpen) {
      loadLetter();
    }
  }, [letterRef, isOpen]);

  const loadLetter = async () => {
    setLoading(true);
    try {
      const data = await api.getFacultyLetter(letterRef);
      setLetterData(data);
    } catch (err) {
      console.error('Failed to load letter:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="px-6 py-3 bg-slate-900 text-white flex items-center justify-between no-print border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold">University Gazette & Official Order Letter</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> Print Letter / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable University Letter Body */}
        <div className="p-8 sm:p-12 overflow-y-auto flex-1 bg-white print-page text-slate-900 text-sm leading-relaxed">
          {loading || !letterData ? (
            <div className="p-12 text-center text-slate-500 text-xs">Loading official letter from central records...</div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Formal University Letterhead */}
              <div className="text-center border-b-2 border-slate-900 pb-5">
                <div className="flex justify-center mb-2">
                  <img
                    src="/assets/tnu-official-logo.jpg"
                    alt="The Neotia University"
                    className="h-16 w-auto object-contain rounded-md shadow-xs bg-white p-0.5 border border-slate-200"
                  />
                </div>
                <div className="text-[10px] font-extrabold tracking-widest text-amber-700 uppercase">
                  Ambuja Neotia Group
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-wide uppercase text-slate-950">
                  THE NEOTIA UNIVERSITY
                </h1>
                <div className="text-xs font-serif italic text-blue-900 font-semibold my-0.5">
                  "ज्ञानम् आत्म प्रदीपाय" • Knowledge for Self-Illumination
                </div>
                <p className="text-[11px] text-slate-600 font-semibold tracking-wider uppercase">
                  Established by West Bengal Act XXIII of 2014 • Recognized by UGC under Sec. 2(f)
                </p>
                <p className="text-[10px] text-slate-500">
                  Main Campus: Sarisa, Diamond Harbour Road, 24 Parganas (South), West Bengal - 743368
                </p>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-widest mt-2 bg-slate-100 py-1 rounded">
                  Office of the Registrar • Evaluation Committee Meeting Secretariat
                </div>
              </div>

              {/* Reference & Date */}
              <div className="flex justify-between items-center text-xs font-medium text-slate-700">
                <div>
                  <strong>Order Ref No:</strong>{' '}
                  <span className="font-mono font-bold text-slate-900">{letterData.letterReferenceNumber}</span>
                </div>
                <div>
                  <strong>Date:</strong>{' '}
                  <span className="font-semibold text-slate-900">
                    {new Date(letterData.issueDate || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Addressee */}
              <div className="text-xs space-y-1">
                <div className="font-bold text-slate-900 text-sm">To:</div>
                <div className="font-bold text-slate-900">{letterData.facultyName}</div>
                <div className="text-slate-700">{letterData.designation}</div>
                <div className="text-slate-700">{letterData.department}</div>
                <div className="text-slate-700">The Neotia University</div>
              </div>

              {/* Subject */}
              <div className="p-3 bg-slate-50 border-l-4 border-slate-900 text-xs font-bold text-slate-900">
                SUBJECT: OFFICIAL NOTIFICATION OF EVALUATION COMMITTEE MEETING (ECM) PERFORMANCE APPRAISAL OUTCOME
              </div>

              {/* Letter Paragraphs */}
              <div className="text-xs text-slate-800 space-y-3 leading-relaxed text-justify">
                <p>
                  Dear {letterData.facultyName},
                </p>
                <p>
                  We are pleased to communicate that based on the statutory Annual Performance Appraisal evaluated under the University Performance Management Automation System (Module III) and formally conducted by the <strong>Statutory Evaluation Committee Meeting (ECM)</strong>, your credentials, teaching pedagogy, research publication citations, sponsored grants, and institutional contributions have been thoroughly appraised.
                </p>
                <p>
                  The Evaluation Committee recorded a composite score of <strong>{letterData.scorePercentage}%</strong> on the configured <strong>TNU Protocol Parameters (300 Point Scale)</strong>.
                </p>
                <p>
                  Consequently, upon recommendation of the Evaluation Committee and approval by the <strong>Vice-Chancellor / Senior Management</strong>, the competent authority is pleased to sanction the following outcome:
                </p>
              </div>

              {/* Formal Outcome Box */}
              <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-700">Sanctioned Outcome Category:</span>
                  <span className="font-black text-indigo-900 text-sm">{letterData.decisionType}</span>
                </div>
                {letterData.newDesignation && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Designation Conferred:</span>
                    <span className="font-bold text-slate-900">{letterData.newDesignation}</span>
                  </div>
                )}
                {letterData.newSalary && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Revised Monthly Compensation:</span>
                    <span className="font-bold text-emerald-800 text-sm">₹{letterData.newSalary.toLocaleString()} / month</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Implementation Salary Cycle:</span>
                  <span className="font-semibold text-slate-900">{letterData.effectiveMonth}</span>
                </div>
              </div>

              <div className="text-xs text-slate-800 space-y-2">
                <p>
                  <strong>Management Remarks:</strong> "{letterData.remarks || 'Sanctioned by competent authority.'}"
                </p>
                <p>
                  This official order is automatically recorded in your Central Digital Personal Dossier and routed directly to the Department of Human Resources & Finance/Payroll for timely execution.
                </p>
                <p className="pt-2">
                  The University congratulates you on your performance and looks forward to your continued dedication toward institutional academic excellence.
                </p>
              </div>

              {/* Signatures */}
              <div className="pt-8 flex justify-between items-end text-xs">
                <div>
                  <div className="font-semibold text-slate-600 mb-1">Approved by:</div>
                  <div className="font-bold text-slate-950">{letterData.decidedBy || 'Prof. (Dr.) Arunansu Haldar'}</div>
                  <div className="text-slate-600 text-[11px]">Vice-Chancellor</div>
                  <div className="text-slate-500 text-[10px]">The Neotia University</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-slate-600 mb-1">Issued by Authority:</div>
                  <div className="font-bold text-slate-950">Dr. Sujoy Biswas</div>
                  <div className="text-slate-600 text-[11px]">Registrar & Secretary - ECM</div>
                  <div className="text-slate-500 text-[10px]">Office of the Registrar • The Neotia University</div>
                </div>
              </div>

              {/* Carbon Copy */}
              <div className="pt-6 border-t border-slate-200 text-[10px] text-slate-500 space-y-0.5">
                <div><strong>Copy forwarded for information and statutory record to:</strong></div>
                <div>1. Personal File of {letterData.facultyName} (Central Employee Database Dossier)</div>
                <div>2. Head - Human Resources & Compensation Directorate</div>
                <div>3. Finance Officer & Payroll Disbursal Section</div>
                <div>4. Concerned Dean of School / Academic Secretariat</div>
              </div>

            </div>
          )}
        </div>

        {/* Footer (Hidden on print) */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end no-print">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
}
