import React, { useState } from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import {
  Workflow,
  Plus,
  X,
  Check,
  Layers,
  Cpu,
  ChevronRight,
  Sliders,
  FileText
} from 'lucide-react';

export default function ViewRolesWorkflows() {
  const {
    roles,
    selectedRoleId,
    setSelectedRoleId,
    selectedLevelId,
    setSelectedLevelId,
    activeRole,
    updateRoleLevelExpectations,
    addNewRole,
  } = useEnterprise();

  const currentLevelData = activeRole?.levels?.[selectedLevelId] || {
    title: `${selectedLevelId} Practitioner`,
    responsibilities: '',
    benchmark: '',
  };

  const [editingText, setEditingText] = useState(currentLevelData.responsibilities);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDomain, setNewRoleDomain] = useState('');

  React.useEffect(() => {
    if (activeRole?.levels?.[selectedLevelId]) {
      setEditingText(activeRole.levels[selectedLevelId].responsibilities);
    }
  }, [activeRole, selectedLevelId]);

  const handleSave = () => {
    updateRoleLevelExpectations(activeRole.id, selectedLevelId, editingText);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    addNewRole({
      name: newRoleName.trim(),
      domain: newRoleDomain.trim() || 'Core Product Strategy',
    });
    setNewRoleName('');
    setNewRoleDomain('');
    setIsAddRoleOpen(false);
  };

  const levels = ['L3', 'L4', 'L5', 'L6'];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            Organization Setup • Roles &amp; Delivery Pipelines
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Job Roles, Levels, Workflows &amp; MCP Schema
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Pre-configured role baselines for Google Inc. Defines expectations across L3–L6, workflow stages, and automatic MCP tool schema bindings.
          </p>
        </div>

        <button
          onClick={() => setIsAddRoleOpen(true)}
          className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Create New Role</span>
        </button>
      </div>

      {/* Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Role List (Master) */}
        <div className="lg:col-span-4 space-y-2">
          <label className="block text-xs uppercase font-mono tracking-wider text-neutral-500 font-bold mb-2">
            Configured Google Roles ({roles.length})
          </label>

          <div className="space-y-2">
            {roles.map((r) => {
              const isSelected = selectedRoleId === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoleId(r.id)}
                  className={`w-full p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-white text-neutral-800 border-gray-200 hover:border-gray-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm leading-snug">{r.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                      }`}
                    >
                      {r.shortCode || 'ROLE'}
                    </span>
                  </div>
                  <span
                    className={`text-xs ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    {r.domain}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Role Detail */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-neutral-900">
                {activeRole.name}
              </h3>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                Domain: {activeRole.domain} • Standardized for Google Inc.
              </p>
            </div>

            {/* 1. Seniority Level Selector */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <label className="text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold block">
                1. Seniority Tier Responsibilities (L3 to L6)
              </label>

              <div className="grid grid-cols-4 gap-2">
                {levels.map((lvl) => {
                  const isSelected = selectedLevelId === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevelId(lvl)}
                      className={`py-2 px-3 rounded-xl text-center text-xs border transition-all ${
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

              {/* Editable Level Expectation Text */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">
                    {currentLevelData.title}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    Benchmark: {currentLevelData.benchmark}
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-neutral-900 leading-relaxed font-sans focus:outline-none focus:border-neutral-900"
                />

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleSave}
                    className="px-4 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs"
                  >
                    Save {selectedLevelId} Benchmark
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Step-by-Step Daily Workflow Pipeline */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold block">
                2. Mandatory Role Workflow Pipeline Stages
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {activeRole.workflow?.map((st) => (
                  <div
                    key={st.step}
                    className="p-3 rounded-xl bg-neutral-50 border border-gray-200 text-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-neutral-400 block mb-1">
                        Step 0{st.step}
                      </span>
                      <h4 className="font-bold text-neutral-900 leading-tight">
                        {st.name}
                      </h4>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-2 line-clamp-2 leading-tight font-sans">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Expected MCP Tool Schema Bindings */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-neutral-700 font-bold block">
                3. Expected MCP Tool Schema Bindings
              </label>

              <div className="flex flex-wrap gap-2">
                {activeRole.mcpBindings?.map((m) => (
                  <div
                    key={m}
                    className="px-3 py-2 rounded-xl bg-white border border-gray-300 flex items-center gap-2 text-xs font-semibold text-neutral-900"
                  >
                    <span className="w-2 h-2 rounded-full bg-neutral-900" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create New Role Modal */}
      {isAddRoleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-gray-300 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                + Create New Google Job Role
              </h3>
              <button
                onClick={() => setIsAddRoleOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Security Systems Engineer (Google Cloud)"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">Domain / Group</label>
                <input
                  type="text"
                  placeholder="e.g. Infrastructure Security &amp; Compliance"
                  value={newRoleDomain}
                  onChange={(e) => setNewRoleDomain(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddRoleOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white font-bold"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
