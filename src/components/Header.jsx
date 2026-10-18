import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ROLES } from '../data/initialData';
import {
  Sparkles,
  Layers,
  Activity,
  PlusCircle,
  RotateCcw,
  Palette,
  Kanban,
  Code2,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

const ROLE_ICONS = {
  design: Palette,
  product: Kanban,
  engineering: Code2,
  supply_chain: Truck,
};

export default function Header({ onOpenAddEmployee, onOpenLiveTelemetry }) {
  const {
    selectedRole,
    setSelectedRole,
    activeTab,
    setActiveTab,
    activeRoleData,
    activeEmployees,
    resetToDefaults,
  } = useApp();

  const [confirmReset, setConfirmReset] = useState(false);

  // Compute stats for current role
  const totalEmployees = activeEmployees.length;
  const avgScore = totalEmployees
    ? Math.round(
        activeEmployees.reduce((acc, curr) => acc + curr.trueImpactScore, 0) /
          totalEmployees
      )
    : 0;

  const slopRate = totalEmployees
    ? Math.round(
        (activeEmployees.filter((e) => e.trueImpactScore < 50).length /
          totalEmployees) *
          100
      )
    : 0;

  const tabs = [
    { id: 1, label: '1. Onboarding & Blueprint', short: 'Blueprint' },
    { id: 2, label: '2. Workflow & Tool Mesh', short: 'Tool Mesh' },
    { id: 3, label: '3. AI Workslop vs. Value Audit', short: 'Value Audit' },
    { id: 4, label: '4. Promotions & Salary Hikes (Decisions)', short: 'Decisions & Sandbox' },
  ];

  return (
    <header className="border-b border-white/10 bg-[#0B0D11]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner / Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-white/5">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C96843] to-[#8C3D22] flex items-center justify-center shadow-glow-terracotta ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5 font-sans">
                TrueImpact<span className="text-[#C96843]">AI</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                v2.5 Enterprise
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-gray-400 font-medium">
                Powered by <strong className="text-gray-200">Google Cloud Vertex AI</strong> &amp; <span className="text-[#C96843] font-semibold">Gemini 2.5</span>
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Context Stats & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Metrics Pill */}
          <div className="hidden md:flex items-center gap-4 px-3.5 py-1.5 rounded-lg bg-[#131722] border border-white/10 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400">Department:</span>
              <span className="text-white font-medium">{activeRoleData.name}</span>
            </div>
            <div className="w-px h-3.5 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400">Avg TrueImpact:</span>
              <span
                className={`font-semibold font-mono ${
                  avgScore >= 80
                    ? 'text-emerald-400'
                    : avgScore >= 60
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {avgScore}/100
              </span>
            </div>
            <div className="w-px h-3.5 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400">Workslop Penalty:</span>
              <span className="text-rose-400 font-semibold font-mono">{slopRate}%</span>
            </div>
          </div>

          {/* Add Employee Button */}
          <button
            onClick={onOpenAddEmployee}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C96843] hover:bg-[#B55A36] text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            title="Add Team Member to Rubric Evaluation"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Member</span>
          </button>

          {/* Reset State Button */}
          {confirmReset ? (
            <div className="flex items-center gap-1 bg-rose-950/80 border border-rose-500/40 p-1 rounded-lg text-xs">
              <span className="text-rose-200 px-1 text-[11px]">Confirm?</span>
              <button
                onClick={() => {
                  resetToDefaults();
                  setConfirmReset(false);
                }}
                className="px-2 py-0.5 rounded bg-rose-600 text-white font-medium text-[11px]"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-2 py-0.5 rounded bg-white/10 text-gray-300 text-[11px]"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="p-1.5 rounded-lg bg-[#131722] hover:bg-white/5 border border-white/10 text-gray-400 hover:text-gray-200 text-xs transition-colors"
              title="Reset Demo Data to Factory Baseline"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Role Switcher Pill Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full md:w-auto scrollbar-none">
          <span className="text-xs uppercase font-mono tracking-wider text-gray-400 whitespace-nowrap mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#C96843]" /> Role Domain:
          </span>
          <div className="inline-flex p-1 rounded-xl bg-[#131722] border border-white/10 shadow-inner">
            {ROLES.map((role) => {
              const Icon = ROLE_ICONS[role.id] || Layers;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#C96843] text-white shadow-glow-terracotta'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                  <span>{role.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Description Banner */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C96843]"></span>
          <span>{activeRoleData.category}</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-300">{activeRoleData.badge}</span>
        </div>
      </div>

      {/* 4 Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 border-t border-white/5 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group py-3 px-3 sm:px-4 inline-flex items-center gap-2 border-b-2 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all ${
                  isActive
                    ? 'border-[#C96843] text-[#C96843]'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-white/20'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-[#C96843] text-white'
                      : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-gray-200'
                  }`}
                >
                  {tab.id}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
