import React from 'react';
import { useEnterprise } from '../context/EnterpriseContext';
import { Check, RotateCcw } from 'lucide-react';

const STAGES = [
  { id: 1, label: '1. Company Setup', short: 'Company' },
  { id: 2, label: '2. Roles & Workflows', short: 'Roles' },
  { id: 3, label: '3. People & Roster', short: 'Roster' },
  { id: 4, label: '4. Manager Review', short: 'Evaluation' },
  { id: 5, label: '5. Employee View', short: 'Transparency' },
];

export default function EnterpriseHeader() {
  const {
    currentStep,
    setCurrentStep,
    company,
    updateCompany,
    resetAllToGoogleDefaults,
  } = useEnterprise();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
        {/* Company Context & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold text-sm tracking-tighter">
            G
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-neutral-900 tracking-tight">
                TrueImpact AI
              </h1>
              <span className="text-[11px] font-mono text-neutral-600 bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded">
                Google Enterprise Edition
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-medium">
              Enterprise Performance &amp; Objective Transparency Engine • {company.name} Inc.
            </p>
          </div>
        </div>

        {/* Review Cycle Selector & Controls */}
        <div className="flex items-center gap-3">
          {/* Active Review Cycle */}
          <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-xs">
            <span className="text-neutral-500">Evaluation Cycle:</span>
            <select
              value={company.activeCycle}
              onChange={(e) => updateCompany({ activeCycle: e.target.value })}
              className="bg-transparent font-semibold text-neutral-900 cursor-pointer focus:outline-none"
            >
              {company.availableCycles.map((cycle) => (
                <option key={cycle} value={cycle}>
                  {cycle}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Baseline */}
          <button
            onClick={resetAllToGoogleDefaults}
            className="p-2 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-neutral-900 text-xs transition-colors"
            title="Reset to Google Enterprise default state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5-Step Horizontal Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <nav className="flex items-center justify-between space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none py-1">
          {STAGES.map((stage) => {
            const isActive = currentStep === stage.id;
            const isCompleted = currentStep > stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => setCurrentStep(stage.id)}
                className={`py-2 px-3 sm:px-4 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                    : isCompleted
                    ? 'bg-neutral-100 text-neutral-900 border-neutral-200 hover:bg-neutral-200'
                    : 'bg-white text-neutral-500 border-transparent hover:border-neutral-200 hover:text-neutral-800'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    isActive
                      ? 'bg-white text-neutral-900'
                      : isCompleted
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-2.5 h-2.5" /> : stage.id}
                </span>
                <span>{stage.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
