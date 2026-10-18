import React, { useState } from 'react';
import { ArrowLeft, Award, CheckCircle2, FileText, Sparkles, TrendingUp, RotateCcw, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const CANDIDATES = {
  design: {
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    currentRole: 'UI/UX Designer',
    levelTransition: 'L2 Mid-Level → L3 Senior Designer',
    score: 94,
    recommendation: 'Promotion & Merit Hike Approved',
    reason: 'Elena consistently uses design tokens, produces zero-defect dev handoffs, and saves engineers ~18 hours per sprint.',
    evidencePoints: [
      '100% compliance with corporate Figma design tokens across all 16 delivery screens.',
      'Passed all WCAG 2.2 AA accessibility checks with zero color contrast warnings.',
      'Zero downstream Slack blocker threads reported by frontend developers.',
      'Authored 4 reusable design system components used across 3 squads.'
    ]
  },
  product: {
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    currentRole: 'Product Manager',
    levelTransition: 'L2 Mid-Level → L3 Senior PM',
    score: 95,
    recommendation: 'Promotion & Merit Hike Approved',
    reason: 'Priya writes razor-sharp 2-page specifications that eliminate mid-sprint confusion and engineering rework.',
    evidencePoints: [
      'Downstream PRD survival rate of 94% through developer releases.',
      'Proactively rejected 8 hallucinated AI feature concepts that were unfeasible.',
      'Reduced sprint backlog churn by 42% over the last two quarters.',
      'Praised by engineering leads for crystal-clear acceptance criteria.'
    ]
  },
  engineering: {
    name: 'Amina Diallo',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    currentRole: 'Software Engineer',
    levelTransition: 'L2 Mid-Level → L3 Senior Engineer',
    score: 96,
    recommendation: 'Promotion & Merit Hike Approved',
    reason: 'Amina writes resilient microservices, filters out subtle AI bugs, and keeps production uptime rock-solid.',
    evidencePoints: [
      '96% code survival rate 90 days after merging.',
      'Intercepted an infinite-lock bug in AI-generated boilerplate code before deployment.',
      'Achieved 98% automated test coverage across core payment flows.',
      'Mentored two associate engineers on safe AI coding standards.'
    ]
  },
  supply_chain: {
    name: 'Zoe Katsaros',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    currentRole: 'Supply Chain Planner',
    levelTransition: 'L2 Mid-Level → L3 Senior Operations Planner',
    score: 97,
    recommendation: 'Promotion & Merit Hike Approved',
    reason: 'Zoe stopped an incorrect AI inventory order surge, protecting warehouse space and saving $68,000.',
    evidencePoints: [
      'Identified synthetic web-bot activity masquerading as real product demand.',
      'Prevented an unneeded 33,000-unit raw material order from draining working capital.',
      'Maintained a 98.5% on-time fulfillment rate across regional warehouses.',
      'Reduced emergency third-party storage fees to zero.'
    ]
  }
};

export default function Step4Decisions({ selectedRole, onBack, onRestart }) {
  const candidate = CANDIDATES[selectedRole] || CANDIDATES.design;

  const [promotionStatus, setPromotionStatus] = useState(null); // 'promoted', 'hiked', or null
  const [showEvidence, setShowEvidence] = useState(false);

  const handleApprovePromotion = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C96843', '#10B981', '#ffffff', '#F59E0B'],
    });
    setPromotionStatus('promoted');
  };

  const handleApproveHike = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10B981', '#34D399', '#ffffff'],
    });
    setPromotionStatus('hiked');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C96843] font-bold">
          Step 4 of 4
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Promotion &amp; Salary Decisions
        </h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto">
          Clear, evidence-backed talent decisions based on real downstream team impact.
        </p>
      </div>

      {/* Clean Uncluttered Summary Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#131722] border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Top Performer Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-5">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-500/50 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {candidate.name}
                </h3>
              </div>
              <p className="text-sm font-semibold text-[#C96843] mt-1">
                {candidate.currentRole}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold mt-2 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Level Ready: {candidate.levelTransition}</span>
              </div>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block">
              TrueImpact Score
            </span>
            <div className="text-5xl font-extrabold font-mono text-emerald-400 mt-0.5">
              {candidate.score}
              <span className="text-lg font-normal text-gray-500">/100</span>
            </div>
          </div>
        </div>

        {/* Manager Recommendation Description */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">
            Evaluation Summary:
          </h4>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-sans">
            "{candidate.reason}"
          </p>
        </div>

        {/* Status Confirmation Banner if action taken */}
        {promotionStatus && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 animate-fadeIn">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-sm">
                {promotionStatus === 'promoted'
                  ? `Promotion Approved for ${candidate.name}!`
                  : `12% Salary Hike Approved for ${candidate.name}!`}
              </div>
              <div className="text-xs text-emerald-200/80">
                Decision logged and queued for HR &amp; payroll synchronization.
              </div>
            </div>
          </div>
        )}

        {/* 3 Clear Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
          {/* Button 1: Approve Promotion */}
          <button
            onClick={handleApprovePromotion}
            className={`w-full sm:flex-1 py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              promotionStatus === 'promoted'
                ? 'bg-emerald-600 text-white shadow-glow-emerald cursor-default'
                : 'bg-[#C96843] hover:bg-[#B55A36] text-white shadow-glow-terracotta hover:scale-102 active:scale-98'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {promotionStatus === 'promoted' ? 'Promotion Ratified' : 'Approve Promotion'}
            </span>
          </button>

          {/* Button 2: Approve Salary Hike */}
          <button
            onClick={handleApproveHike}
            className={`w-full sm:flex-1 py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all border ${
              promotionStatus === 'hiked'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 cursor-default'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/15 hover:border-white/30'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>
              {promotionStatus === 'hiked' ? 'Salary Hike Ratified' : 'Approve Salary Hike'}
            </span>
          </button>

          {/* Button 3: View Simple Evidence */}
          <button
            onClick={() => setShowEvidence(true)}
            className="w-full sm:w-auto py-4 px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4 text-[#C96843]" />
            <span>View Simple Evidence</span>
          </button>
        </div>
      </div>

      {/* Navigation & Restart */}
      <div className="pt-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onRestart}
          className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#C96843] hover:text-white font-bold text-sm transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Over / Evaluate Another Role</span>
        </button>
      </div>

      {/* Simple Evidence Modal */}
      {showEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#131722] border border-white/15 rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C96843]/20 text-[#C96843] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Evidence Receipts: {candidate.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Verified through automated tool telemetry
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowEvidence(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C96843] font-bold block">
                Why this recommendation was generated:
              </span>
              <ul className="space-y-2.5">
                {candidate.evidencePoints.map((point, index) => (
                  <li
                    key={index}
                    className="p-3.5 rounded-xl bg-[#0B0D11] border border-white/5 flex items-start gap-3 text-sm text-gray-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowEvidence(false)}
                className="px-6 py-2.5 rounded-xl bg-[#C96843] hover:bg-[#B55A36] text-white font-bold text-xs shadow-glow-terracotta"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
