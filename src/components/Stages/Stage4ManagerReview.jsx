import React, { useState, useEffect } from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Send,
  UserCheck,
  ChevronDown
} from 'lucide-react';

export default function Stage4ManagerReview() {
  const {
    employees,
    selectedEmployeeId,
    setSelectedEmployeeId,
    activeEmployee,
    publishDecisionAndGoToStep5,
    setCurrentStep,
  } = useEnterprise();

  const [selectedDecision, setSelectedDecision] = useState(
    activeEmployee.decisionCategory || 'promoted'
  );
  const [justificationNote, setJustificationNote] = useState(
    activeEmployee.justificationNote || ''
  );

  // Sync state whenever active employee changes
  useEffect(() => {
    setSelectedDecision(activeEmployee.decisionCategory || 'promoted');
    setJustificationNote(activeEmployee.justificationNote || '');
  }, [activeEmployee]);

  const handlePublish = () => {
    publishDecisionAndGoToStep5(
      activeEmployee.id,
      selectedDecision,
      justificationNote
    );
  };

  const p = activeEmployee.pillars;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header with Employee Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
            Step 4 of 5 • Manager Calibration Workspace
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Manager Evaluation &amp; Decision Workspace
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-xl leading-relaxed">
            Objective performance audit backed by real telemetry. Review the 4 pillars, ratify talent decisions, and share with 100% transparency.
          </p>
        </div>

        {/* Quick Dropdown to Switch Candidate */}
        <div className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-xs flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono text-neutral-500">Candidate:</span>
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            className="bg-transparent font-bold text-xs text-neutral-900 cursor-pointer focus:outline-none"
          >
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.currentLevel} • {emp.overallScore}/100)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Identity Header Card */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img
            src={activeEmployee.avatar}
            alt={activeEmployee.name}
            className="w-16 h-16 rounded-2xl object-cover border border-gray-200"
          />
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-xl font-bold text-neutral-900">
                {activeEmployee.name}
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-300 font-bold">
                {activeEmployee.currentLevel}
              </span>
            </div>
            <p className="text-xs text-neutral-600 font-medium mt-0.5">
              {activeEmployee.roleName}
            </p>
            <div className="text-xs text-neutral-500 font-mono mt-1">
              Review Cycle: <strong className="text-neutral-900">{activeEmployee.reviewPeriod}</strong> • Target: <span className="underline">{activeEmployee.targetLevel} Senior</span>
            </div>
          </div>
        </div>

        <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block">
            TrueImpact Score
          </span>
          <div className="text-4xl font-extrabold font-mono text-neutral-900 mt-0.5">
            {activeEmployee.overallScore}
            <span className="text-xs font-normal text-neutral-400"> / 100</span>
          </div>
          <span
            className={`inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded font-bold border ${
              activeEmployee.overallScore >= 80
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-neutral-100 text-neutral-800 border-neutral-300'
            }`}
          >
            {activeEmployee.archetype}
          </span>
        </div>
      </div>

      {/* 4 Objective AI Evaluation Pillars */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-base font-bold text-neutral-900">
            The 4 Objective AI Evaluation Pillars
          </h3>
          <p className="text-xs text-neutral-500">
            Calculated directly from Figma token bindings, Buganizer tickets, and Critique code survival.
          </p>
        </div>

        <div className="space-y-5 text-xs">
          {/* Pillar 1 */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-neutral-900">
                1. Role &amp; Level Goal Alignment
              </span>
              <span className="font-mono font-bold text-sm text-neutral-900">
                {p.goalAlignment.score}%
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-neutral-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${p.goalAlignment.score}%` }}
              />
            </div>
            <p className="text-neutral-600 leading-relaxed font-sans">
              {p.goalAlignment.summary}
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-neutral-900">
                2. Workflow &amp; Standards Hygiene (Material 3 Tokens / Code Quality)
              </span>
              <span className="font-mono font-bold text-sm text-neutral-900">
                {p.standardsHygiene.score}%
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-neutral-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${p.standardsHygiene.score}%` }}
              />
            </div>
            <p className="text-neutral-600 leading-relaxed font-sans">
              {p.standardsHygiene.summary}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-neutral-900">
                3. Downstream Handoff Clarity (Zero-Rework Score)
              </span>
              <span className="font-mono font-bold text-sm text-neutral-900">
                {p.handoffClarity.score}%
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-neutral-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${p.handoffClarity.score}%` }}
              />
            </div>
            <p className="text-neutral-600 leading-relaxed font-sans">
              {p.handoffClarity.summary}
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-neutral-900">
                4. Smart AI &amp; Human Judgment Usage
              </span>
              <span className="font-mono font-bold text-sm text-neutral-900">
                {p.aiUsageJudgment.score}%
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-neutral-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${p.aiUsageJudgment.score}%` }}
              />
            </div>
            <p className="text-neutral-600 leading-relaxed font-sans">
              {p.aiUsageJudgment.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Manager Decision Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-neutral-900">
            Manager Talent Decision &amp; Justification Note
          </h3>
          <p className="text-xs text-neutral-500">
            Select the official quarterly determination and review the AI-assisted justification.
          </p>
        </div>

        {/* 3 Decision Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setSelectedDecision('promoted')}
            className={`p-4 rounded-xl border text-left text-xs transition-all ${
              selectedDecision === 'promoted'
                ? 'bg-neutral-900 text-white border-neutral-900 font-bold shadow-sm'
                : 'bg-white text-neutral-800 border-gray-200 hover:border-gray-400 font-medium'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>Promote to {activeEmployee.targetLevel} Senior</span>
              {selectedDecision === 'promoted' && (
                <span className="text-[10px] font-mono uppercase bg-white/20 px-1.5 py-0.5 rounded">
                  Selected
                </span>
              )}
            </div>
            <p className={`text-[11px] mt-1 ${selectedDecision === 'promoted' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Approved + 15% Senior Merit Bump
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedDecision('hike')}
            className={`p-4 rounded-xl border text-left text-xs transition-all ${
              selectedDecision === 'hike'
                ? 'bg-neutral-900 text-white border-neutral-900 font-bold shadow-sm'
                : 'bg-white text-neutral-800 border-gray-200 hover:border-gray-400 font-medium'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>Approve 15% Salary Hike</span>
              {selectedDecision === 'hike' && (
                <span className="text-[10px] font-mono uppercase bg-white/20 px-1.5 py-0.5 rounded">
                  Selected
                </span>
              )}
            </div>
            <p className={`text-[11px] mt-1 ${selectedDecision === 'hike' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Merit increase without level change
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedDecision('retained')}
            className={`p-4 rounded-xl border text-left text-xs transition-all ${
              selectedDecision === 'retained'
                ? 'bg-neutral-900 text-white border-neutral-900 font-bold shadow-sm'
                : 'bg-white text-neutral-800 border-gray-200 hover:border-gray-400 font-medium'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>Retain at {activeEmployee.currentLevel} + Plan</span>
              {selectedDecision === 'retained' && (
                <span className="text-[10px] font-mono uppercase bg-white/20 px-1.5 py-0.5 rounded">
                  Selected
                </span>
              )}
            </div>
            <p className={`text-[11px] mt-1 ${selectedDecision === 'retained' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Assign Q1 growth roadmap &amp; token hygiene coaching
            </p>
          </button>
        </div>

        {/* Editable Justification Text Area */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold">
              Manager Justification Note (Pre-filled by Gemini 2.5 based on workflow evidence)
            </label>
            <span className="text-[11px] text-neutral-500 font-mono">
              Visible to Employee
            </span>
          </div>
          <textarea
            rows={4}
            value={justificationNote}
            onChange={(e) => setJustificationNote(e.target.value)}
            className="w-full bg-neutral-50 border border-gray-300 rounded-xl p-3.5 text-xs text-neutral-900 leading-relaxed font-sans focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentStep(3)}
          className="px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 font-semibold text-xs transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Roster</span>
        </button>

        <button
          onClick={handlePublish}
          className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-98"
        >
          <span>Publish Decision &amp; Share Transparent Report with Employee</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
