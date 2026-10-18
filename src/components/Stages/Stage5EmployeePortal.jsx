import React from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Layers,
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function Stage5EmployeePortal() {
  const {
    employees,
    selectedEmployeeId,
    setSelectedEmployeeId,
    activeEmployee,
    toggleChecklistItem,
    setCurrentStep,
  } = useEnterprise();

  const isHighValue = activeEmployee.overallScore >= 80;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Top Banner & Employee Perspective Persona Switcher */}
      <div className="p-6 rounded-2xl bg-neutral-50 border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-600 font-bold">
              <ShieldCheck className="w-4 h-4 text-neutral-900" />
              <span>Employee Transparency &amp; Growth Portal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-0.5">
              What the Employee Sees: 100% Objective Feedback
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              No closed-door politics. Every promotion or performance plan is fully open and justified with real work receipts.
            </p>
          </div>

          <span className="text-[11px] font-mono bg-white border border-gray-300 text-neutral-700 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            Live Employee Viewpoint
          </span>
        </div>

        {/* View Switcher: Aarav vs Liam Quick Buttons */}
        <div className="pt-2 border-t border-gray-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-neutral-700 mr-2">
            Switch View Persona:
          </span>

          <button
            onClick={() => setSelectedEmployeeId('emp-1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              selectedEmployeeId === 'emp-1'
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-700 border-gray-300 hover:bg-neutral-100'
            }`}
          >
            <span>Aarav Sharma</span>
            <span className="text-[10px] opacity-80">(Promoted • 94/100)</span>
          </button>

          <button
            onClick={() => setSelectedEmployeeId('emp-2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              selectedEmployeeId === 'emp-2'
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-700 border-gray-300 hover:bg-neutral-100'
            }`}
          >
            <span>Liam O'Connor</span>
            <span className="text-[10px] opacity-80">(Needs Improvement • 41/100)</span>
          </button>

          {/* Other employees dropdown */}
          <div className="ml-auto flex items-center gap-1.5 text-xs">
            <span className="text-neutral-500 hidden md:inline">Or other personnel:</span>
            <select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-neutral-800 font-medium focus:outline-none cursor-pointer"
            >
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.overallScore}/100)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SECTION A: Official Decision & Justification Ledger */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="flex items-center gap-4">
            <img
              src={activeEmployee.avatar}
              alt={activeEmployee.name}
              className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
            />
            <div>
              <h3 className="text-xl font-extrabold text-neutral-900">
                {activeEmployee.name}
              </h3>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                {activeEmployee.roleName} • Current Level: <strong className="text-neutral-900">{activeEmployee.currentLevel}</strong>
              </p>
              <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-neutral-800 font-bold">
                Cycle: {activeEmployee.reviewPeriod}
              </span>
            </div>
          </div>

          <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block">
              Official Determination
            </span>
            <div className="text-lg font-extrabold text-neutral-900 mt-0.5">
              {activeEmployee.status}
            </div>
            <span className="text-xs font-mono text-neutral-600 block mt-0.5">
              Compensation: {activeEmployee.salaryHike}
            </span>
          </div>
        </div>

        {/* Manager Justification Note */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold block">
            Manager Review Justification &amp; Rationale:
          </span>
          <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans italic">
            "{activeEmployee.justificationNote}"
          </div>
        </div>

        {/* Transparent Telemetry Evidence Receipts */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold">
              Audited Telemetry Receipts (Figma, GitHub, Buganizer, Chat):
            </span>
            <span className="text-[11px] font-mono text-neutral-500">
              Zero-Favoritism Verification
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeEmployee.evidenceReceipts.map((rec, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-neutral-50 border border-gray-200 text-xs flex items-start gap-2.5"
              >
                <FileText className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block font-mono text-[11px]">
                    {rec.tool}
                  </span>
                  <span className="text-neutral-600 leading-tight block mt-0.5">
                    {rec.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION B: Granular Work Feedback (Where You Excelled vs. Where You Lost Points) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-5">
        <div>
          <h3 className="text-base font-bold text-neutral-900">
            Granular Work Feedback Breakdown
          </h3>
          <p className="text-xs text-neutral-500">
            Specific areas where craft hygiene accelerated or hindered team delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Where You Excelled */}
          <div className="p-5 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-900 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900" />
              Where You Excelled This Cycle:
            </span>
            <p className="text-xs text-neutral-700 leading-relaxed font-sans">
              {activeEmployee.feedback.excelled}
            </p>
          </div>

          {/* Where You Lost Points */}
          <div className="p-5 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-900 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-neutral-900" />
              Where Points Were Deducted:
            </span>
            <p className="text-xs text-neutral-700 leading-relaxed font-sans">
              {activeEmployee.feedback.lostPoints}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION C: Clear Next-Quarter Expectations & Growth Checklist */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Next-Quarter Growth Roadmap (Q1 2027 Goals)
            </h3>
            <p className="text-xs text-neutral-500">
              Clear, achievable milestones generated by Gemini 2.5 to qualify for the next level or raise.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded">
            Interactive Checklist
          </span>
        </div>

        <div className="space-y-2.5">
          {activeEmployee.growthChecklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(activeEmployee.id, item.id)}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                item.done
                  ? 'bg-neutral-100 border-neutral-300 text-neutral-900 line-through'
                  : 'bg-white border-gray-200 hover:border-gray-400 text-neutral-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                  item.done
                    ? 'bg-neutral-900 border-neutral-900 text-white'
                    : 'border-gray-400 bg-white'
                }`}
              >
                {item.done && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
              <span className="leading-relaxed font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentStep(4)}
          className="px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 font-semibold text-xs transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Manager Workspace</span>
        </button>

        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Over at Step 1</span>
        </button>
      </div>
    </div>
  );
}
