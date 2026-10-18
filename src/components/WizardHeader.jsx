import React from 'react';
import { Sparkles, Check } from 'lucide-react';

const STEPS = [
  { id: 1, label: '1. Select Role' },
  { id: 2, label: '2. Connect Tools' },
  { id: 3, label: '3. AI Work Check' },
  { id: 4, label: '4. Promotion & Hikes' },
];

export default function WizardHeader({ currentStep, onStepClick }) {
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <header className="border-b border-white/10 bg-[#0B0D11]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 space-y-6">
        {/* Simple Brand Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C96843] to-[#8C3D22] flex items-center justify-center shadow-glow-terracotta ring-1 ring-white/20 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-1.5 font-sans">
                TrueImpact<span className="text-[#C96843]">AI</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 italic">
                "Fair performance scoring for the AI era"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Step {currentStep} of 4
            </span>
          </div>
        </div>

        {/* 4 Step Indicators & Progress Bar */}
        <div className="space-y-3">
          {/* Progress Bar Line */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#C96843] to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 4 Step Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STEPS.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => onStepClick(step.id)}
                  className={`py-2 px-3 rounded-xl text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#1A2030] text-[#C96843] border border-[#C96843]/50 shadow-sm'
                      : isCompleted
                      ? 'bg-[#131722] text-gray-300 border border-white/5 hover:border-white/15'
                      : 'bg-transparent text-gray-500 border border-transparent'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                      isActive
                        ? 'bg-[#C96843] text-white'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3" /> : step.id}
                  </span>
                  <span className="truncate">{step.label.replace(/^\d+\.\s*/, '')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
