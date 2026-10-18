import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRESET_SCENARIOS } from '../data/initialData';
import confetti from 'canvas-confetti';
import {
  Award,
  Sparkles,
  TrendingUp,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  ShieldCheck,
  Flame,
  Search,
  Filter,
  ArrowUpRight,
  ChevronRight,
  Cpu,
  Layers,
  Clock,
  DollarSign
} from 'lucide-react';

export default function Tab4DecisionsSandbox({ onOpenEvidenceModal }) {
  const {
    selectedRole,
    activeRoleData,
    activeEmployees,
    promoteEmployee,
    approveHike,
    addToast,
    setAuditLogs,
  } = useApp();

  // Decision table filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sandbox state
  const [selectedScenarioId, setSelectedScenarioId] = useState(PRESET_SCENARIOS[0].id);
  const currentScenario =
    PRESET_SCENARIOS.find((s) => s.id === selectedScenarioId) || PRESET_SCENARIOS[0];

  const [artifactInput, setArtifactInput] = useState(currentScenario.artifactPayload);
  const [threadInput, setThreadInput] = useState(currentScenario.slackThreadPayload);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState('');
  const [auditResult, setAuditResult] = useState(null);

  // When scenario changes, update inputs and clear prior audit
  const handleSelectScenario = (scenId) => {
    setSelectedScenarioId(scenId);
    const scen = PRESET_SCENARIOS.find((s) => s.id === scenId);
    if (scen) {
      setArtifactInput(scen.artifactPayload);
      setThreadInput(scen.slackThreadPayload);
      setAuditResult(null);
    }
  };

  // Run Gemini 2.5 Multimodal Audit
  const handleRunAudit = () => {
    setIsAuditing(true);
    setAuditResult(null);

    // Step 1
    setAuditStep('Parsing role rubric from Vertex Vector DB...');

    setTimeout(() => {
      // Step 2
      setAuditStep('Analyzing visual token bindings, WCAG compliance, & AST code tree...');
    }, 500);

    setTimeout(() => {
      // Step 3
      setAuditStep('Computing downstream friction tax & Slack rework hours...');
    }, 1000);

    setTimeout(() => {
      // Step 4
      setAuditStep('Synthesizing Gemini 2.5 TrueImpact Verdict...');
    }, 1500);

    setTimeout(() => {
      setIsAuditing(false);
      setAuditStep('');

      // Look up expected verdict or compute dynamically
      const verdict = currentScenario?.expectedVerdict || {
        score: 82,
        flag: 'Standard Value Audit Completed',
        frictionHours: 1.5,
        costImpact: '+$4,200',
        violations: ['No critical blocker detected'],
        coachingBlueprint: 'Maintain steady documentation cadence.',
      };

      setAuditResult(verdict);

      // Append to Audit Logs
      setAuditLogs((prev) => [
        {
          id: 'log-' + Date.now(),
          timestamp: new Date().toISOString(),
          type: verdict.score >= 80 ? 'audit' : 'slop_flag',
          roleTag: selectedRole,
          employeeName: 'Gemini 2.5 Multimodal Evaluator',
          action: `Sandbox Audit: ${currentScenario.name}`,
          score: verdict.score,
          impact: verdict.costImpact,
          summary: `${verdict.flag}. ${verdict.violations[0]}`,
          status: verdict.score >= 80 ? 'Verified High Value' : 'High Penalty Flag',
        },
        ...prev,
      ]);

      addToast(
        'Gemini 2.5 Audit Synthesized',
        `Evaluated ${currentScenario.name} • TrueImpact Score: ${verdict.score}/100.`,
        verdict.score >= 80 ? 'success' : 'danger'
      );
    }, 2000);
  };

  // Filter employees
  const filteredEmployees = activeEmployees.filter((emp) => {
    if (searchQuery) {
      const matchName = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLevel = emp.level.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchName && !matchLevel) return false;
    }

    if (statusFilter === 'promotion') {
      return emp.status.includes('Promotion') || emp.readyForPromotion;
    }
    if (statusFilter === 'hike') {
      return emp.status.includes('Hike');
    }
    if (statusFilter === 'mentorship') {
      return emp.status.includes('Mentorship');
    }
    return true;
  });

  const triggerPromotionCelebration = (emp) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C96843', '#10B981', '#ffffff', '#F59E0B'],
    });
    promoteEmployee(emp.id);
  };

  const triggerHikeCelebration = (emp) => {
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#10B981', '#34D399', '#ffffff'],
    });
    approveHike(emp.id);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* SECTION 1: Manager Decision Table */}
      <div className="p-6 rounded-2xl bg-[#131722] border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C96843]/15 text-[#C96843] border border-[#C96843]/30 text-xs font-mono mb-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Evidence-Backed Talent Calibration</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Manager Decision Ledger ({activeRoleData.name})
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Objective, audit-backed talent decisions. Review TrueImpact Scores, approve verified promotions, and export executive dossiers.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search team member..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#0B0D11] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C96843] w-48"
              />
            </div>

            {/* Filter Pills */}
            <div className="inline-flex p-1 rounded-lg bg-[#0B0D11] border border-white/10 text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-[#C96843] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('promotion')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  statusFilter === 'promotion'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Promotion Ready
              </button>
              <button
                onClick={() => setStatusFilter('hike')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  statusFilter === 'hike'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Hike Approved
              </button>
              <button
                onClick={() => setStatusFilter('mentorship')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  statusFilter === 'mentorship'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mentorship
              </button>
            </div>
          </div>
        </div>

        {/* The Decision Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0D11] text-gray-400 uppercase font-mono tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Team Member</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">TrueImpact Score</th>
                <th className="py-3 px-4">Raw Volume</th>
                <th className="py-3 px-4">Token Hygiene</th>
                <th className="py-3 px-4">Survival Rate</th>
                <th className="py-3 px-4">Recommendation</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#131722]">
              {filteredEmployees.map((emp) => {
                const isHighValue = emp.trueImpactScore >= 80;
                const isSlop = emp.trueImpactScore < 50;

                return (
                  <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Team Member */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{emp.name}</div>
                          <div className="text-[11px] text-gray-400 font-mono">
                            {emp.archetype}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Level */}
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-300">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {emp.level}
                      </span>
                    </td>

                    {/* TrueImpact Score */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 font-mono">
                        <span
                          className={`text-base font-extrabold ${
                            isHighValue
                              ? 'text-emerald-400'
                              : isSlop
                              ? 'text-rose-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {emp.trueImpactScore}
                        </span>
                        <div className="w-16 bg-white/10 rounded-full h-1.5 hidden sm:block">
                          <div
                            className={`h-1.5 rounded-full ${
                              isHighValue
                                ? 'bg-emerald-500'
                                : isSlop
                                ? 'bg-rose-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${emp.trueImpactScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Raw Volume */}
                    <td className="py-3.5 px-4 font-mono text-gray-300">
                      {emp.rawVolume}
                    </td>

                    {/* Token Hygiene */}
                    <td className="py-3.5 px-4 font-mono">
                      <span
                        className={
                          emp.tokenHygiene >= 85
                            ? 'text-emerald-400 font-bold'
                            : emp.tokenHygiene < 60
                            ? 'text-rose-400 font-bold'
                            : 'text-gray-300'
                        }
                      >
                        {emp.tokenHygiene}%
                      </span>
                    </td>

                    {/* Survival Rate */}
                    <td className="py-3.5 px-4 font-mono">
                      <span
                        className={
                          emp.downstreamSurvival >= 85
                            ? 'text-emerald-400 font-bold'
                            : emp.downstreamSurvival < 60
                            ? 'text-rose-400 font-bold'
                            : 'text-gray-300'
                        }
                      >
                        {emp.downstreamSurvival}%
                      </span>
                    </td>

                    {/* Recommendation Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-[11px] font-semibold border ${
                          emp.status.includes('Promotion')
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : emp.status.includes('Hike')
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : emp.status.includes('Mentorship')
                            ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Export Evidence Report */}
                        <button
                          onClick={() => onOpenEvidenceModal(emp)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-[11px] flex items-center gap-1 transition-colors"
                          title="Generate Evidence Dossier for HR/Execs"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#C96843]" />
                          <span className="hidden sm:inline">Dossier</span>
                        </button>

                        {/* Direct Decision Buttons */}
                        {emp.readyForPromotion ? (
                          <button
                            onClick={() => triggerPromotionCelebration(emp)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] shadow-sm transition-all active:scale-95 flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Promote</span>
                          </button>
                        ) : emp.trueImpactScore >= 75 ? (
                          <button
                            onClick={() => triggerHikeCelebration(emp)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-[11px] transition-all flex items-center gap-1"
                          >
                            <TrendingUp className="w-3 h-3" />
                            <span>Hike</span>
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Live Gemini 2.5 Multimodal Audit Sandbox */}
      <div className="p-6 rounded-2xl bg-[#131722] border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C96843]/15 text-[#C96843] border border-[#C96843]/30 text-xs font-mono mb-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Multimodal Vision &amp; Reasoning Sandbox</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Live Gemini 2.5 Multimodal Audit Sandbox
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Test how Gemini 2.5 evaluates raw artifact payloads (Figma JSON, AST code, SAP POs) against real downstream Slack/Jira developer conversations.
            </p>
          </div>

          {/* Scenario Selector Dropdown */}
          <div className="w-full sm:w-auto">
            <label className="block text-[11px] uppercase font-mono tracking-wider text-gray-400 mb-1">
              Select Preset Scenario:
            </label>
            <select
              value={selectedScenarioId}
              onChange={(e) => handleSelectScenario(e.target.value)}
              className="bg-[#0B0D11] border border-white/15 rounded-lg px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-[#C96843] w-full sm:w-80 cursor-pointer"
            >
              {PRESET_SCENARIOS.map((scen) => (
                <option key={scen.id} value={scen.id}>
                  {scen.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Two-Column Inputs: Artifact Metadata & Downstream Slack Thread */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input 1: Artifact Metadata / Code / JSON */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#C96843]" />
                1. Artifact Metadata / AST Code / Design Spec JSON:
              </label>
              <span className="text-[10px] font-mono text-gray-500">Payload Source</span>
            </div>
            <textarea
              rows={9}
              value={artifactInput}
              onChange={(e) => setArtifactInput(e.target.value)}
              className="w-full bg-[#0B0D11] border border-white/10 rounded-xl p-3.5 text-xs text-emerald-400 font-mono leading-relaxed focus:outline-none focus:border-[#C96843] resize-none"
            />
          </div>

          {/* Input 2: Downstream Slack/Jira Thread */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                2. Downstream Slack / Jira Dev Conversation:
              </label>
              <span className="text-[10px] font-mono text-gray-500">Telemetry Sentiment</span>
            </div>
            <textarea
              rows={9}
              value={threadInput}
              onChange={(e) => setThreadInput(e.target.value)}
              className="w-full bg-[#0B0D11] border border-white/10 rounded-xl p-3.5 text-xs text-gray-300 font-mono leading-relaxed focus:outline-none focus:border-[#C96843] resize-none"
            />
          </div>
        </div>

        {/* Action Button & Running Progress */}
        <div className="pt-2">
          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className={`w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl ${
              isAuditing
                ? 'bg-[#1A2030] text-gray-400 cursor-wait border border-white/10'
                : 'bg-gradient-to-r from-[#C96843] to-[#B55A36] hover:from-[#B55A36] hover:to-[#8C3D22] text-white shadow-glow-terracotta active:scale-98'
            }`}
          >
            {isAuditing ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-[#C96843]" />
                <span className="font-mono text-sm">{auditStep}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Run Gemini 2.5 Multimodal Audit</span>
              </>
            )}
          </button>
        </div>

        {/* Audit Dynamic Result Card */}
        {auditResult && (
          <div className="p-6 rounded-2xl bg-[#0B0D11] border-2 border-[#C96843]/40 shadow-glow-terracotta space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono ${
                    auditResult.score >= 80
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  {auditResult.score}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Gemini 2.5 Audit Synthesis</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        auditResult.score >= 80
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {auditResult.flag}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Evaluated against active {activeRoleData.name} rubric with 768-dim semantic grounding.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-gray-400">Net Financial Impact:</span>{' '}
                  <strong
                    className={
                      auditResult.costImpact.includes('+')
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }
                  >
                    {auditResult.costImpact}
                  </strong>
                </div>
              </div>
            </div>

            {/* Violations & Coaching Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Violations / Findings */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#C96843]" />
                  Telemetry Violations / Friction Tax:
                </span>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {auditResult.violations.map((v, i) => (
                    <li
                      key={i}
                      className="p-2.5 rounded-lg bg-[#131722] border border-white/5 flex items-start gap-2"
                    >
                      <span className="text-[#C96843] font-bold shrink-0">•</span>
                      <span className="leading-relaxed">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Promotion / Coaching Blueprint */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  L2→L3 Promotion Coaching Blueprint:
                </span>
                <div className="p-4 rounded-xl bg-[#131722] border border-emerald-500/20 text-xs text-gray-200 leading-relaxed font-sans">
                  {auditResult.coachingBlueprint}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
