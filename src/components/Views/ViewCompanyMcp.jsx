import React, { useState } from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import {
  Building2,
  Cpu,
  Power,
  CheckCircle2,
  X,
  Plus,
  Radio,
  Sliders,
  RotateCcw
} from 'lucide-react';

export default function ViewCompanyMcp() {
  const {
    company,
    updateCompany,
    mcpServers,
    toggleMcpServer,
  } = useEnterprise();

  const [companyName, setCompanyName] = useState(company.name);
  const [legalEntity, setLegalEntity] = useState(company.legalEntity);
  const [philosophy, setPhilosophy] = useState(company.evaluationPhilosophy);
  const [businessUnits, setBusinessUnits] = useState(company.businessUnits);
  const [newUnit, setNewUnit] = useState('');

  const handleAddUnit = (e) => {
    e.preventDefault();
    if (!newUnit.trim()) return;
    if (!businessUnits.includes(newUnit.trim())) {
      setBusinessUnits([...businessUnits, newUnit.trim()]);
    }
    setNewUnit('');
  };

  const handleRemoveUnit = (u) => {
    setBusinessUnits(businessUnits.filter((item) => item !== u));
  };

  const handleSaveCompany = () => {
    updateCompany({
      name: companyName,
      legalEntity,
      evaluationPhilosophy: philosophy,
      businessUnits,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="border-b border-gray-200 pb-5">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
          Organization Setup • Infrastructure &amp; Tool Mesh
        </span>
        <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight mt-1">
          Company Profile &amp; Global MCP Server Cluster
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          Manage Google Inc. enterprise profile, business units, and global Model Context Protocol (MCP) server connections for automated telemetry.
        </p>
      </div>

      {/* Grid: Left Company Profile, Right MCP Server Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Company Profile */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-neutral-900">
              Enterprise Organization Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-neutral-900 font-medium focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Legal Entity
                </label>
                <input
                  type="text"
                  value={legalEntity}
                  onChange={(e) => setLegalEntity(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-neutral-900 font-medium focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Business Units Onboarded
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {businessUnits.map((u) => (
                    <span
                      key={u}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 border border-neutral-300 text-[11px] font-medium text-neutral-800"
                    >
                      <span>{u}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveUnit(u)}
                        className="text-neutral-400 hover:text-neutral-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddUnit} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Add business unit..."
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="flex-1 bg-white border border-gray-300 rounded-lg p-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 font-bold text-xs"
                  >
                    Add
                  </button>
                </form>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  AI Evaluation Philosophy Rule
                </label>
                <textarea
                  rows={3}
                  value={philosophy}
                  onChange={(e) => setPhilosophy(e.target.value)}
                  className="w-full bg-neutral-50 border border-gray-300 rounded-lg p-2.5 text-xs text-neutral-900 leading-relaxed focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveCompany}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Save Enterprise Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Global MCP Server Cluster */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Model Context Protocol (MCP) Server Cluster
                </h3>
                <p className="text-xs text-neutral-500">
                  Centralized protocol servers ingesting commit diffs, design tokens, and chat threads.
                </p>
              </div>
              <span className="text-[11px] font-mono bg-neutral-100 border border-neutral-300 px-2.5 py-1 rounded text-neutral-700 font-bold">
                Port Range: 8081–8086
              </span>
            </div>

            <div className="space-y-3">
              {mcpServers.map((server) => {
                const isConnected = server.status === 'Connected';
                return (
                  <div
                    key={server.id}
                    className="p-4 rounded-xl border border-gray-200 bg-neutral-50 flex items-start justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 text-sm">
                          {server.name}
                        </span>
                        <span className="text-[10px] font-mono bg-white border border-gray-300 px-1.5 py-0.2 rounded text-neutral-600">
                          Port {server.port}
                        </span>
                        <span className="text-[10px] font-mono bg-white border border-gray-300 px-1.5 py-0.2 rounded text-neutral-600">
                          {server.version}
                        </span>
                      </div>
                      <p className="text-neutral-600 leading-snug">{server.scope}</p>
                      <div className="text-[10px] text-neutral-400 font-mono pt-1">
                        Latency: {server.latency} • {server.activeSessions} active AID telemetry sessions
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleMcpServer(server.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors shrink-0 ${
                        isConnected
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      {server.status}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
