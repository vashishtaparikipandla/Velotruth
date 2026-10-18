// Initial dataset for TrueImpact AI

export const ROLES = [
  {
    id: 'design',
    name: 'UI/UX Design',
    category: 'Product Design & System Architecture',
    badge: 'Design System & Figma Mesh',
    shortDesc: 'Evaluates Figma token hygiene, visual craft, component reuse, and zero-friction developer handoff.',
    iconName: 'Palette',
    pipeline: [
      { id: 'p1', name: 'Product Brief & User Research', duration: '2d', tool: 'Google Docs / Notion', status: 'Passed' },
      { id: 'p2', name: 'Wireframing & Lo-Fi Flows', duration: '3d', tool: 'Figma Auto-Layout', status: 'Passed' },
      { id: 'p3', name: 'Tokenized UI & System Spec', duration: '4d', tool: 'Figma Token Studio', status: 'Warning Hotspot' },
      { id: 'p4', name: 'Dev Handoff & Annotations', duration: '2d', tool: 'GitHub / Jira Spec', status: 'High Friction' },
      { id: 'p5', name: 'Staging Visual QA & Token Audit', duration: '1d', tool: 'Storybook Telemetry', status: 'Verified' },
    ]
  },
  {
    id: 'product',
    name: 'Product Management',
    category: 'Strategy & Delivery Execution',
    badge: 'PRD & Backlog Mesh',
    shortDesc: 'Evaluates PRD precision, requirement stability, cross-functional alignment, and reduction of sprint churn.',
    iconName: 'Kanban',
    pipeline: [
      { id: 'p1', name: 'Discovery & Market Synthesis', duration: '4d', tool: 'Vertex AI Search', status: 'Passed' },
      { id: 'p2', name: 'PRD & Acceptance Criteria Draft', duration: '3d', tool: 'Google Docs / Jira', status: 'Warning Hotspot' },
      { id: 'p3', name: 'Design & Eng Cross-Alignment', duration: '2d', tool: 'Slack / Miro', status: 'High Friction' },
      { id: 'p4', name: 'Sprint Epic Decomposition', duration: '2d', tool: 'Linear / Jira', status: 'Passed' },
      { id: 'p5', name: 'Launch Readiness & Telemetry Review', duration: '1d', tool: 'Amplitude / PostHog', status: 'Verified' },
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering',
    category: 'Software Architecture & Delivery',
    badge: 'Git & CI/CD Mesh',
    shortDesc: 'Evaluates code survival rate, test coverage, architectural hygiene, and avoiding downstream production incidents.',
    iconName: 'Code',
    pipeline: [
      { id: 'p1', name: 'RFC & Architecture Review', duration: '3d', tool: 'GitHub Discussions', status: 'Passed' },
      { id: 'p2', name: 'PR Branch & AI Code Draft', duration: '2d', tool: 'Copilot / Gemini Code Assist', status: 'Warning Hotspot' },
      { id: 'p3', name: 'Unit & End-to-End Test Suite', duration: '1d', tool: 'GitHub Actions CI', status: 'High Friction' },
      { id: 'p4', name: 'Peer Review & Clean Merge', duration: '1d', tool: 'GitHub PR Telemetry', status: 'Passed' },
      { id: 'p5', name: 'Canary Deploy & SRE Monitoring', duration: '2d', tool: 'Datadog / Google Cloud', status: 'Verified' },
    ]
  },
  {
    id: 'supply_chain',
    name: 'Supply Chain',
    category: 'Operations & Procurement Intelligence',
    badge: 'SAP ERP & Demand Mesh',
    shortDesc: 'Evaluates ML demand forecast overrides, vendor fulfillment SLAs, inventory holding cost minimization, and procurement accuracy.',
    iconName: 'Truck',
    pipeline: [
      { id: 'p1', name: 'Demand Signal Ingestion', duration: '1d', tool: 'Snowflake / BigQuery', status: 'Passed' },
      { id: 'p2', name: 'ML Forecast Variance Check', duration: '1d', tool: 'Vertex AI Forecasting', status: 'Passed' },
      { id: 'p3', name: 'Human-in-the-Loop Override', duration: '2d', tool: 'SAP Integrated Business Plan', status: 'High Friction' },
      { id: 'p4', name: 'PO Issuance & Supplier Routing', duration: '2d', tool: 'SAP ERP S/4HANA', status: 'Warning Hotspot' },
      { id: 'p5', name: 'Inbound Logistics & SLA Audit', duration: '3d', tool: 'Logistics IoT Telemetry', status: 'Verified' },
    ]
  }
];

export const ROLE_RUBRICS = {
  design: {
    L1: {
      title: 'Junior UI/UX Designer',
      expectations: 'Adopts existing component libraries without unlinking. Follows 8pt grid baseline. Annotates design files with standard states (hover, disabled, loading). Maintains basic responsive auto-layout.',
      weights: { craft: 35, handoff: 30, aiOrchestration: 15, mentorship: 20 },
      rubricHash: 'vx-rubric-des-l1-9921',
      lastIndexed: '2026-10-18T10:14:00Z',
    },
    L2: {
      title: 'Mid-Level UI/UX Designer',
      expectations: '90%+ Figma Design Token binding, WCAG 2.2 AA contrast compliance across all breakpoints. Zero raw unlinked hex colors. Zero duplicate component frames. AI wireframe imports must be audited for layout integrity before dev handoff.',
      weights: { craft: 30, handoff: 35, aiOrchestration: 20, mentorship: 15 },
      rubricHash: 'vx-rubric-des-l2-8812',
      lastIndexed: '2026-10-18T14:32:00Z',
    },
    L3: {
      title: 'Senior Product Designer',
      expectations: 'Multi-brand design system architecture, zero dev handoff friction, AI prompt-to-token validation. Authors reusable interactive prototypes. Proactively flags accessibility and responsive regression in squad sprints.',
      weights: { craft: 25, handoff: 35, aiOrchestration: 25, mentorship: 15 },
      rubricHash: 'vx-rubric-des-l3-4411',
      lastIndexed: '2026-10-17T09:12:00Z',
    },
    L4: {
      title: 'Staff / Lead Designer',
      expectations: 'Cross-squad component reusability, zero dev handoff friction. Mentors junior designers on AI tool orchestration without quality degradation. Owns cross-platform token synchronization with iOS and Android codebases.',
      weights: { craft: 20, handoff: 30, aiOrchestration: 25, mentorship: 25 },
      rubricHash: 'vx-rubric-des-l4-1290',
      lastIndexed: '2026-10-16T18:00:00Z',
    },
    L5: {
      title: 'Principal Design Architect',
      expectations: 'Enterprise design system strategy, cross-org design token standard, org-wide AI efficiency multiplier. Defines designOps governance and multimodal prompt guidelines for the entire enterprise.',
      weights: { craft: 15, handoff: 25, aiOrchestration: 30, mentorship: 30 },
      rubricHash: 'vx-rubric-des-l5-0041',
      lastIndexed: '2026-10-15T11:20:00Z',
    }
  },
  product: {
    L1: {
      title: 'Associate Product Manager',
      expectations: 'Writes concise user stories with verifiable acceptance criteria. Tracks sprint bugs in Jira and ensures sprint backlog is groomed on schedule.',
      weights: { craft: 35, handoff: 30, aiOrchestration: 15, mentorship: 20 },
      rubricHash: 'vx-rubric-pm-l1-1194',
      lastIndexed: '2026-10-18T08:22:00Z',
    },
    L2: {
      title: 'Product Manager',
      expectations: 'Rigorous PRD scoping with explicit edge-case definitions. Restricts AI PRD generation to structured data synthesis; human vetting of technical feasibility before engineering grooming. Reduces mid-sprint scope churn below 10%.',
      weights: { craft: 30, handoff: 35, aiOrchestration: 20, mentorship: 15 },
      rubricHash: 'vx-rubric-pm-l2-3321',
      lastIndexed: '2026-10-18T12:05:00Z',
    },
    L3: {
      title: 'Senior Product Manager',
      expectations: 'Cross-functional roadmap orchestration. Defines clear ROI and business hypotheses. Downstream PRD survival rate > 88% through release cycles without major requirement rewrites.',
      weights: { craft: 25, handoff: 35, aiOrchestration: 25, mentorship: 15 },
      rubricHash: 'vx-rubric-pm-l3-5590',
      lastIndexed: '2026-10-17T16:44:00Z',
    },
    L4: {
      title: 'Group Product Manager',
      expectations: 'Portfolio-level feature synergy and technical strategy. Establishes customer problem validation frameworks that prevent AI slop specs from entering developer pipelines.',
      weights: { craft: 20, handoff: 30, aiOrchestration: 25, mentorship: 25 },
      rubricHash: 'vx-rubric-pm-l4-7712',
      lastIndexed: '2026-10-16T15:20:00Z',
    },
    L5: {
      title: 'Principal Product Strategist',
      expectations: 'Enterprise product vision and multi-year platform direction. Direct impact on business unit ARR and product-market expansion with zero organizational debt.',
      weights: { craft: 15, handoff: 25, aiOrchestration: 30, mentorship: 30 },
      rubricHash: 'vx-rubric-pm-l5-9901',
      lastIndexed: '2026-10-15T09:10:00Z',
    }
  },
  engineering: {
    L1: {
      title: 'Junior Software Engineer',
      expectations: 'Delivers well-tested functions with 85%+ unit test coverage. Adheres to team linting, static analysis rules, and branch naming conventions.',
      weights: { craft: 35, handoff: 30, aiOrchestration: 15, mentorship: 20 },
      rubricHash: 'vx-rubric-eng-l1-2291',
      lastIndexed: '2026-10-18T07:11:00Z',
    },
    L2: {
      title: 'Software Engineer II',
      expectations: 'Clean PR diffs with high code survival rate (>85% surviving 90 days). Audits LLM-generated code against security vulnerabilities (OWASP), memory leaks, and unnecessary dependencies. Zero dev friction on CI builds.',
      weights: { craft: 30, handoff: 35, aiOrchestration: 20, mentorship: 15 },
      rubricHash: 'vx-rubric-eng-l2-4412',
      lastIndexed: '2026-10-18T13:40:00Z',
    },
    L3: {
      title: 'Senior Software Engineer',
      expectations: 'System design resiliency, API backward compatibility, and zero-downtime database migrations. Leverages AI agents for automated testing while strictly enforcing microservice boundaries.',
      weights: { craft: 25, handoff: 35, aiOrchestration: 25, mentorship: 15 },
      rubricHash: 'vx-rubric-eng-l3-6623',
      lastIndexed: '2026-10-17T11:35:00Z',
    },
    L4: {
      title: 'Staff Engineer',
      expectations: 'Multi-service architecture and cross-team developer tooling. Sets high-judgment bar for automated code review bots. Cuts org-wide build and deploy cycle times.',
      weights: { craft: 20, handoff: 30, aiOrchestration: 25, mentorship: 25 },
      rubricHash: 'vx-rubric-eng-l4-8834',
      lastIndexed: '2026-10-16T14:15:00Z',
    },
    L5: {
      title: 'Principal Systems Architect',
      expectations: 'Enterprise infrastructure stability, multi-region failover, latency budget governance, and enterprise AI safety protocols.',
      weights: { craft: 15, handoff: 25, aiOrchestration: 30, mentorship: 30 },
      rubricHash: 'vx-rubric-eng-l5-0012',
      lastIndexed: '2026-10-15T16:00:00Z',
    }
  },
  supply_chain: {
    L1: {
      title: 'Junior Procurement Specialist',
      expectations: 'Accurately reconciles purchase orders with warehouse shipping notices. Audits basic supplier invoice variances against SAP standard rates.',
      weights: { craft: 35, handoff: 30, aiOrchestration: 15, mentorship: 20 },
      rubricHash: 'vx-rubric-sc-l1-3310',
      lastIndexed: '2026-10-18T06:50:00Z',
    },
    L2: {
      title: 'Supply Chain Analyst II',
      expectations: 'Monitors automated ML forecasting deviations. Validates lead time anomalies before auto-generating SAP POs. Human-in-the-loop override saves buffer inventory costs without triggering stockouts.',
      weights: { craft: 30, handoff: 35, aiOrchestration: 20, mentorship: 15 },
      rubricHash: 'vx-rubric-sc-l2-5521',
      lastIndexed: '2026-10-18T10:30:00Z',
    },
    L3: {
      title: 'Senior Operations Planner',
      expectations: 'Global vendor risk hedging and regional warehouse allocation. Synthesizes macroeconomic signals with internal ERP telemetry to maintain >98.5% fill rate.',
      weights: { craft: 25, handoff: 35, aiOrchestration: 25, mentorship: 15 },
      rubricHash: 'vx-rubric-sc-l3-7744',
      lastIndexed: '2026-10-17T14:10:00Z',
    },
    L4: {
      title: 'Supply Chain Operations Lead',
      expectations: 'End-to-end logistics orchestration across tier-1 suppliers. Builds automated dispute escalation trees and prevents costly expedited freight tariffs.',
      weights: { craft: 20, handoff: 30, aiOrchestration: 25, mentorship: 25 },
      rubricHash: 'vx-rubric-sc-l4-9912',
      lastIndexed: '2026-10-16T12:00:00Z',
    },
    L5: {
      title: 'Principal Supply Chain Architect',
      expectations: 'Enterprise supply resilience strategy, automated dark warehouse architecture, and multi-country trade compliance automation.',
      weights: { craft: 15, handoff: 25, aiOrchestration: 30, mentorship: 30 },
      rubricHash: 'vx-rubric-sc-l5-1123',
      lastIndexed: '2026-10-15T08:30:00Z',
    }
  }
};

export const INITIAL_TOOLS = [
  // Execution Tools
  {
    id: 'figma',
    name: 'Figma API',
    type: 'Execution',
    roleTag: 'design',
    category: 'Design Systems & Tokens',
    description: 'Inspects live document node hierarchies, unlinked hex colors, missing auto-layout states, and component variant overrides.',
    status: 'Connected (Live Telemetry Active)',
    pingMs: 14,
    lastSync: 'Just now',
    metricsSample: '98,420 nodes indexed • 14 file branches',
    icon: 'Figma',
  },
  {
    id: 'github',
    name: 'GitHub REST API',
    type: 'Execution',
    roleTag: 'engineering',
    category: 'Source Control & CI',
    description: 'Tracks PR line additions vs churn, 90-day code survival rate, test coverage delta, and reverted automated commits.',
    status: 'Connected (Live Telemetry Active)',
    pingMs: 28,
    lastSync: '1m ago',
    metricsSample: '42 repos monitored • 312 PRs analyzed',
    icon: 'Github',
  },
  {
    id: 'gdocs',
    name: 'Google Docs API',
    type: 'Execution',
    roleTag: 'product',
    category: 'PRD & Spec Repository',
    description: 'Audits PRD version history, comment resolution velocity, requirement churn rate, and hallucinated spec sections.',
    status: 'Connected (Live Telemetry Active)',
    pingMs: 42,
    lastSync: '3m ago',
    metricsSample: '154 PRDs tracked • 89 stakeholder reviews',
    icon: 'FileText',
  },
  {
    id: 'sap',
    name: 'SAP ERP S/4HANA',
    type: 'Execution',
    roleTag: 'supply_chain',
    category: 'Procurement & Logistics',
    description: 'Tracks purchase order fulfillment variances, supplier lead-time drift, inventory holding cost spikes, and ML forecast error.',
    status: 'Connected (Live Telemetry Active)',
    pingMs: 86,
    lastSync: '4m ago',
    metricsSample: '12,800 PO lines • 34 vendor pipelines',
    icon: 'Database',
  },
  // Communication Tools
  {
    id: 'slack',
    name: 'Slack Webhooks',
    type: 'Communication',
    roleTag: 'all',
    category: 'Downstream Sentiment & Handoff',
    description: 'Monitors developer rework questions, bug thread escalations, confusion sentiment emojis (❓/🔥), and handoff friction tax.',
    status: 'Connected (Live Telemetry Active)',
    pingMs: 19,
    lastSync: 'Just now',
    metricsSample: '48 channels scanned • 1,240 threads indexed',
    icon: 'MessageSquare',
  },
  {
    id: 'jira',
    name: 'Jira / Linear API',
    type: 'Communication',
    roleTag: 'all',
    category: 'Ticket Churn & Sprint Friction',
    description: 'Measures ticket bounce rates, mid-sprint scope creep, bug reopen frequency, and QA failure tags on AI-drafted tasks.',
    status: 'Connected (Live Telemetry Active)',
    pingMs: 35,
    lastSync: '2m ago',
    metricsSample: '23 sprint boards • 540 active epics',
    icon: 'CheckSquare',
  }
];

export const INITIAL_EMPLOYEES = {
  design: [
    {
      id: 'emp-des-001',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'UI/UX Design',
      level: 'L2',
      archetype: 'The AI Workslop Spammer',
      archetypeType: 'slop',
      summary: 'Mass-generates screens with AI wireframe plugins but leaves unlinked hex colors, missing responsive states, and creates 28 hours of dev Slack confusion.',
      rawVolume: '42 screens / wk',
      rawVolumeSub: '240 AI-generated component variants',
      tokenHygiene: 32, // %
      downstreamSurvival: 41, // %
      humanJudgment: 28, // %
      levelAlignment: 45, // %
      reworkPenalty: 28.5, // %
      reworkHours: 28,
      dollarImpact: -14200,
      trueImpactScore: 38,
      status: 'Needs Mentorship',
      statusType: 'danger',
      readyForPromotion: false,
      salaryHikeRecommendation: 'Hold (0% Hike)',
      violations: [
        '34 unlinked custom hex values (#2B3A4C, #E13467) overriding global tokens',
        '28 downstream Slack rework threads in #dev-handoff-squad4',
        'Missing tap target padding on 18 mobile modals (WCAG failure)',
        '3 Figma components broke main branch Auto-Layout tree'
      ],
      evidenceNotes: 'Pushed 42 high-fidelity screens created via an AI prompt plugin without checking design system token compliance. Frontend squad spent 28 hours asking for layout tokens and correcting hardcoded values.',
    },
    {
      id: 'emp-des-002',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      role: 'UI/UX Design',
      level: 'L2',
      archetype: 'The High-Judgment Orchestrator',
      archetypeType: 'value',
      summary: 'Curates AI layout drafts with 98% design token compliance, zero developer rework loops, and human-over-AI override value ($18,400 saved).',
      rawVolume: '16 screens / wk',
      rawVolumeSub: '100% token-bound & annotated',
      tokenHygiene: 98, // %
      downstreamSurvival: 95, // %
      humanJudgment: 94, // %
      levelAlignment: 92, // %
      reworkPenalty: 1.5, // %
      reworkHours: 0.5,
      dollarImpact: 18400,
      trueImpactScore: 94,
      status: 'Ready for Promotion (L2->L3)',
      statusType: 'success',
      readyForPromotion: true,
      salaryHikeRecommendation: 'Approved (+14% Senior Bump)',
      violations: [
        'None. Zero unlinked hex codes found.',
        '100% WCAG 2.2 AAA color contrast verified',
        'Zero blocker threads in #dev-handoff',
        'Built 4 reusable composite components for design system'
      ],
      evidenceNotes: 'Elena used Gemini wireframe exploration to draft 5 layout variants, discarded 4 hallucinated navigation patterns, and bound all 16 delivered screens to the enterprise token registry. Handoff completed in 1 dev sprint without friction.',
    },
    {
      id: 'emp-des-003',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'UI/UX Design',
      level: 'L3',
      archetype: 'The System Craftsman',
      archetypeType: 'value',
      summary: 'Engineered design token sync pipeline between Figma Studio and React Tailwind config. Reduced handoff cycle time across 4 squads.',
      rawVolume: '22 screens / wk',
      rawVolumeSub: '18 cross-squad components',
      tokenHygiene: 94,
      downstreamSurvival: 91,
      humanJudgment: 89,
      levelAlignment: 90,
      reworkPenalty: 3.0,
      reworkHours: 2,
      dollarImpact: 14800,
      trueImpactScore: 88,
      status: 'Salary Hike Approved',
      statusType: 'success',
      readyForPromotion: false,
      salaryHikeRecommendation: 'Approved (+10% Merit Hike)',
      violations: [
        '2 minor naming collisions in secondary button states resolved during QA'
      ],
      evidenceNotes: 'Maintained 94% token hygiene while authoring 18 new responsive components adopted by 3 separate product verticals.',
    },
    {
      id: 'emp-des-004',
      name: 'Chloe Zhang',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      role: 'UI/UX Design',
      level: 'L1',
      archetype: 'The Promising Apprentice',
      archetypeType: 'neutral',
      summary: 'Solid execution of junior responsibilities. Occasionally relies on AI for illustration vectors that require minor manual SVG node cleanup.',
      rawVolume: '14 screens / wk',
      rawVolumeSub: '7 lo-fi exploration specs',
      tokenHygiene: 78,
      downstreamSurvival: 74,
      humanJudgment: 70,
      levelAlignment: 76,
      reworkPenalty: 8.5,
      reworkHours: 6,
      dollarImpact: 3200,
      trueImpactScore: 72,
      status: 'Maintain & Coach',
      statusType: 'warning',
      readyForPromotion: false,
      salaryHikeRecommendation: 'Standard (+5% Annual CoL)',
      violations: [
        '6 unlinked icon paths had hardcoded strokes',
        'Mobile breakpoint auto-layout required squad lead review'
      ],
      evidenceNotes: 'Demonstrates great learning speed. Needs structured coaching on Figma nested variant properties.',
    }
  ],
  product: [
    {
      id: 'emp-pm-001',
      name: 'David Sterling',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'Product Management',
      level: 'L2',
      archetype: 'The AI Workslop Spammer',
      archetypeType: 'slop',
      summary: 'Outputs 65-page AI-generated PRDs with contradictory user stories, hallucinated legacy API endpoints, causing 3 sprint replanning sessions.',
      rawVolume: '65 pages / sprint',
      rawVolumeSub: '8 AI PRD epics generated',
      tokenHygiene: 40,
      downstreamSurvival: 36,
      humanJudgment: 30,
      levelAlignment: 44,
      reworkPenalty: 31.0,
      reworkHours: 34,
      dollarImpact: -21500,
      trueImpactScore: 35,
      status: 'Needs Mentorship',
      statusType: 'danger',
      readyForPromotion: false,
      salaryHikeRecommendation: 'Hold (0% Hike)',
      violations: [
        'Hallucinated payment API v3 that was deprecated in 2024',
        '34 contradictory acceptance criteria across 4 Linear tickets',
        '3 sprint retros cited PRD ambiguity as primary blocker'
      ],
      evidenceNotes: 'Raw volume is extremely high, but required 34 hours of engineering and design time to debug incoherent requirements.',
    },
    {
      id: 'emp-pm-002',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'Product Management',
      level: 'L2',
      archetype: 'The High-Judgment Orchestrator',
      archetypeType: 'value',
      summary: 'Synthesizes customer churn data using Vertex AI, cuts spec ambiguity, and ensures 96% PRD survival through QA delivery.',
      rawVolume: '18 pages / sprint',
      rawVolumeSub: 'Concise 1-page RFC format',
      tokenHygiene: 96,
      downstreamSurvival: 94,
      humanJudgment: 95,
      levelAlignment: 93,
      reworkPenalty: 1.2,
      reworkHours: 1,
      dollarImpact: 26800,
      trueImpactScore: 95,
      status: 'Ready for Promotion (L2->L3)',
      statusType: 'success',
      readyForPromotion: true,
      salaryHikeRecommendation: 'Approved (+15% Merit & Promotion)',
      violations: [
        'None. Zero mid-sprint scope changes logged.'
      ],
      evidenceNotes: 'Priya filtered out 8 unfeasible AI-suggested feature ideas and zeroed in on high-retention payment fallback logic, saving $26,800 in engineering churn.',
    },
    {
      id: 'emp-pm-003',
      name: 'Jordan Miller',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      role: 'Product Management',
      level: 'L3',
      archetype: 'The Strategic Anchor',
      archetypeType: 'value',
      summary: 'Maintains tight backlog cohesion across 2 full squads. Proactively models unit economics before committing roadmap quarters.',
      rawVolume: '24 pages / sprint',
      rawVolumeSub: '4 quarterly strategic epics',
      tokenHygiene: 89,
      downstreamSurvival: 88,
      humanJudgment: 91,
      levelAlignment: 88,
      reworkPenalty: 4.0,
      reworkHours: 3.5,
      dollarImpact: 19500,
      trueImpactScore: 89,
      status: 'Salary Hike Approved',
      statusType: 'success',
      readyForPromotion: false,
      salaryHikeRecommendation: 'Approved (+11% Merit Hike)',
      violations: [
        '1 minor delay in legal privacy signoff for telemetry tracking'
      ],
      evidenceNotes: 'Exceptional communication during executive steering reviews with zero sprint churn.',
    }
  ],
  engineering: [
    {
      id: 'emp-eng-001',
      name: 'Kevin Wu',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      role: 'Engineering',
      level: 'L2',
      archetype: 'The AI Workslop Spammer',
      archetypeType: 'slop',
      summary: 'Commits 3,200 lines of AI-generated boilerplate code per week with zero edge-case tests, causing 4 staging build breaks and 1 P2 incident.',
      rawVolume: '3,200 LOC / wk',
      rawVolumeSub: '24 PRs merged with weak review',
      tokenHygiene: 38,
      downstreamSurvival: 32,
      humanJudgment: 25,
      levelAlignment: 40,
      reworkPenalty: 36.0,
      reworkHours: 42,
      dollarImpact: -31200,
      trueImpactScore: 32,
      status: 'Needs Mentorship',
      statusType: 'danger',
      readyForPromotion: false,
      salaryHikeRecommendation: 'Hold (0% Hike)',
      violations: [
        'AI code included hallucinated npm dependency with CVE security alert',
        '42 hours spent by senior peers fixing concurrency lockups in PR #402',
        'Staging outage caused by unhandled null pointer on user session checkout'
      ],
      evidenceNotes: 'Extremely fast commit velocity, but down-stream code survival is under 35%. Peer review burden is actively draining team morale.',
    },
    {
      id: 'emp-eng-002',
      name: 'Amina Diallo',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      role: 'Engineering',
      level: 'L2',
      archetype: 'The High-Judgment Orchestrator',
      archetypeType: 'value',
      summary: 'Writes lean, resilient Go microservices. Uses AI strictly for test coverage generation and refactoring regex patterns. 96% 90-day code survival.',
      rawVolume: '850 LOC / wk',
      rawVolumeSub: '98% unit & integration test coverage',
      tokenHygiene: 97,
      downstreamSurvival: 96,
      humanJudgment: 95,
      levelAlignment: 94,
      reworkPenalty: 1.0,
      reworkHours: 0.5,
      dollarImpact: 34000,
      trueImpactScore: 96,
      status: 'Ready for Promotion (L2->L3)',
      statusType: 'success',
      readyForPromotion: true,
      salaryHikeRecommendation: 'Approved (+16% Promotion & High-Value Bonus)',
      violations: [
        'None. Zero production alerts logged in Q3/Q4.'
      ],
      evidenceNotes: 'Amina caught a critical race condition in the automated Copilot output before pushing to staging. Refactored the distributed locking mechanism, preventing an estimated $34,000 in payment duplicate transactions.',
    },
    {
      id: 'emp-eng-003',
      name: 'Tomas Novak',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      role: 'Engineering',
      level: 'L3',
      archetype: 'The Reliability Sentinel',
      archetypeType: 'value',
      summary: 'Maintains zero-friction CI/CD workflows and automated token validator bots. Highly respected code reviewer.',
      rawVolume: '1,100 LOC / wk',
      rawVolumeSub: 'Authored core telemetry SDK',
      tokenHygiene: 92,
      downstreamSurvival: 90,
      humanJudgment: 93,
      levelAlignment: 91,
      reworkPenalty: 2.5,
      reworkHours: 1.5,
      dollarImpact: 22000,
      trueImpactScore: 91,
      status: 'Salary Hike Approved',
      statusType: 'success',
      readyForPromotion: false,
      salaryHikeRecommendation: 'Approved (+12% Merit Hike)',
      violations: [
        '1 flaky integration test caught on staging test runner'
      ],
      evidenceNotes: 'Consistent high-craft engineer with exceptional mentoring contributions across junior engineers.',
    }
  ],
  supply_chain: [
    {
      id: 'emp-sc-001',
      name: 'Ryan Gallagher',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      role: 'Supply Chain',
      level: 'L2',
      archetype: 'The AI Workslop Spammer',
      archetypeType: 'slop',
      summary: 'Blindly accepted automated ML forecast suggestions without inspecting supplier port strikes, leading to $45,000 in expedited freight surcharges.',
      rawVolume: '140 POs / wk',
      rawVolumeSub: 'Auto-approved without port checks',
      tokenHygiene: 44,
      downstreamSurvival: 38,
      humanJudgment: 22,
      levelAlignment: 42,
      reworkPenalty: 29.0,
      reworkHours: 31,
      dollarImpact: -45000,
      trueImpactScore: 36,
      status: 'Needs Mentorship',
      statusType: 'danger',
      readyForPromotion: false,
      salaryHikeRecommendation: 'Hold (0% Hike)',
      violations: [
        'Failed to override ML forecast during known Rotterdam port labor disruption',
        '28 POs required emergency warehouse rerouting and manual re-invoicing',
        'Holding cost jumped 19% on redundant component inventory'
      ],
      evidenceNotes: 'High automation speed, but zero human judgment applied to ML recommendations. Generated heavy logistics friction for warehouse staff.',
    },
    {
      id: 'emp-sc-002',
      name: 'Zoe Katsaros',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      role: 'Supply Chain',
      level: 'L2',
      archetype: 'The High-Judgment Orchestrator',
      archetypeType: 'value',
      summary: 'Manually intercepted ML demand forecast spike in raw aluminum, verified supplier inventory via live EDI, saving the company $68,000 in overstocked capital.',
      rawVolume: '65 POs / wk',
      rawVolumeSub: '100% human-verified supplier SLAs',
      tokenHygiene: 95,
      downstreamSurvival: 97,
      humanJudgment: 98,
      levelAlignment: 94,
      reworkPenalty: 1.0,
      reworkHours: 0.5,
      dollarImpact: 68000,
      trueImpactScore: 97,
      status: 'Ready for Promotion (L2->L3)',
      statusType: 'success',
      readyForPromotion: true,
      salaryHikeRecommendation: 'Approved (+18% Promotion & Ops Impact Award)',
      violations: [
        'None. Zero inventory mismatch or supplier stockouts.'
      ],
      evidenceNotes: 'Zoe demonstrated textbook human-over-AI override value. The automated model misread a promotional promo as permanent demand; Zoe caught the anomaly and prevented $68,000 in excess inventory.',
    },
    {
      id: 'emp-sc-003',
      name: 'Suresh Patel',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      role: 'Supply Chain',
      level: 'L3',
      archetype: 'The Strategic Logistics Lead',
      archetypeType: 'value',
      summary: 'Optimized multi-echelon inventory distribution across 6 regional fulfillment hubs. Reduced stockout frequency to under 0.8%.',
      rawVolume: '88 POs / wk',
      rawVolumeSub: 'Negotiated dynamic fuel surcharge caps',
      tokenHygiene: 91,
      downstreamSurvival: 93,
      humanJudgment: 92,
      levelAlignment: 90,
      reworkPenalty: 2.0,
      reworkHours: 1.2,
      dollarImpact: 39000,
      trueImpactScore: 92,
      status: 'Salary Hike Approved',
      statusType: 'success',
      readyForPromotion: false,
      salaryHikeRecommendation: 'Approved (+12% Merit Hike)',
      violations: [
        '1 minor delay in customs clearance declaration for APAC shipment'
      ],
      evidenceNotes: 'Exemplary supply chain modeling with rigorous supplier compliance audit trails.',
    }
  ]
};

export const PRESET_SCENARIOS = [
  {
    id: 'scen-1',
    name: 'Scenario 1: Detached Figma UI + Broken Dev Slack Thread',
    roleTag: 'design',
    description: 'Designer used an AI layout generator to create 24 checkout screens. Pushed raw frames with detached tokens and broken auto-layout, sparking a heated Slack debate.',
    artifactPayload: JSON.stringify({
      component: 'CheckoutFlowModal_v3_final',
      rawScreensCount: 24,
      aiPromptUsed: 'Generate mobile checkout with Apple Pay, Klarna, address verification, gift cards',
      designTokens: {
        boundTokens: 12,
        detachedHexCodes: ['#2A3B4D', '#112233', '#FFAA00', '#F24455', '#EAEAEA', '#333333'],
        autoLayoutErrors: 19,
        contrastViolationsWCAG: 7
      },
      figmaNodeHierarchy: 'Frame 1024 -> Group 12 -> Rectangle 4 -> Text ("Place Order", font-size: 13.5px)'
    }, null, 2),
    slackThreadPayload: `[10:14 AM] @alex.dev: "Hey team, looking at the new checkout Figma file... why are there 6 different shades of dark blue that aren't in our design tokens?"
[10:19 AM] @alex.dev: "Also Rectangle 4 doesn't have auto-layout, so on iPhone 13 mini the CTA button is completely pushed off screen."
[10:28 AM] @sarah.fe: "Yeah, this is unusable as-is. None of the spacing values match 8pt scale (there's 11px, 17px, 23px margins everywhere). Are these AI wireframes uninspected?"
[10:35 AM] @jason.qa: "Filing ticket DES-412. We have to push sprint release back 3 days until tokens are bound."`,
    expectedVerdict: {
      score: 34,
      flag: 'High Workslop Risk & Downstream Friction Tax',
      frictionHours: 24.5,
      costImpact: '-$14,200',
      violations: [
        '6 unlinked hex color primitives violating enterprise token registry',
        '19 broken auto-layout containers failing mobile responsive breakpoints',
        '7 WCAG 2.2 AA color contrast failures on critical checkout CTAs',
        '24.5 developer rework hours caused across 3 frontend engineers'
      ],
      coachingBlueprint: 'Mandate Figma Token Studio linting plugin before moving any frame to "Dev Handoff". Junior/Mid designers must not merge prompt-generated wireframes without explicit 8pt baseline verification.'
    }
  },
  {
    id: 'scen-2',
    name: 'Scenario 2: Tokenized UI + Clean Handoff',
    roleTag: 'design',
    description: 'Designer leveraged AI for wireframe variant explorations, pruned hallucinated patterns, bound all elements to enterprise design tokens, and provided interactive state annotations.',
    artifactPayload: JSON.stringify({
      component: 'EnterpriseBillingDashboard_v2',
      rawScreensCount: 16,
      aiPromptUsed: 'Explore multi-currency billing table variants with tax breakdowns',
      designTokens: {
        boundTokens: 148,
        detachedHexCodes: [],
        autoLayoutErrors: 0,
        contrastViolationsWCAG: 0,
        tokenCoveragePct: 100
      },
      figmaNodeHierarchy: 'Card/BillingTable -> TableHeader (Tokens.Color.Surface.Muted) -> TableRow (Auto-layout H, padding: Tokens.Space.4)'
    }, null, 2),
    slackThreadPayload: `[02:15 PM] @sarah.fe: "Elena, just pulled the new billing table Figma spec. The token bindings and annotations are flawless! Component matches our Tailwind theme 1:1."
[02:30 PM] @alex.dev: "Built and rendered the component in Storybook in under 45 minutes. Zero questions. Cleanest handoff of the quarter."
[03:10 PM] @jason.qa: "All automated visual regression tests passed on first run across all 4 responsive viewports. Approved for staging."`,
    expectedVerdict: {
      score: 96,
      flag: 'High-Judgment Orchestration & High Downstream Value',
      frictionHours: 0.2,
      costImpact: '+$19,800 saved',
      violations: [
        'Zero token violations detected (100% compliance)',
        'Zero layout regression or contrast issues',
        'Instant dev handoff velocity: 45m execution vs 16h standard estimate'
      ],
      coachingBlueprint: 'Exemplary execution. Qualifies as gold standard for L2->L3 promotion evidence dossier. Nominate Elena to lead the quarterly Design Token Governance workshop.'
    }
  },
  {
    id: 'scen-3',
    name: 'Scenario 3: Supply Chain ML Forecast Override',
    roleTag: 'supply_chain',
    description: 'Analyst evaluated an automated Vertex ML forecast urging a 300% purchase order surge in battery cells. Analyst identified abnormal consumer survey data and halted the order, saving millions.',
    artifactPayload: JSON.stringify({
      sapTransaction: 'PO_SURGE_REQ_770192',
      sku: 'BAT-CELL-LI-ION-950',
      mlSuggestedOrderQty: 45000,
      mlConfidenceScore: 0.94,
      analystAction: 'HUMAN_OVERRIDE_INTERCEPT',
      finalAdjustedQty: 12000,
      investigationReason: 'Spike caused by automated bot crawling e-commerce pre-order page; no real down-payments captured.'
    }, null, 2),
    slackThreadPayload: `[09:12 AM] @sap-bot: "ALERT: PO_SURGE_REQ_770192 generated for 45,000 units ($1,125,000 total commitment). Pending analyst approval."
[09:45 AM] @zoe.sc: "Halting PO approval. Looking into the demand spike. 78% of the traffic came from a single crawler IP cluster in Frankfurt."
[10:30 AM] @zoe.sc: "Adjusted PO to standard buffer replacement of 12,000 units. Discarded the 33,000 unit ghost surge."
[11:00 AM] @vp-operations: "Great catch Zoe! If that PO had gone through, warehouse 4 would have run out of hazmat storage and incurred $220k in emergency third-party holding fees."`,
    expectedVerdict: {
      score: 98,
      flag: 'Elite Human-in-the-Loop Override Value',
      frictionHours: 0.0,
      costImpact: '+$220,000 avoided risk',
      violations: [
        'Automated model misclassified synthetic crawler load as genuine commercial demand',
        'Human intervention prevented severe liquidity tie-up and hazmat overflow'
      ],
      coachingBlueprint: 'Candidate demonstrates executive-tier supply chain judgment. Immediately package this case study into enterprise ML Guardrail playbook.'
    }
  },
  {
    id: 'scen-4',
    name: 'Scenario 4: Engineering Copilot Hallucination with Downstream Outage',
    roleTag: 'engineering',
    description: 'Engineer accepted AI-generated distributed lock logic without verifying redis connection timeout behavior, causing staging deadlock and API server restarts.',
    artifactPayload: JSON.stringify({
      repository: 'services/payment-gateway',
      prNumber: 412,
      diffLinesAdded: 450,
      aiGeneratedPct: 92,
      hasUnitTests: true,
      testCoverage: 'Passing (Mocked Redis client)',
      codeSnippet: `func AcquireLock(ctx context.Context, lockKey string) bool {
    // Generated by AI assistant
    for {
        ok, _ := redisClient.SetNX(ctx, lockKey, "locked", 0).Result() // 0 ttl = infinite lock!
        if ok { return true }
        time.Sleep(10 * time.Millisecond) // CPU spinning loop
    }
}`
    }, null, 2),
    slackThreadPayload: `[11:42 AM] @sre-pagerduty: "CRITICAL ALERT: payment-gateway CPU 100%, 504 Gateway Timeouts surging."
[11:50 AM] @tomas.lead: "What PR was merged before the canary deploy?"
[11:54 AM] @sre-oncall: "PR #412. Look at AcquireLock()—it has SetNX with a 0 TTL. If any worker pod dies while holding the lock, every other worker gets trapped in an infinite busy-wait loop!"
[12:15 PM] @tomas.lead: "Reverting PR #412 immediately. 4 engineers lost 3 hours debugging. Why didn't integration tests catch this?"`,
    expectedVerdict: {
      score: 28,
      flag: 'High Workslop Risk & Downstream Reliability Tax',
      frictionHours: 16.0,
      costImpact: '-$24,000 lost downtime',
      violations: [
        'Infinite lock duration (TTL: 0) generated by uninspected LLM snippet',
        'Tight CPU spin loop without exponential backoff or context cancellation',
        'Mocked unit tests gave false sense of safety without distributed integration testing'
      ],
      coachingBlueprint: 'Strict policy review: Any AI-assisted concurrency or database transaction code must require dual-peer signoff from a Senior/Staff engineer before merging.'
    }
  },
  {
    id: 'scen-5',
    name: 'Scenario 5: Product Management 80-Page AI PRD with Contradictions',
    roleTag: 'product',
    description: 'PM generated an expansive 80-page spec using an AI prompt. The document contained incompatible billing requirements, stalling sprint kick-off for 2 weeks.',
    artifactPayload: JSON.stringify({
      prdTitle: 'Unified Multi-Tenant Workspace Permissions v4',
      totalPages: 84,
      aiAssistedDraftPct: 88,
      userStoriesCount: 112,
      conflictsIdentified: [
        'Section 3.2 states "All Guest users have free unlimited exports"',
        'Section 7.4 states "Guest users are strictly barred from export APIs unless Enterprise Add-on is active"',
        'Mentions deprecating Webhooks v1 which 40% of tier-1 enterprise accounts rely on'
      ]
    }, null, 2),
    slackThreadPayload: `[03:15 PM] @eng-director: "Team, we just sat through 2 hours of sprint grooming on the new permissions PRD. Section 3 directly contradicts Section 7 on guest export rights."
[03:40 PM] @lead-architect: "Also noticed it says we will deprecate Webhooks v1 next month. Did anyone speak with sales? We have 14 Fortune 500 contracts with SLAs guaranteeing v1 support through 2028."
[04:00 PM] @eng-director: "We are putting this sprint on hold. Engineers cannot write code against self-contradicting 80-page AI text dumps. We need a clean 2-page RFC."`,
    expectedVerdict: {
      score: 31,
      flag: 'Spec Bloat & High Downstream Sprint Paralysis',
      frictionHours: 38.0,
      costImpact: '-$32,000 wasted sprint capacity',
      violations: [
        'Severe internal logic contradiction between licensing clauses',
        'Unvetted breaking change impacting Tier-1 contract legal SLAs',
        '38 hours of wasted engineering director & architect grooming cycles'
      ],
      coachingBlueprint: 'Enforce "Concise RFC" standard. Maximum 6 pages per spec. AI tools may only be used for summarizing existing interview notes, never for synthesizing contractual policy without human domain oversight.'
    }
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-1',
    timestamp: '2026-10-18T14:42:10Z',
    type: 'audit',
    roleTag: 'design',
    employeeName: 'Elena Rostova',
    action: 'Gemini 2.5 Handoff Telemetry Audit',
    score: 94,
    impact: '+$18,400 Saved',
    summary: '98% token hygiene verified on EnterpriseBillingDashboard. Zero downstream dev questions.',
    status: 'Verified High Value'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-18T13:10:05Z',
    type: 'slop_flag',
    roleTag: 'design',
    employeeName: 'Alex Rivera',
    action: 'Workslop Friction Alert',
    score: 38,
    impact: '-$14,200 Tax',
    summary: 'Flagged 34 unlinked hex codes and 28h downstream Slack friction on CheckoutFlowModal_v3.',
    status: 'High Penalty'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-18T11:25:30Z',
    type: 'vector_index',
    roleTag: 'all',
    employeeName: 'System Engine',
    action: 'Vertex Vector Search Calibration',
    score: 100,
    impact: '768-dim Synced',
    summary: 'Indexed role rubrics into Vertex AI Vector DB across all 5 seniority levels.',
    status: 'System Ok'
  },
  {
    id: 'log-4',
    timestamp: '2026-10-18T09:18:44Z',
    type: 'audit',
    roleTag: 'supply_chain',
    employeeName: 'Zoe Katsaros',
    action: 'Human ML Override Verification',
    score: 97,
    impact: '+$68,000 Avoided',
    summary: 'Intercepted false ML demand surge on raw aluminum, avoiding warehouse holding cost disaster.',
    status: 'Verified High Value'
  }
];
