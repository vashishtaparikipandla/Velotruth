// Google Enterprise Dataset for TrueImpact AI — SaaS Workspace with MCP & AID Binding

export const INITIAL_COMPANY = {
  name: 'Google Inc.',
  legalEntity: 'Google LLC (Alphabet Inc.)',
  headquarters: 'Mountain View, CA',
  businessUnits: [
    'Cloud AI & UX',
    'Search & Workspace',
    'Core Platforms',
    'Global Supply Chain & Hardware Ops',
  ],
  activeCycle: 'Q4 2026',
  availableCycles: ['Q3 2026', 'Q4 2026', 'FY 2026–27'],
  evaluationPhilosophy:
    'Measure work quality, design/code token compliance, and clean team handoffs—whether done with or without AI.',
  headcountAudited: 5420,
  mcpServersOnline: 6,
  lastCalibration: 'Today, 09:30 AM PST',
};

export const INITIAL_MCP_SERVERS = [
  {
    id: 'figma-mcp',
    name: 'Figma MCP Server',
    scope: 'Design Tokens, Variables, Component Detachments & Breakpoints',
    port: 8081,
    status: 'Connected',
    latency: '12ms',
    version: 'v2.4.1-mcp',
    activeSessions: 48,
  },
  {
    id: 'critique-mcp',
    name: 'GitHub / Critique MCP Server',
    scope: 'CL Diffs, Code Churn, Test Runs & Static Analysis',
    port: 8082,
    status: 'Connected',
    latency: '18ms',
    version: 'v1.9.0-mcp',
    activeSessions: 112,
  },
  {
    id: 'docs-mcp',
    name: 'Google Docs MCP Server',
    scope: 'PRD Scopes, Acceptance Criteria Matrix & Version History',
    port: 8083,
    status: 'Connected',
    latency: '24ms',
    version: 'v3.1.2-mcp',
    activeSessions: 64,
  },
  {
    id: 'chat-mcp',
    name: 'Google Chat / Slack MCP Server',
    scope: 'Downstream Friction Tax, Clarification Loops & Re-work Sentiment',
    port: 8084,
    status: 'Connected',
    latency: '14ms',
    version: 'v2.2.0-mcp',
    activeSessions: 89,
  },
  {
    id: 'buganizer-mcp',
    name: 'Buganizer / Jira MCP Server',
    scope: 'Ticket Bounce-backs, Re-open Frequency & Mid-sprint Delays',
    port: 8085,
    status: 'Connected',
    latency: '22ms',
    version: 'v4.0.1-mcp',
    activeSessions: 76,
  },
  {
    id: 'erp-mcp',
    name: 'SAP / BigQuery ERP MCP Server',
    scope: 'Demand Variance, PO Commits & Inbound Supplier SLAs',
    port: 8086,
    status: 'Connected',
    latency: '34ms',
    version: 'v1.8.4-mcp',
    activeSessions: 32,
  },
];

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
      { step: 1, name: 'PRD Review', desc: 'Audit requirements & user problem scope in Docs MCP' },
      { step: 2, name: 'Low-Fi Wireframes', desc: 'Initial layout explorations & state mapping' },
      { step: 3, name: 'Material 3 Tokenized UI', desc: 'Bind all components to M3 design tokens (Figma MCP)' },
      { step: 4, name: 'Engineering Handoff', desc: 'Figma Dev Mode specs & clean Slack/Chat kickoff' },
      { step: 5, name: 'Staging Visual QA', desc: 'Storybook & live breakpoint verification (Buganizer MCP)' },
    ],
    mcpBindings: ['Figma MCP', 'Google Chat / Slack MCP', 'Buganizer / Jira MCP'],
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
      { step: 1, name: 'User Problem Discovery', desc: 'Synthesize customer tickets & BigQuery telemetry' },
      { step: 2, name: 'Clear PRD & Edge Cases', desc: 'Author concise 2-page specification in Docs MCP' },
      { step: 3, name: 'Design/Eng Alignment', desc: 'Cross-functional grooming & tradeoff review' },
      { step: 4, name: 'Sprint Unblocking', desc: 'Resolve real-time implementation blockers in Buganizer' },
      { step: 5, name: 'Launch Metrics', desc: 'Post-launch adoption & stability review' },
    ],
    mcpBindings: ['Google Docs MCP', 'BigQuery / Analytics MCP', 'Buganizer / Jira MCP'],
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
      { step: 1, name: 'Design Doc / RFC', desc: 'Architecture review & security sign-off in Docs MCP' },
      { step: 2, name: 'Branch & Implementation', desc: 'High-craft code authoring & local linting' },
      { step: 3, name: 'Unit & Integration Tests', desc: 'Automated test suite passing in Critique CI' },
      { step: 4, name: 'Critique Peer Review (CL)', desc: 'Peer inspection on Critique MCP' },
      { step: 5, name: 'Canary Release & Telemetry', desc: 'Staged rollout & latency monitoring' },
    ],
    mcpBindings: ['GitHub / Critique MCP', 'Buganizer / Jira MCP', 'Google Chat / Slack MCP'],
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
      { step: 4, name: 'ERP Purchase Order Issuance', desc: 'Commit validated PO lines in SAP S/4HANA MCP' },
      { step: 5, name: 'Supplier Fulfillment SLA Audit', desc: 'Inspect inbound logistics IoT telemetry' },
    ],
    mcpBindings: ['SAP / BigQuery ERP MCP', 'Google Docs MCP', 'Google Meet MCP'],
  },
];

export const INITIAL_EMPLOYEES = [
  {
    id: 'emp-1',
    name: 'Aarav Sharma',
    aid: 'AID-GGL-8812',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    roleId: 'ux_design',
    roleName: 'UX Designer (Material Design 3)',
    currentLevel: 'L4',
    targetLevel: 'L5',
    reviewPeriod: 'Q4 2026',
    mcpTools: ['Figma MCP', 'Google Chat MCP', 'Buganizer MCP'],
    mcpSyncStatus: 'Active (Synced 14m ago)',
    verificationStatus: 'needs_verification', // 'needs_verification' | 'verified'
    provisionalScore: 86,
    finalScore: 94,
    decisionCategory: 'promoted', // 'promoted' | 'hike' | 'retained'
    status: 'Promote to L5 Senior',
    salaryHike: '15% Senior Merit Bump Approved',
    archetype: 'High-Judgment Orchestrator',

    // Section 1: Stage-by-stage MCP Workflow Breakdown
    mcpStages: [
      {
        stageName: 'Stage 1: Wireframing & System Hygiene (Figma MCP)',
        evidence: '98% Material 3 token binding across 48 delivery screens in Workspace redesign. 0 unlinked hex codes found.',
        metric: '98% Token Binding',
        status: 'Exemplary',
      },
      {
        stageName: 'Stage 2: Team Handoff & Execution (Slack & Jira MCP)',
        evidence: 'Engineers built the feature with 0 clarification loops in Chat. 1 minor spec delay logged on ticket UX-402.',
        metric: '0 Rework Tickets',
        status: 'Flagged Context Gap',
      },
      {
        stageName: 'Stage 3: Design System Contribution (GitHub MCP)',
        evidence: 'Authored 4 reusable composite components adopted by Search & Cloud squads.',
        metric: '4 Shared Components',
        status: 'Exemplary',
      },
    ],

    // Section 2: AI Draft Assumptions
    assumedValue: [
      'Grounded 48 screens to Material 3 variables without a single detached component.',
      'Saved engineering squad an estimated 18 hours in sprint handoff execution.',
      'Published reusable card primitives to core Google design tokens repo.',
    ],
    assumedGaps: [
      'Jira ticket UX-402 shows a 5-day delivery delay with 3 subsequent spec adjustments.',
    ],
    ambiguousAlerts: [
      {
        id: 'alert-1',
        title: 'Jira UX-402 Delay Penalty Flag (-8 pts)',
        description:
          'Jira ticket UX-402 had a 5-day delay and 3 spec changes. AI draft currently assumes a -8 pt workflow penalty. Was this caused by the designer or an external regulatory/leadership pivot?',
        aiAssumptionText: 'Confirm AI Assumption: Designer caused 5-day delay (-8 pts)',
        overrideOptionText: 'Override: External Legal/Regulatory Pivot (Remove -8 pt penalty)',
        isOverridden: true,
        penaltyPoints: 8,
      },
      {
        id: 'alert-2',
        title: 'Offline Mentorship & Design Critiques (+4 pts)',
        description:
          'Offline stakeholder workshops and 1:1 design reviews are not fully tracked in Figma/Chat logs. Did Aarav unblock peers offline in Q4?',
        aiAssumptionText: 'Confirm: No extra offline contribution recorded',
        overrideOptionText: 'Override: Aarav led 3 offline design critiques for L3 juniors (+4 pts)',
        isOverridden: true,
        penaltyPoints: 4,
      },
    ],

    // Section 3: Manager Input & Overrides
    managerContextNote:
      'The 5-day delay on UX-402 was strictly due to a last-minute EU compliance pivot from Google Legal, not Aarav’s fault. He handled the mid-sprint pivot brilliantly without introducing any unlinked tokens. He also led 3 offline critique sessions.',

    // Feedback for Transparency Portal
    feedback: {
      excelled: '98% Material 3 token accuracy across 4 workflows; saved engineering 18 hours in Q4 handoffs.',
      lostPoints: 'Ensure external partner API dependencies are flagged earlier in quarterly planning.',
    },
    growthChecklist: [
      { id: 'c1', text: 'Lead the Q1 2027 Material Design 3 Token Governance workshop for L3 designers', done: true },
      { id: 'c2', text: 'Standardize cross-platform token handoff sync between Web and Jetpack Compose', done: false },
      { id: 'c3', text: 'Mentor 2 incoming junior UX designers on accessible auto-layout patterns', done: false },
    ],
  },
  {
    id: 'emp-2',
    name: "Liam O'Connor",
    aid: 'AID-GGL-4109',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    roleId: 'ux_design',
    roleName: 'UX Designer (Material Design 3)',
    currentLevel: 'L4',
    targetLevel: 'L4',
    reviewPeriod: 'Q4 2026',
    mcpTools: ['Figma MCP', 'Google Chat MCP', 'Buganizer MCP'],
    mcpSyncStatus: 'Active (Synced 8m ago)',
    verificationStatus: 'needs_verification',
    provisionalScore: 41,
    finalScore: 41,
    decisionCategory: 'retained',
    status: 'Retain at L4 + Assign Growth Plan',
    salaryHike: 'Hold (0% Hike This Quarter)',
    archetype: 'AI Workslop Spammer',

    mcpStages: [
      {
        stageName: 'Stage 1: Wireframing & System Hygiene (Figma MCP)',
        evidence: 'Generated 42 UI screens rapidly with AI prompt plugins, but 29 screens had detached M3 tokens and 34 hardcoded hex colors.',
        metric: '34% Token Binding',
        status: 'Severe Violations',
      },
      {
        stageName: 'Stage 2: Team Handoff & Execution (Slack & Jira MCP)',
        evidence: 'Careless AI handoff caused 26 hours of developer rework and 7 Buganizer tickets reopened on mobile viewports.',
        metric: '7 Reopened Tickets',
        status: 'High Friction Tax',
      },
      {
        stageName: 'Stage 3: Design System Contribution (GitHub MCP)',
        evidence: 'Zero reusable components contributed; broke auto-layout on 2 master library branch merges.',
        metric: '2 Library Regressions',
        status: 'Defect Flagged',
      },
    ],

    assumedValue: [
      'Fast initial prompt generation and wireframe exploration speed.',
    ],
    assumedGaps: [
      '29 out of 42 screens completely bypassed corporate Material 3 design tokens.',
      'Generated 26 hours of developer friction in #cloud-ui-handoff.',
      '18 tap-target contrast failures (WCAG 2.2 AA violations) on checkout modals.',
    ],
    ambiguousAlerts: [
      {
        id: 'alert-1',
        title: 'Developer Clarification Spike in Chat (-12 pts)',
        description:
          'Chat MCP shows 142 messages in #cloud-ui-handoff debating missing button states. AI assumes severe handoff negligence. Did developers receive incomplete mockups?',
        aiAssumptionText: 'Confirm AI Assumption: Incomplete mockups dumped without inspection (-12 pts)',
        overrideOptionText: 'Override: Specs were updated live during team hackathon (Pardon penalty)',
        isOverridden: false,
        penaltyPoints: 12,
      },
      {
        id: 'alert-2',
        title: 'Mobile Auto-Layout Regressions (-10 pts)',
        description:
          '7 Buganizer tickets cite collapsed flex containers on mobile viewports. Did Liam test breakpoints before marking Ready-for-Dev?',
        aiAssumptionText: 'Confirm: Breakpoints were not tested prior to handoff',
        overrideOptionText: 'Override: Mobile viewports were out-of-scope for this sprint',
        isOverridden: false,
        penaltyPoints: 10,
      },
    ],

    managerContextNote:
      'I reviewed Liam’s Figma files directly. The AI draft assumptions are unfortunately accurate. Liam leaned too heavily on prompt generators and pushed unvetted layouts directly to engineering. Retained at L4 with a targeted Q1 coaching roadmap on token binding.',

    feedback: {
      excelled: 'Fast ideation and exploration speed; comfortable leveraging prompt-based design plugins.',
      lostPoints:
        'You generated 42 UI screens quickly using AI, but 29 screens had detached Material 3 tokens and missing mobile breakpoints, causing 26 hours of developer rework in Buganizer.',
    },
    growthChecklist: [
      { id: 'c1', text: 'Increase Figma design token binding from 34% to >90% before marking frames Ready-for-Dev', done: false },
      { id: 'c2', text: 'Explicitly define error, disabled, and mobile viewport states for every new feature', done: false },
      { id: 'c3', text: 'Pair with a Senior L5 designer for mandatory pre-handoff spec reviews throughout Q1', done: false },
    ],
  },
  {
    id: 'emp-3',
    name: 'Priya Nair',
    aid: 'AID-GGL-5591',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    roleId: 'product_manager',
    roleName: 'Product Manager (Google Workspace)',
    currentLevel: 'L5',
    targetLevel: 'L6',
    reviewPeriod: 'Q4 2026',
    mcpTools: ['Google Docs MCP', 'BigQuery MCP', 'Buganizer MCP'],
    mcpSyncStatus: 'Active (Synced 22m ago)',
    verificationStatus: 'verified',
    provisionalScore: 88,
    finalScore: 91,
    decisionCategory: 'promoted',
    status: 'Promote to L6 Staff',
    salaryHike: '15% Senior Merit Bump Approved',
    archetype: 'High-Judgment Orchestrator',

    mcpStages: [
      {
        stageName: 'Stage 1: Problem Discovery & Synthesis (BigQuery MCP)',
        evidence: 'Analyzed 1.2M user telemetry events; identified top 3 enterprise collaboration bottlenecks with zero speculation.',
        metric: '1.2M Events Audited',
        status: 'Exemplary',
      },
      {
        stageName: 'Stage 2: Specification Precision (Google Docs MCP)',
        evidence: 'Authored concise 2-page RFC. Rejected 8 hallucinated AI feature ideas that would have broken Tier-1 customer SLAs.',
        metric: '94% Spec Survival',
        status: 'Exemplary',
      },
      {
        stageName: 'Stage 3: Sprint Delivery & Unblocking (Buganizer MCP)',
        evidence: 'Zero mid-sprint scope changes logged across 4 delivery sprints; cut developer backlog churn by 38%.',
        metric: '0 Scope Changes',
        status: 'Exemplary',
      },
    ],

    assumedValue: [
      '94% PRD survival rate through release; filtered unfeasible AI concepts, saving $26,800 in sprint churn.',
      'High sprint satisfaction ratings from tech leads across Workspace squads.',
    ],
    assumedGaps: [
      'Minor: Partner API dependency documentation was added 2 days into sprint cycle.',
    ],
    ambiguousAlerts: [
      {
        id: 'alert-1',
        title: 'Partner API Dependency Delay (-3 pts)',
        description: 'Docs MCP showed a slight revision to external API dependency clauses on day 2. Was this expected coordination?',
        aiAssumptionText: 'Confirm: Late dependency addition caused minor risk (-3 pts)',
        overrideOptionText: 'Override: Pre-planned sync waiting for partner security clearance (Pardon penalty)',
        isOverridden: true,
        penaltyPoints: 3,
      },
    ],

    managerContextNote:
      'Priya is performing at a clear Staff L6 level. The partner API clause was waiting on an external Google Security sign-off that Priya proactively coordinated. Unanimous approval for Staff promotion.',

    feedback: {
      excelled: '94% PRD survival rate through release; filtered unfeasible AI concepts, saving $26,800 in sprint churn.',
      lostPoints: 'Ensure external partner API dependencies are flagged earlier in quarterly planning.',
    },
    growthChecklist: [
      { id: 'c1', text: 'Define cross-product Workspace API deprecation framework for 2027', done: true },
      { id: 'c2', text: 'Mentor 2 Associate PMs on authoring lean, objective RFC specifications', done: false },
    ],
  },
  {
    id: 'emp-4',
    name: 'Rohan Verma',
    aid: 'AID-GGL-3029',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    roleId: 'software_engineer',
    roleName: 'Software Engineer (Google Cloud)',
    currentLevel: 'L5',
    targetLevel: 'L5',
    reviewPeriod: 'Q4 2026',
    mcpTools: ['Critique MCP', 'Buganizer MCP', 'Google Chat MCP'],
    mcpSyncStatus: 'Active (Synced 1h ago)',
    verificationStatus: 'verified',
    provisionalScore: 84,
    finalScore: 89,
    decisionCategory: 'hike',
    status: 'Approve 15% Salary Hike',
    salaryHike: '15% Merit Hike Approved',
    archetype: 'High-Judgment Craftsman',

    mcpStages: [
      {
        stageName: 'Stage 1: Architecture & Design Doc (Google Docs MCP)',
        evidence: 'Authored resilient distributed locking mechanism in Cloud Run with exponential backoff.',
        metric: 'Clean Architecture Sign-off',
        status: 'Exemplary',
      },
      {
        stageName: 'Stage 2: Implementation & Peer Critique (Critique MCP)',
        evidence: 'Caught a critical AI concurrency bug (unbounded lock timeout) before merging to canary. 96% unit test coverage.',
        metric: '96% Test Coverage',
        status: 'Exemplary',
      },
      {
        stageName: 'Stage 3: Reliability & Outage Prevention (Buganizer MCP)',
        evidence: 'Zero P1/P2 incidents logged against Cloud Run team throughout Q4.',
        metric: '0 Outages',
        status: 'Exemplary',
      },
    ],

    assumedValue: [
      'Prevented an estimated $34,000 in payment duplicate transactions by refactoring distributed locks.',
      '96% 90-day code survival rate on Critique; strictly enforced Google Go style guide.',
    ],
    assumedGaps: [
      'Review turnaround on external squad CLs averaged 18 hours (benchmark is 12 hours).',
    ],
    ambiguousAlerts: [
      {
        id: 'alert-1',
        title: 'Review Turnaround SLA Deviation (-5 pts)',
        description: 'Critique logs show 3 external reviews took > 16 hours. Was Rohan heads-down resolving an active production alert?',
        aiAssumptionText: 'Confirm: Turnaround exceeded standard benchmark (-5 pts)',
        overrideOptionText: 'Override: Rohan was primary on-call mitigating an upstream Google Cloud networking blip (+5 pts)',
        isOverridden: true,
        penaltyPoints: 5,
      },
    ],

    managerContextNote:
      'Rohan was on-call during the networking blip and successfully protected our services. He is a bedrock engineer on Cloud Run and fully deserves the top merit hike.',

    feedback: {
      excelled: 'Prevented an estimated $34,000 in payment duplicate transactions by refactoring distributed locks.',
      lostPoints: 'Encouraged to publish internal design doc on Cloud Run concurrency patterns.',
    },
    growthChecklist: [
      { id: 'c1', text: 'Lead design review for Q1 multi-region failover architecture', done: false },
      { id: 'c2', text: 'Deliver internal tech talk on safe concurrency practices with AI assistants', done: false },
    ],
  },
  {
    id: 'emp-5',
    name: 'Meera Krishnan',
    aid: 'AID-GGL-7210',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    roleId: 'supply_chain',
    roleName: 'Supply Chain Planner (Pixel Hardware Ops)',
    currentLevel: 'L4',
    targetLevel: 'L5',
    reviewPeriod: 'Q4 2026',
    mcpTools: ['BigQuery ERP MCP', 'Google Docs MCP', 'Google Meet MCP'],
    mcpSyncStatus: 'Active (Synced 3h ago)',
    verificationStatus: 'verified',
    provisionalScore: 89,
    finalScore: 93,
    decisionCategory: 'promoted',
    status: 'Promote to L5 Senior',
    salaryHike: '15% Senior Merit Bump Approved',
    archetype: 'High-Judgment Orchestrator',

    mcpStages: [
      {
        stageName: 'Stage 1: Demand Ingestion & Forecast Audit (BigQuery MCP)',
        evidence: 'Intercepted false ML demand surge on Pixel battery cells caused by automated web crawler traffic.',
        metric: 'Anomalous Spike Caught',
        status: 'Exemplary',
      },
      {
        stageName: 'Stage 2: PO Commitment & ERP Hygiene (SAP S/4HANA MCP)',
        evidence: 'Adjusted PO_SURGE_REQ_770192 from 45,000 to standard 12,000 buffer units, saving $68,000 in holding fees.',
        metric: '$68,000 Saved',
        status: 'Exemplary',
      },
      {
        stageName: 'Stage 3: Vendor SLA & Inbound Fulfillment (IoT Telemetry MCP)',
        evidence: 'Maintained 99.1% on-time fulfillment rate across regional assembly hubs with zero stockouts.',
        metric: '99.1% SLA Fulfillment',
        status: 'Exemplary',
      },
    ],

    assumedValue: [
      'Prevented $68,000 in excess buffer stock and warehouse hazmat storage fees.',
      'Demonstrated textbook human-over-AI override value.',
    ],
    assumedGaps: [
      'Initial PO halt caused a 24-hour supplier confirmation status freeze in SAP.',
    ],
    ambiguousAlerts: [
      {
        id: 'alert-1',
        title: 'ERP Status Freeze Flag (-4 pts)',
        description: 'SAP logs noted a 24h freeze on PO line 770192. Did this create vendor delivery risk?',
        aiAssumptionText: 'Confirm: Status freeze delayed vendor processing (-4 pts)',
        overrideOptionText: 'Override: Intentional investigative pause coordinated directly with supplier VP (+4 pts)',
        isOverridden: true,
        penaltyPoints: 4,
      },
    ],

    managerContextNote:
      'Meera’s pause of the order was a brilliant move that prevented a massive inventory error. Executive commendation from VP of Hardware Ops. Full promotion to L5 Senior approved.',

    feedback: {
      excelled: 'Prevented $68,000 in overstocked inventory costs through human-in-the-loop ML verification.',
      lostPoints: 'None. Candidate is primed for Senior Operations Planner responsibilities.',
    },
    growthChecklist: [
      { id: 'c1', text: 'Package the ML demand anomaly verification protocol into Pixel Ops playbook', done: true },
      { id: 'c2', text: 'Lead regional supply allocation for upcoming Pixel hardware launch', done: false },
    ],
  },
];
