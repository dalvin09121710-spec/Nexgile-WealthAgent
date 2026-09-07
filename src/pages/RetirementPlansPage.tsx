import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  FileCheck2,
  CheckCircle2,
  Download,
  Search,
  ChevronRight,
  PieChart as PieChartIcon,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RETIREMENT_PLAN_SPONSOR, PLAN_FUNDS_LIST } from '../data/mockData';

export const RetirementPlansPage: React.FC = () => {
  const { openExplain, addToast } = useApp();
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredFunds = PLAN_FUNDS_LIST.filter(f => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'WATCHLIST') return f.status === 'Watchlist' || f.status === 'Review';
    if (filterStatus === 'PASS') return f.status === 'Pass';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Retirement Plans (Sponsor)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              ERISA 404(c) Fiduciary
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {RETIREMENT_PLAN_SPONSOR.companyName} · Plan ID #{RETIREMENT_PLAN_SPONSOR.planId} · Fiduciary oversight &amp; investment governance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() =>
              addToast(
                'DOL 404(c) Dossier Compiled',
                'ERISA investment committee audit packet, fee benchmarking, and minutes exported.',
                'success'
              )
            }
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Generate Fiduciary Dossier</span>
          </button>
          <button
            onClick={() =>
              addToast(
                'Re-enrollment Campaign Initialized',
                'Notices dispatched to 482 eligible participants with target-date QDIA defaults.',
                'info'
              )
            }
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Launch Re-enrollment</span>
          </button>
        </div>
      </div>

      {/* 2. Top Plan Sponsor KPI Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Plan Assets */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Plan Assets
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold">
              +12.4% YoY
            </span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">
              ${(RETIREMENT_PLAN_SPONSOR.totalPlanAssets / 1000000).toFixed(1)}M
            </div>
            <span className="text-xs text-slate-400">Recordkeeper: Empower Retirement</span>
          </div>
          <span className="text-[11px] text-slate-400">Institutional trust accounting</span>
        </div>

        {/* Participants & Engagement */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Participants
            </span>
            <span className="text-[10px] text-blue-400 font-bold">482 Enrolled</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">
              {RETIREMENT_PLAN_SPONSOR.participationRate}%
            </div>
            <span className="text-xs text-slate-400">Participation (Peer benchmark 82.5%)</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">
            Auto-escalation active (1% / yr)
          </span>
        </div>

        {/* Average Account Balance */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Avg Account Balance
            </span>
            <span className="text-[10px] text-slate-400">Top Quartile</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">
              ${RETIREMENT_PLAN_SPONSOR.averageBalance.toLocaleString()}
            </div>
            <span className="text-xs text-slate-400">Median balance: $64,200</span>
          </div>
          <span className="text-[11px] text-slate-400">Average deferral rate: 8.8%</span>
        </div>

        {/* Fiduciary Governance Score */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Fiduciary Score
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
              100% Pass
            </span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-blue-400">Form 5500</div>
            <span className="text-xs text-slate-400">Filed &amp; Accepted by DOL</span>
          </div>
          <span className="text-[11px] text-slate-400">Next Committee Review: Nov 18</span>
        </div>
      </div>

      {/* 3. Fee Benchmarking & Revenue Sharing Strip */}
      <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">
              Institutional Fee Benchmarking (ERISA §408(b)(2))
            </h4>
            <p className="text-[11px] text-slate-400">
              All-in asset-weighted fee is <strong className="text-white">0.28%</strong> vs industry peer benchmark of <strong className="text-white">0.44%</strong>. Zero 12b-1 revenue sharing; 100% fee transparency.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              openExplain(
                'ERISA Fee Benchmarking',
                'Fiduciaries have a legal obligation under ERISA to ensure plan fees are reasonable. The plan utilizes lowest-cost institutional share classes with zero proprietary fund bias.'
              )
            }
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
          >
            Explain Audit
          </button>
        </div>
      </div>

      {/* 4. Investment Lineup & Watchlist Governance Table */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Approved Investment Lineup &amp; Fiduciary Watchlist
            </h3>
            <p className="text-xs text-slate-400">
              Quarterly scorecards based on 3-year trailing alpha, Sharpe ratio, and expense ratio thresholds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/5 border border-white/10 p-1 rounded-xl text-xs font-semibold">
              {(['ALL', 'PASS', 'WATCHLIST'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    filterStatus === s
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white/5 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3 rounded-l-lg">Investment Option</th>
                <th className="py-3 px-3">Asset Class</th>
                <th className="py-3 px-3 text-right">Plan Assets</th>
                <th className="py-3 px-3 text-right">Expense Ratio</th>
                <th className="py-3 px-3 text-right">3Y Trailing</th>
                <th className="py-3 px-3 text-center rounded-r-lg">Fiduciary Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredFunds.map(fund => (
                <tr key={fund.id} className="hover:bg-white/10 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white">{fund.name}</div>
                    <div className="text-[11px] text-slate-400">{fund.ticker}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{fund.assetClass}</td>
                  <td className="py-3 px-3 text-right font-bold text-white">
                    ${(fund.assets / 1000000).toFixed(1)}M
                  </td>
                  <td className="py-3 px-3 text-right text-slate-200 font-medium">
                    {fund.expenseRatio}%
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400">
                    +{fund.performance3Y}%
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        fund.status === 'Pass'
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                          : fund.status === 'Review'
                          ? 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
                          : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {fund.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
          <span>Investment Policy Statement (IPS) criteria audited by Sovereign Advisory Group</span>
          <span className="text-blue-400 font-semibold">16 Approved Funds</span>
        </div>
      </div>
    </div>
  );
};
