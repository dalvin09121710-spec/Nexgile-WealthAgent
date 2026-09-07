import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const Icon =
          toast.type === 'success'
            ? CheckCircle2
            : toast.type === 'error'
            ? AlertCircle
            : toast.type === 'warning'
            ? AlertTriangle
            : Info;

        const borderClass =
          toast.type === 'success'
            ? 'border-teal-500/40 text-teal-900 dark:text-teal-200'
            : toast.type === 'error'
            ? 'border-rose-500/40 text-rose-900 dark:text-rose-200'
            : toast.type === 'warning'
            ? 'border-amber-500/40 text-amber-900 dark:text-amber-200'
            : 'border-blue-500/40 text-blue-900 dark:text-blue-200';

        const iconColor =
          toast.type === 'success'
            ? 'text-teal-600 dark:text-teal-400'
            : toast.type === 'error'
            ? 'text-rose-600 dark:text-rose-400'
            : toast.type === 'warning'
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-blue-600 dark:text-blue-400';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-white dark:bg-slate-900 rounded-xl shadow-xl border ${borderClass} transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-3`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold leading-tight">{toast.title}</h4>
              {toast.message && (
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
