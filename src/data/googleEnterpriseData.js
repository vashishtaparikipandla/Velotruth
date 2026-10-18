// Google Enterprise Dataset for TrueImpact AI

export const INITIAL_COMPANY = {
  name: 'Google',
  legalEntity: 'Google LLC (Alphabet Inc.)',
  businessUnits: [
    'Cloud AI & UX',
    'Search & Workspace',
    'Core Platforms',
    'Global Supply Chain & Hardware Ops',
  ],
  activeCycle: 'Q4 2026 Review',
  availableCycles: ['Q3 2026 Review', 'Q4 2026 Review', 'FY 2026–2027 Annual Appraisal'],
  evaluationPhilosophy:
    'Measure work quality, design/code token compliance, and clean team handoffs—whether done with or without AI.',
  headcountAudited: 5420,
  lastCalibration: 'Today, 09:30 AM PST',
};

export const INITIAL_ROLES = [
  {
    id: 'ux_design',
    name: 'UX Designer (Material Design 3)',
    domain: 'Product Design & Design Systems',
    shortCode: 'UX-M3',
    levels: {
      L3: {
        title: 'L3 Junior UX Designer',
        responsibilities:
          'Execute clean UI flows, maintain 95%+ Material 3 Design Token binding (color, typography, 8pt spacing variables), and rigorously cover all mobile/empty/error states.',
        benchmark: '95% Token Hygiene • 0 Unlinked Hex Codes • Full Breakpoint Coverage',
      },
      L4: {
        title: 'L4 Mid-Level UX Designer',
        responsibilities:
          'Drive autonomous feature designs, enforce cross-breakpoint auto-layout, eliminate broken variant states, and author clear developer handoff annotations without downstream rework loops.',
        benchmark: '98% Token Hygiene • < 2h Dev Clarification / sprint • Reusable Variants',
      },
      L5: {
        title: 'L5 Senior UX Designer',
        responsibilities:
          'Own cross-product design system components, ensure zero developer rework after handoff, conduct design reviews for L3/L4 designers, and audit AI wireframe imports for system compliance.',
        benchmark: 'Cross-Squad Token Governance • Zero Dev Rework • Mentorship of 2+ Designers',
      },
      L6: {
        title: 'L6 Staff UX Architect',
        responsibilities:
          'Define enterprise design system strategy across Android, iOS, and Web. Standardize token synchronization pipeline, establish AI prompt guidelines, and minimize org-wide handoff friction.',
        benchmark: 'Org-wide Token Architecture • Cross-Platform Alignment • Zero System Debt',
      },
    },
    workflow: [
      { step: 1, name: 'PRD Review', desc: 'Audit requirements & user problem scope in Docs' },
      { step: 2, name: 'Low-Fi Wireframes', desc: 'Initial layout explorations & state mapping' },
      { step: 3, name: 'Material 3 Tokenized UI', desc: 'Bind all components to M3 design tokens' },
      { step: 4, name: 'Engineering Handoff', desc: 'Figma Dev Mode specs & clean Slack kickoff' },
      { step: 5, name: 'Staging Visual QA', desc: 'Storybook & live breakpoint verification' },
    ],
    tools: [
      { id: 'figma', name: 'Figma (Design Tokens & Variables)', type: 'Execution', connected: true },
      { id: 'gdocs', name: 'Google Docs (PRDs & Specs)', type: 'Execution', connected: true },
      { id: 'chat', name: 'Google Chat / Slack (Handoff Clarity)', type: 'Communication', connected: true },
      { id: 'jira', name: 'Buganizer / Jira (Rework & Bounce-backs)', type: 'Communication', connected: true },
    ],
  },
  {
    id: 'product_manager',
    name: 'Product Manager (Google Workspace)',
    domain: 'Product Strategy & Execution',
    shortCode: 'PM-GW',
    levels: {
      L3: {
        title: 'L3 Associate Product Manager',
        responsibilities:
          'Write unambiguous user stories with verifiable acceptance criteria, groom sprint backlogs, and track user friction telemetry.',
        benchmark: 'Zero Ambiguous Acceptance Criteria • 100% Sprint Backlog Readiness',
      },
      L4: {
        title: 'L4 Product Manager',
        responsibilities:
          'Scope end-to-end features, ensure zero contradictory requirements, coordinate design and engineering grooming, and restrict AI generation to verified data synthesis.',
        benchmark: '< 10% Mid-Sprint Churn • 90%+ Downstream PRD Survival Rate',
      },
      L5: {
        title: 'L5 Senior Product Manager',
        responsibilities:
          'Drive cross-functional roadmap alignment, eliminate mid-sprint churn, publish executive-tier 2-page RFCs, and proactively model product ROI.',
        benchmark: '95%+ PRD Survival • Zero Sprint Paralysis • Clear ROI Grounding',
      },
      L6: {
        title: 'L6 Group / Staff Product Manager',
        responsibilities:
          'Set portfolio-level product vision, align multi-year platform bets with executive stakeholders, and establish anti-workslop validation standards org-wide.',
        benchmark: 'Multi-Product Synergy • ARR Growth Acceleration • Clean Governance',
      },
    },
    workflow: [
      { step: 1, name: 'User Problem Discovery', desc: 'Synthesize customer tickets & telemetry' },
      { step: 2, name: 'Clear PRD & Edge Cases', desc: 'Author concise 2-page specification' },
      { step: 3, name: 'Design/Eng Alignment', desc: 'Cross-functional grooming & tradeoff review' },
      { step: 4, name: 'Sprint Unblocking', desc: 'Resolve real-time implementation blockers' },
      { step: 5, name: 'Launch Metrics', desc: 'Post-launch adoption & stability review' },
    ],
    tools: [
      { id: 'gdocs', name: 'Google Docs (PRDs & Specs)', type: 'Execution', connected: true },
      { id: 'bigquery', name: 'BigQuery / Analytics (Telemetry)', type: 'Execution', connected: true },
      { id: 'jira', name: 'Buganizer / Jira (Rework Tracking)', type: 'Communication', connected: true },
      { id: 'chat', name: 'Google Chat / Slack (Handoff Clarity)', type: 'Communication', connected: true },
    ],
  },
  {
    id: 'software_engineer',
    name: 'Software Engineer (Google Cloud)',
    domain: 'Cloud Infrastructure & Microservices',
    shortCode: 'SWE-GC',
    levels: {
      L3: {
        title: 'L3 Software Engineer II',
        responsibilities:
          'Deliver well-tested code changes (CLs), adhere strictly to Google C++/Go/TypeScript style guides, and maintain >85% unit test coverage.',
        benchmark: '>85% Test Coverage • Adherence to Google Style Guides',
      },
      L4: {
        title: 'L4 Software Engineer III',
        responsibilities:
          'Own microservice features, audit AI-suggested code against security vulnerabilities (OWASP) and concurrency lockups, and ensure zero CI breakages.',
        benchmark: '85%+ 90-Day Code Survival • Zero Security Vulnerabilities',
      },
      L5: {
        title: 'L5 Senior Software Engineer',
        responsibilities:
          'Architect resilient distributed systems, lead zero-downtime database migrations, review high-risk concurrency logic, and mentor L3/L4 engineers.',
        benchmark: '95%+ Code Survival • Zero P1/P2 Incidents • Mentorship Leadership',
      },
      L6: {
        title: 'L6 Staff Software Engineer',
        responsibilities:
          'Set multi-region infrastructure stability standards, enforce latency budgets, author developer toolchains, and safeguard production against automated code churn.',
        benchmark: 'Multi-Service Resiliency • P99 Latency Budget Enforced • Zero Arch Debt',
      },
    },
    workflow: [
      { step: 1, name: 'Design Doc / RFC', desc: 'Architecture review & security sign-off' },
      { step: 2, name: 'Branch & Implementation', desc: 'High-craft code authoring & linting' },
      { step: 3, name: 'Unit & Integration Tests', desc: 'Automated test suite passing in CI' },
      { step: 4, name: 'Critique Peer Review (CL)', desc: 'Rigorous peer inspection on Critique' },
      { step: 5, name: 'Canary Release & Telemetry', desc: 'Staged rollout & latency monitoring' },
    ],
    tools: [
      { id: 'critique', name: 'GitHub / Critique (Code CLs)', type: 'Execution', connected: true },
      { id: 'gdocs', name: 'Google Docs (PRDs & Specs)', type: 'Execution', connected: true },
      { id: 'jira', name: 'Buganizer / Jira (Rework Tracking)', type: 'Communication', connected: true },
      { id: 'chat', name: 'Google Chat / Slack (Handoff Clarity)', type: 'Communication', connected: true },
    ],
  },
  {
    id: 'supply_chain',
    name: 'Supply Chain Planner (Pixel Hardware Ops)',
    domain: 'Hardware Logistics & Demand Operations',
    shortCode: 'SC-PO',
    levels: {
      L3: {
        title: 'L3 Supply Chain Analyst',
        responsibilities:
          'Accurately reconcile purchase orders against factory shipments, monitor standard Bill of Materials (BOM) rates, and flag supplier delivery variances.',
        benchmark: '100% Invoice Reconciliation • Accurate PO Tracking',
      },
      L4: {
        title: 'L4 Supply Chain Planner',
        responsibilities:
          'Audit automated ML forecasting deviations, validate component lead times, and apply human judgment to stop erroneous automated inventory surges.',
        benchmark: 'Zero Unvetted Surge Orders • Lead-Time Drift Monitored',
      },
      L5: {
        title: 'L5 Senior Supply Chain Operations Lead',
        responsibilities:
          'Lead multi-echelon inventory allocation across global hubs, manage tier-1 supplier SLAs, and optimize raw component holding capital.',
        benchmark: '>98.5% On-Time Fulfillment • Millions in Buffer Cost Avoided',
      },
      L6: {
        title: 'L6 Staff Hardware Operations Architect',
        responsibilities:
          'Architect global supply resilience strategy, orchestrate dark warehouse automation, and insulate Google hardware against geopolitical tariffs.',
        benchmark: 'Global Resilience Strategy • Automated Logistics Governance',
      },
    },
    workflow: [
      { step: 1, name: 'Demand Signal Intake', desc: 'BigQuery sales & regional carrier telemetry' },
      { step: 2, name: 'ML Forecast Variance Analysis', desc: 'Vertex AI forecasting deviation audit' },
      { step: 3, name: 'Human-in-the-Loop Override', desc: 'Inspect physical factory & port conditions' },
      { step: 4, name: 'ERP Purchase Order Issuance', desc: 'Commit validated PO lines in SAP S/4HANA' },
      { step: 5, name: 'Supplier Fulfillment SLA Audit', desc: 'Inspect inbound logistics IoT telemetry' },
    ],
    tools: [
      { id: 'bigquery', name: 'BigQuery / ERP (Forecasting)', type: 'Execution', connected: true },
      { id: 'gdocs', name: 'Google Docs (PRDs & Specs)', type: 'Execution', connected: true },
      { id: 'chat', name: 'Google Chat / Slack (Handoff Clarity)', type: 'Communication', connected: true },
      { id: 'meet', name: 'Google Meet (Decision Notes)', type: 'Communication', connected: true },
    ],
  },
];

export const INITIAL_EMPLOYEES = [
  {
    id: 'emp-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    roleId: 'ux_design',
    roleName: 'UX Designer (Material Design 3)',
    currentLevel: 'L4',
    targetLevel: 'L5',
    reviewPeriod: 'Q4 2026 Review',
    tools: ['Figma', 'Google Chat', 'Buganizer'],
    overallScore: 94,
    status: 'Promote to L5 Senior',
    decisionCategory: 'promoted',
    salaryHike: '15% Senior Merit Bump Approved',
    archetype: 'High-Judgment Orchestrator',
    isTopPerformer: true,
    pillars: {
      goalAlignment: {
        score: 96,
        summary: 'Met all L4 expectations and proactively demonstrated L5 cross-product design leadership.',
      },
      standardsHygiene: {
        score: 98,
        summary: 'Used Material 3 design tokens across 48 screens; 0 detached styles or unlinked hex values.',
      },
      handoffClarity: {
        score: 94,
        summary: 'Engineers built the feature with 0 clarification loops in Chat/Buganizer. Saved 18 hours in Q4.',
      },
      aiUsageJudgment: {
        score: 95,
        summary: 'Leveraged AI for rapid wireframing, then carefully bound all components to corporate M3 tokens.',
      },
    },
    justificationNote:
      'Aarav demonstrated exemplary design craft and system ownership throughout Q4 2026. By binding 100% of his 48 screens to Material Design 3 tokens and verifying all mobile breakpoints prior to handoff, engineering completed implementation in record time with zero rework loops.',
    feedback: {
      excelled: '98% Material 3 token accuracy across 4 workflows; saved engineering 18 hours in Q4 handoffs.',
      lostPoints: 'Minor: Could publish design tokens to the external community library earlier in sprint cycles.',
    },
    evidenceReceipts: [
      { tool: 'Figma Dev Mode', detail: '48/48 screens bound to M3 tokens (Color.Surface.Muted, Spacing.8pt variables)' },
      { tool: 'Buganizer Telemetry', detail: '0 UI rework tickets filed against Aarav’s workspace components in Q4' },
      { tool: 'Google Chat Logs', detail: 'Kickoff thread in #workspace-dev resolved with zero clarifying questions' },
      { tool: 'Design System Repo', detail: 'Authored 4 new composite card components adopted by Search & Cloud squads' },
    ],
    growthChecklist: [
      { id: 'c1', text: 'Lead the Q1 2027 Material Design 3 Token Governance workshop for L3 designers', done: true },
      { id: 'c2', text: 'Standardize cross-platform token handoff sync between Web and Jetpack Compose', done: false },
      { id: 'c3', text: 'Mentor 2 incoming junior UX designers on accessible auto-layout patterns', done: false },
    ],
  },
  {
    id: 'emp-2',
    name: "Liam O'Connor",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    roleId: 'ux_design',
    roleName: 'UX Designer (Material Design 3)',
    currentLevel: 'L4',
    targetLevel: 'L4',
    reviewPeriod: 'Q4 2026 Review',
    tools: ['Figma', 'Google Chat', 'Buganizer'],
    overallScore: 41,
    status: 'Retain at L4 + Assign Growth Plan',
    decisionCategory: 'retained',
    salaryHike: 'Hold (0% Hike This Quarter)',
    archetype: 'AI Workslop Spammer',
    isTopPerformer: false,
    pillars: {
      goalAlignment: {
        score: 45,
        summary: 'High raw output volume, but failed L4 core requirement of delivering production-ready specs.',
      },
      standardsHygiene: {
        score: 34,
        summary: 'Generated 42 UI screens with AI, but 29 screens had detached tokens and unlinked hex colors.',
      },
      handoffClarity: {
        score: 38,
        summary: 'Careless AI output caused 26 hours of developer rework and 7 Buganizer tickets reopened.',
      },
      aiUsageJudgment: {
        score: 40,
        summary: 'Dumped raw AI wireframe imports directly into engineering handoff without manual verification.',
      },
    },
    justificationNote:
      'While Liam produced a high number of raw design screens, the lack of quality control created significant downstream friction. 29 screens violated Material Design 3 standards, resulting in 26 hours of engineer confusion in Buganizer. Retained at L4 with a targeted Q1 coaching roadmap.',
    feedback: {
      excelled: 'Fast ideation and exploration speed; comfortable leveraging prompt-based design plugins.',
      lostPoints:
        'You generated 42 UI screens quickly using AI, but 29 screens had detached Material 3 tokens and missing mobile breakpoints, causing 26 hours of developer rework in Buganizer.',
    },
    evidenceReceipts: [
      { tool: 'Figma Dev Mode', detail: '34 hardcoded hex colors (#2B3A4C, #E13467) overriding global M3 tokens' },
      { tool: 'Buganizer Telemetry', detail: '7 UI bugs reopened due to broken auto-layout on mobile viewports' },
      { tool: 'Google Chat Logs', detail: '26 hours of debate in #cloud-ui-handoff untangling broken components' },
      { tool: 'Accessibility Audit', detail: '18 tap-target contrast failures (WCAG 2.2 AA violations) on checkout modals' },
    ],
    growthChecklist: [
      { id: 'c1', text: 'Increase Figma design token binding from 34% to >90% before marking frames Ready-for-Dev', done: false },
      { id: 'c2', text: 'Explicitly define error, disabled, and mobile viewport states for every new feature', done: false },
      { id: 'c3', text: 'Pair with a Senior L5 designer for mandatory pre-handoff spec reviews throughout Q1', done: false },
    ],
  },
  {
    id: 'emp-3',
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    roleId: 'product_manager',
    roleName: 'Product Manager (Google Workspace)',
    currentLevel: 'L5',
    targetLevel: 'L6',
    reviewPeriod: 'Q4 2026 Review',
    tools: ['Google Docs', 'Buganizer', 'Google Chat'],
    overallScore: 91,
    status: 'Promote to L6 Staff',
    decisionCategory: 'promoted',
    salaryHike: '15% Senior Merit Bump Approved',
    archetype: 'High-Judgment Orchestrator',
    isTopPerformer: true,
    pillars: {
      goalAlignment: {
        score: 92,
        summary: 'Exemplary cross-functional alignment; established clear ROI metrics for Workspace features.',
      },
      standardsHygiene: {
        score: 94,
        summary: 'Authored concise 2-page RFCs with zero contradictory edge-cases or unfeasible AI suggestions.',
      },
      handoffClarity: {
        score: 90,
        summary: 'Reduced sprint backlog churn by 38%; engineers praised clear acceptance criteria.',
      },
      aiUsageJudgment: {
        score: 88,
        summary: 'Synthesized customer research data while rejecting 8 hallucinated AI roadmap concepts.',
      },
    },
    justificationNote:
      'Priya demonstrated outstanding clarity and leadership across Google Workspace. Her rigorous PRD scoping cut sprint churn significantly, ensuring features shipped on time without downstream engineering paralysis.',
    feedback: {
      excelled: '94% PRD survival rate through release; filtered unfeasible AI concepts, saving $26,800 in sprint churn.',
      lostPoints: 'Ensure external partner API dependencies are flagged earlier in quarterly planning.',
    },
    evidenceReceipts: [
      { tool: 'Google Docs', detail: 'Workspace AI Summary RFC condensed to 2 crisp pages with full acceptance matrix' },
      { tool: 'Buganizer Telemetry', detail: 'Zero mid-sprint scope changes logged across 4 delivery sprints' },
      { tool: 'Google Chat Logs', detail: 'High sprint satisfaction ratings from tech leads in #workspace-squad' },
    ],
    growthChecklist: [
      { id: 'c1', text: 'Define cross-product Workspace API deprecation framework for 2027', done: true },
      { id: 'c2', text: 'Mentor 2 Associate PMs on authoring lean, objective RFC specifications', done: false },
    ],
  },
  {
    id: 'emp-4',
    name: 'Rohan Verma',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    roleId: 'software_engineer',
    roleName: 'Software Engineer (Google Cloud)',
    currentLevel: 'L5',
    targetLevel: 'L5',
    reviewPeriod: 'Q4 2026 Review',
    tools: ['GitHub / Critique', 'Buganizer', 'Google Chat'],
    overallScore: 89,
    status: 'Approve 15% Salary Hike',
    decisionCategory: 'hike',
    salaryHike: '15% Merit Hike Approved',
    archetype: 'High-Judgment Craftsman',
    isTopPerformer: true,
    pillars: {
      goalAlignment: {
        score: 90,
        summary: 'Maintained rock-solid reliability across Cloud Run infrastructure services.',
      },
      standardsHygiene: {
        score: 92,
        summary: '96% 90-day code survival rate; strictly enforced Google Go style guide rules.',
      },
      handoffClarity: {
        score: 88,
        summary: 'Clear CL descriptions and thorough unit tests cut peer review turnaround to < 4 hours.',
      },
      aiUsageJudgment: {
        score: 86,
        summary: 'Caught a critical AI concurrency bug (unbounded lock timeout) before merging to canary.',
      },
    },
    justificationNote:
      'Rohan continues to be a technical pillar on Cloud Run. His vigilance in catching subtle concurrency defects in automated boilerplate code prevented a major staging incident. Approved for top-bracket merit hike.',
    feedback: {
      excelled: 'Prevented an estimated $34,000 in payment duplicate transactions by refactoring distributed locks.',
      lostPoints: 'Encouraged to publish internal design doc on Cloud Run concurrency patterns.',
    },
    evidenceReceipts: [
      { tool: 'Critique CLs', detail: 'CL #498210: Distributed lock refactored with exponential backoff and 98% test coverage' },
      { tool: 'Buganizer Telemetry', detail: 'Zero P1/P2 production incidents attributable to Cloud Run team' },
      { tool: 'Google Chat Logs', detail: 'Commended in #cloud-eng-all for rapid root-cause resolution' },
    ],
    growthChecklist: [
      { id: 'c1', text: 'Lead design review for Q1 multi-region failover architecture', done: false },
      { id: 'c2', text: 'Deliver internal tech talk on safe concurrency practices with AI assistants', done: false },
    ],
  },
  {
    id: 'emp-5',
    name: 'Meera Krishnan',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    roleId: 'supply_chain',
    roleName: 'Supply Chain Planner (Pixel Hardware Ops)',
    currentLevel: 'L4',
    targetLevel: 'L5',
    reviewPeriod: 'Q4 2026 Review',
    tools: ['BigQuery / ERP', 'Google Docs', 'Google Chat'],
    overallScore: 93,
    status: 'Promote to L5 Senior',
    decisionCategory: 'promoted',
    salaryHike: '15% Senior Merit Bump Approved',
    archetype: 'High-Judgment Orchestrator',
    isTopPerformer: true,
    pillars: {
      goalAlignment: {
        score: 95,
        summary: 'Exemplary inventory management and tier-1 vendor risk hedging for Pixel hardware.',
      },
      standardsHygiene: {
        score: 92,
        summary: '100% purchase order verification against actual supplier warehouse logistics manifests.',
      },
      handoffClarity: {
        score: 94,
        summary: 'Seamless alignment with global procurement and warehouse freight coordinators.',
      },
      aiUsageJudgment: {
        score: 96,
        summary: 'Intercepted false ML demand spike caused by web bots, saving $68,000 in excess buffer stock.',
      },
    },
    justificationNote:
      'Meera demonstrated world-class supply chain judgment. When automated ML forecasting models reacted to synthetic web crawler traffic, Meera investigated the IP traffic, halted the 33,000-unit PO surge, and avoided severe warehouse overflow.',
    feedback: {
      excelled: 'Prevented $68,000 in overstocked inventory costs through human-in-the-loop ML verification.',
      lostPoints: 'None. Candidate is primed for Senior Operations Planner responsibilities.',
    },
    evidenceReceipts: [
      { tool: 'BigQuery / ERP', detail: 'PO_SURGE_REQ_770192 intercepted and adjusted from 45k to standard 12k units' },
      { tool: 'Google Chat Logs', detail: 'Executive commendation from VP of Hardware Ops in #pixel-ops-leads' },
      { tool: 'Supplier Telemetry', detail: 'Zero stockouts and 99.1% on-time fulfillment rate across regional hubs' },
    ],
    growthChecklist: [
      { id: 'c1', text: 'Package the ML demand anomaly verification protocol into Pixel Ops playbook', done: true },
      { id: 'c2', text: 'Lead regional supply allocation for upcoming Pixel hardware launch', done: false },
    ],
  },
];
