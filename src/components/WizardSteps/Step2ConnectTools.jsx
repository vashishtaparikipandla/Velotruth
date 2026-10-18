import React from 'react';
import { ArrowLeft, ArrowRight, Check, Power, Radio, ShieldCheck } from 'lucide-react';

const TOOLS_CONFIG = [
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design Systems',
    desc: 'Checks if designs use real company color tokens and mobile auto-layouts.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
        <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
      </svg>
    )
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Code & Reviews',
    desc: 'Tracks if AI-generated code survives in production or breaks tests.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    )
  },
  {
    id: 'gdocs',
    name: 'Google Docs',
    category: 'Specifications',
    desc: 'Checks if product specs are concise or filled with bloated AI text.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    )
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Team Communication',
    desc: 'Listens for downstream confusion and team rework complaints.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M7 11.5a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 1 1 3 0v4a1.5 1.5 0 0 1-1.5 1.5z"/>
        <path d="M12.5 7a1.5 1.5 0 0 1 1.5-1.5H18a1.5 1.5 0 1 1 0 3h-4a1.5 1.5 0 0 1-1.5-1.5z"/>
        <path d="M17 12.5a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 1 1-3 0v-4a1.5 1.5 0 0 1 1.5-1.5z"/>
        <path d="M11.5 17a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 1 1 0-3h4a1.5 1.5 0 0 1 1.5 1.5z"/>
      </svg>
    )
  },
  {
    id: 'jira',
    name: 'Jira',
    category: 'Task Management',
    desc: 'Flags tickets that get bounced back by QA or cause sprint delays.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 12l10 10 10-10L12 2z"/>
        <path d="M12 6l-6 6 6 6 6-6-6-6z"/>
      </svg>
    )
  }
];

export default function Step2ConnectTools({ connectedTools, onToggleTool, onBack, onNext }) {
  const connectedCount = Object.values(connectedTools).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C96843] font-bold">
          Step 2 of 4
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Connect Your Team's Daily Tools
        </h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto">
          TrueImpact AI connects safely to your team tools to see if work moves forward smoothly or triggers endless rework loops.
        </p>
      </div>

      {/* Tools List */}
      <div className="space-y-3.5 pt-2">
        {TOOLS_CONFIG.map((tool) => {
          const isConnected = !!connectedTools[tool.id];

          return (
            <div
              key={tool.id}
              onClick={() => onToggleTool(tool.id)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                isConnected
                  ? 'bg-[#131722] border-emerald-500/30 shadow-sm'
                  : 'bg-[#131722]/50 border-white/5 hover:border-white/15'
              }`}
            >
              {/* Left Info */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    isConnected
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/5'
                  }`}
                >
                  {tool.icon}
                </div>

                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {tool.name}
                    </h3>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              {/* Right Toggle Switch */}
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-xs font-semibold hidden sm:inline ${
                    isConnected ? 'text-emerald-400' : 'text-gray-500'
                  }`}
                >
                  {isConnected ? 'Connected' : 'Off'}
                </span>

                <button
                  type="button"
                  aria-pressed={isConnected}
                  className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none flex items-center ${
                    isConnected ? 'bg-emerald-500' : 'bg-white/10'
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      isConnected ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Banner */}
      <div className="p-4 rounded-xl bg-[#131722] border border-white/10 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-gray-300">
            <strong>{connectedCount} of {TOOLS_CONFIG.length}</strong> tools connected for live telemetry.
          </span>
        </div>
        <span className="text-gray-400 text-xs hidden sm:inline font-mono">
          Vertex AI telemetry listener active
        </span>
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
          <span>Next: Run AI Work Check</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
