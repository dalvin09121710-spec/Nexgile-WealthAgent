import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, X, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const RebalanceModal: React.FC = () => {
  const { rebalanceModalOpen, setRebalanceModalOpen, addToast } = useApp();
  const [isExecuting, setIsExecuting] = useState(false);

  if (!rebalanceModalOpen) return null;

  const handleAuthorize = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setRebalanceModalOpen(false);
      addToast(
        'Portfolio Rebalance Authorized',
        'Batch block orders routed to Schwab Prime execution engine. Estimated net capital gains tax: $0.00.',
        'success'
      );
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="fixed inset-0" onClick={() => !isExecuting && setRebalanceModalOpen(false)} />
      <div className="relative w-full max-w-2xl bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/10 p-6 sm:p-7 flex flex-col gap-6 z-10 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                Institutional Portfolio Rebalance
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tax-aware algorithmic re-alignment toward Investment Policy Statement (IPS) targets.
              </p>
            </div>
          </div>
          <button
            onClick={() => setRebalanceModalOpen(false)}
            disabled={isExecuting}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                1. Trim US Equities (+2.0% Model Drift)
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Sell $72,800 across highest-basis tax lots in Taxable Brokerage
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[11px] font-bold shrink-0">
              Tax Protected
            </span>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                2. Harvest Fixed Income Losses (BND)
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Swap into aggregate proxy (AGG) to book -$16,400 in capital loss carryforward
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-bold shrink-0">
              Harvest $16.4K
            </span>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                3. Replenish Liquidity Target (+1.0%)
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Deposit remaining proceeds into 5.10% SEC-yield treasury reserve
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold shrink-0">
              Yield Boost
            </span>
          </div>
        </div>

        {/* Fiduciary Summary strip */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300 block">
                Estimated Capital Gains Liability
              </span>
              <span className="text-base font-extrabold text-white">
                $0.00 (Net Tax Neutral Offset)
              </span>
            </div>
          </div>
          <span className="text-xs text-slate-400 hidden sm:block">
            0 Wash-Sale Violations
          </span>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[11px] text-slate-400">
            Fiduciary execution: Marcus Vance, CFP®
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRebalanceModalOpen(false)}
              disabled={isExecuting}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAuthorize}
              disabled={isExecuting}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all flex items-center gap-1.5"
            >
              {isExecuting ? (
                <span>Routing to Custodian...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Authorize Execution</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
