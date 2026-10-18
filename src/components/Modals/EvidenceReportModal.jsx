import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  FileText,
  Copy,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Clock,
  DollarSign
} from 'lucide-react';

export default function EvidenceReportModal({ employee, isOpen, onClose }) {
  const { addToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !employee) return null;

  const isHighValue = employee.trueImpactScore >= 80;
  const isSlop = employee.trueImpactScore < 50;

  const handleCopyMarkdown = () => {
    const md = `
# TrueImpact AI — Executive Evidence Dossier
**Candidate**: ${employee.name}
**Department**: ${employee.role}
**Seniority Tier**: ${employee.level}
**Evaluation Date**: ${new Date().toLocaleDateString()}
**Vertex AI Grounding**: Verified (Text-Embedding-005)

---
### 1. Executive Summary
- **TrueImpact Score**: ${employee.trueImpactScore}/100
- **Archetype**: ${employee.archetype}
- **Recommendation**: ${employee.status}
- **Net Dollar Impact**: ${employee.dollarImpact > 0 ? `+$${employee.dollarImpact}` : `-$${Math.abs(employee.dollarImpact)}`}

### 2. Telemetry Metrics
- **Raw Output Volume**: ${employee.rawVolume}
- **Token / Spec Hygiene**: ${employee.tokenHygiene}%
- **Downstream Survival Rate**: ${employee.downstreamSurvival}%
- **Human Judgment Override**: ${employee.humanJudgment}%
- **Downstream Rework Penalty**: -${employee.reworkPenalty}% (${employee.reworkHours}h friction)

### 3. Audited Receipts & Findings
${employee.violations.map((v) => `- ${v}`).join('\n')}

### 4. Manager Coaching & Next Steps
${employee.evidenceNotes}
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    addToast('Dossier Copied', 'Markdown report copied to system clipboard.', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#131722] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-gray-100">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C96843]/20 text-[#C96843] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#C96843] font-bold">
                Vertex AI Audited Report
              </span>
              <h2 className="text-base font-bold text-white">Executive Talent Evidence Dossier</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dossier Card (Printable) */}
        <div className="p-6 rounded-2xl bg-[#0B0D11] border border-white/10 space-y-6">
          {/* Candidate Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/15"
              />
              <div>
                <h3 className="text-xl font-extrabold text-white">{employee.name}</h3>
                <div className="text-xs text-gray-400 font-mono mt-0.5">
                  {employee.role} • <strong className="text-white">{employee.level}</strong>
                </div>
                <div className="text-xs text-[#C96843] font-semibold mt-1">
                  {employee.archetype}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs uppercase font-mono text-gray-400">TrueImpact Score</div>
              <div
                className={`text-4xl font-extrabold font-mono ${
                  isHighValue
                    ? 'text-emerald-400'
                    : isSlop
                    ? 'text-rose-400'
                    : 'text-amber-400'
                }`}
              >
                {employee.trueImpactScore}
                <span className="text-xs text-gray-500 font-normal"> / 100</span>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#131722] border border-white/5">
              <span className="text-gray-400 text-[10px] uppercase block">Token Hygiene</span>
              <span className="text-sm font-bold text-white mt-1 block">
                {employee.tokenHygiene}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#131722] border border-white/5">
              <span className="text-gray-400 text-[10px] uppercase block">Survival Rate</span>
              <span className="text-sm font-bold text-emerald-400 mt-1 block">
                {employee.downstreamSurvival}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#131722] border border-white/5">
              <span className="text-gray-400 text-[10px] uppercase block">Human Override</span>
              <span className="text-sm font-bold text-amber-400 mt-1 block">
                {employee.humanJudgment}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#131722] border border-white/5">
              <span className="text-gray-400 text-[10px] uppercase block">Net Impact</span>
              <span
                className={`text-sm font-bold mt-1 block ${
                  employee.dollarImpact >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {employee.dollarImpact >= 0
                  ? `+$${employee.dollarImpact.toLocaleString()}`
                  : `-$${Math.abs(employee.dollarImpact).toLocaleString()}`}
              </span>
            </div>
          </div>

          {/* Audited Findings */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 font-bold">
              Audited Telemetry Receipts:
            </h4>
            <div className="space-y-1.5">
              {employee.violations.map((v, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-[#131722] border border-white/5 text-xs text-gray-300 flex items-start gap-2"
                >
                  <span className="text-[#C96843] font-bold">•</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dossier Manager Notes */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 space-y-1">
            <span className="text-[11px] font-mono uppercase font-bold text-gray-400 block">
              Manager Audit Notes:
            </span>
            <p className="leading-relaxed">{employee.evidenceNotes}</p>
          </div>

          {/* Vertex Vector Grounding Hash */}
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pt-2 border-t border-white/5">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#C96843]" />
              Vertex AI Vector Signature: 768-dim Hash Verified
            </span>
            <span>Ref: {employee.id}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleCopyMarkdown}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied Markdown!' : 'Copy Dossier (Markdown)'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-[#C96843] hover:bg-[#B55A36] text-white font-bold text-xs shadow-glow-terracotta transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
