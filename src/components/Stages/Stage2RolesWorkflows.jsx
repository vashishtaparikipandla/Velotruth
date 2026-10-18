import React, { useState } from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import {
  ArrowRight,
  Plus,
  Check,
  X,
  Power,
  Layers,
  Radio,
  FileText,
  Sliders,
  ChevronRight,
  CheckCircle2,
  Workflow
} from 'lucide-react';

export default function Stage2RolesWorkflows() {
  const {
    roles,
    selectedRoleId,
    setSelectedRoleId,
    selectedLevelId,
    setSelectedLevelId,
    activeRole,
    updateRoleLevelExpectations,
    updateRoleWorkflow,
    toggleRoleTool,
    addNewRole,
    setCurrentStep,
  } = useEnterprise();

  // Local editing states
  const currentLevelData = activeRole?.levels?.[selectedLevelId] || {
    title: `${selectedLevelId} Practitioner`,
    responsibilities: '',
    benchmark: '',
  };

  const [editingText, setEditingText] = useState(currentLevelData.responsibilities);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDomain, setNewRoleDomain] = useState('');

  // Sync text when activeRole or selectedLevel changes
  React.useEffect(() => {
    if (activeRole?.levels?.[selectedLevelId]) {
      setEditingText(activeRole.levels[selectedLevelId].responsibilities);
    }
  }, [activeRole, selectedLevelId]);

  const handleSaveResponsibilities = () => {
    updateRoleLevelExpectations(activeRole.id, selectedLevelId, editingText);
  };

  const handleCreateRoleSubmit = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    addNewRole({
      name: newRoleName.trim(),
      domain: newRoleDomain.trim() || 'Core Operations',
    });
    setNewRoleName('');
    setNewRoleDomain('');
    setIsAddingRole(false);
  };

  const levelsList = ['L3', 'L4', 'L5', 'L6'];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
            Step 2 of 5 • Role Governance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Job Roles, Levels, Workflows &amp; Tool Mesh
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
            Configure clear expectations per seniority level, map step-by-step delivery pipelines, and connect daily execution and communication tools.
          </p>
        </div>

        {/* Add Role Button */}
        <button
          onClick={() => setIsAddingRole(true)}
          className="px-4 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-xs font-bold text-neutral-900 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add New Role / Level</span>
        </button>
      </div>

      {/* Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Role List (Master) */}
        <div className="lg:col-span-4 space-y-2">
          <label className="block text-xs uppercase font-mono tracking-wider text-neutral-500 font-bold mb-2">
            Configured Google Roles ({roles.length})
          </label>

          <div className="space-y-2">
            {roles.map((role) => {
              const isSelected = selectedRoleId === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`w-full p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-white text-neutral-800 border-gray-200 hover:border-gray-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm leading-snug">{role.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                      }`}
                    >
                      {role.shortCode || 'ROLE'}
                    </span>
                  </div>
                  <span
                    className={`text-xs ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    {role.domain}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Role Details (Detail) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6">
            {/* Header of Active Role */}
            <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-extrabold text-neutral-900">
                  {activeRole.name}
                </h3>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  Domain: {activeRole.domain} • Standardized for Google Enterprise
                </p>
              </div>
            </div>

            {/* 1. Seniority Level Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold">
                  1. Seniority Level Expectations &amp; Anti-Slop Guardrails
                </label>
                <span className="text-[11px] font-mono text-neutral-500">
                  Select tier to view/edit
                </span>
              </div>

              {/* Level Buttons (L3 to L6) */}
              <div className="grid grid-cols-4 gap-2">
                {levelsList.map((lvl) => {
                  const isSelected = selectedLevelId === lvl;
                  const lvlData = activeRole.levels?.[lvl];
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevelId(lvl)}
                      className={`py-2 px-3 rounded-lg text-center text-xs transition-all border ${
                        isSelected
                          ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                          : 'bg-neutral-50 text-neutral-700 border-gray-200 hover:border-gray-400 font-medium'
                      }`}
                    >
                      <div className="font-mono text-xs">{lvl}</div>
                      <div className="text-[10px] truncate opacity-80 mt-0.5">
                        {lvl === 'L3'
                          ? 'Junior'
                          : lvl === 'L4'
                          ? 'Mid-Level'
                          : lvl === 'L5'
                          ? 'Senior'
                          : 'Staff'}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Level Specific Descriptive Text */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">
                    {currentLevelData.title}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Benchmark: {currentLevelData.benchmark}
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-neutral-900 leading-relaxed font-sans focus:outline-none focus:border-neutral-900 transition-colors"
                />

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleSaveResponsibilities}
                    className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors"
                  >
                    Save {selectedLevelId} Expectations
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Step-by-Step Daily Workflow Pipeline */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold block">
                2. Step-by-Step Daily Delivery Pipeline
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {activeRole.workflow.map((st) => (
                  <div
                    key={st.step}
                    className="p-3 rounded-lg bg-neutral-50 border border-gray-200 text-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-neutral-500 block mb-1">
                        Step 0{st.step}
                      </span>
                      <h4 className="font-bold text-neutral-900 leading-snug">
                        {st.name}
                      </h4>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-2 line-clamp-2 leading-tight">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Mapped Day-to-Day Tools */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold block">
                3. Connected Execution &amp; Communication Tools
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeRole.tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="p-3.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-neutral-900">{tool.name}</div>
                      <span className="text-[10px] font-mono uppercase text-neutral-500">
                        {tool.type} Connector
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRoleTool(activeRole.id, tool.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
                        tool.connected
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-300 hover:bg-neutral-200'
                      }`}
                    >
                      {tool.connected ? 'Connected' : 'Disconnected'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => setCurrentStep(3)}
          className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all shadow-sm active:scale-98"
        >
          <span>Continue to People &amp; Roster</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Add New Role Modal */}
      {isAddingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-gray-300 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                + Add New Google Job Role
              </h3>
              <button
                onClick={() => setIsAddingRole(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRoleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Data Scientist (Google Cloud)"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">Domain / Group</label>
                <input
                  type="text"
                  placeholder="e.g. AI &amp; Machine Learning Operations"
                  value={newRoleDomain}
                  onChange={(e) => setNewRoleDomain(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingRole(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white font-bold"
                >
                  Add Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
