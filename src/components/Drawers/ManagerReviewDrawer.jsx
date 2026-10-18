import React, { useState, useEffect } from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  ArrowRight,
  TrendingUp,
  FileText,
  UserCheck,
  Sparkles,
  RotateCcw,
  Sliders,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function ManagerReviewDrawer() {
  const {
    activeReviewEmployee,
    setActiveReviewEmployeeId,
    recalculateScore,
    publishFinalDecision,
  } = useEnterprise();

  if (!activeReviewEmployee) return null;

  const emp = activeReviewEmployee;

  // Local state for interactive overrides & manager feedback note
  const [alerts, setAlerts] = useState(emp.ambiguousAlerts || []);
  const [managerNote, setManagerNote] = useState(emp.managerContextNote || '');
  const [selectedDecision, setSelectedDecision] = useState(emp.decisionCategory || 'promoted');
  const [hasRecalculated, setHasRecalculated] = useState(false);

  // Sync when activeReviewEmployee changes
  useEffect(() => {
    setAlerts(emp.ambiguousAlerts || []);
    setManagerNote(emp.managerContextNote || '');
    setSelectedDecision(emp.decisionCategory || 'promoted');
    setHasRecalculated(emp.verificationStatus === 'verified');
  }, [emp]);

  const handleToggleAlertOverride = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, isOverridden: !a.isOverridden } : a))
    );
  };

  const handleRecalculateClick = () => {
    recalculateScore(emp.id, alerts, managerNote);
    setHasRecalculated(true);
  };

  const handlePublishClick = () => {
    publishFinalDecision(emp.id, selectedDecision, managerNote);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white border border-gray-300 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="p-6 border-b border-gray-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={emp.avatar}
              alt={emp.name}
              className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-neutral-900">{emp.name}</h2>
                <span className="text-[11px] font-mono bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded font-bold">
                  {emp.aid}
                </span>
                <span className="text-[11px] font-mono bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded font-bold">
                  {emp.currentLevel}
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-medium mt-0.5">
                {emp.roleName} • Target: <strong className="text-neutral-900">{emp.targetLevel} Senior</strong>
              </p>
              <div className="text-[11px] text-neutral-500 font-mono mt-1 flex items-center gap-2">
                <span>Cycle: {emp.reviewPeriod}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                  {emp.mcpSyncStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Dual Score Callout: Provisional vs Leader Verified */}
          <div className="flex items-center gap-4 self-start sm:self-auto">
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                Provisional AI Score
              </span>
              <div className="text-xl font-extrabold font-mono text-neutral-500">
                {emp.provisionalScore}
                <span className="text-xs text-neutral-400 font-normal">/100</span>
              </div>
            </div>

            <div className="w-px h-8 bg-gray-200" />

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-900 font-bold block">
                Leader-Verified Score
              </span>
              <div className="text-3xl font-extrabold font-mono text-neutral-900">
                {emp.finalScore}
                <span className="text-xs text-neutral-400 font-normal">/100</span>
              </div>
            </div>

            <button
              onClick={() => setActiveReviewEmployeeId(null)}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable 3-Section Evaluation Workspace Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 bg-[#F8F9FA] flex-1">
          {/* ========================================================= */}
          {/* SECTION 1: MCP Workflow Data Fetched via AID */}
          {/* ========================================================= */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                  Section 1 • Automated Telemetry
                </span>
                <h3 className="text-base font-bold text-neutral-900">
                  MCP Workflow Data Fetched via {emp.aid}
                </h3>
              </div>
              <span className="text-xs font-mono bg-neutral-100 border border-neutral-300 text-neutral-700 px-2.5 py-1 rounded">
                Live Tool Telemetry Ingress
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {emp.mcpStages.map((st, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-neutral-50 border border-gray-200 text-xs flex flex-col justify-between space-y-2"
                >
                  <div>
                    <span className="font-bold text-neutral-900 block font-mono text-[11px] mb-1">
                      {st.stageName}
                    </span>
                    <p className="text-neutral-600 leading-relaxed font-sans">{st.evidence}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex items-center justify-between font-mono text-[10px]">
                    <span className="font-bold text-neutral-900">{st.metric}</span>
                    <span className="px-1.5 py-0.5 rounded bg-white border border-gray-300 text-neutral-700 font-semibold">
                      {st.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION 2: AI Draft Assumptions & Missing Context Alerts */}
          {/* ========================================================= */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-5 shadow-xs">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                Section 2 • AI Inference Layer
              </span>
              <h3 className="text-base font-bold text-neutral-900">
                AI Draft Assumptions: Value Added vs. Detected Gaps
              </h3>
              <p className="text-xs text-neutral-500 italic mt-0.5">
                "Based on tool data for {emp.reviewPeriod}, here are my draft assumptions:"
              </p>
            </div>

            {/* Value vs Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Value Added */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
                <span className="font-bold text-neutral-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900" />
                  Assumed Value Added:
                </span>
                <ul className="space-y-1.5 text-neutral-700">
                  {emp.assumedValue.map((v, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">•</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detected Gaps */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
                <span className="font-bold text-neutral-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-neutral-900" />
                  Assumed Gaps / Friction:
                </span>
                <ul className="space-y-1.5 text-neutral-700">
                  {emp.assumedGaps.map((g, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ⚠️ MISSING CONTEXT / AMBIGUOUS TOOL DATA ALERTS (Crucial Feature!) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-neutral-900" />
                <span>⚠️ Missing Context / Ambiguous Tool Data Alerts (Requires Manager Input)</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Model Context Protocol (MCP) data alone cannot see offline discussions, emergency client pivots, or verbal leadership directives. Review and resolve the ambiguous points below:
              </p>

              <div className="space-y-3 pt-1">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-xl bg-neutral-50 border border-neutral-300 space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-neutral-900 text-sm">{alert.title}</h4>
                        <p className="text-neutral-700 mt-1 leading-relaxed">{alert.description}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-white border border-gray-300 px-2 py-0.5 rounded text-neutral-800 shrink-0 font-bold">
                        {alert.penaltyPoints} Pts Impact
                      </span>
                    </div>

                    {/* Radio / Toggle Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
                      <button
                        type="button"
                        onClick={() => handleToggleAlertOverride(alert.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          !alert.isOverridden
                            ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                            : 'bg-white text-neutral-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            readOnly
                            checked={!alert.isOverridden}
                            className="accent-neutral-900"
                          />
                          <span className="text-xs leading-snug">{alert.aiAssumptionText}</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleAlertOverride(alert.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          alert.isOverridden
                            ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                            : 'bg-white text-neutral-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            readOnly
                            checked={alert.isOverridden}
                            className="accent-neutral-900"
                          />
                          <span className="text-xs leading-snug">{alert.overrideOptionText}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION 3: Manager Takeover, Verification & Final Rating */}
          {/* ========================================================= */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-6 shadow-xs">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                Section 3 • Human-in-the-Loop Override
              </span>
              <h3 className="text-base font-bold text-neutral-900">
                Manager Takeover, Context Verification &amp; Final Rating Calculation
              </h3>
              <p className="text-xs text-neutral-500">
                Add real-world qualitative context and recalculate the final score before publishing.
              </p>
            </div>

            {/* Qualitative Feedback Text Area */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-neutral-800 font-bold mb-1.5">
                Manager Qualitative Context (Explains real-world offline factors &amp; unblocks)
              </label>
              <textarea
                rows={3}
                value={managerNote}
                onChange={(e) => setManagerNote(e.target.value)}
                placeholder="Enter real-world manager context that tool telemetry missed..."
                className="w-full bg-neutral-50 border border-gray-300 rounded-xl p-3.5 text-xs text-neutral-900 leading-relaxed font-sans focus:outline-none focus:border-neutral-900 focus:bg-white"
              />
            </div>

            {/* Recalculate Rating Button */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-bold text-neutral-900 text-xs block">
                  Step A: Re-calibrate AI Score with Manager Context
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Current Score: {emp.finalScore}/100 • Overrides Applied: {alerts.filter((a) => a.isOverridden).length}
                </span>
              </div>

              <button
                type="button"
                onClick={handleRecalculateClick}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Verify Context &amp; Recalculate AI Rating</span>
              </button>
            </div>

            {/* Final Decision Selector */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs uppercase font-mono tracking-wider text-neutral-800 font-bold">
                Step B: Ratify Final Talent Determination
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDecision('promoted')}
                  className={`p-4 rounded-xl border text-left text-xs transition-all ${
                    selectedDecision === 'promoted'
                      ? 'bg-neutral-900 text-white border-neutral-900 font-bold shadow-xs'
                      : 'bg-white text-neutral-800 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Approve Promotion to {emp.targetLevel} Senior</span>
                  </div>
                  <p className={`text-[11px] mt-1 ${selectedDecision === 'promoted' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    15% Senior Merit Bump Approved
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDecision('hike')}
                  className={`p-4 rounded-xl border text-left text-xs transition-all ${
                    selectedDecision === 'hike'
                      ? 'bg-neutral-900 text-white border-neutral-900 font-bold shadow-xs'
                      : 'bg-white text-neutral-800 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Approve 15% Salary Hike</span>
                  </div>
                  <p className={`text-[11px] mt-1 ${selectedDecision === 'hike' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Merit increase at current level tier
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDecision('retained')}
                  className={`p-4 rounded-xl border text-left text-xs transition-all ${
                    selectedDecision === 'retained'
                      ? 'bg-neutral-900 text-white border-neutral-900 font-bold shadow-xs'
                      : 'bg-white text-neutral-800 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Assign Guided Improvement Plan</span>
                  </div>
                  <p className={`text-[11px] mt-1 ${selectedDecision === 'retained' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Retain at {emp.currentLevel} with targeted coaching
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-gray-200 flex items-center justify-between gap-4">
          <button
            onClick={() => setActiveReviewEmployeeId(null)}
            className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs transition-colors"
          >
            Cancel / Save as Draft
          </button>

          <button
            onClick={handlePublishClick}
            className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-98"
          >
            <UserCheck className="w-4 h-4" />
            <span>Close Review &amp; Publish to Employee Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
