import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X, Sparkles } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let borderClass = 'border-white/10';
        let bgClass = 'bg-[#131722]/95';
        let icon = <Info className="w-5 h-5 text-sky-400 shrink-0" />;

        if (toast.type === 'success') {
          borderClass = 'border-emerald-500/30';
          bgClass = 'bg-[#131722]/95';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-500/30';
          bgClass = 'bg-[#131722]/95';
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
        } else if (toast.type === 'danger') {
          borderClass = 'border-rose-500/30';
          bgClass = 'bg-[#131722]/95';
          icon = <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border ${borderClass} ${bgClass} backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 flex items-start gap-3 text-left`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs uppercase font-mono tracking-wider text-[#C96843] font-bold">
                  TrueImpact Telemetry
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mt-0.5">{toast.title}</h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
