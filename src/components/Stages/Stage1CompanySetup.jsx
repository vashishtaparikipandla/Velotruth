import React, { useState } from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import { Building2, ShieldCheck, ArrowRight, Plus, X, Layers, Sparkles } from 'lucide-react';

export default function Stage1CompanySetup() {
  const { company, updateCompany, setCurrentStep } = useEnterprise();

  const [companyName, setCompanyName] = useState(company.name);
  const [legalEntity, setLegalEntity] = useState(company.legalEntity);
  const [philosophy, setPhilosophy] = useState(company.evaluationPhilosophy);
  const [businessUnits, setBusinessUnits] = useState(company.businessUnits);
  const [newUnitInput, setNewUnitInput] = useState('');

  const handleAddUnit = (e) => {
    e.preventDefault();
    if (!newUnitInput.trim()) return;
    if (!businessUnits.includes(newUnitInput.trim())) {
      setBusinessUnits([...businessUnits, newUnitInput.trim()]);
    }
    setNewUnitInput('');
  };

  const handleRemoveUnit = (unitToRemove) => {
    setBusinessUnits(businessUnits.filter((u) => u !== unitToRemove));
  };

  const handleSaveAndContinue = () => {
    updateCompany({
      name: companyName,
      legalEntity,
      evaluationPhilosophy: philosophy,
      businessUnits,
    });
    setCurrentStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Section Intro */}
      <div className="border-b border-gray-200 pb-5">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
          Step 1 of 5 • Enterprise Onboarding
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
          Company Setup &amp; Review Cycle Configuration
        </h2>
        <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
          Define enterprise parameters, operational business units, and the governing AI evaluation philosophy for objective talent calibration at Google.
        </p>
      </div>

      {/* Main Setup Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6">
        {/* Company Identity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold mb-1.5">
              Enterprise Organization Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold mb-1.5">
              Legal Corporate Entity
            </label>
            <input
              type="text"
              value={legalEntity}
              onChange={(e) => setLegalEntity(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
            />
          </div>
        </div>

        {/* Business Units Chips */}
        <div>
          <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold mb-1.5">
            Business Units Onboarded for Telemetry
          </label>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {businessUnits.map((unit) => (
              <span
                key={unit}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-300 text-xs text-neutral-900 font-medium"
              >
                <span>{unit}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveUnit(unit)}
                  className="text-neutral-400 hover:text-neutral-900 ml-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Add unit input */}
          <form onSubmit={handleAddUnit} className="flex gap-2">
            <input
              type="text"
              placeholder="Add another business unit (e.g. Android Core, YouTube)..."
              value={newUnitInput}
              onChange={(e) => setNewUnitInput(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-xs font-semibold text-neutral-800 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Unit</span>
            </button>
          </form>
        </div>

        {/* Active Evaluation Cycle Pills */}
        <div className="pt-2 border-t border-gray-100">
          <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold mb-2">
            Active Evaluation Cycle
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {company.availableCycles.map((cycle) => {
              const isSelected = company.activeCycle === cycle;
              return (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => updateCompany({ activeCycle: cycle })}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 font-bold shadow-sm'
                      : 'bg-white text-neutral-700 border-gray-200 hover:border-gray-400 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{cycle}</span>
                    {isSelected && (
                      <span className="text-[10px] uppercase font-mono tracking-wider bg-white/20 px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className={`text-[11px] mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Q4 performance calibration &amp; promotion cycle
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Evaluation Philosophy Rule */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold">
              AI Evaluation Philosophy Rule
            </label>
            <span className="text-[11px] font-mono text-neutral-500">
              Guiding Principle
            </span>
          </div>
          <textarea
            rows={3}
            value={philosophy}
            onChange={(e) => setPhilosophy(e.target.value)}
            className="w-full bg-neutral-50 border border-gray-300 rounded-xl p-3.5 text-xs text-neutral-900 leading-relaxed font-sans focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
            placeholder="Enter the guiding AI evaluation standard..."
          />
          <p className="text-[11px] text-neutral-500 mt-1.5 leading-normal">
            This core philosophy sets the standard across all job rubrics: evaluating whether work is production-grade, adhering to Material 3 tokens, and free of downstream friction.
          </p>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSaveAndContinue}
          className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all shadow-sm active:scale-98"
        >
          <span>Save Company Context &amp; Configure Roles</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
