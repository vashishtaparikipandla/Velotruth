import React, { useState } from 'react';
import { useEnterprise } from '../../context/EnterpriseContext';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Flame,
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react';

export default function Stage3PeopleRoster() {
  const {
    employees,
    roles,
    company,
    setSelectedEmployeeId,
    setCurrentStep,
    addEmployee,
  } = useEnterprise();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New employee form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState(roles[0]?.id || 'ux_design');
  const [newLevel, setNewLevel] = useState('L4');
  const [newScore, setNewScore] = useState(88);

  const handleOpenEvaluation = (empId) => {
    setSelectedEmployeeId(empId);
    setCurrentStep(4);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addEmployee({
      name: newName.trim(),
      roleId: newRole,
      currentLevel: newLevel,
      targetLevel: newLevel === 'L3' ? 'L4' : newLevel === 'L4' ? 'L5' : 'L6',
      overallScore: Number(newScore),
    });

    setNewName('');
    setIsAddOpen(false);
  };

  const filteredEmployees = employees.filter((emp) => {
    if (search) {
      const query = search.toLowerCase();
      const matchName = emp.name.toLowerCase().includes(query);
      const matchRole = emp.roleName.toLowerCase().includes(query);
      if (!matchName && !matchRole) return false;
    }

    if (roleFilter !== 'all' && emp.roleId !== roleFilter) return false;
    if (levelFilter !== 'all' && emp.currentLevel !== levelFilter) return false;

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
            Step 3 of 5 • Enterprise Roster
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Employee Directory &amp; Role-Linked Roster
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
            All Google personnel actively evaluated for <strong className="text-neutral-900">{company.activeCycle}</strong>. Review calibrated TrueImpact Scores and launch manager decision workspaces.
          </p>
        </div>

        {/* Add Employee Button */}
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-white flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-sm"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>+ Add &amp; Link Employee</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search employee by name or role..."
            value={search}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white"
          />
        </div>

        {/* Filters */}
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
            <span className="text-neutral-500 font-mono">Level:</span>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-neutral-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Levels</option>
              <option value="L3">L3 Junior</option>
              <option value="L4">L4 Mid-Level</option>
              <option value="L5">L5 Senior</option>
              <option value="L6">L6 Staff</option>
            </select>
          </div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-gray-200 text-neutral-600 font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Role &amp; Domain</th>
                <th className="py-3.5 px-4">Level</th>
                <th className="py-3.5 px-4">Connected Tools</th>
                <th className="py-3.5 px-4">Review Cycle</th>
                <th className="py-3.5 px-4">TrueImpact Score</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map((emp) => {
                const isHigh = emp.overallScore >= 80;
                return (
                  <tr key={emp.id} className="hover:bg-neutral-50/70 transition-colors">
                    {/* Employee Name & Avatar */}
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

                    {/* Role */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-neutral-800">{emp.roleName}</div>
                    </td>

                    {/* Level */}
                    <td className="py-4 px-4 font-mono">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-300 font-bold">
                        {emp.currentLevel}
                      </span>
                    </td>

                    {/* Connected Tools */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[160px]">
                        {emp.tools.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono bg-neutral-100 border border-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Review Cycle */}
                    <td className="py-4 px-4 font-mono text-neutral-600">
                      {emp.reviewPeriod}
                    </td>

                    {/* Score */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold font-mono text-neutral-900">
                          {emp.overallScore}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-mono">/100</span>
                      </div>
                      <div className="w-16 bg-neutral-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-neutral-900 h-1.5 rounded-full"
                          style={{ width: `${emp.overallScore}%` }}
                        />
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleOpenEvaluation(emp.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs inline-flex items-center gap-1 transition-colors shadow-xs"
                      >
                        <span>Evaluate Quarterly Performance</span>
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

      {/* Add Employee Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-gray-300 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                + Add &amp; Link Employee to Roster
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Chen"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">Assigned Google Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900 cursor-pointer"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1">Current Seniority</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900 cursor-pointer"
                  >
                    <option value="L3">L3 Junior</option>
                    <option value="L4">L4 Mid-Level</option>
                    <option value="L5">L5 Senior</option>
                    <option value="L6">L6 Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">TrueImpact Baseline</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white font-bold"
                >
                  Add to Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
