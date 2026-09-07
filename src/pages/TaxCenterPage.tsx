import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Calendar,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HARVEST_OPPORTUNITIES, WASH_SALE_ITEMS } from '../data/mockData';
import { TaxLossHarvestItem } from '../types';

export const TaxCenterPage: React.FC = () => {
  const { setHarvestDrawerItem, openExplain, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'harvesting' | 'roth' | 'wash-sale'>('harvesting');
  const [rothAmount, setRothAmount] = useState<number>(50000);

  // Roth mathematical simulation
  const currentBracket = 0.24;
  const upfrontTax = Math.round(rothAmount * currentBracket);
  const years = 18; // Age 44 to 62
  const projectedAt62 = Math.round(rothAmount * Math.pow(1.072, years));
  const futureTaxAvoided = Math.round(projectedAt62 * 0.32);
  const netLifetimeGain = futureTaxAvoided - upfrontTax;
  const breakevenYears = 4.2;

  const handleExportCpa = () => {
    addToast(
      'CPA Package Compiled',
      'Exported 1099-B Schedule D worksheets, cost basis lot ledgers, and carryforward tracking.',
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Tax Center &amp; Alpha
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              IRS Tax Alpha Engine
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Systematic tax-loss harvesting, Roth bracket arbitrage, and IRS §1091 wash-sale lock management.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCpa}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400" />
            <span>Export CPA Package</span>
          </button>
          <button
            onClick={() => {
              addToast('Tax Diagnostic Complete', 'Zero active wash-sale violations found. 3 asset-location opportunities flagged.', 'info');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Run Fiduciary Tax Diagnostic</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Realized Gains */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Realized YTD Capital Gains
            </span>
            <button
              onClick={() =>
                openExplain(
                  'Realized Capital Gains',
                  'Year-to-date realized net profits across taxable accounts: $2,800 short-term (taxed at 37%) and $11,400 long-term (taxed at 20% + NIIT).'
                )
              }
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">+$14,200</div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Short-term: $2,800</span>
              <span>Long-term: $11,400</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500">Net of 2026 rebalance reallocations</span>
        </div>

        {/* Harvestable Losses */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Harvestable Unrealized Losses
            </span>
            <span className="px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold">
              Alpha Available
            </span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-rose-400">-$34,800</div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Est. Tax Alpha:</span>
              <span className="font-bold text-emerald-400">+$12,876</span>
            </div>
          </div>
          <span className="text-[11px] text-blue-400 font-medium">
            3 positions ready for execution
          </span>
        </div>

        {/* 2026 Estimated Liability */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Estimated 2026 Liability
            </span>
            <span className="text-[10px] text-slate-400">Federal + State</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">$128,400</div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Effective Tax Rate:</span>
              <span className="font-semibold text-slate-200">26.8%</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500">Marginal Top Bracket: 37% + NIIT</span>
        </div>

        {/* Carryforward Offset */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Tax-Loss Carryforward
            </span>
            <span className="text-[10px] font-bold text-blue-400">Banked</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-blue-400">$18,200</div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Annual Cap Offset:</span>
              <span className="font-semibold text-slate-200">$3,000 / yr</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500">Indefinite carryforward reserve</span>
        </div>
      </div>

      {/* 3. Asset Location Efficiency Strip */}
      <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">
              Asset Location Efficiency: 94% (Exceptional)
            </h4>
            <p className="text-[11px] text-slate-400">
              Municipal bonds placed in taxable accounts; high-growth tech held in Roth IRA; REITs insulated in Traditional IRA.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs shrink-0">
          <div>
            <span className="text-slate-400 block text-[10px]">Taxable Accounts</span>
            <span className="font-bold text-slate-200">$2.33M (64%)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Roth IRA</span>
            <span className="font-bold text-blue-400">$655K (18%)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Tax-Deferred IRA</span>
            <span className="font-bold text-slate-200">$655K (18%)</span>
          </div>
        </div>
      </div>

      {/* 4. Interactive Tabs: Harvesting | Roth Optimizer | Wash-Sale Tracker */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center border-b border-white/10 px-6 pt-4 gap-6 bg-white/5">
          <button
            onClick={() => setActiveTab('harvesting')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'harvesting'
                ? 'text-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Tax-Loss Harvesting Opportunities (3)</span>
            {activeTab === 'harvesting' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('roth')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'roth'
                ? 'text-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Roth Conversion Optimizer</span>
            {activeTab === 'roth' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('wash-sale')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'wash-sale'
                ? 'text-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>IRS §1091 Wash-Sale Tracker</span>
            {activeTab === 'wash-sale' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
            )}
          </button>
        </div>

        {/* Tab 1: Tax-Loss Harvesting Opportunities */}
        {activeTab === 'harvesting' && (
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Pre-Approved Harvesting Swaps
                </h3>
                <p className="text-xs text-slate-400">
                  Instantly sell positions with unrealized losses and purchase correlated proxies to retain index beta.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-300 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                +$12,876 Total Projected Alpha
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white/5 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-3 rounded-l-lg">Target Holding</th>
                    <th className="py-3 px-3 text-right">Unrealized Loss</th>
                    <th className="py-3 px-3">Replacement Proxy</th>
                    <th className="py-3 px-3 text-right">Est. Tax Benefit</th>
                    <th className="py-3 px-3 text-center">Wash Sale</th>
                    <th className="py-3 px-3 text-center rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {HARVEST_OPPORTUNITIES.map(item => (
                    <tr key={item.id} className="hover:bg-white/10 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-white">{item.ticker}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">{item.name}</div>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-rose-400">
                        -${Math.abs(item.unrealizedLoss).toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 font-bold text-blue-400">
                          <span>{item.proxyTicker}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <span className="text-[11px] font-normal text-slate-400 truncate max-w-[180px]">
                            {item.proxyName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-400">
                        +${item.potentialBenefit.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                          {item.washSaleStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => setHarvestDrawerItem(item)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 border border-blue-400/30 transition-all"
                        >
                          Execute Swap →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Roth Conversion Optimizer */}
        {activeTab === 'roth' && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Roth Conversion Bracket Arbitrage
                </h3>
                <p className="text-xs text-slate-400">
                  Model converting pre-tax Traditional IRA balances into a tax-free Roth IRA under current 24% bracket headroom.
                </p>
              </div>
              <span className="text-xs text-slate-400">Sunset in 2027 (Rate rises to 28%)</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Slider Input (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <label className="text-slate-300">Conversion Capital</label>
                    <span className="font-bold text-blue-400">${rothAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={150000}
                    step={5000}
                    value={rothAmount}
                    onChange={e => setRothAmount(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>$10,000</span>
                    <span>$50,000</span>
                    <span>$150,000 Max Headroom</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Federal Bracket:</span>
                    <span className="font-bold text-slate-200">24.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Upfront Tax Cost (2026):</span>
                    <span className="font-bold text-rose-400">${upfrontTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Projected Tax-Free Value at Age 62:</span>
                    <span className="font-bold text-emerald-400">${projectedAt62.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Outcome Card (6 cols) */}
              <div className="lg:col-span-6 p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Net Lifetime Tax Benefit
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold">
                    Breakeven: {breakevenYears} Yrs
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-blue-400">
                  +${netLifetimeGain.toLocaleString()}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  By paying <strong className="font-bold text-white">${upfrontTax.toLocaleString()}</strong> in taxes today at 24%, you insulate <strong className="font-bold text-white">${projectedAt62.toLocaleString()}</strong> from RMD distributions and higher future tax rates.
                </p>

                <button
                  onClick={() => {
                    addToast(
                      'Roth Conversion Mandate Submitted',
                      `Order for $${rothAmount.toLocaleString()} submitted to custodian. Marcus Vance, CFP® notified for sign-off.`,
                      'success'
                    );
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all"
                >
                  Execute Model Conversion (${rothAmount.toLocaleString()})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: IRS §1091 Wash-Sale Tracker */}
        {activeTab === 'wash-sale' && (
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-white">
                  IRS §1091 30-Day Wash-Sale Ledger
                </h3>
                <p className="text-xs text-slate-400">
                  Prevents disallowed loss deductions when repurchasing substantially identical securities within 30 days.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Automated Trading Lock Active</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white/5 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-3 rounded-l-lg">Security</th>
                    <th className="py-3 px-3">Sale Date</th>
                    <th className="py-3 px-3">Lock Expiration</th>
                    <th className="py-3 px-3 text-right">Harvested Loss</th>
                    <th className="py-3 px-3 text-center rounded-r-lg">Lock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {WASH_SALE_ITEMS.map(w => (
                    <tr key={w.id} className="hover:bg-white/10 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-white">{w.ticker}</div>
                        <div className="text-[11px] text-slate-400">{w.name}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{w.saleDate}</td>
                      <td className="py-3 px-3 text-slate-200 font-medium">
                        {w.lockExpiration}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-rose-400">
                        -${w.lossAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            w.status === 'Locked'
                              ? 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
                              : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                          }`}
                        >
                          {w.status === 'Locked' ? `Locked (${w.daysRemaining}d remaining)` : 'Cleared'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                Fiduciary compliance engine automatically blocks custodial buy orders for locked tickers across all linked client accounts.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
