import React from 'react';
import { useEnterprise } from '../context/EnterpriseContext';
import {
  Users,
  ShieldCheck,
  Workflow,
  Sliders,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function Sidebar() {
  const { currentView, setCurrentView, mcpServers, company, employees } = useEnterprise();

  const needsVerificationCount = employees.filter(
    (e) => e.verificationStatus === 'needs_verification'
  ).length;

  const connectedMcpCount = mcpServers.filter((s) => s.status === 'Connected').length;

  return (
    <aside className="w-64 sm:w-72 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Brand & Workspace Context */}
      <div>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center text-white font-extrabold text-sm tracking-tighter">
              G
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-neutral-900 tracking-tight">
                  TrueImpact<span className="font-normal text-neutral-500">AI</span>
                </span>
                <span className="text-[10px] font-mono bg-neutral-100 border border-neutral-300 text-neutral-700 px-1.5 py-0.2 rounded font-semibold">
                  Google
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-medium">
                Enterprise SaaS Workspace
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="p-4 space-y-6">
          {/* GROUP A: CORE WORKSPACE */}
          <div className="space-y-1.5">
            <div className="px-2 text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              Core Workspace
            </div>

            {/* 1. Employees & Quarterly Reviews (Home) */}
            <button
              onClick={() => setCurrentView('roster')}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between border ${
                currentView === 'roster'
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white text-neutral-700 border-transparent hover:bg-neutral-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Users className="w-4 h-4 shrink-0" />
                <span className="truncate">Employees &amp; Reviews</span>
              </div>
              {needsVerificationCount > 0 && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                    currentView === 'roster'
                      ? 'bg-white text-neutral-900'
                      : 'bg-neutral-200 text-neutral-800'
                  }`}
                  title={`${needsVerificationCount} reviews pending manager verification`}
                >
                  {needsVerificationCount}
                </span>
              )}
            </button>

            {/* 2. Employee Transparency Portal */}
            <button
              onClick={() => setCurrentView('transparency')}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center gap-2.5 border ${
                currentView === 'transparency'
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white text-neutral-700 border-transparent hover:bg-neutral-100 hover:border-gray-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="truncate">Employee Transparency Portal</span>
            </button>
          </div>

          {/* GROUP B: ORGANIZATION SETUP */}
          <div className="space-y-1.5 pt-3 border-t border-gray-100">
            <div className="px-2 text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              Organization Setup
            </div>

            {/* 3. Job Roles, Levels & Workflows */}
            <button
              onClick={() => setCurrentView('roles')}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center gap-2.5 border ${
                currentView === 'roles'
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white text-neutral-700 border-transparent hover:bg-neutral-100 hover:border-gray-200'
              }`}
            >
              <Workflow className="w-4 h-4 shrink-0" />
              <span className="truncate">Roles, Levels &amp; Workflows</span>
            </button>

            {/* 4. Company Profile & MCP Connectors */}
            <button
              onClick={() => setCurrentView('company')}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between border ${
                currentView === 'company'
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white text-neutral-700 border-transparent hover:bg-neutral-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Sliders className="w-4 h-4 shrink-0" />
                <span className="truncate">Company &amp; MCP Mesh</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  currentView === 'company'
                    ? 'bg-white/20 text-white'
                    : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                }`}
              >
                {connectedMcpCount}/{mcpServers.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Profile & Telemetry Status Card */}
      <div className="p-4 border-t border-gray-200 bg-neutral-50 space-y-3">
        {/* MCP Status Pill */}
        <div className="p-2.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
            <span className="font-bold text-neutral-800">MCP Cluster</span>
          </div>
          <span className="text-neutral-500 text-[11px] font-semibold">
            {connectedMcpCount} Connected
          </span>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs border border-gray-300">
            S
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-neutral-900 truncate">
              Sundar P. (Reviewer)
            </div>
            <div className="text-[10px] text-neutral-500 font-mono truncate">
              Lead Calibration Manager
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
