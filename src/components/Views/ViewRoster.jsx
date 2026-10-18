import React, { useState } from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import {
  Users,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function ViewRoster() {
  const {
    employees,
    roles,
    company,
    setActiveReviewEmployeeId,
    setIsAddEmployeeModalOpen,
  } = useEnterprise();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');

  const needsVerificationCount = employees.filter(
    (e) => e.verificationStatus === 'needs_verification'
  ).length;

  const verifiedCount = employees.filter(
    (e) => e.verificationStatus === 'verified'
  ).length;

  const avgScore = employees.length
    ? Math.round(employees.reduce((acc, c) => acc + c.finalScore, 0) / employees.length)
    : 0;

  const filteredEmployees = employees.filter((emp) => {
    if (search) {
      const q = search.toLowerCase();
      const matchName = emp.name.toLowerCase().includes(q);
      const matchRole = emp.roleName.toLowerCase().includes(q);
      const matchAid = emp.aid.toLowerCase().includes(q);
      if (!matchName && !matchRole && !matchAid) return false;
    }

    if (roleFilter !== 'all' && emp.roleId !== roleFilter) return false;
    if (verificationFilter !== 'all' && emp.verificationStatus !== verificationFilter)
      return false;

    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Title & CTA Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              Employees &amp; Quarterly Reviews
            </h2>
            <span className="text-xs font-mono font-bold bg-neutral-100 border border-neutral-300 text-neutral-700 px-2.5 py-0.5 rounded">
              {company.activeCycle}
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time candidate telemetry bound to corporate AIDs. Inspect MCP workflow data, resolve ambiguous flags, and verify ratings.
          </p>
        </div>

        {/* Prominent Primary CTA */}
        <button
          onClick={() => setIsAddEmployeeModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add &amp; Map Employee (AID)</span>
        </button>
      </div>

      {/* 4 Quick Stat Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
            Mapped Personnel
          </span>
          <div className="text-2xl font-extrabold font-mono text-neutral-900 mt-1">
            {employees.length}
          </div>
          <span className="text-[11px] text-neutral-500 mt-0.5 block">
            Google Active AIDs
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
            Pending Context
          </span>
          <div className="text-2xl font-extrabold font-mono text-neutral-900 mt-1">
            {needsVerificationCount}
          </div>
          <span className="text-[11px] text-neutral-500 mt-0.5 block">
            Needs Manager Input
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
            Leader Verified
          </span>
          <div className="text-2xl font-extrabold font-mono text-neutral-900 mt-1">
            {verifiedCount}
          </div>
          <span className="text-[11px] text-neutral-500 mt-0.5 block">
            Published to Portal
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
            Average Score
          </span>
          <div className="text-2xl font-extrabold font-mono text-neutral-900 mt-1">
            {avgScore}/100
          </div>
          <span className="text-[11px] text-neutral-500 mt-0.5 block">
            Calibrated Index
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name, AID, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-50 border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500 font-mono">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-neutral-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500 font-mono">Verification:</span>
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="bg-neutral-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="needs_verification">Needs Verification</option>
              <option value="verified">Leader Verified</option>
            </select>
          </div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-gray-200 text-neutral-600 font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Corporate AID</th>
                <th className="py-3.5 px-4">Linked Role &amp; Level</th>
                <th className="py-3.5 px-4">MCP Tool Sync</th>
                <th className="py-3.5 px-4">AI Verification Status</th>
                <th className="py-3.5 px-4">Final Score</th>
                <th className="py-3.5 px-4 text-right">Evaluation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map((emp) => {
                const isVerified = emp.verificationStatus === 'verified';
                const hasPendingOverrides = emp.ambiguousAlerts?.some((a) => a.isOverridden);

                return (
                  <tr
                    key={emp.id}
                    className="hover:bg-neutral-50/70 transition-colors cursor-pointer"
                    onClick={() => setActiveReviewEmployeeId(emp.id)}
                  >
                    {/* Employee Profile */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-200"
                        />
                        <div>
                          <div className="font-bold text-neutral-900 text-sm">{emp.name}</div>
                          <div className="text-[11px] text-neutral-500 font-mono">
                            {emp.archetype}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* AID */}
                    <td className="py-4 px-4 font-mono font-bold text-neutral-800">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-300">
                        {emp.aid}
                      </span>
                    </td>

                    {/* Role & Level */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-neutral-900">{emp.roleName}</div>
                      <div className="text-[11px] text-neutral-500 font-mono">
                        Tier: <strong className="text-neutral-800">{emp.currentLevel}</strong>
                      </div>
                    </td>

                    {/* MCP Tool Sync */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {emp.mcpTools.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono bg-neutral-100 border border-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded"
                          >
                            {t.replace(' MCP', '')}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono block mt-1">
                        {emp.mcpSyncStatus}
                      </span>
                    </td>

                    {/* AI Verification Status */}
                    <td className="py-4 px-4">
                      {isVerified ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300 text-[11px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />
                          <span>Leader Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-400 text-[11px] font-bold">
                          <AlertTriangle className="w-3.5 h-3.5 text-neutral-900" />
                          <span>Needs Manager Verification</span>
                        </span>
                      )}
                    </td>

                    {/* Final Score */}
                    <td className="py-4 px-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-extrabold font-mono text-neutral-900">
                          {emp.finalScore}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">/100</span>
                      </div>
                      <div className="w-16 bg-neutral-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-neutral-900 h-1.5 rounded-full"
                          style={{ width: `${emp.finalScore}%` }}
                        />
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveReviewEmployeeId(emp.id);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <span>Review &amp; Verify Context</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
