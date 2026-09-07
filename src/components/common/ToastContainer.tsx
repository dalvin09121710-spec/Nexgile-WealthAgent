import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info' || !toast.type;

        return (
          <div
            key={toast.id}
            className="pointer-events-auto p-3.5 rounded-2xl bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-start gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {isError && <XCircle className="w-4 h-4 text-rose-400" />}
              {isInfo && <Info className="w-4 h-4 text-blue-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-white truncate">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
