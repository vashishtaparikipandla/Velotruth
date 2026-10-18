import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COMPANY,
  INITIAL_ROLES,
  INITIAL_EMPLOYEES,
} from '../data/googleEnterpriseData';

const EnterpriseContext = createContext();

const STORAGE_KEY = 'trueimpact_google_enterprise_v2';

export function EnterpriseProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [company, setCompany] = useState(INITIAL_COMPANY);
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [selectedRoleId, setSelectedRoleId] = useState(INITIAL_ROLES[0].id);
  const [selectedLevelId, setSelectedLevelId] = useState('L4');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('emp-1'); // Default Aarav Sharma
  const [toastMessage, setToastMessage] = useState(null);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
        if (parsed.company) setCompany(parsed.company);
        if (parsed.roles) setRoles(parsed.roles);
        if (parsed.selectedRoleId) setSelectedRoleId(parsed.selectedRoleId);
        if (parsed.selectedLevelId) setSelectedLevelId(parsed.selectedLevelId);
        if (parsed.employees) setEmployees(parsed.employees);
        if (parsed.selectedEmployeeId) setSelectedEmployeeId(parsed.selectedEmployeeId);
      }
    } catch (e) {
      console.warn('Could not read state from localStorage', e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentStep,
          company,
          roles,
          selectedRoleId,
          selectedLevelId,
          employees,
          selectedEmployeeId,
        })
      );
    } catch (e) {
      console.warn('Could not save state to localStorage', e);
    }
  }, [currentStep, company, roles, selectedRoleId, selectedLevelId, employees, selectedEmployeeId]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Company updater
  const updateCompany = (fields) => {
    setCompany((prev) => ({ ...prev, ...fields }));
    showToast('Company configuration updated.');
  };

  // Role helpers
  const activeRole = roles.find((r) => r.id === selectedRoleId) || roles[0];

  const updateRoleLevelExpectations = (roleId, levelKey, newText) => {
    setRoles((prev) =>
      prev.map((role) => {
        if (role.id === roleId) {
          return {
            ...role,
            levels: {
              ...role.levels,
              [levelKey]: {
                ...role.levels[levelKey],
                responsibilities: newText,
              },
            },
          };
        }
        return role;
      })
    );
    showToast(`Updated ${levelKey} expectations for ${activeRole.name}.`);
  };

  const updateRoleWorkflow = (roleId, newWorkflow) => {
    setRoles((prev) =>
      prev.map((role) => {
        if (role.id === roleId) {
          return {
            ...role,
            workflow: newWorkflow,
          };
        }
        return role;
      })
    );
    showToast('Workflow pipeline steps updated.');
  };

  const toggleRoleTool = (roleId, toolId) => {
    setRoles((prev) =>
      prev.map((role) => {
        if (role.id === roleId) {
          return {
            ...role,
            tools: role.tools.map((tool) =>
              tool.id === toolId ? { ...tool, connected: !tool.connected } : tool
            ),
          };
        }
        return role;
      })
    );
    showToast('Tool connection state updated.');
  };

  const addNewRole = (newRoleData) => {
    const id = `role_${Date.now()}`;
    const newRole = {
      id,
      name: newRoleData.name,
      domain: newRoleData.domain || 'Engineering & Operations',
      shortCode: newRoleData.shortCode || 'NEW-R',
      levels: {
        L3: {
          title: `L3 Junior ${newRoleData.name}`,
          responsibilities: 'Execute baseline responsibilities with guidance and high standards.',
          benchmark: 'Foundational Craft • Zero High-Priority Blockers',
        },
        L4: {
          title: `L4 Mid-Level ${newRoleData.name}`,
          responsibilities: 'Autonomous project execution and cross-team coordination.',
          benchmark: 'Autonomous Execution • Low Friction Handoffs',
        },
        L5: {
          title: `L5 Senior ${newRoleData.name}`,
          responsibilities: 'System-level architecture and junior member mentorship.',
          benchmark: 'System Leadership • Zero Rework Mentorship',
        },
        L6: {
          title: `L6 Staff ${newRoleData.name}`,
          responsibilities: 'Organization-wide strategy and standards governance.',
          benchmark: 'Org-wide Impact • Multi-team Alignment',
        },
      },
      workflow: [
        { step: 1, name: 'Scope & Discovery', desc: 'Define problem & alignment' },
        { step: 2, name: 'Draft Solution', desc: 'Create initial spec / implementation' },
        { step: 3, name: 'Review & Verify', desc: 'Peer critique and automated testing' },
        { step: 4, name: 'Release & Handoff', desc: 'Deliver with zero downstream rework' },
      ],
      tools: [
        { id: 'gdocs', name: 'Google Docs (PRDs & Specs)', type: 'Execution', connected: true },
        { id: 'chat', name: 'Google Chat / Slack (Handoff Clarity)', type: 'Communication', connected: true },
      ],
    };

    setRoles((prev) => [...prev, newRole]);
    setSelectedRoleId(id);
    showToast(`Added new role: ${newRole.name}`);
  };

  // Employee helpers
  const activeEmployee =
    employees.find((e) => e.id === selectedEmployeeId) || employees[0];

  const addEmployee = (newEmp) => {
    const id = `emp-${Date.now()}`;
    const fullEmp = {
      id,
      name: newEmp.name,
      avatar:
        newEmp.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      roleId: newEmp.roleId || selectedRoleId,
      roleName:
        roles.find((r) => r.id === (newEmp.roleId || selectedRoleId))?.name ||
        'UX Designer (Material Design 3)',
      currentLevel: newEmp.currentLevel || 'L4',
      targetLevel: newEmp.targetLevel || 'L5',
      reviewPeriod: company.activeCycle,
      tools: newEmp.tools || ['Figma', 'Google Chat', 'Buganizer'],
      overallScore: Number(newEmp.overallScore) || 88,
      status: Number(newEmp.overallScore) >= 90 ? 'Promote to L5 Senior' : 'Retain at L4',
      decisionCategory: Number(newEmp.overallScore) >= 90 ? 'promoted' : 'retained',
      salaryHike: Number(newEmp.overallScore) >= 90 ? '15% Senior Merit Bump Approved' : 'Standard 4% Cost of Living',
      archetype: Number(newEmp.overallScore) >= 80 ? 'High-Judgment Orchestrator' : 'Needs Improvement',
      isTopPerformer: Number(newEmp.overallScore) >= 80,
      pillars: {
        goalAlignment: {
          score: Number(newEmp.overallScore),
          summary: 'Evaluated against Google Enterprise level standards.',
        },
        standardsHygiene: {
          score: Math.min(100, Number(newEmp.overallScore) + 2),
          summary: 'Adherence to design system and code review standards.',
        },
        handoffClarity: {
          score: Math.max(40, Number(newEmp.overallScore) - 3),
          summary: 'Clean delivery with minimal downstream rework loops.',
        },
        aiUsageJudgment: {
          score: Number(newEmp.overallScore),
          summary: 'Responsible human judgment and AI tool utilization.',
        },
      },
      justificationNote: `${newEmp.name} evaluated under Google Enterprise review standards for ${company.activeCycle}.`,
      feedback: {
        excelled: 'Strong technical ownership and adherence to team standards.',
        lostPoints: 'Focus on expanding cross-team documentation and mentorship.',
      },
      evidenceReceipts: [
        { tool: 'Buganizer Telemetry', detail: 'Consistent quarterly ticket resolution velocity' },
        { tool: 'Google Chat Logs', detail: 'Active participation in team handoff discussions' },
      ],
      growthChecklist: [
        { id: 'c1', text: 'Deliver primary quarterly initiative with zero critical bugs', done: false },
        { id: 'c2', text: 'Participate in bi-weekly design and code critique sessions', done: true },
      ],
    };

    setEmployees((prev) => [fullEmp, ...prev]);
    setSelectedEmployeeId(id);
    showToast(`Added ${fullEmp.name} to enterprise roster.`);
  };

  const updateEmployeeDecision = (empId, decisionCategory, note) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === empId) {
          let statusText = 'Retained at L4 + Assign Growth Plan';
          let salaryHike = 'Hold (0% Hike This Quarter)';

          if (decisionCategory === 'promoted') {
            statusText = `Promote to ${emp.targetLevel} Senior`;
            salaryHike = '15% Senior Merit Bump Approved';
          } else if (decisionCategory === 'hike') {
            statusText = 'Approve 15% Salary Hike';
            salaryHike = '15% Merit Hike Approved';
          }

          return {
            ...emp,
            status: statusText,
            decisionCategory,
            salaryHike,
            justificationNote: note || emp.justificationNote,
          };
        }
        return emp;
      })
    );
  };

  const toggleChecklistItem = (empId, itemId) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === empId) {
          return {
            ...emp,
            growthChecklist: emp.growthChecklist.map((item) =>
              item.id === itemId ? { ...item, done: !item.done } : item
            ),
          };
        }
        return emp;
      })
    );
  };

  const publishDecisionAndGoToStep5 = (empId, decisionCategory, note) => {
    updateEmployeeDecision(empId, decisionCategory, note);
    setSelectedEmployeeId(empId);
    setCurrentStep(5);
    showToast('Decision published! Viewing transparent employee portal.');
  };

  const resetAllToGoogleDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCompany(INITIAL_COMPANY);
    setRoles(INITIAL_ROLES);
    setSelectedRoleId(INITIAL_ROLES[0].id);
    setSelectedLevelId('L4');
    setEmployees(INITIAL_EMPLOYEES);
    setSelectedEmployeeId('emp-1');
    setCurrentStep(1);
    showToast('Reset to Google Enterprise default state.');
  };

  return (
    <EnterpriseContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        company,
        updateCompany,
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
        employees,
        selectedEmployeeId,
        setSelectedEmployeeId,
        activeEmployee,
        addEmployee,
        updateEmployeeDecision,
        toggleChecklistItem,
        publishDecisionAndGoToStep5,
        resetAllToGoogleDefaults,
        toastMessage,
      }}
    >
      {children}
    </EnterpriseContext.Provider>
  );
}

export function useEnterprise() {
  const context = useContext(EnterpriseContext);
  if (!context) {
    throw new Error('useEnterprise must be used within an EnterpriseProvider');
  }
  return context;
}
