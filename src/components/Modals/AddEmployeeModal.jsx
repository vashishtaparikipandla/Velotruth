import React, { useState } from 'react';
import { useApp, calculateScore } from '../../context/AppContext';
import { ROLES } from '../../data/initialData';
import { X, UserPlus, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

export default function AddEmployeeModal({ isOpen, onClose }) {
  const { selectedRole, addEmployee, rubrics } = useApp();

  const [name, setName] = useState('');
  const [roleKey, setRoleKey] = useState(selectedRole);
  const [level, setLevel] = useState('L2');
  const [rawVolume, setRawVolume] = useState('22 units / wk');
  const [tokenHygiene, setTokenHygiene] = useState(88);
  const [downstreamSurvival, setDownstreamSurvival] = useState(90);
  const [humanJudgment, setHumanJudgment] = useState(85);
  const [levelAlignment, setLevelAlignment] = useState(82);
  const [reworkPenalty, setReworkPenalty] = useState(3);
  const [summary, setSummary] = useState('');

  if (!isOpen) return null;

  const currentWeights = rubrics[roleKey]?.[level]?.weights || {
    craft: 30,
    handoff: 35,
    aiOrchestration: 20,
    mentorship: 15,
  };

  const previewScore = calculateScore(
    {
      tokenHygiene,
      downstreamSurvival,
      humanJudgment,
      levelAlignment,
      reworkPenalty,
    },
    currentWeights
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addEmployee({
      name,
      roleKey,
      level,
      rawVolume,
      tokenHygiene,
      downstreamSurvival,
      humanJudgment,
      levelAlignment,
      reworkPenalty,
      summary: summary || `${name} evaluated under TrueImpact AI telemetry engine.`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#131722] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C96843]/20 text-[#C96843] flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Add Team Member to Rubric</h3>
              <p className="text-xs text-gray-400">
                Register candidate profile with telemetry metrics for TrueImpact evaluation.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Name & Role Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Jordan Hayes"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0B0D11] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C96843]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Department</label>
              <select
                value={roleKey}
                onChange={(e) => setRoleKey(e.target.value)}
                className="w-full bg-[#0B0D11] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C96843]"
              >
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Level & Raw Volume */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Seniority Tier</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-[#0B0D11] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C96843]"
              >
                <option value="L1">L1 Junior / Associate</option>
                <option value="L2">L2 Mid-Level</option>
                <option value="L3">L3 Senior</option>
                <option value="L4">L4 Staff / Lead</option>
                <option value="L5">L5 Principal</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Raw Output Volume</label>
              <input
                type="text"
                value={rawVolume}
                onChange={(e) => setRawVolume(e.target.value)}
                placeholder="e.g. 24 screens / wk"
                className="w-full bg-[#0B0D11] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C96843]"
              />
            </div>
          </div>

          {/* Metrics Sliders */}
          <div className="p-4 rounded-xl bg-[#0B0D11] border border-white/10 space-y-3 font-mono">
            <span className="text-gray-400 font-bold block uppercase tracking-wider text-[11px]">
              Initial Telemetry Attributes
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-400">Token Hygiene:</span>
                  <span className="text-[#C96843] font-bold">{tokenHygiene}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tokenHygiene}
                  onChange={(e) => setTokenHygiene(Number(e.target.value))}
                  className="w-full accent-[#C96843] bg-white/10 rounded h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-400">Downstream Survival:</span>
                  <span className="text-emerald-400 font-bold">{downstreamSurvival}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={downstreamSurvival}
                  onChange={(e) => setDownstreamSurvival(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-white/10 rounded h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-400">Human Judgment:</span>
                  <span className="text-amber-400 font-bold">{humanJudgment}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humanJudgment}
                  onChange={(e) => setHumanJudgment(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-white/10 rounded h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-400">Rework Penalty:</span>
                  <span className="text-rose-400 font-bold">-{reworkPenalty}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={reworkPenalty}
                  onChange={(e) => setReworkPenalty(Number(e.target.value))}
                  className="w-full accent-rose-500 bg-white/10 rounded h-1.5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Live Preview Score Callout */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between font-mono">
            <span className="text-gray-400">Calculated TrueImpact Score:</span>
            <span
              className={`text-lg font-extrabold ${
                previewScore >= 80
                  ? 'text-emerald-400'
                  : previewScore >= 60
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {previewScore} / 100
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#C96843] hover:bg-[#B55A36] text-white font-bold transition-all shadow-glow-terracotta"
            >
              Register Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
