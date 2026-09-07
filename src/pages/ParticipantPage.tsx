import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart as PieChartIcon,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  HelpCircle,
  Sliders,
  Check,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ParticipantPage: React.FC = () => {
  const { openExplain, setScheduleModalOpen, addToast } = useApp();

  const [contribRate, setContribRate] = useState<number>(10);
  const [rothSplit, setRothSplit] = useState<number>(4); // 4% Roth, 6% Pre-tax

  const annualSalary = 160000;
  const paychecksPerYear = 24;
  const paycheckGross = annualSalary / paychecksPerYear;
  const currentEmployeeContrib = Math.round((paycheckGross * contribRate) / 100);
  const employerMatchAnnual = Math.round(annualSalary * 0.05); // 5% max match

  // Model a 1% boost
  const additionalPerPaycheck = Math.round((paycheckGross * 0.01) * 0.76); // after tax
  const compoundedAt65 = Math.round((annualSalary * 0.01) * 22 * 4.2); // compound estimate

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              My 401(k) Participant Portal
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              Apex Tech 401(k) Plan
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Welcome, Lucas · Account #401K-92841 · Fully Vested Member.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setScheduleModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Book 1-on-1 CFP® Consultation</span>
          </button>
          <button
            onClick={() => {
              setContribRate(prev => Math.min(25, prev + 1));
              addToast(
                'Contribution Rate Increased',
                `Contribution set to ${contribRate + 1}%. Free company match fully secured.`,
                'success'
              );
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Boost Rate by +1%</span>
          </button>
        </div>
      </div>

      {/* 2. Primary Participant KPI Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Balance */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total 401(k) Balance
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold">
              100% Vested
            </span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">$148,600</div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+$18,240 YTD (+14.0%)</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Employee $98K · Match $50.6K</span>
        </div>

        {/* Contribution Rate */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Current Deferral
            </span>
            <span className="text-[10px] text-blue-400 font-bold">Optimal Tier</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">
              {contribRate}% of Pay
            </div>
            <span className="text-xs text-slate-400">
              Pre-tax: {contribRate - rothSplit}% · Roth: {rothSplit}%
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            ${currentEmployeeContrib} deducted per paycheck
          </span>
        </div>

        {/* Employer Match */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Company Match
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
              100% Captured
            </span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-emerald-400">
              +${(employerMatchAnnual ?? 0).toLocaleString()} / yr
            </div>
            <span className="text-xs text-slate-400">Dollar-for-dollar match on first 5%</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">
            Zero employer match left on the table
          </span>
        </div>

        {/* Retirement Readiness */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Retirement Readiness
            </span>
            <span className="text-[10px] font-bold text-blue-400">On Track</span>
          </div>
          <div className="my-1.5 flex items-baseline justify-between">
            <div className="text-2xl font-extrabold text-white">89 / 100</div>
            <span className="text-xs text-slate-400">Age 65 Target</span>
          </div>
          <span className="text-[11px] text-slate-400">Projected: $6,450 / mo in retirement</span>
        </div>
      </div>

      {/* 3. Interactive Paycheck & Contribution Simulator (What-If) */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Interactive Contribution Simulator
            </h3>
            <p className="text-xs text-slate-400">
              See how minor deferral adjustments affect your current paycheck and long-term retirement wealth.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-400">
            IRS 2026 401(k) Limit: $23,500
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          {/* Slider (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <label className="text-slate-300">Total Contribution Rate</label>
                <span className="font-bold text-blue-400">{contribRate}% of gross pay</span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                step={1}
                value={contribRate}
                onChange={e => setContribRate(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1%</span>
                <span>5% (Match Cap)</span>
                <span>10% (Recommended)</span>
                <span>25% Max</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Per-Paycheck Take-Home Impact:</span>
                <span className="font-bold text-slate-200">-${additionalPerPaycheck} / pay period</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Annual Employee Deferral:</span>
                <span className="font-bold text-slate-200">${Math.round((annualSalary * contribRate) / 100).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Outcome Card (6 cols) */}
          <div className="lg:col-span-6 p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Projected Balance at Age 65
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold">
                Compound Advantage
              </span>
            </div>
            <div className="text-3xl font-extrabold text-blue-400">
              +$1,420,000 Total
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every 1% increase in your deferral costs only <strong className="text-white font-bold">${additionalPerPaycheck}</strong> per paycheck but adds approximately <strong className="text-blue-400 font-bold">+$128,000</strong> to your nest egg at age 65 through compound market growth.
            </p>

            <button
              onClick={() => {
                addToast(
                  'Payroll Deduction Updated',
                  `Contribution election of ${contribRate}% transmitted to Apex Technologies payroll.`,
                  'success'
                );
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all"
            >
              Save &amp; Update Payroll Deduction ({contribRate}%)
            </button>
          </div>
        </div>
      </div>

      {/* 4. Current Investment Allocation */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Active Investment Allocations
            </h3>
            <p className="text-xs text-slate-400">Managed target-date model with index equity tilt.</p>
          </div>
          <button
            onClick={() =>
              openExplain(
                'QDIA Target-Date Allocation',
                'Your portfolio is invested in Vanguard Target Retirement 2055, an ERISA-approved Qualified Default Investment Alternative (QDIA) that automatically glides from equity into fixed income as you approach retirement.'
              )
            }
            className="text-xs text-blue-400 font-semibold hover:underline"
          >
            Explain Strategy
          </button>
        </div>

        <div className="space-y-3">
          {/* Fund 1 */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">
                Vanguard Target Retirement 2055 (VFFVX)
              </div>
              <div className="text-[11px] text-slate-400">Target Date Lifecycle · Expense Ratio 0.08%</div>
            </div>
            <div className="text-right">
              <span className="font-bold text-white">70% ($104,020)</span>
              <span className="block text-[10px] text-emerald-400 font-semibold">+13.8% YTD</span>
            </div>
          </div>

          {/* Fund 2 */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">
                Vanguard 500 Index Admiral (VFIAX)
              </div>
              <div className="text-[11px] text-slate-400">Large Cap Equity · Expense Ratio 0.04%</div>
            </div>
            <div className="text-right">
              <span className="font-bold text-white">20% ($29,720)</span>
              <span className="block text-[10px] text-emerald-400 font-semibold">+16.4% YTD</span>
            </div>
          </div>

          {/* Fund 3 */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">
                Vanguard Total International Stock (VTIAX)
              </div>
              <div className="text-[11px] text-slate-400">Global Ex-US Equity · Expense Ratio 0.11%</div>
            </div>
            <div className="text-right">
              <span className="font-bold text-white">10% ($14,860)</span>
              <span className="block text-[10px] text-emerald-400 font-semibold">+8.2% YTD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
