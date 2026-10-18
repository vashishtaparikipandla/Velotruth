import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COMPANY,
  INITIAL_MCP_SERVERS,
  INITIAL_ROLES,
  INITIAL_EMPLOYEES,
} from '../data/googleEnterpriseData';

const EnterpriseContext = createContext();

const STORAGE_KEY = 'trueimpact_google_saas_v3';

export function EnterpriseProvider({ children }) {
  // Navigation view: 'roster' | 'transparency' | 'roles' | 'company'
  const [currentView, setCurrentView] = useState('roster');

  const [company, setCompany] = useState(INITIAL_COMPANY);
  const [mcpServers, setMcpServers] = useState(INITIAL_MCP_SERVERS);
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [selectedRoleId, setSelectedRoleId] = useState(INITIAL_ROLES[0].id);
  const [selectedLevelId, setSelectedLevelId] = useState('L4');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  // Selected employee for Transparency Portal & Manager Review
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('emp-1'); // Default Aarav Sharma
  const [activeReviewEmployeeId, setActiveReviewEmployeeId] = useState(null); // Drawer / Evaluation modal
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentView) setCurrentView(parsed.currentView);
        if (parsed.company) setCompany(parsed.company);
        if (parsed.mcpServers) setMcpServers(parsed.mcpServers);
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
          currentView,
          company,
          mcpServers,
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
  }, [currentView, company, mcpServers, roles, selectedRoleId, selectedLevelId, employees, selectedEmployeeId]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Company updater
  const updateCompany = (fields) => {
    setCompany((prev) => ({ ...prev, ...fields }));
    showToast('Company parameters updated.');
  };

  // MCP Server Toggle
  const toggleMcpServer = (serverId) => {
    setMcpServers((prev) =>
      prev.map((s) => {
        if (s.id === serverId) {
          const nextStatus = s.status === 'Connected' ? 'Disconnected' : 'Connected';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
    showToast('MCP Server connectivity status toggled.');
  };

  // Active Role Helper
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
    showToast(`Updated ${levelKey} benchmark for ${activeRole.name}.`);
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
        { step: 1, name: 'Scope & Discovery', desc: 'Define problem & alignment in Docs MCP' },
        { step: 2, name: 'Draft Solution', desc: 'Create initial spec / implementation' },
        { step: 3, name: 'Review & Verify', desc: 'Peer critique and automated testing' },
        { step: 4, name: 'Release & Handoff', desc: 'Deliver with zero downstream rework' },
      ],
      mcpBindings: ['Google Docs MCP', 'Google Chat / Slack MCP', 'Buganizer / Jira MCP'],
    };

    setRoles((prev) => [...prev, newRole]);
    setSelectedRoleId(id);
    showToast(`Added new role: ${newRole.name}`);
  };

  // Active Employee Helpers
  const activeEmployee =
    employees.find((e) => e.id === selectedEmployeeId) || employees[0];

  const activeReviewEmployee =
    employees.find((e) => e.id === activeReviewEmployeeId) || null;

  // WORKFLOW 1: Add & Map Employee via AID
  const addEmployeeWithAID = ({ name, aid, roleId, level }) => {
    const matchedRole = roles.find((r) => r.id === roleId) || roles[0];
    const newId = `emp-${Date.now()}`;

    const newEmp = {
      id: newId,
      name,
      aid: aid.startsWith('AID-') ? aid : `AID-GGL-${aid.replace(/[^0-9]/g, '').slice(-4) || Math.floor(Math.random() * 8999 + 1000)}`,
      avatar: `https://images.unsplash.com/photo-${1535713875002 + Math.floor(Math.random() * 100)}?w=150&auto=format&fit=crop&q=80`,
      roleId: matchedRole.id,
      roleName: matchedRole.name,
      currentLevel: level || 'L4',
      targetLevel: level === 'L3' ? 'L4' : level === 'L4' ? 'L5' : 'L6',
      reviewPeriod: company.activeCycle,
      mcpTools: matchedRole.mcpBindings || ['Figma MCP', 'Google Chat MCP', 'Buganizer MCP'],
      mcpSyncStatus: 'Active (Synced just now)',
      verificationStatus: 'needs_verification',
      provisionalScore: 84,
      finalScore: 84,
      decisionCategory: 'promoted',
      status: `Promote to ${level === 'L3' ? 'L4' : level === 'L4' ? 'L5' : 'L6'} Senior`,
      salaryHike: '15% Senior Merit Bump Recommended',
      archetype: 'Under Manager Context Verification',
      mcpStages: [
        {
          stageName: 'Stage 1: Wireframing & System Hygiene (Figma MCP)',
          evidence: `Telemetry synced via ${aid}. Bound 92% of UI components to corporate design variables.`,
          metric: '92% Token Binding',
          status: 'Verified',
        },
        {
          stageName: 'Stage 2: Team Handoff & Execution (Slack & Jira MCP)',
          evidence: '1 sprint ticket flagged minor specification delay during cross-team alignment.',
          metric: '1 Pending Review Alert',
          status: 'Flagged Context Gap',
        },
      ],
      assumedValue: [
        `Automated MCP ingestion verified clean component handoff on corporate repository for ${name}.`,
      ],
      assumedGaps: [
        'Tool telemetry flagged a 4-day delivery delay on milestone ticket.',
      ],
      ambiguousAlerts: [
        {
          id: 'alert-1',
          title: 'Delivery Milestone Delay Flag (-6 pts)',
          description:
            `Jira MCP flagged a 4-day delay on milestone ticket. AI draft assumes -6 pt penalty. Was this caused by ${name} or external requirements shift?`,
          aiAssumptionText: 'Confirm AI Assumption: Employee caused 4-day delay (-6 pts)',
          overrideOptionText: 'Override: External Scope Pivot from Stakeholders (Pardon penalty)',
          isOverridden: false,
          penaltyPoints: 6,
        },
      ],
      managerContextNote: `${name} mapped via corporate AID and synced with active MCP server cluster.`,
      feedback: {
        excelled: 'High execution speed and consistent adherence to team style guides.',
        lostPoints: 'Ensure cross-team dependencies are surfaced before sprint freeze.',
      },
      growthChecklist: [
        { id: 'c1', text: 'Lead sprint retrospective for core quarterly initiative', done: false },
        { id: 'c2', text: 'Complete cross-functional design and code peer review certification', done: false },
      ],
    };

    setEmployees((prev) => [newEmp, ...prev]);
    setSelectedEmployeeId(newId);
    setActiveReviewEmployeeId(newId);
    setIsAddEmployeeModalOpen(false);
    showToast(`AID mapped: ${newEmp.name} (${newEmp.aid}) • Opening Manager Review.`);
  };

  // WORKFLOW 2: Recalculate AI Rating based on Manager Overrides
  const recalculateScore = (empId, updatedAlerts, managerNote) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === empId) {
          // Calculate net score adjustments
          let adjustedScore = emp.provisionalScore;
          updatedAlerts.forEach((a) => {
            if (a.isOverridden) {
              adjustedScore += a.penaltyPoints; // remove penalty
            }
          });
          const clampedScore = Math.min(99, Math.max(25, adjustedScore));

          return {
            ...emp,
            finalScore: clampedScore,
            ambiguousAlerts: updatedAlerts,
            managerContextNote: managerNote,
            status: clampedScore >= 90 ? `Promote to ${emp.targetLevel} Senior` : clampedScore >= 75 ? 'Approve 15% Salary Hike' : 'Retain at Level + Growth Plan',
          };
        }
        return emp;
      })
    );
    showToast('Provisional AI rating recalculated with manager context.');
  };

  // WORKFLOW 2: Finalize & Publish Decision
  const publishFinalDecision = (empId, decisionCategory, managerNote) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === empId) {
          let statusText = 'Retained at Current Level + Growth Plan';
          let salaryHike = 'Hold (0% Hike This Quarter)';

          if (decisionCategory === 'promoted') {
            statusText = `Promoted to ${emp.targetLevel} Senior`;
            salaryHike = '15% Senior Merit Bump Approved';
          } else if (decisionCategory === 'hike') {
            statusText = 'Approved 15% Salary Hike';
            salaryHike = '15% Merit Hike Approved';
          }

          return {
            ...emp,
            verificationStatus: 'verified',
            decisionCategory,
            status: statusText,
            salaryHike,
            managerContextNote: managerNote || emp.managerContextNote,
          };
        }
        return emp;
      })
    );

    setActiveReviewEmployeeId(null);
    setSelectedEmployeeId(empId);
    setCurrentView('transparency');
    showToast('Decision published! Viewing Employee Transparency Portal.');
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

  const resetAllToGoogleDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCompany(INITIAL_COMPANY);
    setMcpServers(INITIAL_MCP_SERVERS);
    setRoles(INITIAL_ROLES);
    setSelectedRoleId(INITIAL_ROLES[0].id);
    setSelectedLevelId('L4');
    setEmployees(INITIAL_EMPLOYEES);
    setSelectedEmployeeId('emp-1');
    setActiveReviewEmployeeId(null);
    setCurrentView('roster');
    showToast('Reset to Google Enterprise default SaaS state.');
  };

  return (
    <EnterpriseContext.Provider
      value={{
        currentView,
        setCurrentView,
        company,
        updateCompany,
        mcpServers,
        toggleMcpServer,
        roles,
        selectedRoleId,
        setSelectedRoleId,
        selectedLevelId,
        setSelectedLevelId,
        activeRole,
        updateRoleLevelExpectations,
        addNewRole,
        employees,
        selectedEmployeeId,
        setSelectedEmployeeId,
        activeEmployee,
        activeReviewEmployee,
        activeReviewEmployeeId,
        setActiveReviewEmployeeId,
        isAddEmployeeModalOpen,
        setIsAddEmployeeModalOpen,
        addEmployeeWithAID,
        recalculateScore,
        publishFinalDecision,
        toggleChecklistItem,
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
