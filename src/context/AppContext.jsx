import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ROLES,
  ROLE_RUBRICS,
  INITIAL_TOOLS,
  INITIAL_EMPLOYEES,
  INITIAL_AUDIT_LOGS,
  PRESET_SCENARIOS
} from '../data/initialData';

const AppContext = createContext();

const STORAGE_KEY = 'trueimpact_ai_state_v1';

export function calculateScore(emp, weights = { craft: 30, handoff: 35, aiOrchestration: 20, mentorship: 15 }) {
  const wCraft = (weights.craft || 30) / 100;
  const wHandoff = (weights.handoff || 35) / 100;
  const wAiOrch = (weights.aiOrchestration || 20) / 100;
  const wMentor = (weights.mentorship || 15) / 100;

  const rawScore = (
    (wCraft * (emp.tokenHygiene || 0)) +
    (wHandoff * (emp.downstreamSurvival || 0)) +
    (wAiOrch * (emp.humanJudgment || 0)) +
    (wMentor * (emp.levelAlignment || 0)) -
    (emp.reworkPenalty || 0)
  );

  return Math.max(5, Math.min(99, Math.round(rawScore)));
}

export function AppProvider({ children }) {
  const [selectedRole, setSelectedRole] = useState('design');
  const [selectedLevel, setSelectedLevel] = useState('L2');
  const [activeTab, setActiveTab] = useState(1);
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [rubrics, setRubrics] = useState(ROLE_RUBRICS);
  const [tools, setTools] = useState(INITIAL_TOOLS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [toasts, setToasts] = useState([]);
  const [selectedCompareEmployees, setSelectedCompareEmployees] = useState({
    empAId: 'emp-des-001',
    empBId: 'emp-des-002',
  });

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedRole) setSelectedRole(parsed.selectedRole);
        if (parsed.selectedLevel) setSelectedLevel(parsed.selectedLevel);
        if (parsed.activeTab) setActiveTab(parsed.activeTab);
        if (parsed.employees) setEmployees(parsed.employees);
        if (parsed.rubrics) setRubrics(parsed.rubrics);
        if (parsed.tools) setTools(parsed.tools);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          selectedRole,
          selectedLevel,
          activeTab,
          employees,
          rubrics,
          tools,
          auditLogs,
        })
      );
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [selectedRole, selectedLevel, activeTab, employees, rubrics, tools, auditLogs]);

  // When selectedRole changes, sync default compare IDs
  useEffect(() => {
    const roleEmps = employees[selectedRole] || [];
    if (roleEmps.length >= 2) {
      setSelectedCompareEmployees({
        empAId: roleEmps[0].id,
        empBId: roleEmps[1].id,
      });
    } else if (roleEmps.length === 1) {
      setSelectedCompareEmployees({
        empAId: roleEmps[0].id,
        empBId: roleEmps[0].id,
      });
    }
  }, [selectedRole, employees]);

  const addToast = (title, message, type = 'info', duration = 4500) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    const newToast = { id, title, message, type };
    setToasts((prev) => [newToast, ...prev]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle tool connection
  const toggleTool = (toolId) => {
    setTools((prev) =>
      prev.map((t) => {
        if (t.id === toolId) {
          const isCurrentlyConnected = t.status.includes('Connected');
          const newStatus = isCurrentlyConnected
            ? 'Disconnected'
            : 'Connected (Live Telemetry Active)';
          const newPing = isCurrentlyConnected ? null : Math.floor(Math.random() * 40) + 12;

          addToast(
            isCurrentlyConnected ? 'Tool Disconnected' : 'Mesh Telemetry Online',
            `${t.name} is now ${newStatus.toLowerCase()}.`,
            isCurrentlyConnected ? 'warning' : 'success'
          );

          // Append to audit log
          setAuditLogs((logs) => [
            {
              id: 'log-' + Date.now(),
              timestamp: new Date().toISOString(),
              type: 'tool_toggle',
              roleTag: selectedRole,
              employeeName: 'Mesh Ingress',
              action: `${t.name} Connection State Change`,
              score: isCurrentlyConnected ? 50 : 98,
              impact: isCurrentlyConnected ? 'Stream Paused' : 'Live Sync Active',
              summary: `${t.name} set to ${newStatus}.`,
              status: isCurrentlyConnected ? 'Disconnected' : 'Active Telemetry',
            },
            ...logs,
          ]);

          return {
            ...t,
            status: newStatus,
            pingMs: newPing,
            lastSync: isCurrentlyConnected ? 'Disconnected' : 'Just now',
          };
        }
        return t;
      })
    );
  };

  // Calibrate Rubric with Vertex AI
  const calibrateRubric = (roleId, level, updatedData) => {
    setRubrics((prev) => {
      const updated = {
        ...prev,
        [roleId]: {
          ...prev[roleId],
          [level]: {
            ...prev[roleId][level],
            ...updatedData,
            lastIndexed: new Date().toISOString(),
            rubricHash: `vx-${roleId}-${level.toLowerCase()}-${Math.floor(Math.random() * 8999 + 1000)}`,
          },
        },
      };

      // Recalibrate employee scores in this role using new weights
      const weights = updatedData.weights || prev[roleId][level].weights;
      setEmployees((empMap) => {
        const currentList = empMap[roleId] || [];
        const recalibrated = currentList.map((emp) => {
          const newScore = calculateScore(emp, weights);
          return {
            ...emp,
            trueImpactScore: newScore,
            status:
              newScore >= 90
                ? `Ready for Promotion (${emp.level}->L${parseInt(emp.level.replace('L', '')) + 1})`
                : newScore >= 75
                ? 'Salary Hike Approved'
                : newScore >= 50
                ? 'Maintain & Coach'
                : 'Needs Mentorship',
          };
        });
        return {
          ...empMap,
          [roleId]: recalibrated,
        };
      });

      return updated;
    });

    addToast(
      'Vertex Vector Search Calibrated',
      `Rubric successfully indexed in Vertex Vector DB with custom weight distribution: Craft ${updatedData.weights.craft}%, Handoff ${updatedData.weights.handoff}%, AI Orchestration ${updatedData.weights.aiOrchestration}%, Mentorship ${updatedData.weights.mentorship}%`,
      'success',
      6000
    );

    // Append to audit log
    setAuditLogs((logs) => [
      {
        id: 'log-' + Date.now(),
        timestamp: new Date().toISOString(),
        type: 'vector_index',
        roleTag: roleId,
        employeeName: 'Vertex AI 2.5',
        action: `Vector Index Recalibrated (${level})`,
        score: 100,
        impact: '768-dim Recomputed',
        summary: `Updated weights for ${roleId.toUpperCase()} ${level}. Re-indexed in Vertex DB.`,
        status: 'Indexed',
      },
      ...logs,
    ]);
  };

  // Add Employee
  const addEmployee = (newEmpData) => {
    const roleKey = newEmpData.roleKey || selectedRole;
    const currentWeights = rubrics[roleKey]?.[newEmpData.level]?.weights || {
      craft: 30,
      handoff: 35,
      aiOrchestration: 20,
      mentorship: 15,
    };
    const score = calculateScore(newEmpData, currentWeights);

    const fullEmp = {
      id: `emp-${roleKey}-${Date.now().toString().slice(-4)}`,
      name: newEmpData.name,
      avatar: newEmpData.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      role: ROLES.find((r) => r.id === roleKey)?.name || 'UI/UX Design',
      level: newEmpData.level || 'L2',
      archetype: score > 80 ? 'The High-Judgment Orchestrator' : score < 50 ? 'The AI Workslop Spammer' : 'The Craftsman Contributor',
      archetypeType: score > 80 ? 'value' : score < 50 ? 'slop' : 'neutral',
      summary: newEmpData.summary || 'Team member evaluated under TrueImpact AI telemetry engine.',
      rawVolume: newEmpData.rawVolume || '20 artifacts / wk',
      rawVolumeSub: 'Assisted by enterprise tools',
      tokenHygiene: Number(newEmpData.tokenHygiene) || 80,
      downstreamSurvival: Number(newEmpData.downstreamSurvival) || 80,
      humanJudgment: Number(newEmpData.humanJudgment) || 80,
      levelAlignment: Number(newEmpData.levelAlignment) || 80,
      reworkPenalty: Number(newEmpData.reworkPenalty) || 5,
      reworkHours: Number(newEmpData.reworkHours) || 2,
      dollarImpact: score > 75 ? Math.round(score * 200) : -Math.round((100 - score) * 300),
      trueImpactScore: score,
      status: score >= 90 ? `Ready for Promotion (${newEmpData.level}->L3)` : score >= 75 ? 'Salary Hike Approved' : 'Needs Mentorship',
      statusType: score >= 90 ? 'success' : score >= 75 ? 'success' : 'danger',
      readyForPromotion: score >= 90,
      salaryHikeRecommendation: score >= 90 ? 'Approved (+14% Promotion)' : score >= 75 ? 'Approved (+10% Merit)' : 'Hold (0% Hike)',
      violations: newEmpData.violations && newEmpData.violations.length > 0 ? newEmpData.violations : ['None flagged in baseline pass.'],
      evidenceNotes: newEmpData.evidenceNotes || 'Initial baseline record added by manager.',
    };

    setEmployees((prev) => ({
      ...prev,
      [roleKey]: [fullEmp, ...(prev[roleKey] || [])],
    }));

    addToast(
      'Team Member Added',
      `${fullEmp.name} registered under ${fullEmp.role} (${fullEmp.level}) with TrueImpact Score ${fullEmp.trueImpactScore}/100.`,
      'success'
    );
  };

  // Promote Employee
  const promoteEmployee = (empId) => {
    setEmployees((prev) => {
      const updatedRoleList = (prev[selectedRole] || []).map((emp) => {
        if (emp.id === empId) {
          const currentLvlNum = parseInt(emp.level.replace('L', '')) || 2;
          const nextLvl = `L${Math.min(5, currentLvlNum + 1)}`;
          return {
            ...emp,
            level: nextLvl,
            status: 'Promotion Executed',
            statusType: 'success',
            readyForPromotion: false,
            salaryHikeRecommendation: `Executed (+15% ${nextLvl} Adjustment)`,
            evidenceNotes: `${emp.evidenceNotes}\n[PROMOTION APPROVED: Promoted to ${nextLvl} based on TrueImpact telemetry score ${emp.trueImpactScore}/100].`,
          };
        }
        return emp;
      });

      return {
        ...prev,
        [selectedRole]: updatedRoleList,
      };
    });

    addToast(
      'Promotion Ratified',
      `Employee promotion successfully processed and recorded in Vertex AI decision ledger.`,
      'success'
    );
  };

  // Approve Hike
  const approveHike = (empId) => {
    setEmployees((prev) => {
      const updatedRoleList = (prev[selectedRole] || []).map((emp) => {
        if (emp.id === empId) {
          return {
            ...emp,
            status: 'Salary Hike Executed',
            statusType: 'success',
            salaryHikeRecommendation: 'Salary Hike Completed (+12%)',
            evidenceNotes: `${emp.evidenceNotes}\n[SALARY HIKE RATIFIED: +12% merit increase locked in HCM system].`,
          };
        }
        return emp;
      });

      return {
        ...prev,
        [selectedRole]: updatedRoleList,
      };
    });

    addToast(
      'Salary Hike Dispatched',
      `Merit adjustment approved and routed to enterprise payroll/ERP.`,
      'success'
    );
  };

  // Reset to initial demo data
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSelectedRole('design');
    setSelectedLevel('L2');
    setActiveTab(1);
    setEmployees(INITIAL_EMPLOYEES);
    setRubrics(ROLE_RUBRICS);
    setTools(INITIAL_TOOLS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    addToast('Reset Complete', 'Default enterprise datasets have been restored.', 'info');
  };

  const activeRoleData = ROLES.find((r) => r.id === selectedRole) || ROLES[0];
  const activeRoleRubric = rubrics[selectedRole]?.[selectedLevel] || rubrics.design.L2;
  const activeEmployees = employees[selectedRole] || [];

  return (
    <AppContext.Provider
      value={{
        selectedRole,
        setSelectedRole,
        selectedLevel,
        setSelectedLevel,
        activeTab,
        setActiveTab,
        employees,
        setEmployees,
        activeEmployees,
        activeRoleData,
        rubrics,
        activeRoleRubric,
        calibrateRubric,
        tools,
        toggleTool,
        auditLogs,
        setAuditLogs,
        toasts,
        addToast,
        removeToast,
        addEmployee,
        promoteEmployee,
        approveHike,
        selectedCompareEmployees,
        setSelectedCompareEmployees,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
