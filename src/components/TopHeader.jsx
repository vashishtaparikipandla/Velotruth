import React from 'react';
import { useEnterprise } from '../context/EnterpriseContext';
import { Building, Calendar, Plus, RotateCcw, ShieldCheck } from 'lucide-react';

export default function TopHeader() {
  const {
    company,
    updateCompany,
    setIsAddEmployeeModalOpen,
    resetAllToGoogleDefaults,
  } = useEnterprise();

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Organization & Review Cycle Context */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Organization Name */}
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
          <Building className="w-3.5 h-3.5 text-neutral-500" />
          <span>Organization:</span>
          <span className="font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
            {company.name}
          </span>
        </div>

        <div className="h-4 w-px bg-gray-200 hidden sm:block" />

        {/* Review Period Selector */}
        <div className="flex items-center gap-2 text-xs">
          <Calendar className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-neutral-500 hidden md:inline">Review Period:</span>
          <select
            value={company.activeCycle}
            onChange={(e) => updateCompany({ activeCycle: e.target.value })}
            className="bg-neutral-50 border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-bold text-neutral-900 cursor-pointer focus:outline-none focus:border-neutral-900"
          >
            {company.availableCycles.map((cycle) => (
              <option key={cycle} value={cycle}>
                {cycle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Primary CTA: + Add & Map Employee (AID) */}
        <button
          onClick={() => setIsAddEmployeeModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add &amp; Map Employee (AID)</span>
        </button>

        {/* Reset State */}
        <button
          onClick={resetAllToGoogleDefaults}
          className="p-2 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors"
          title="Reset to Google Enterprise default state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
