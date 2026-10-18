import React from 'react';
import { Palette, Kanban, Code2, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

const ROLES = [
  {
    id: 'design',
    title: 'UI/UX Designer',
    icon: Palette,
    tagline: 'Figma tokens, mobile responsive layouts & clean handoff to engineers',
    details: 'Focuses on visual consistency, 8pt spacing rules, and zero design rework for developers.'
  },
  {
    id: 'product',
    title: 'Product Manager',
    icon: Kanban,
    tagline: 'Clear requirements, sprint focus & zero scope ambiguity',
    details: 'Measures concise PRDs, realistic feature scoping, and preventing engineering confusion.'
  },
  {
    id: 'engineering',
    title: 'Software Engineer',
    icon: Code2,
    tagline: 'High code quality, bug prevention & reliable production deploys',
    details: 'Penalizes buggy AI code dumps; rewards clean tests and bug-free releases.'
  },
  {
    id: 'supply_chain',
    title: 'Supply Chain Planner',
    icon: Truck,
    tagline: 'Smart inventory orders, warehouse efficiency & human oversight',
    details: 'Rewards catching incorrect AI forecast spikes and preventing costly overstock.'
  }
];

export default function Step1SelectRole({ selectedRole, onSelectRole, onNext }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C96843] font-bold">
          Step 1 of 4
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Select Who You Want to Evaluate
        </h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto">
          Choose a role to see how TrueImpact AI distinguishes genuine, high-value work from low-quality AI workslop.
        </p>
      </div>

      {/* 4 Big Friendly Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`p-6 sm:p-7 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-[#1A2030] border-[#C96843] shadow-glow-terracotta ring-2 ring-[#C96843]/50'
                  : 'bg-[#131722] border-white/10 hover:border-white/20 hover:bg-[#161B28]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#C96843] text-white shadow-lg'
                        : 'bg-white/5 text-gray-300 group-hover:bg-white/10 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {isSelected && (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-[#C96843] bg-[#C96843]/15 px-3 py-1 rounded-full border border-[#C96843]/30">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selected</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {role.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-300 mt-1">
                    {role.tagline}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {role.details}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Next Step Action Button */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-4 rounded-xl bg-[#C96843] hover:bg-[#B55A36] text-white text-base font-bold shadow-lg shadow-glow-terracotta flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
        >
          <span>Continue to Step 2: Connect Tools</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
