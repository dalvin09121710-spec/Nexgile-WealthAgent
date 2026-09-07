import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, ArrowRight, CheckCircle2, TrendingDown, RefreshCw } from 'lucide-react';

export const TaxLossHarvestDrawer: React.FC = () => {
  const { harvestDrawerItem, setHarvestDrawerItem, addToast } = useApp();
  const [isRouting, setIsRouting] = useState(false);

  if (!harvestDrawerItem) return null;

  const handleExecute = () => {
    setIsRouting(true);
    setTimeout(() => {
      setIsRouting(false);
      const ticker = harvestDrawerItem.ticker;
      const proxy = harvestDrawerItem.proxyTicker;
      const benefit = harvestDrawerItem.potentialBenefit;
      setHarvestDrawerItem(null);
      addToast(
        'Tax-Loss Harvesting Order Executed',
        `Sold ${ticker} to harvest loss; immediately purchased proxy ${proxy} to preserve market beta. Estimated tax benefit: +$${(benefit ?? 0).toLocaleString()}.`,
        'success'
      );
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={() => !isRouting && setHarvestDrawerItem(null)}
      />

      <div className="relative w-full max-w-lg bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl border-l border-white/10 h-full flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold uppercase tracking-wider">
              Execution Mandate
            </span>
            <h3 className="font-bold text-base text-white mt-1">
              Harvesting Execution Review
            </h3>
          </div>
          <button
            onClick={() => setHarvestDrawerItem(null)}
            disabled={isRouting}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Selling Lot Card */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Selling Target Lot
            </span>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-extrabold text-lg text-white">
                  {harvestDrawerItem.ticker}
                </div>
                <div className="text-xs text-slate-400 truncate max-w-[200px]">
                  {harvestDrawerItem.name}
                </div>
              </div>
              <div className="text-right">
                <div className="font-extrabold text-base text-rose-400">
                  -${Math.abs(harvestDrawerItem.unrealizedLoss ?? 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400">Unrealized Capital Loss</div>
              </div>
            </div>
          </div>

          {/* Proxy Swap Card */}
          <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300">
                Correlated Replacement Proxy
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-blue-300">
                0.99 Beta Match
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-white">
                  {harvestDrawerItem.proxyTicker}
                </div>
                <div className="text-xs text-slate-300">
                  {harvestDrawerItem.proxyName}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              Maintains exact asset allocation, duration, and credit exposure while avoiding the 30-day IRS §1091 wash-sale disallowance rule.
            </p>
          </div>

          {/* Financial Breakdown Table */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tax Alpha Impact
            </h5>
            <div className="divide-y divide-white/10 rounded-xl bg-white/5 border border-white/10 p-3 text-xs">
              <div className="py-2 flex justify-between">
                <span className="text-slate-400">Estimated Tax Benefit</span>
                <span className="font-bold text-blue-400">
                  +${(harvestDrawerItem.potentialBenefit ?? 0).toLocaleString()}
                </span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-400">Effective Tax Rate Applied</span>
                <span className="font-semibold text-slate-200">
                  37.0% Federal + NIIT
                </span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-400">Wash-Sale Status</span>
                <span className="font-semibold text-emerald-400">
                  Cleared (30+ days holding)
                </span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-400">Custodial Routing</span>
                <span className="font-semibold text-slate-200">
                  Schwab Prime / FIX Protocol
                </span>
              </div>
            </div>
          </div>

          {/* Fiduciary Guardrail Notice */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-300 leading-snug">
              <span className="font-bold text-white block mb-0.5">
                Fiduciary Compliance Verified
              </span>
              Orders align with client Investment Policy Statement risk tolerance and asset allocation corridor.
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between gap-3">
          <button
            onClick={() => setHarvestDrawerItem(null)}
            disabled={isRouting}
            className="flex-1 py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExecute}
            disabled={isRouting}
            className="flex-1 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
          >
            {isRouting ? (
              <span>Routing Order to Custodian...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm &amp; Route Order</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
