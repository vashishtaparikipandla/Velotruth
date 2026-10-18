import React from 'react';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, Flame, Sparkles } from 'lucide-react';

const ROLE_STORIES = {
  design: {
    roleName: 'UI/UX Design',
    empA: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badge: 'High AI Output, Low Quality',
      story: 'Wrote 40 screens in 1 hour using AI, but teammates wasted 28 hours fixing missing mobile views and broken colors.',
      score: 38,
      status: 'Workslop Flagged',
      consequence: 'Caused 28 hours of developer rework in Slack • Broke mobile layout on checkout',
    },
    empB: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      badge: 'High-Judgment Orchestrator',
      story: 'Wrote fewer screens, but followed all company design rules. Zero complaints from teammates.',
      score: 94,
      status: 'Top Performer',
      consequence: '100% design token compliance • Saved engineers $18,400 in handoff time',
    }
  },
  product: {
    roleName: 'Product Management',
    empA: {
      name: 'David Sterling',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      badge: 'High AI Output, Low Quality',
      story: 'Generated an 80-page PRD in 5 minutes with AI, but engineers spent 34 hours untangling contradictory requirements.',
      score: 35,
      status: 'Workslop Flagged',
      consequence: 'Contradictory user stories • Stalled sprint kick-off for 2 weeks',
    },
    empB: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      badge: 'High-Judgment Orchestrator',
      story: 'Wrote a concise 2-page spec with clear acceptance criteria. Zero sprint delays or confusion.',
      score: 95,
      status: 'Top Performer',
      consequence: '94% downstream PRD survival • Saved $26,800 in engineering sprint churn',
    }
  },
  engineering: {
    roleName: 'Software Engineering',
    empA: {
      name: 'Kevin Wu',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      badge: 'High AI Output, Low Quality',
      story: 'Pushed 3,200 lines of AI-generated code without checking edge cases, breaking the staging environment.',
      score: 32,
      status: 'Workslop Flagged',
      consequence: 'Infinite lock bug caused server crash • 42 hours lost debugging by senior peers',
    },
    empB: {
      name: 'Amina Diallo',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      badge: 'High-Judgment Orchestrator',
      story: 'Wrote 850 lines of clean, tested code. Caught a critical AI concurrency bug before release.',
      score: 96,
      status: 'Top Performer',
      consequence: '98% test coverage • Prevented a major payment duplicate outage worth $34,000',
    }
  },
  supply_chain: {
    roleName: 'Supply Chain Planning',
    empA: {
      name: 'Ryan Gallagher',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      badge: 'High AI Output, Low Quality',
      story: 'Auto-approved 140 AI purchasing orders blindly, causing $45,000 in emergency warehouse storage fees.',
      score: 36,
      status: 'Workslop Flagged',
      consequence: 'Ignored port strikes • Redundant component inventory piled up 19%',
    },
    empB: {
      name: 'Zoe Katsaros',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      badge: 'High-Judgment Orchestrator',
      story: 'Manually caught an AI demand spike caused by web bots, saving the company $68,000 in overstocked parts.',
      score: 97,
      status: 'Top Performer',
      consequence: 'Zero stockouts • Prevented hazmat overflow and $68,000 in wasted spend',
    }
  }
};

export default function Step3AIWorkCheck({ selectedRole, onBack, onNext }) {
  const current = ROLE_STORIES[selectedRole] || ROLE_STORIES.design;
  const { empA, empB } = current;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C96843] font-bold">
          Step 3 of 4
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The AI Work Check
        </h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto">
          Raw output volume is deceiving. Here is what happens when two colleagues use AI differently in {current.roleName}:
        </p>
      </div>

      {/* Clean Side-by-Side Plain English Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Employee A: The Spammer */}
        <div className="p-7 rounded-2xl bg-[#131722] border-2 border-rose-500/30 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-5">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={empA.avatar}
                  alt={empA.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-rose-500/40"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{empA.name}</h3>
                  <span className="text-xs text-rose-400 font-semibold flex items-center gap-1 mt-0.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Employee A</span>
                  </span>
                </div>
              </div>

              {/* Score Badge */}
              <div className="text-right">
                <div className="text-3xl font-extrabold font-mono text-rose-400">
                  {empA.score}
                  <span className="text-sm font-normal text-gray-500">/100</span>
                </div>
              </div>
            </div>

            {/* Plain English Story */}
            <div className="p-4 rounded-xl bg-[#0B0D11] border border-rose-500/20 text-gray-200 text-sm sm:text-base leading-relaxed italic">
              "{empA.story}"
            </div>

            {/* Status tag & consequences */}
            <div className="space-y-2 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 font-bold border border-rose-500/30">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Verdict: {empA.status}</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {empA.consequence}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-xs font-mono text-gray-500">
            Downstream Impact: High Team Friction &amp; Wasted Hours
          </div>
        </div>

        {/* Employee B: The Top Performer */}
        <div className="p-7 rounded-2xl bg-[#131722] border-2 border-emerald-500/30 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-5">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={empB.avatar}
                  alt={empB.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/40"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{empB.name}</h3>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Employee B</span>
                  </span>
                </div>
              </div>

              {/* Score Badge */}
              <div className="text-right">
                <div className="text-3xl font-extrabold font-mono text-emerald-400">
                  {empB.score}
                  <span className="text-sm font-normal text-gray-500">/100</span>
                </div>
              </div>
            </div>

            {/* Plain English Story */}
            <div className="p-4 rounded-xl bg-[#0B0D11] border border-emerald-500/20 text-gray-200 text-sm sm:text-base leading-relaxed italic">
              "{empB.story}"
            </div>

            {/* Status tag & consequences */}
            <div className="space-y-2 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verdict: {empB.status}</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {empB.consequence}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-xs font-mono text-emerald-400">
            Downstream Impact: High Velocity &amp; Team Praise
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-[#C96843] hover:bg-[#B55A36] text-white font-bold text-sm shadow-lg shadow-glow-terracotta flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <span>Next: Review Promotions &amp; Hikes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
