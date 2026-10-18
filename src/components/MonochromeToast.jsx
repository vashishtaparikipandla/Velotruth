import React from 'react';
import { useEnterprise } from '../context/EnterpriseContext';
import { Check, Info } from 'lucide-react';

export default function MonochromeToast() {
  const { toastMessage } = useEnterprise();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none animate-fadeIn">
      <div className="pointer-events-auto p-4 rounded-xl bg-neutral-900 text-white border border-neutral-800 shadow-xl flex items-center gap-3 text-xs font-medium max-w-sm">
        <div className="w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center shrink-0 font-bold">
          <Check className="w-3 h-3" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-bold block text-white">Google Enterprise Event</span>
          <span className="text-neutral-300 leading-tight block mt-0.5">{toastMessage}</span>
        </div>
      </div>
    </div>
  );
}
