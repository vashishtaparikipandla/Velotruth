import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Activity,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Clock,
  Sparkles,
  Cpu,
  Layers
} from 'lucide-react';

export default function LiveTelemetryModal({ isOpen, onClose }) {
  const { auditLogs, selectedRole } = useApp();
  const [filter, setFilter] = useState('all');

  if (!isOpen) return null;

  const filteredLogs = auditLogs.filter((log) => {
    if (filter === 'all') return true;
    if (filter === 'role') return log.roleTag === selectedRole || log.roleTag === 'all';
    if (filter === 'slop') return log.type === 'slop_flag' || log.score < 50;
    if (filter === 'value') return log.type === 'audit' && log.score >= 80;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#131722] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Live Telemetry &amp; Audit Log Stream</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </h3>
              <p className="text-xs text-gray-400">
                Real-time signals ingested across Figma, GitHub, SAP, and Slack webhooks.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 py-3 bg-[#0B0D11] border-b border-white/5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400 font-mono">Stream Filter:</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            {['all', 'role', 'value', 'slop'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                  filter === f
                    ? 'bg-[#C96843] text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {f === 'all'
                  ? 'All Ingress'
                  : f === 'role'
                  ? 'Current Role Only'
                  : f === 'value'
                  ? 'High Value Only'
                  : 'Friction & Slop'}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Logs List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-xs font-mono">
              No matching telemetry events found in this buffer.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isHigh = log.score >= 80;
              const isSlop = log.score < 50;

              return (
                <div
                  key={log.id}
                  className="p-4 rounded-xl bg-[#0B0D11] border border-white/5 hover:border-white/15 transition-all text-xs font-mono space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isHigh
                            ? 'bg-emerald-400'
                            : isSlop
                            ? 'bg-rose-500'
                            : 'bg-amber-400'
                        }`}
                      />
                      <span className="font-bold text-white">{log.employeeName}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">{log.action}</span>
                    </div>

                    <span className="text-gray-500 text-[10px]">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="text-gray-300 font-sans text-xs">{log.summary}</p>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5 text-gray-400">
                    <span className="text-[#C96843] font-semibold">{log.impact}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isHigh
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : isSlop
                          ? 'bg-rose-500/15 text-rose-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {log.status} ({log.score}/100)
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B0D11] border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
          <span>Buffer capacity: 1,000 live events</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
}
