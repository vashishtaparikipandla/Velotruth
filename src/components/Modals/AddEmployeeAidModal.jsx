import React, { useState } from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import { X, UserPlus, Link, Cpu, CheckCircle2, ArrowRight, Radio } from 'lucide-react';

export default function AddEmployeeAidModal() {
  const {
    isAddEmployeeModalOpen,
    setIsAddEmployeeModalOpen,
    roles,
    addEmployeeWithAID,
  } = useEnterprise();

  const [name, setName] = useState('');
  const [aid, setAid] = useState('');
  const [roleId, setRoleId] = useState(roles[0]?.id || 'ux_design');
  const [level, setLevel] = useState('L4');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAddEmployeeModalOpen) return null;

  const selectedRoleObj = roles.find((r) => r.id === roleId) || roles[0];
  const mappedTools = selectedRoleObj?.mcpBindings || ['Figma MCP', 'Google Chat / Slack MCP', 'Buganizer / Jira MCP'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !aid.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addEmployeeWithAID({
        name: name.trim(),
        aid: aid.trim(),
        roleId,
        level,
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-gray-300 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-neutral-900">
                + Add &amp; Map Employee (AID)
              </h3>
              <p className="text-xs text-neutral-500">
                Bind corporate Google AID to automated MCP tool telemetry.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddEmployeeModalOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* 1. Employee Name */}
          <div>
            <label className="block text-neutral-800 font-bold uppercase tracking-wider text-[11px] mb-1.5">
              1. Employee Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vikramaditya Rao"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {/* 2. Corporate AID / Identifier */}
          <div>
            <label className="block text-neutral-800 font-bold uppercase tracking-wider text-[11px] mb-1.5">
              2. Corporate AID / Email Identifier
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AID-GGL-9042 or vikram@google.com"
              value={aid}
              onChange={(e) => setAid(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 font-mono font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            />
            <p className="text-[10px] text-neutral-500 font-mono mt-1">
              AID is used by Model Context Protocol (MCP) servers to isolate candidate commits &amp; specs.
            </p>
          </div>

          {/* 3. Link to Onboarded Role & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-800 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                3. Onboarded Job Role
              </label>
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-neutral-900 font-medium focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-neutral-800 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                Current Level Tier
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-neutral-900 font-medium focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="L3">L3 Junior</option>
                <option value="L4">L4 Mid-Level</option>
                <option value="L5">L5 Senior</option>
                <option value="L6">L6 Staff</option>
              </select>
            </div>
          </div>

          {/* Automatic MCP Tool Binding Preview */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-gray-200 space-y-2.5 font-mono">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-neutral-800 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-neutral-900" />
                Automatic MCP Tool Binding Preview
              </span>
              <span className="text-[10px] text-neutral-500">Live Schema Resolution</span>
            </div>

            <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
              Selecting <strong className="text-neutral-900">{selectedRoleObj.name}</strong> automatically maps <strong className="text-neutral-900">{aid || 'AID-GGL-xxxx'}</strong> across the following corporate MCP servers:
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {mappedTools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-300 text-neutral-800 text-[11px] font-bold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAddEmployeeModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold flex items-center gap-2 shadow-xs transition-all active:scale-98"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Fetching MCP Telemetry...</span>
                </>
              ) : (
                <>
                  <Link className="w-3.5 h-3.5" />
                  <span>Link AID &amp; Fetch Quarterly MCP Data</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
