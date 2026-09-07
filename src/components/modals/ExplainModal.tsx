import React from 'react';
import { useApp } from '../../context/AppContext';
import { Lightbulb, X, Check } from 'lucide-react';

export const ExplainModal: React.FC = () => {
  const { explainModal, closeExplain } = useApp();

  if (!explainModal.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="fixed inset-0" onClick={closeExplain} />
      <div className="relative w-full max-w-md bg-slate-900/85 backdrop-blur-xl rounded-2xl shadow-[0_16px_48px_0_rgba(0,0,0,0.5)] border border-white/15 p-6 flex flex-col gap-4 z-10 text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 text-blue-400">
            <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30">
              <Lightbulb className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-bold text-base text-white">
              {explainModal.title}
            </h3>
          </div>
          <button
            onClick={closeExplain}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-slate-200 leading-relaxed">
            {explainModal.content}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-400 font-medium">
            Nexgile Fiduciary Knowledge Base
          </span>
          <button
            onClick={closeExplain}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-lg shadow-blue-500/20 border border-blue-400/30 transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Understood</span>
          </button>
        </div>
      </div>
    </div>
  );
};
