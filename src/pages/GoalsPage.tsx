import React, { useState } from 'react';
import {
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles,
  Share2,
  Calendar,
  Layers,
  HelpCircle,
  X,
  Check,
  RotateCcw
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useApp } from '../context/AppContext';

interface GoalCard {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  accumulated: number;
  target: number;
  fundedPct: number;
  yearsRemaining: number;
  monthlyContribution: number;
  monteCarloProb: number;
  status: 'On Track' | 'Needs Review' | 'At Risk';
  note: string;
}

const GOALS_DATA: GoalCard[] = [
  {
    id: 'retirement',
    name: 'Retirement Target',
    subtitle: 'Age 62 · Year 2044',
    category: 'Retirement',
    accumulated: 2624000,
    target: 3200000,
    fundedPct: 82,
    yearsRemaining: 18,
    monthlyContribution: 3450,
    monteCarloProb: 92,
    status: 'On Track',
    note: 'Monte Carlo 10,000 runs indicate 92% certainty with $14,850/mo safe draw capacity.'
  },
  {
    id: 'education',
    name: 'Higher Education 529',
    subtitle: 'Undergrad · Year 2028',
    category: 'Education',
    accumulated: 254800,
    target: 280000,
    fundedPct: 91,
    yearsRemaining: 2,
    monthlyContribution: 1200,
    monteCarloProb: 96,
    status: 'On Track',
    note: 'Funded for Lucas (2028) and Sophia (2032) college matriculation.'
  },
  {
    id: 'dynasty',
    name: 'Dynasty Trust Mandate',
    subtitle: 'Multi-Gen · Year 2040',
    category: 'Legacy',
    accumulated: 1110000,
    target: 1500000,
    fundedPct: 74,
    yearsRemaining: 14,
    monthlyContribution: 2100,
    monteCarloProb: 78,
    status: 'Needs Review',
    note: 'Fixed income yield drag detected. Shifting to tax-managed index restores 91% certainty.'
  },
  {
    id: 'aspen',
    name: 'Aspen Vacation Residence',
    subtitle: 'Vacation Home · Year 2029',
    category: 'Home',
    accumulated: 377000,
    target: 650000,
    fundedPct: 58,
    yearsRemaining: 3,
    monthlyContribution: 1800,
    monteCarloProb: 64,
    status: 'At Risk',
    note: 'Projected shortfall of -$85,000. Recommend boosting monthly inflow by +$1,200/mo.'
  }
];

export const GoalsPage: React.FC = () => {
  const { addToast } = useApp();

  // Scenario Builder interactive state
  const [retireAge, setRetireAge] = useState<number>(62);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(3450);
  const [returnRate, setReturnRate] = useState<number>(7.2);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);

  // Live Scenario Recalculation
  const currentAge = 44;
  const years = Math.max(1, retireAge - currentAge);
  const baseCapital = 2624000;
  const annualContrib = monthlyContribution * 12;
  const r = returnRate / 100;

  // Compound growth of current capital
  const fvPrincipal = baseCapital * Math.pow(1 + r, years);
  const fvAnnuity = annualContrib * ((Math.pow(1 + r, years) - 1) / r);
  const projectedTotal = Math.round(fvPrincipal + fvAnnuity);
  const targetHurdle = 3200000;
  const delta = projectedTotal - targetHurdle;

  // Safe draw + Social security estimated monthly
  const monthlyDraw = Math.round((projectedTotal * 0.041) / 12 + 4200);
  const coverageRatio = projectedTotal / targetHurdle;
  const probability = Math.min(99, Math.max(45, Math.round(coverageRatio * 88)));

  // Dynamic Chart Points based on current slider values
  const trajectoryChartData = [
    { age: 'Age 44', current: baseCapital, upperBand: baseCapital, target: targetHurdle },
    { age: 'Age 48', current: Math.round(baseCapital * 1.25 + annualContrib * 4), upperBand: Math.round(baseCapital * 1.35 + annualContrib * 4.5), target: targetHurdle },
    { age: 'Age 52', current: Math.round(baseCapital * 1.55 + annualContrib * 8.5), upperBand: Math.round(baseCapital * 1.75 + annualContrib * 10), target: targetHurdle },
    { age: 'Age 58', current: Math.round(baseCapital * 1.95 + annualContrib * 14.5), upperBand: Math.round(baseCapital * 2.3 + annualContrib * 17), target: targetHurdle },
    { age: `Age ${retireAge}`, current: projectedTotal, upperBand: Math.round(projectedTotal * 1.18), target: targetHurdle },
    { age: 'Age 75', current: Math.round(projectedTotal * 0.94), upperBand: Math.round(projectedTotal * 1.12), target: targetHurdle },
    { age: 'Age 90', current: Math.round(projectedTotal * 0.82), upperBand: Math.round(projectedTotal * 1.05), target: targetHurdle }
  ];

  const handleApplyToPlan = () => {
    addToast(
      'Scenario Applied to Active Financial Plan',
      `Retirement age ${retireAge} with $${monthlyContribution.toLocaleString()}/mo contribution committed to WealthBuilder Pro 2026.`,
      'success'
    );
  };

  const handleAdvisorShare = () => {
    addToast(
      'Scenario Transmitted to Advisor',
      'Parameters sent securely to Marcus Vance, CFP® at Sovereign Advisory Group.',
      'info'
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Goals &amp; Planning
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              Fiduciary Plan Active
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Track capital priorities, simulate what-if market scenarios, and model lifetime cash flows.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setComparisonModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>Compare Scenarios</span>
          </button>
          <button
            onClick={() => addToast('Plan Report Exported', 'Comprehensive fiduciary wealth plan PDF downloaded.', 'info')}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white shadow-sm transition-colors"
            title="Export Report"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => addToast('Add New Goal Mandate', 'New goal setup wizard initialized.', 'info')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
          >
            <Target className="w-3.5 h-3.5" />
            <span>+ Add Goal</span>
          </button>
        </div>
      </div>

      {/* 2. Goal Summary KPI Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Goals On Track
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
              Healthy
            </span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">4 Mandates</div>
            <span className="text-xs text-blue-400 font-semibold">80% of active priorities</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ width: '80%' }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Goals At Risk
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-bold">
              Attention
            </span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-rose-400">1 Mandate</div>
            <span className="text-xs text-slate-400">Aspen Vacation Property gap</span>
          </div>
          <span className="text-[11px] text-rose-400 font-medium">Requires +$1,200/mo catch-up</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Funding Required
            </span>
            <span className="text-[10px] text-slate-400">18-Yr Horizon</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">$2.80M</div>
            <span className="text-xs text-slate-400">Allocated capital: $2.27M</span>
          </div>
          <span className="text-[11px] text-slate-400">Target Net: $5.63M all goals</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Overall Progress
            </span>
            <span className="text-[10px] font-bold text-blue-400">+6% vs Target</span>
          </div>
          <div className="my-1.5 flex items-baseline justify-between">
            <div className="text-2xl font-extrabold text-white">81%</div>
            <span className="text-xs text-slate-400">Prudent Buffer</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ width: '81%' }} />
          </div>
        </div>
      </div>

      {/* 3. Four Structured Goal Cards */}
      <div>
        <h3 className="text-base font-bold text-white mb-3">
          Active Financial Mandates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {GOALS_DATA.map(goal => (
            <div
              key={goal.id}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 flex flex-col justify-between hover:shadow-lg transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {goal.name}
                  </h4>
                  <p className="text-xs text-slate-400">{goal.subtitle}</p>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    goal.status === 'On Track'
                      ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                      : goal.status === 'Needs Review'
                      ? 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
                      : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  {goal.status}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Accumulated</span>
                  <span className="font-bold text-white">
                    ${(goal.accumulated / 1000).toFixed(0)}K / ${(goal.target / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      goal.fundedPct >= 80 ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : goal.fundedPct >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${goal.fundedPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">{goal.fundedPct}% Funded</span>
                  <span>{goal.yearsRemaining} yrs left</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Inflow:</span>
                  <span className="font-bold text-slate-200">
                    ${(goal.monthlyContribution ?? 0).toLocaleString()} / mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monte Carlo:</span>
                  <span className="font-bold text-blue-400">{goal.monteCarloProb}%</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (goal.id === 'aspen') {
                    setMonthlyContribution(4650);
                    addToast('Simulating Catch-up', 'Monthly inflow boosted to $4,650/mo to close the Aspen gap.', 'info');
                  } else {
                    addToast(`Selected Goal: ${goal.name}`, goal.note, 'info');
                  }
                }}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
              >
                Adjust Plan Parameters →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Main Section: Trajectory Chart (65%) vs Scenario Builder (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Trajectory Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Retirement Wealth Trajectory
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold">
                  Monte Carlo 90% Corridor
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated 10,000 market iterations through Age 90.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">Target Age: {retireAge} yrs</span>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trajectoryChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="corridorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="age" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={val => `$${(val / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Capital']}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="upperBand"
                  stroke="#3b82f6"
                  strokeDasharray="3 3"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#corridorGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke="#60a5fa"
                  strokeWidth={3}
                  fill="none"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-blue-400 rounded-full" /> Simulated Trajectory
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2 bg-blue-500/20 border border-blue-500/40 rounded-xs" /> 90% Corridor
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-slate-400" /> $3.2M Hurdle
              </span>
            </div>
            <span className="font-bold text-blue-400">
              Projected At {retireAge}: ${(projectedTotal / 1000000).toFixed(2)}M
            </span>
          </div>
        </div>

        {/* Right: Live Scenario Builder (4 cols) */}
        <div className="lg:col-span-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Live Scenario Builder
                </h3>
                <p className="text-xs text-slate-400">Instant What-If calculation</p>
              </div>
              <button
                onClick={() => {
                  setRetireAge(62);
                  setMonthlyContribution(3450);
                  setReturnRate(7.2);
                  addToast('Reset to Baseline', 'Baseline assumptions restored.', 'info');
                }}
                className="p-1 text-slate-400 hover:text-white transition-colors"
                title="Reset to Baseline"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Sliders */}
            <div className="space-y-4 mt-4">
              {/* Slider 1: Retirement Age */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <label className="text-slate-300">Retirement Age</label>
                  <span className="font-bold text-blue-400">{retireAge} yrs</span>
                </div>
                <input
                  type="range"
                  min={58}
                  max={70}
                  step={1}
                  value={retireAge}
                  onChange={e => setRetireAge(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>58 (Early)</span>
                  <span>62 (Target)</span>
                  <span>70 (Extended)</span>
                </div>
              </div>

              {/* Slider 2: Monthly Inflow */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <label className="text-slate-300">Monthly Contribution</label>
                  <span className="font-bold text-blue-400">${(monthlyContribution ?? 0).toLocaleString()} / mo</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={10000}
                  step={250}
                  value={monthlyContribution}
                  onChange={e => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>$1,000</span>
                  <span>$5,000</span>
                  <span>$10,000/mo</span>
                </div>
              </div>

              {/* Slider 3: Expected Return */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <label className="text-slate-300">Expected Net Return</label>
                  <span className="font-bold text-blue-400">{returnRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min={4.0}
                  max={10.0}
                  step={0.1}
                  value={returnRate}
                  onChange={e => setReturnRate(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>4.0% (Defensive)</span>
                  <span>7.2% (Blended)</span>
                  <span>10.0% (Equity)</span>
                </div>
              </div>
            </div>

            {/* Dynamic Calculated Results */}
            <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Modeled Terminal Outcome
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    delta >= 0
                      ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  {delta >= 0 ? 'Surplus' : 'Shortfall'}
                </span>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-white">
                  ${(projectedTotal / 1000000).toFixed(2)}M
                </div>
                <span
                  className={`text-xs font-semibold ${
                    delta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {delta >= 0 ? '+' : '-'}${Math.abs(Math.round(delta / 1000))}K vs Hurdle
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Est. Monthly Draw</span>
                  <div className="font-bold text-slate-200 mt-0.5">
                    ${(monthlyDraw ?? 0).toLocaleString()} / mo
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Certainty Score</span>
                  <div className="font-bold text-blue-400 mt-0.5">{probability}% Monte Carlo</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleApplyToPlan}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Apply to Financial Plan</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setComparisonModalOpen(true)}
                className="py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
              >
                Compare Scenarios
              </button>
              <button
                onClick={handleAdvisorShare}
                className="py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Advisor Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Scenario Comparison Modal */}
      {comparisonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="fixed inset-0" onClick={() => setComparisonModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-[0_16px_48px_0_rgba(0,0,0,0.6)] border border-white/15 p-6 flex flex-col gap-5 z-10 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">
                  Compare Planning Scenarios
                </h3>
                <p className="text-xs text-slate-400">
                  Evaluate trade-offs between current baseline vs early retirement at Age 60.
                </p>
              </div>
              <button
                onClick={() => setComparisonModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-white/5 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Metric / Parameter</th>
                    <th className="py-2.5 px-3">Baseline Plan (Current)</th>
                    <th className="py-2.5 px-3 bg-blue-500/10 text-blue-300">
                      Scenario B: Early Age 60
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-200">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-300">Retirement Age</td>
                    <td className="py-2.5 px-3 text-slate-200">Age 62 (2044)</td>
                    <td className="py-2.5 px-3 font-bold text-blue-400">Age 60 (2042)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-300">Monthly Inflow</td>
                    <td className="py-2.5 px-3 text-slate-200">$3,450 / mo</td>
                    <td className="py-2.5 px-3 font-bold text-blue-400">$4,650 / mo (+$1,200)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-300">Terminal Capital</td>
                    <td className="py-2.5 px-3 text-slate-200">$3.64M</td>
                    <td className="py-2.5 px-3 font-bold text-blue-400">$3.81M</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-300">Monthly Drawdown</td>
                    <td className="py-2.5 px-3 text-slate-200">$14,850 / mo</td>
                    <td className="py-2.5 px-3 font-bold text-blue-400">$15,400 / mo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-300">Monte Carlo Certainty</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">92% (Robust)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">89% (Viable)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-300">Aspen Vacation Gap</td>
                    <td className="py-2.5 px-3 text-rose-400 font-bold">-$85,000 Shortfall</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">100% Fully Funded</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-[11px] text-slate-400">Modeled by Marcus Vance, CFP®</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setComparisonModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-colors"
                >
                  Keep Baseline
                </button>
                <button
                  onClick={() => {
                    setRetireAge(60);
                    setMonthlyContribution(4650);
                    setComparisonModalOpen(false);
                    addToast('Adopted Scenario B', 'Retirement set to age 60 with $4,650/mo contribution.', 'success');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all"
                >
                  Adopt Scenario B
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
