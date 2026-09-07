import React from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
  Download,
  AlertTriangle,
  Scale,
  DollarSign,
  PieChart as PieChartIcon,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../context/AppContext';
import {
  OVERVIEW_METRICS,
  WEALTH_HEALTH_BREAKDOWN,
  ATTENTION_ITEMS,
  PORTFOLIO_CHART_DATA,
  ASSET_ALLOCATION,
  GOALS_LIST
} from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export const OverviewPage: React.FC = () => {
  const {
    timeRange,
    setTimeRange,
    openExplain,
    setRebalanceModalOpen,
    setHarvestDrawerItem,
    addToast
  } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 1. Header with Persona Greeting, Range Pills, and Report CTA */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Good morning, Alex
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-blue-300 text-xs font-medium backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              Private Wealth Tier
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Here is your complete wealth picture and real-time fiduciary diagnostic.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time Machine Period Selector */}
          <div className="flex items-center bg-white/5 backdrop-blur-md p-1 rounded-lg border border-white/10 text-xs font-medium">
            {(['1M', '6M', '1Y', '5Y', 'Custom'] as const).map(range => (
              <button
                key={range}
                onClick={() => {
                  setTimeRange(range);
                  addToast(`Time Horizon Updated: ${range}`, 'Charts and benchmarking recalculated.', 'info');
                }}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeRange === range
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>As of {OVERVIEW_METRICS.asOfDate}</span>
          </div>

          <button
            onClick={() => {
              navigate('/reports');
              addToast('Opening Reports Catalog', 'Select or compile your executive financial report.', 'info');
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/20 border border-blue-400/30 active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* 2. Executive Metric KPIs (4 Cards in Frosted Glass) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Total Net Worth */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between hover:bg-white/[0.08] hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Total Net Worth
            </p>
            <button
              onClick={() =>
                openExplain(
                  'Total Net Worth',
                  'Aggregated liquid portfolio assets, treasury reserves, and real estate valuation ($1.05M) reconciled across multi-custodian records.'
                )
              }
              className="text-slate-400 hover:text-blue-400 p-1"
              title="Explain This"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
            </button>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {OVERVIEW_METRICS.netWorthFormatted}
            </div>
            <div className="mt-2 flex items-center gap-1 text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{OVERVIEW_METRICS.netWorthYtdDelta} YTD</span>
              <span className="text-slate-500 ml-1">vs $4.43M Jan 1</span>
            </div>
          </div>
          <div className="pt-2.5 border-t border-white/5 text-[11px] text-slate-400">
            Liquid assets 78% · Real Estate $1.05M
          </div>
        </div>

        {/* Card 2: Invested Assets */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between hover:bg-white/[0.08] hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Invested Assets
            </p>
            <button
              onClick={() =>
                openExplain(
                  'Invested Assets',
                  'Mark-to-market brokerage, IRA, and dynasty trust accounts actively invested in equities, fixed income, and low-cost index ETFs.'
                )
              }
              className="text-slate-400 hover:text-blue-400 p-1"
              title="Explain This"
            >
              <PieChartIcon className="w-4 h-4 text-blue-400" />
            </button>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {OVERVIEW_METRICS.investedAssetsFormatted}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              75.4% Allocation · Net Inflows &amp; Gains
            </p>
          </div>
          <div className="pt-2.5 border-t border-white/5 text-[11px] text-slate-400">
            3 active brokerage &amp; advisory accounts
          </div>
        </div>

        {/* Card 3: Cash Reserve */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between hover:bg-white/[0.08] hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Cash Reserve
            </p>
            <button
              onClick={() =>
                openExplain(
                  'Cash & Liquidity Yield',
                  'Blended annualized cash rate across 3-month US Treasuries ($260K) and institutional high-yield cash reserves ($160K).'
                )
              }
              className="text-slate-400 hover:text-blue-400 p-1"
              title="Explain This"
            >
              <DollarSign className="w-4 h-4 text-blue-400" />
            </button>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {OVERVIEW_METRICS.cashBankingFormatted}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Yielding {OVERVIEW_METRICS.cashYield} APY
            </p>
          </div>
          <div className="pt-2.5 border-t border-white/5 text-[11px] text-slate-400">
            Treasuries $260K · High-Yield Cash $160K
          </div>
        </div>

        {/* Card 4: Wealth Health Score (Frosted Glass Gradient Showcase) */}
        <div
          onClick={() =>
            openExplain(
              'Wealth Health Score',
              'Composite percentile rating evaluated against high-net-worth benchmarks across liquidity, tax location, asset diversification, and goals fulfillment.'
            )
          }
          className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex items-center gap-4 hover:border-white/30 transition-all cursor-pointer group"
        >
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="4.5" fill="transparent" className="text-white/10" />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="4.5"
                fill="transparent"
                strokeDasharray="163.3"
                strokeDashoffset="21.2"
                strokeLinecap="round"
                className="text-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"
              />
            </svg>
            <span className="absolute text-lg font-bold text-white group-hover:scale-105 transition-transform">
              {OVERVIEW_METRICS.wealthHealthScore}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-blue-300 tracking-tight">
              Wealth Health Score
            </p>
            <p className="text-[10px] text-blue-200/70 mt-0.5 leading-tight">
              92nd Percentile across comparable profiles
            </p>
            <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/20">
              <span>Optimal Alignment</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Performance Chart & Asset Allocation (7 : 5 Split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Portfolio Performance AreaChart */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Portfolio Performance Trajectory
              </h2>
              <p className="text-xs text-slate-400">Cumulative growth vs. 70/30 Blended Benchmark</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Nexgile Portfolio
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium ml-2">
                <span className="w-2.5 h-0.5 bg-slate-400" /> Blended Benchmark
              </span>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PORTFOLIO_CHART_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={val => `$${(val / 1000000).toFixed(2)}M`}
                  domain={['dataMin - 100000', 'dataMax + 100000']}
                />
                <Tooltip
                  formatter={(val: number) => [`$${val.toLocaleString()}`, 'Value']}
                  labelFormatter={label => `Period: ${label}`}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    backdropFilter: 'blur(12px)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#growthGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#64748B"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div>
              Period High: <strong className="text-white">$4.85M</strong>
            </div>
            <div>
              Period Low: <strong className="text-white">$4.41M</strong>
            </div>
            <div>
              Dividends Reinvested: <strong className="text-blue-400">$42.6K</strong>
            </div>
          </div>
        </div>

        {/* Right: Asset Allocation Donut */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-white">
                Asset Allocation
              </h2>
              <p className="text-xs text-slate-400">Target vs. Current drift</p>
            </div>
            <button
              onClick={() => setRebalanceModalOpen(true)}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold hover:underline flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Rebalance Matrix</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 my-auto py-2">
            {/* Donut Chart */}
            <div className="w-44 h-44 shrink-0 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ASSET_ALLOCATION}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={74}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ASSET_ALLOCATION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Total
                </span>
                <span className="text-base font-extrabold text-white">
                  $4.82M
                </span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="flex-1 w-full space-y-2 text-xs">
              {ASSET_ALLOCATION.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-200 font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white">
                      ${(item.value / 1000).toFixed(0)}K ({item.percentage}%)
                    </span>
                    <span
                      className={`block text-[10px] font-semibold ${
                        item.drift === 'Balanced'
                          ? 'text-slate-400'
                          : item.drift.startsWith('+')
                          ? 'text-blue-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {item.drift}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Target Model: Growth with Capital Preservation</span>
            <button
              onClick={() => setRebalanceModalOpen(true)}
              className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
            >
              Simulate Trims →
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mid Row: Wealth Health Score & Attention Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Wealth Health Score Widget (6 cols) */}
        <div className="lg:col-span-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Wealth Health Score
              </h2>
              <p className="text-xs text-slate-400">Overall financial resilience & alignment</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
              {OVERVIEW_METRICS.wealthHealthTier}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-auto">
            {/* Radial Dial Indicator */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center relative">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="transparent" r="40" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="#3B82F6"
                    strokeDasharray="251.2"
                    strokeDashoffset="32.6"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-white tabular-nums">
                    {OVERVIEW_METRICS.wealthHealthScore}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    out of 100
                  </span>
                </div>
              </div>
            </div>

            {/* Contributing Factor Micro-Bars */}
            <div className="sm:col-span-8 space-y-2.5">
              {WEALTH_HEALTH_BREAKDOWN.map(item => (
                <div key={item.factor}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-200">{item.factor}</span>
                    <span className="text-slate-400 text-[11px]">{item.note}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.score >= 80 ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-amber-400'}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-blue-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Calculated using daily Monte Carlo stress testing
            </span>
            <button
              onClick={() =>
                openExplain(
                  'Wealth Health Score Methodology',
                  'Evaluates 5 pillars: Diversification (Herfindahl-Hirschman index), Goal certainty (Monte Carlo), Tax location efficiency, Liquidity ratio (12-mo reserves), and Risk alignment with Investment Policy Statement.'
                )
              }
              className="text-slate-300 font-semibold hover:text-white hover:underline"
            >
              View Methodology
            </button>
          </div>
        </div>

        {/* Attention Center (6 cols) */}
        <div className="lg:col-span-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                What Needs Your Attention
              </h2>
              <p className="text-xs text-slate-400">Fiduciary tasks requiring action or approval</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              4 Urgent Actions
            </span>
          </div>

          <div className="space-y-2.5 my-auto">
            {ATTENTION_ITEMS.map(item => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 border border-blue-500/30">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">{item.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (item.category === 'tax') {
                      navigate('/tax-center');
                    } else if (item.category === 'documents') {
                      navigate('/documents');
                    } else if (item.category === 'estate') {
                      navigate('/estate-and-giving');
                    } else {
                      setRebalanceModalOpen(true);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white transition-all shrink-0"
                >
                  {item.actionText}
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Priority queue updated by wealth engine</span>
            <span className="text-blue-400 font-medium">All Feeds Synced</span>
          </div>
        </div>
      </div>

      {/* 5. AI WealthAgent Insights & Tax Opportunities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI WealthAgent Insight Card (5 cols) in Frosted Glass Dark Indigo */}
        <div className="lg:col-span-5 bg-indigo-900/40 border border-indigo-400/20 rounded-2xl p-6 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <div className="p-1.5 bg-indigo-500 rounded text-white shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                AI WealthAgent Insights
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Fiduciary AI
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-3">
              Tactical Allocation Advisory
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10">
            <p className="text-xs text-indigo-100/80 italic leading-relaxed">
              &ldquo;We identified a $4,200 Tax-Loss Harvesting opportunity in your individual brokerage account. Harvesting fixed income losses in BND and applying proxy rebalances will capture tax alpha.&rdquo;
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Confidence Index: 96%</span>
              <span className="text-blue-400 font-semibold">No wash-sale conflict</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                setHarvestDrawerItem({
                  id: 'tax-1',
                  ticker: 'BND',
                  name: 'Vanguard Total Bond Market ETF',
                  unrealizedLoss: -16400,
                  potentialBenefit: 6068,
                  proxyTicker: 'AGG',
                  proxyName: 'iShares Core U.S. Aggregate Bond ETF (0.99 Beta)',
                  washSaleStatus: 'Cleared',
                  status: 'Pre-Approved'
                });
              }}
              className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-500/25 transition-all text-center"
            >
              Execute Strategy
            </button>
            <button
              onClick={() =>
                openExplain(
                  'Tactical Allocation Advisory',
                  'Technology exposure has expanded naturally from Apple (+14.2% YTD) and NVIDIA (+32.4% YTD) outperformance. Trimming top tax lots reduces drawdowns while keeping long-term capital compounding intact.'
                )
              }
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold transition-colors"
            >
              Explain This
            </button>
          </div>
        </div>

        {/* Right: AI Tax Opportunity Radar (7 cols) */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-white">
                Tax Opportunity Radar
              </h3>
              <p className="text-xs text-slate-400">
                Proactive tax-loss harvesting and Roth bracket optimization
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-300 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/20">
              $18,420 Cumulative Alpha
            </span>
          </div>

          <div className="space-y-3 my-auto">
            {/* Opportunity 1: TLH */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.08] transition-all">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    Tax-Loss Harvesting (BND &amp; Emerging)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-[10px] font-bold">
                    +$18,420 Benefit
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Harvest via Emerging Markets and Aggregate Bond proxy swap to preserve index beta.
                </p>
              </div>
              <button
                onClick={() => {
                  setHarvestDrawerItem({
                    id: 'tax-1',
                    ticker: 'BND',
                    name: 'Vanguard Total Bond Market ETF',
                    unrealizedLoss: -16400,
                    potentialBenefit: 6068,
                    proxyTicker: 'AGG',
                    proxyName: 'iShares Core U.S. Aggregate Bond ETF (0.99 Beta)',
                    washSaleStatus: 'Cleared',
                    status: 'Pre-Approved'
                  });
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shrink-0 shadow-md shadow-blue-500/20"
              >
                Apply Swap
              </button>
            </div>

            {/* Opportunity 2: Roth Conversion */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.08] transition-all">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    Roth Conversion
                  </span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/20 text-[10px] font-bold">
                    Action Required
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Arbitrage 24% bracket headroom prior to scheduled individual rate sunset in 2027.
                </p>
              </div>
              <button
                onClick={() => navigate('/tax-center')}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold transition-colors shrink-0"
              >
                Model Impact
              </button>
            </div>

            {/* Opportunity 3: Wash Sale Monitoring */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.08] transition-all">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    Wash-sale Risk &amp; Lock
                  </span>
                  <span className="px-2 py-0.5 bg-slate-500/20 text-slate-300 rounded border border-white/10 text-[10px] font-bold">
                    Monitoring
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Semiconductor ETF repurchase locked until Sept 18 to preserve booked tax savings.
                </p>
              </div>
              <span className="text-[11px] font-bold text-slate-400 shrink-0">Locked (11d)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Connected with Morgan Stanley &amp; Charles Schwab custodians</span>
            <button
              onClick={() => navigate('/tax-center')}
              className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
            >
              Open Full Tax Center →
            </button>
          </div>
        </div>
      </div>

      {/* 6. Financial Goals Progress & Recent Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Financial Goals (6 cols) */}
        <div className="lg:col-span-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Financial Goals &amp; Planning
              </h2>
              <p className="text-xs text-slate-400">Probability of success and capital milestones</p>
            </div>
            <button
              onClick={() => navigate('/goals-and-planning')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Manage Goals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5 my-auto">
            {GOALS_LIST.map(goal => (
              <div
                key={goal.id}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/[0.08] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    {goal.name}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {goal.fundedPct}%{' '}
                    <span className="font-normal text-slate-400">
                      (${(goal.currentAmount / 1000000).toFixed(2)}M / ${(goal.targetAmount / 1000000).toFixed(2)}M)
                    </span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      goal.fundedPct >= 80
                        ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                        : goal.fundedPct >= 70
                        ? 'bg-indigo-500'
                        : 'bg-amber-400'
                    }`}
                    style={{ width: `${goal.fundedPct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Target Year: {goal.targetYear}</span>
                  <span className="text-blue-400 font-semibold">
                    Monte Carlo: {goal.successProbability}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 text-right">
            <button
              onClick={() => navigate('/goals-and-planning')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold hover:underline"
            >
              Open Interactive Scenario Builder →
            </button>
          </div>
        </div>

        {/* Right: Recent Audited Activity Timeline (6 cols) */}
        <div className="lg:col-span-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Recent Activity Ledger
              </h2>
              <p className="text-xs text-slate-400">Immutable fiduciary execution timeline</p>
            </div>
            <button
              onClick={() => navigate('/documents')}
              className="text-xs text-slate-400 hover:text-white"
            >
              View Audit Log
            </button>
          </div>

          <div className="relative pl-6 space-y-4 my-auto">
            {/* Continuous vertical connecting line */}
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-white/10" />

            {/* Entry 1 */}
            <div className="relative flex items-start justify-between gap-3">
              <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-500 ring-2 ring-[#0F172A]" />
              <div>
                <h4 className="text-xs font-bold text-white">
                  Advisor approved Roth conversion corridor
                </h4>
                <p className="text-[11px] text-slate-400">
                  Marcus Vance, CFP® · Today, 08:30 AM EST
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-[10px] font-bold">
                Approved
              </span>
            </div>

            {/* Entry 2 */}
            <div className="relative flex items-start justify-between gap-3">
              <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-indigo-500 ring-2 ring-[#0F172A]" />
              <div>
                <h4 className="text-xs font-bold text-white">
                  Q2 Portfolio Attribution Report Compiled
                </h4>
                <p className="text-[11px] text-slate-400">
                  Automated Executive Summary · Yesterday, 05:15 PM
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10 text-[10px] font-bold">
                PDF Ready
              </span>
            </div>

            {/* Entry 3 */}
            <div className="relative flex items-start justify-between gap-3">
              <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-white/60 ring-2 ring-[#0F172A]" />
              <div>
                <h4 className="text-xs font-bold text-white">
                  Morgan Family Trust Restatement v3.2 Uploaded
                </h4>
                <p className="text-[11px] text-slate-400">
                  Kirkland &amp; Ellis LLP · Sep 4, 2026
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10 text-[10px] font-bold">
                Signed
              </span>
            </div>

            {/* Entry 4 */}
            <div className="relative flex items-start justify-between gap-3">
              <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-500 ring-2 ring-[#0F172A]" />
              <div>
                <h4 className="text-xs font-bold text-white">
                  Portfolio rebalanced &amp; yield locked
                </h4>
                <p className="text-[11px] text-slate-400">
                  Executed 4 block orders to lock fixed income yields · Sep 2, 2026
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold">
                Executed
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>SEC Fiduciary Record Retention compliance active</span>
            <Lock className="w-3.5 h-3.5 text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
