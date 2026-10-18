import React from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  Layers,
  TrendingUp,
  UserCheck,
  Award
} from 'lucide-react';

export default function ViewTransparencyPortal() {
  const {
    employees,
    selectedEmployeeId,
    setSelectedEmployeeId,
    activeEmployee,
    toggleChecklistItem,
  } = useEnterprise();

  const isVerified = activeEmployee.verificationStatus === 'verified';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top Banner & Persona Switcher */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-600 font-bold">
              <ShieldCheck className="w-4 h-4 text-neutral-900" />
              <span>Employee Transparency &amp; Growth View</span>
            </div>
            <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
              What the Employee Sees: 100% Justified Decision Ledger
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Shows verified tool telemetry alongside real manager context, proving decisions are objective, human-reviewed, and free of bias.
            </p>
          </div>

          <span className="text-[11px] font-mono bg-neutral-100 border border-neutral-300 text-neutral-800 px-3 py-1.5 rounded-lg self-start sm:self-auto font-semibold">
            Employee Viewpoint
          </span>
        </div>

        {/* View Switcher Pills */}
        <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-neutral-700 mr-2">
            Switch Perspective:
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

          {/* All others selector */}
          <div className="ml-auto flex items-center gap-1.5 text-xs">
            <span className="text-neutral-500 hidden md:inline">Other mapped AIDs:</span>
            <select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="bg-neutral-50 border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-neutral-800 font-medium focus:outline-none cursor-pointer"
            >
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.aid} • {e.finalScore}/100)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 100% Justified Decision Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="flex items-center gap-4">
            <img
              src={activeEmployee.avatar}
              alt={activeEmployee.name}
              className="w-16 h-16 rounded-2xl object-cover border border-gray-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-neutral-900">
                  {activeEmployee.name}
                </h3>
                <span className="text-xs font-mono bg-neutral-100 border border-neutral-300 text-neutral-800 px-2 py-0.5 rounded font-bold">
                  {activeEmployee.aid}
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-medium mt-0.5">
                {activeEmployee.roleName} • Seniority Tier: <strong className="text-neutral-900">{activeEmployee.currentLevel}</strong>
              </p>
              <span className="inline-block mt-1 text-[11px] font-mono px-2.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-neutral-800 font-bold">
                Cycle: {activeEmployee.reviewPeriod}
              </span>
            </div>
          </div>

          <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
              Official Leader Determination
            </span>
            <div className="text-xl font-extrabold text-neutral-900 mt-0.5">
              {activeEmployee.status}
            </div>
            <span className="text-xs font-mono text-neutral-600 block mt-0.5">
              Adjustment: {activeEmployee.salaryHike}
            </span>
          </div>
        </div>

        {/* Manager Context Note (Crucial for Transparency!) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-800 font-bold flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-neutral-900" />
              Manager's Verified Human Context (Why This Rating Was Approved):
            </span>
            <span className="text-[11px] font-mono text-neutral-500">
              Human-in-the-Loop Override Grounding
            </span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans italic">
            "{activeEmployee.managerContextNote}"
          </div>
        </div>

        {/* Stage-by-Stage MCP Evidence Breakdown */}
        <div className="space-y-3 pt-2">
          <span className="text-xs uppercase font-mono tracking-wider text-neutral-800 font-bold block">
            Audited MCP Tool Evidence (Objective Telemetry Receipts):
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeEmployee.mcpStages?.map((st, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-neutral-50 border border-gray-200 text-xs flex flex-col justify-between space-y-2"
              >
                <div>
                  <span className="font-bold text-neutral-900 block font-mono text-[11px] mb-1">
                    {st.stageName}
                  </span>
                  <p className="text-neutral-600 leading-relaxed">{st.evidence}</p>
                </div>
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-neutral-900">{st.metric}</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-gray-300 text-neutral-700">
                    {st.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Granular Work Feedback: Where You Excelled vs. Where You Lost Points */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-5">
        <div>
          <h3 className="text-base font-bold text-neutral-900">
            Granular Work Feedback Breakdown
          </h3>
          <p className="text-xs text-neutral-500">
            Specific areas where system hygiene accelerated or hindered team delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-900 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900" />
              Where You Excelled This Quarter:
            </span>
            <p className="text-xs text-neutral-700 leading-relaxed font-sans">
              {activeEmployee.feedback.excelled}
            </p>
          </div>

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

      {/* Clear Next-Quarter Expectations & Growth Checklist */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Clear Next-Quarter Expectations (Q1 2027 Growth Goals)
            </h3>
            <p className="text-xs text-neutral-500">
              Concrete milestones to qualify for your next level bump or salary hike.
            </p>
          </div>
          <span className="text-[11px] font-mono text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded">
            Interactive Checklist
          </span>
        </div>

        <div className="space-y-2.5">
          {activeEmployee.growthChecklist?.map((item) => (
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
    </div>
  );
}
