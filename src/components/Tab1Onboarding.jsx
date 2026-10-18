import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ROLES } from '../data/initialData';
import {
  Sliders,
  CheckCircle2,
  Database,
  Cpu,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Info,
  Save,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

const LEVELS = [
  { id: 'L1', name: 'L1 Junior', subtitle: 'Associate / Entry Level' },
  { id: 'L2', name: 'L2 Mid-Level', subtitle: 'Autonomous Practitioner' },
  { id: 'L3', name: 'L3 Senior', subtitle: 'Squad Anchor & System Lead' },
  { id: 'L4', name: 'L4 Staff / Lead', subtitle: 'Cross-Squad Architect' },
  { id: 'L5', name: 'L5 Principal', subtitle: 'Enterprise Domain Authority' },
];

export default function Tab1Onboarding() {
  const {
    selectedRole,
    setSelectedRole,
    selectedLevel,
    setSelectedLevel,
    activeRoleData,
    rubrics,
    calibrateRubric,
  } = useApp();

  const currentRubric = rubrics[selectedRole]?.[selectedLevel] || {
    title: 'Standard Evaluation Rubric',
    expectations: '',
    weights: { craft: 30, handoff: 35, aiOrchestration: 20, mentorship: 15 },
    rubricHash: 'vx-eval-000',
    lastIndexed: new Date().toISOString(),
  };

  // Local state for the editable rubric form
  const [expectations, setExpectations] = useState(currentRubric.expectations);
  const [weights, setWeights] = useState(currentRubric.weights);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationSuccess, setCalibrationSuccess] = useState(false);

  // Sync when role or level changes
  useEffect(() => {
    if (rubrics[selectedRole]?.[selectedLevel]) {
      setExpectations(rubrics[selectedRole][selectedLevel].expectations);
      setWeights(rubrics[selectedRole][selectedLevel].weights);
      setCalibrationSuccess(false);
    }
  }, [selectedRole, selectedLevel, rubrics]);

  const handleWeightChange = (key, val) => {
    const num = Math.max(0, Math.min(100, parseInt(val) || 0));
    setWeights((prev) => ({
      ...prev,
      [key]: num,
    }));
  };

  const totalWeight =
    (parseInt(weights.craft) || 0) +
    (parseInt(weights.handoff) || 0) +
    (parseInt(weights.aiOrchestration) || 0) +
    (parseInt(weights.mentorship) || 0);

  const normalizeWeights = () => {
    if (totalWeight === 0) {
      setWeights({ craft: 30, handoff: 35, aiOrchestration: 20, mentorship: 15 });
      return;
    }
    const factor = 100 / totalWeight;
    const craft = Math.round(weights.craft * factor);
    const handoff = Math.round(weights.handoff * factor);
    const aiOrchestration = Math.round(weights.aiOrchestration * factor);
    const mentorship = 100 - (craft + handoff + aiOrchestration);
    setWeights({ craft, handoff, aiOrchestration, mentorship });
  };

  const handleSaveAndCalibrate = () => {
    setIsCalibrating(true);
    setCalibrationSuccess(false);

    setTimeout(() => {
      calibrateRubric(selectedRole, selectedLevel, {
        expectations,
        weights,
      });
      setIsCalibrating(false);
      setCalibrationSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Hero */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#131722] via-[#1A2030] to-[#131722] border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-[#C96843]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C96843]/15 text-[#C96843] border border-[#C96843]/30 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Vertex AI Vector Embeddings • Text-Embedding-005 (768-dim)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Role Blueprint &amp; Vector Rubric Calibration
            </h1>
            <p className="text-gray-300 text-sm mt-1.5 max-w-2xl leading-relaxed">
              Define the precision expectations and evaluation weights for each seniority level.
              Calibrated rubrics are vectorized into Google Cloud Vertex Vector Search, establishing the baseline against which AI workslop versus authentic work-value is audited.
            </p>
          </div>

          {/* Quick Info Badge */}
          <div className="p-4 rounded-xl bg-[#0B0D11]/80 border border-white/10 shrink-0 flex flex-col gap-1.5 text-xs font-mono">
            <div className="text-gray-400 flex items-center justify-between gap-4">
              <span>Active Role:</span>
              <span className="text-white font-bold">{activeRoleData.name}</span>
            </div>
            <div className="text-gray-400 flex items-center justify-between gap-4">
              <span>Selected Seniority:</span>
              <span className="text-[#C96843] font-bold">{selectedLevel} ({currentRubric.title})</span>
            </div>
            <div className="text-gray-400 flex items-center justify-between gap-4">
              <span>Vector Hash:</span>
              <span className="text-gray-300">{currentRubric.rubricHash}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Department / Role Selector Card */}
        <div className="p-5 rounded-xl bg-[#131722] border border-white/10 shadow-md">
          <label className="block text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">
            1. Select Enterprise Department
          </label>
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-[#0B0D11] border border-white/15 rounded-lg px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-[#C96843] transition-colors appearance-none cursor-pointer"
            >
              {ROLES.map((role) => (
                <option key={role.id} value={role.id} className="bg-[#131722] text-white">
                  {role.name} — {role.category}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              ▼
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2 font-sans">
            {activeRoleData.shortDesc}
          </p>
        </div>

        {/* Level / Seniority Selector Card */}
        <div className="p-5 rounded-xl bg-[#131722] border border-white/10 shadow-md">
          <label className="block text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">
            2. Select Seniority Level (L1 to L5)
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`py-2.5 px-2 rounded-lg text-center transition-all ${
                    isSelected
                      ? 'bg-[#C96843] text-white shadow-glow-terracotta ring-1 ring-white/30'
                      : 'bg-[#0B0D11] text-gray-300 hover:bg-white/5 border border-white/10'
                  }`}
                >
                  <div className="font-bold text-sm">{lvl.id}</div>
                  <div className="text-[10px] truncate opacity-80 mt-0.5">
                    {lvl.id === 'L1'
                      ? 'Junior'
                      : lvl.id === 'L2'
                      ? 'Mid'
                      : lvl.id === 'L3'
                      ? 'Senior'
                      : lvl.id === 'L4'
                      ? 'Staff'
                      : 'Principal'}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-2.5">
            <span>Current Title: <strong className="text-white">{currentRubric.title}</strong></span>
            <span className="text-[11px] font-mono text-gray-400">Tier {selectedLevel.replace('L', '')} of 5</span>
          </div>
        </div>
      </div>

      {/* Main Rubric Editor & Vector Calibration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Descriptive Goal & Responsibility Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#131722] border border-white/10 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#C96843]/15 text-[#C96843] flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Goal &amp; Responsibility Expectation Matrix
                  </h3>
                  <p className="text-xs text-gray-400">
                    Explicit requirements used by Gemini 2.5 to evaluate token bindings, down-stream friction, and human judgment.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                {selectedLevel} Spec
              </span>
            </div>

            {/* Editable Text Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Level {selectedLevel} Operational Standards &amp; Anti-Workslop Guardrails:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const fallback = rubrics[selectedRole]?.[selectedLevel]?.expectations || '';
                    setExpectations(fallback);
                  }}
                  className="text-[11px] text-[#C96843] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset to defaults
                </button>
              </div>

              <textarea
                value={expectations}
                onChange={(e) => setExpectations(e.target.value)}
                rows={5}
                className="w-full bg-[#0B0D11] border border-white/15 rounded-xl p-4 text-sm text-gray-100 placeholder-gray-500 font-sans leading-relaxed focus:outline-none focus:border-[#C96843] focus:ring-1 focus:ring-[#C96843] transition-all"
                placeholder="Enter level-specific expectations, token compliance rules, handoff friction limits, etc."
              />
              <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1.5 font-mono">
                <Info className="w-3.5 h-3.5 text-[#C96843]" />
                This natural language prompt is mapped into Vertex Vector Space to automatically parse code commits, Figma frames, and Slack conversations.
              </p>
            </div>

            {/* Benchmark Level Milestones Comparison */}
            <div className="pt-2 border-t border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Career Trajectory Progression Ladder ({activeRoleData.name})
              </h4>
              <div className="space-y-2">
                {LEVELS.map((lvl) => {
                  const roleRubric = rubrics[selectedRole]?.[lvl.id];
                  const isCurrent = lvl.id === selectedLevel;
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => setSelectedLevel(lvl.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                        isCurrent
                          ? 'bg-[#1A2030] border-[#C96843]/60 ring-1 ring-[#C96843]/30'
                          : 'bg-[#0B0D11]/60 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <span
                        className={`font-mono font-bold text-xs px-2 py-0.5 rounded shrink-0 ${
                          isCurrent
                            ? 'bg-[#C96843] text-white'
                            : 'bg-white/10 text-gray-300'
                        }`}
                      >
                        {lvl.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${isCurrent ? 'text-white' : 'text-gray-300'}`}>
                            {roleRubric?.title || lvl.name}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] uppercase font-mono text-[#C96843] font-bold">
                              Currently Active
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-[11px] mt-0.5 line-clamp-1">
                          {roleRubric?.expectations}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Weight Distribution & Vector Search Calibration */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#131722] border border-white/10 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#C96843]" />
                <h3 className="text-base font-bold text-white">Custom Weight Distribution</h3>
              </div>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  totalWeight === 100
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                Sum: {totalWeight}%
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Adjust how the TrueImpact scoring algorithm weighs craft hygiene vs. downstream team survival.
            </p>

            {/* Sliders List */}
            <div className="space-y-4">
              {/* Craft Hygiene */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">Craft &amp; Spec Hygiene</span>
                  <span className="font-mono font-bold text-[#C96843]">{weights.craft}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={weights.craft}
                  onChange={(e) => handleWeightChange('craft', e.target.value)}
                  className="w-full accent-[#C96843] bg-white/10 rounded-lg h-2 cursor-pointer"
                />
                <span className="text-[10px] text-gray-500">Token compliance, WCAG, linting</span>
              </div>

              {/* Downstream Survival */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">Downstream Handoff Survival</span>
                  <span className="font-mono font-bold text-emerald-400">{weights.handoff}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={weights.handoff}
                  onChange={(e) => handleWeightChange('handoff', e.target.value)}
                  className="w-full accent-emerald-500 bg-white/10 rounded-lg h-2 cursor-pointer"
                />
                <span className="text-[10px] text-gray-500">Zero dev rework, 90-day retention</span>
              </div>

              {/* AI Orchestration & Human Judgment */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">AI Orchestration &amp; Human Judgment</span>
                  <span className="font-mono font-bold text-amber-400">{weights.aiOrchestration}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={weights.aiOrchestration}
                  onChange={(e) => handleWeightChange('aiOrchestration', e.target.value)}
                  className="w-full accent-amber-500 bg-white/10 rounded-lg h-2 cursor-pointer"
                />
                <span className="text-[10px] text-gray-500">Catching hallucinations, pruning slop</span>
              </div>

              {/* Mentorship & Alignment */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">Mentorship &amp; Level Alignment</span>
                  <span className="font-mono font-bold text-sky-400">{weights.mentorship}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={weights.mentorship}
                  onChange={(e) => handleWeightChange('mentorship', e.target.value)}
                  className="w-full accent-sky-400 bg-white/10 rounded-lg h-2 cursor-pointer"
                />
                <span className="text-[10px] text-gray-500">Documentation, squad guidance</span>
              </div>
            </div>

            {totalWeight !== 100 && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
                <span>Weights must total 100%.</span>
                <button
                  type="button"
                  onClick={normalizeWeights}
                  className="text-xs font-bold underline hover:text-white"
                >
                  Auto-Balance
                </button>
              </div>
            )}

            {/* Save & Calibrate Button */}
            <button
              onClick={handleSaveAndCalibrate}
              disabled={isCalibrating || totalWeight !== 100}
              className={`w-full py-3.5 px-4 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                totalWeight !== 100
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-[#C96843] to-[#B55A36] hover:from-[#B55A36] hover:to-[#8C3D22] text-white shadow-glow-terracotta active:scale-98'
              }`}
            >
              {isCalibrating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Embedding into Vertex DB...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save &amp; Calibrate Rubric</span>
                </>
              )}
            </button>

            {/* Success Feedback Confirmation */}
            {calibrationSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Vector Index Synced</span>
                </div>
                <p className="text-[11px] text-emerald-200/90 leading-tight">
                  Rubric successfully indexed in Vertex Vector DB with custom weight distribution: Craft {weights.craft}%, Handoff {weights.handoff}%, AI Orchestration {weights.aiOrchestration}%, Mentorship {weights.mentorship}%.
                </p>
              </div>
            )}
          </div>

          {/* Vertex Vector Search Telemetry Card */}
          <div className="p-5 rounded-2xl bg-[#0B0D11] border border-white/10 text-xs space-y-3 font-mono">
            <div className="flex items-center justify-between text-gray-400">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Database className="w-3.5 h-3.5 text-[#C96843]" />
                Vertex Vector Status
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div className="space-y-1.5 text-gray-400 text-[11px]">
              <div className="flex justify-between">
                <span>Vector Dimension:</span>
                <span className="text-gray-200 font-semibold">768-Float32</span>
              </div>
              <div className="flex justify-between">
                <span>Distance Metric:</span>
                <span className="text-gray-200 font-semibold">DOT_PRODUCT_COSINE</span>
              </div>
              <div className="flex justify-between">
                <span>Index Endpoint:</span>
                <span className="text-[#C96843] truncate max-w-[140px]">{currentRubric.rubricHash}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Calibrated:</span>
                <span className="text-gray-300">
                  {new Date(currentRubric.lastIndexed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
