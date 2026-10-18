import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Workflow,
  Radio,
  Power,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  GitBranch,
  Terminal,
  Clock,
  Sparkles,
  RefreshCw,
  Send,
  Database,
  MessageSquare,
  FileText,
  Palette,
  CheckSquare,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const FigmaIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const TOOL_ICONS = {
  Figma: FigmaIcon,
  Github: GithubIcon,
  FileText: FileText,
  Database: Database,
  MessageSquare: MessageSquare,
  CheckSquare: CheckSquare,
};

export default function Tab2ToolMesh() {
  const {
    selectedRole,
    activeRoleData,
    tools,
    toggleTool,
    addToast,
    setAuditLogs,
  } = useApp();

  const [activeStageIndex, setActiveStageIndex] = useState(2);
  const [filterType, setFilterType] = useState('all'); // 'all', 'Execution', 'Communication'
  const [isSimulatingEvent, setIsSimulatingEvent] = useState(false);

  // Filter tools
  const filteredTools = tools.filter((t) => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    return true;
  });

  const activeStage = activeRoleData.pipeline[activeStageIndex] || activeRoleData.pipeline[0];

  const handleSimulateWebhookEvent = (tool) => {
    setIsSimulatingEvent(true);
    addToast('Telemetry Signal Ingested', `Simulating real-time telemetry event from ${tool.name}...`, 'info');

    setTimeout(() => {
      setIsSimulatingEvent(false);
      const isClean = Math.random() > 0.4;
      const eventScore = isClean ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 20) + 30;

      setAuditLogs((prev) => [
        {
          id: 'log-' + Date.now(),
          timestamp: new Date().toISOString(),
          type: isClean ? 'audit' : 'slop_flag',
          roleTag: selectedRole,
          employeeName: `${tool.name} Webhook Listener`,
          action: `Real-time Telemetry Ingestion (${tool.category})`,
          score: eventScore,
          impact: isClean ? '+$2,400 Clean Sync' : '-$3,800 Downstream Friction',
          summary: isClean
            ? `Verified zero unlinked tokens / clean commit signature on active squad pipeline.`
            : `Flagged token mismatch / unverified AI artifact. Downstream Slack friction alerted.`,
          status: isClean ? 'Verified High Value' : 'High Penalty Flag',
        },
        ...prev,
      ]);

      addToast(
        isClean ? 'Telemetry Clean' : 'Friction Warning Logged',
        `Live signal recorded in Audit Ledger for ${tool.name}.`,
        isClean ? 'success' : 'danger'
      );
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Visual Workflow Pipeline Section */}
      <div className="p-6 rounded-2xl bg-[#131722] border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-wider text-[#C96843] font-bold">
              <Workflow className="w-4 h-4" />
              <span>End-to-End Delivery Pipeline Telemetry</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {activeRoleData.name} Production Workflow
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Horizontal stage mesh showing downstream checkpoints and automated workslop friction boundaries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0B0D11] border border-white/10 text-gray-300">
              5 Telemetry Checkpoints
            </span>
          </div>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-stretch min-w-[780px] gap-2">
            {activeRoleData.pipeline.map((step, index) => {
              const isSelected = activeStageIndex === index;
              let statusBadge = (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" /> Passed
                </span>
              );

              if (step.status === 'Warning Hotspot') {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <AlertTriangle className="w-3 h-3" /> Warning Hotspot
                  </span>
                );
              } else if (step.status === 'High Friction') {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                    <Flame className="w-3 h-3" /> High Friction
                  </span>
                );
              }

              return (
                <div key={step.id} className="flex-1 flex items-center">
                  <div
                    onClick={() => setActiveStageIndex(index)}
                    className={`w-full p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[140px] relative ${
                      isSelected
                        ? 'bg-[#1A2030] border-[#C96843] shadow-glow-terracotta ring-1 ring-[#C96843]'
                        : 'bg-[#0B0D11] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Step Number Pill */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold text-gray-400">
                        Step 0{index + 1}
                      </span>
                      {statusBadge}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-2">
                        {step.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-mono mt-1">
                        Tool: {step.tool}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-white/5 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C96843]" /> SLA: {step.duration}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {isSelected ? 'Inspecting' : 'Click to inspect'}
                      </span>
                    </div>
                  </div>

                  {/* Arrow separator if not last */}
                  {index < activeRoleData.pipeline.length - 1 && (
                    <div className="px-1 text-gray-600 shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep-Dive Banner */}
        <div className="p-4 rounded-xl bg-[#0B0D11] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C96843]/20 text-[#C96843] flex items-center justify-center font-bold">
              0{activeStageIndex + 1}
            </div>
            <div>
              <div className="text-white font-bold text-sm">{activeStage.name}</div>
              <div className="text-gray-400 text-xs">
                Monitored via <strong>{activeStage.tool}</strong> • Friction Status: <span className="text-[#C96843] font-semibold">{activeStage.status}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
              <span className="text-gray-400">Downstream Guardrail:</span>{' '}
              <strong className="text-emerald-400">Vertex AI Audit Gate Active</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Connectors Grid Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-wider text-[#C96843] font-bold">
              <Radio className="w-4 h-4" />
              <span>Multi-Source Telemetry Mesh</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">
              Tool Connectors &amp; Live Ingress
            </h2>
            <p className="text-xs text-gray-400">
              Execution and communication connectors providing live signals for token adherence, rework loops, and PR churn.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex p-1 rounded-xl bg-[#131722] border border-white/10">
            {['all', 'Execution', 'Communication'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterType === type
                    ? 'bg-[#C96843] text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {type === 'all' ? 'All Connectors' : `${type} Tools`}
              </button>
            ))}
          </div>
        </div>

        {/* Connectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const isConnected = tool.status.includes('Connected');
            const Icon = TOOL_ICONS[tool.icon] || Database;

            return (
              <div
                key={tool.id}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isConnected
                    ? 'bg-[#131722] border-white/10 hover:border-white/20 shadow-lg'
                    : 'bg-[#131722]/50 border-white/5 opacity-70'
                }`}
              >
                <div>
                  {/* Top Bar with Icon & Toggle */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isConnected
                            ? 'bg-[#1A2030] text-[#C96843] border border-white/10'
                            : 'bg-white/5 text-gray-500 border border-white/5'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {tool.name}
                        </h4>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                          {tool.type} • {tool.category}
                        </span>
                      </div>
                    </div>

                    {/* Connect Toggle Button */}
                    <button
                      onClick={() => toggleTool(tool.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isConnected
                          ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                      }`}
                    >
                      <Power className={`w-3.5 h-3.5 ${isConnected ? 'text-emerald-400' : 'text-gray-400'}`} />
                      <span>{isConnected ? 'Connected' : 'Connect'}</span>
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-300 leading-relaxed min-h-[38px]">
                    {tool.description}
                  </p>
                </div>

                {/* Footer Metrics & Actions */}
                <div className="pt-4 border-t border-white/5 mt-4 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          isConnected
                            ? 'bg-emerald-400 animate-pulse'
                            : 'bg-gray-600'
                        }`}
                      />
                      <span className={isConnected ? 'text-emerald-300 font-semibold' : 'text-gray-400'}>
                        {tool.status}
                      </span>
                    </div>
                    {isConnected && (
                      <span className="text-gray-400">
                        Ping: <strong className="text-white">{tool.pingMs}ms</strong>
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-gray-400 font-mono bg-[#0B0D11] p-2 rounded-lg border border-white/5 flex items-center justify-between">
                    <span className="truncate">{tool.metricsSample}</span>
                  </div>

                  {/* Simulate Test Telemetry Signal */}
                  {isConnected && (
                    <button
                      onClick={() => handleSimulateWebhookEvent(tool)}
                      disabled={isSimulatingEvent}
                      className="w-full py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3 h-3 text-[#C96843]" />
                      <span>Simulate Telemetry Ping</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
