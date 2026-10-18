import React, { useState } from 'react';
import { useApp, calculateScore } from '../context/AppContext';
import {
  Scale,
  Flame,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Clock,
  DollarSign,
  Layers,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calculator,
  ChevronDown,
  FileCode2,
  MessageSquare
} from 'lucide-react';

export default function Tab3WorkslopAudit() {
  const {
    selectedRole,
    activeRoleData,
    activeEmployees,
    selectedLevel,
    rubrics,
    selectedCompareEmployees,
    setSelectedCompareEmployees,
  } = useApp();

  const currentWeights = rubrics[selectedRole]?.[selectedLevel]?.weights || {
    craft: 30,
    handoff: 35,
    aiOrchestration: 20,
    mentorship: 15,
  };

  // Find selected employees to compare
  const empA =
    activeEmployees.find((e) => e.id === selectedCompareEmployees.empAId) ||
    activeEmployees[0] ||
    null;

  const empB =
    activeEmployees.find((e) => e.id === selectedCompareEmployees.empBId) ||
    activeEmployees[1] ||
    activeEmployees[0] ||
    null;

  // Interactive formula sandbox state
  const [testHygiene, setTestHygiene] = useState(85);
  const [testSurvival, setTestSurvival] = useState(90);
  const [testJudgment, setTestJudgment] = useState(88);
  const [testAlignment, setTestAlignment] = useState(85);
  const [testPenalty, setTestPenalty] = useState(4);

  // Compute interactive score
  const computedInteractiveScore = calculateScore(
    {
      tokenHygiene: testHygiene,
      downstreamSurvival: testSurvival,
      humanJudgment: testJudgment,
      levelAlignment: testAlignment,
      reworkPenalty: testPenalty,
    },
    currentWeights
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#131722] via-[#1A2030] to-[#131722] border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C96843]/15 text-[#C96843] border border-[#C96843]/30 text-xs font-mono mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Dual-Profile Telemetry Contrast Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Workslop vs. High-Judgment Value Audit
          </h1>
          <p className="text-gray-300 text-sm mt-1 max-w-2xl leading-relaxed">
            Raw output volume is an illusion. TrueImpact AI isolates downstream survival, design token fidelity, and developer rework penalties to expose artificial output inflation.
          </p>
        </div>

        {/* Quick Dropdown Selectors for Comparison */}
        <div className="p-4 rounded-xl bg-[#0B0D11] border border-white/10 shrink-0 space-y-2 text-xs">
          <span className="text-gray-400 font-mono uppercase tracking-wider block">
            Compare Team Profiles:
          </span>
          <div className="flex items-center gap-2">
            <select
              value={empA?.id || ''}
              onChange={(e) =>
                setSelectedCompareEmployees((prev) => ({
                  ...prev,
                  empAId: e.target.value,
                }))
              }
              className="bg-[#131722] border border-rose-500/30 text-rose-300 rounded px-2.5 py-1.5 font-medium focus:outline-none"
            >
              {activeEmployees.map((e) => (
                <option key={e.id} value={e.id}>
                  Profile A: {e.name} ({e.trueImpactScore}/100)
                </option>
              ))}
            </select>

            <span className="text-gray-500 font-bold">vs</span>

            <select
              value={empB?.id || ''}
              onChange={(e) =>
                setSelectedCompareEmployees((prev) => ({
                  ...prev,
                  empBId: e.target.value,
                }))
              }
              className="bg-[#131722] border border-emerald-500/30 text-emerald-300 rounded px-2.5 py-1.5 font-medium focus:outline-none"
            >
              {activeEmployees.map((e) => (
                <option key={e.id} value={e.id}>
                  Profile B: {e.name} ({e.trueImpactScore}/100)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Employee Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile A: The AI Workslop Spammer */}
        {empA && (
          <div className="p-6 rounded-2xl bg-[#131722] border-2 border-rose-500/30 shadow-glow-rose/20 space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-500/15 text-rose-400 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl border-l border-b border-rose-500/30 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> High Downstream Friction
            </div>

            <div>
              {/* Header Profile Info */}
              <div className="flex items-center gap-4">
                <img
                  src={empA.avatar}
                  alt={empA.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-rose-500/50"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{empA.name}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                      {empA.level}
                    </span>
                  </div>
                  <div className="text-xs text-rose-400 font-semibold mt-0.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{empA.archetype}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {empA.summary}
                  </p>
                </div>
              </div>

              {/* Big Score Callout */}
              <div className="my-5 p-4 rounded-xl bg-[#0B0D11] border border-rose-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-gray-400 block">
                    TrueImpact AI Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-4xl font-extrabold font-mono text-rose-400">
                      {empA.trueImpactScore}
                    </span>
                    <span className="text-sm font-mono text-gray-500">/ 100</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono uppercase text-gray-400 block">
                    Downstream Rework Penalty
                  </span>
                  <span className="text-lg font-mono font-bold text-rose-400">
                    -{empA.reworkPenalty}% ({empA.reworkHours}h wasted)
                  </span>
                </div>
              </div>

              {/* Metric Bars */}
              <div className="space-y-3 font-mono text-xs">
                {/* Raw Volume */}
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-gray-400">Raw Volume Output:</span>
                  <span className="text-amber-400 font-bold">{empA.rawVolume}</span>
                </div>

                {/* Token / Spec Hygiene */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-400">Token &amp; Spec Hygiene Compliance:</span>
                    <span className="text-rose-400 font-bold">{empA.tokenHygiene}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-rose-500 h-2 rounded-full"
                      style={{ width: `${empA.tokenHygiene}%` }}
                    />
                  </div>
                </div>

                {/* Downstream Survival */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-400">Downstream Code/Spec Survival:</span>
                    <span className="text-rose-400 font-bold">{empA.downstreamSurvival}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-rose-500 h-2 rounded-full"
                      style={{ width: `${empA.downstreamSurvival}%` }}
                    />
                  </div>
                </div>

                {/* Human Judgment Override */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-400">Human Judgment Override Quality:</span>
                    <span className="text-rose-400 font-bold">{empA.humanJudgment}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-rose-500 h-2 rounded-full"
                      style={{ width: `${empA.humanJudgment}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Real Violations & Evidence */}
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> Telemetry Violations Flagged:
                </span>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {empA.violations.map((v, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#0B0D11] p-2 rounded-lg border border-white/5">
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span className="leading-snug">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Decision Recommendation */}
            <div className="pt-4 border-t border-rose-500/20 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Action Recommendation:</span>
              <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
                {empA.status}
              </span>
            </div>
          </div>
        )}

        {/* Profile B: The High-Judgment Orchestrator */}
        {empB && (
          <div className="p-6 rounded-2xl bg-[#131722] border-2 border-emerald-500/30 shadow-glow-emerald/20 space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500/15 text-emerald-400 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl border-l border-b border-emerald-500/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> High-Value Orchestrator
            </div>

            <div>
              {/* Header Profile Info */}
              <div className="flex items-center gap-4">
                <img
                  src={empB.avatar}
                  alt={empB.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/50"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{empB.name}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {empB.level}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{empB.archetype}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {empB.summary}
                  </p>
                </div>
              </div>

              {/* Big Score Callout */}
              <div className="my-5 p-4 rounded-xl bg-[#0B0D11] border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-gray-400 block">
                    TrueImpact AI Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-4xl font-extrabold font-mono text-emerald-400">
                      {empB.trueImpactScore}
                    </span>
                    <span className="text-sm font-mono text-gray-500">/ 100</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono uppercase text-gray-400 block">
                    Net Business Impact
                  </span>
                  <span className="text-lg font-mono font-bold text-emerald-400">
                    +${Math.abs(empB.dollarImpact).toLocaleString()} Saved
                  </span>
                </div>
              </div>

              {/* Metric Bars */}
              <div className="space-y-3 font-mono text-xs">
                {/* Raw Volume */}
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-gray-400">Raw Volume Output:</span>
                  <span className="text-emerald-400 font-bold">{empB.rawVolume} (Curated)</span>
                </div>

                {/* Token / Spec Hygiene */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-400">Token &amp; Spec Hygiene Compliance:</span>
                    <span className="text-emerald-400 font-bold">{empB.tokenHygiene}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${empB.tokenHygiene}%` }}
                    />
                  </div>
                </div>

                {/* Downstream Survival */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-400">Downstream Code/Spec Survival:</span>
                    <span className="text-emerald-400 font-bold">{empB.downstreamSurvival}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${empB.downstreamSurvival}%` }}
                    />
                  </div>
                </div>

                {/* Human Judgment Override */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-400">Human Judgment Override Quality:</span>
                    <span className="text-emerald-400 font-bold">{empB.humanJudgment}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${empB.humanJudgment}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Positive Evidence Checklist */}
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High-Value Receipts Verified:
                </span>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {empB.violations.map((v, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#0B0D11] p-2 rounded-lg border border-white/5">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span className="leading-snug">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Decision Recommendation */}
            <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Action Recommendation:</span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                {empB.status}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Transparency Breakdown Card: The Exact Scoring Formula */}
      <div className="p-6 rounded-2xl bg-[#131722] border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C96843]/15 text-[#C96843] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Mathematical Transparency: TrueImpact Formula Engine
              </h2>
              <p className="text-xs text-gray-400">
                Guarantees objective, reproducible work-value indexing without subjective manager bias.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0B0D11] border border-white/10 text-gray-300">
            Active Rubric: <strong className="text-[#C96843]">{activeRoleData.name} ({selectedLevel})</strong>
          </div>
        </div>

        {/* The Exact Formula Code Banner */}
        <div className="p-4 rounded-xl bg-[#0B0D11] border border-white/10 font-mono text-xs overflow-x-auto">
          <div className="text-gray-400 mb-1 text-[11px] uppercase tracking-wider">
            Canonical Weight Equation:
          </div>
          <div className="text-base text-gray-100 font-bold">
            <span className="text-[#C96843]">TrueImpact</span> = (
            <span className="text-[#C96843]">0.30</span> × Token Hygiene) + (
            <span className="text-emerald-400">0.35</span> × Downstream Survival) + (
            <span className="text-amber-400">0.20</span> × Human Judgment) + (
            <span className="text-sky-400">0.15</span> × Level Alignment) - (
            <span className="text-rose-400">Rework Penalty</span>)
          </div>
        </div>

        {/* Live Interactive Formula Sandbox Simulator */}
        <div className="p-5 rounded-xl bg-[#1A2030]/50 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-mono tracking-wider text-gray-300 font-bold flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#C96843]" />
              Interactive Scoring Sandbox (Test Any Parameter Combination)
            </h3>
            <span className="text-xs font-mono text-gray-400">
              Computed Result:{' '}
              <strong
                className={`font-bold font-mono text-sm ${
                  computedInteractiveScore >= 80
                    ? 'text-emerald-400'
                    : computedInteractiveScore >= 50
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {computedInteractiveScore} / 100
              </strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Token Hygiene Slider */}
            <div className="p-3 rounded-lg bg-[#0B0D11] border border-white/5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400 text-[11px]">Token Hygiene</span>
                <span className="font-mono text-[#C96843] font-bold">{testHygiene}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={testHygiene}
                onChange={(e) => setTestHygiene(Number(e.target.value))}
                className="w-full accent-[#C96843] bg-white/10 rounded h-1.5 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                Contrib: +{((currentWeights.craft / 100) * testHygiene).toFixed(1)}
              </span>
            </div>

            {/* Downstream Survival */}
            <div className="p-3 rounded-lg bg-[#0B0D11] border border-white/5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400 text-[11px]">Downstream Survival</span>
                <span className="font-mono text-emerald-400 font-bold">{testSurvival}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={testSurvival}
                onChange={(e) => setTestSurvival(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-white/10 rounded h-1.5 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                Contrib: +{((currentWeights.handoff / 100) * testSurvival).toFixed(1)}
              </span>
            </div>

            {/* Human Judgment */}
            <div className="p-3 rounded-lg bg-[#0B0D11] border border-white/5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400 text-[11px]">Human Judgment</span>
                <span className="font-mono text-amber-400 font-bold">{testJudgment}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={testJudgment}
                onChange={(e) => setTestJudgment(Number(e.target.value))}
                className="w-full accent-amber-500 bg-white/10 rounded h-1.5 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                Contrib: +{((currentWeights.aiOrchestration / 100) * testJudgment).toFixed(1)}
              </span>
            </div>

            {/* Level Alignment */}
            <div className="p-3 rounded-lg bg-[#0B0D11] border border-white/5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400 text-[11px]">Level Alignment</span>
                <span className="font-mono text-sky-400 font-bold">{testAlignment}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={testAlignment}
                onChange={(e) => setTestAlignment(Number(e.target.value))}
                className="w-full accent-sky-400 bg-white/10 rounded h-1.5 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                Contrib: +{((currentWeights.mentorship / 100) * testAlignment).toFixed(1)}
              </span>
            </div>

            {/* Rework Penalty */}
            <div className="p-3 rounded-lg bg-[#0B0D11] border border-white/5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400 text-[11px]">Rework Penalty</span>
                <span className="font-mono text-rose-400 font-bold">-{testPenalty}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={testPenalty}
                onChange={(e) => setTestPenalty(Number(e.target.value))}
                className="w-full accent-rose-500 bg-white/10 rounded h-1.5 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                Penalty Tax: -{testPenalty}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
