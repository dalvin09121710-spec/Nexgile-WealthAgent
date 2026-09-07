import React, { useState, useMemo } from 'react';
import {
  Download,
  Sliders,
  FileText,
  Search,
  ChevronRight,
  Info,
  TrendingUp,
  X,
  Layers,
  ArrowUpRight
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
  HOLDINGS_LIST,
  PORTFOLIO_CHART_DATA,
  ASSET_ALLOCATION
} from '../data/mockData';
import { Holding } from '../types';

export const PortfolioPage: React.FC = () => {
  const { openExplain, setRebalanceModalOpen, addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [assetFilter, setAssetFilter] = useState('ALL');
  const [accountFilter, setAccountFilter] = useState('ALL');
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(HOLDINGS_LIST[0]);
  const [holdingDrawerOpen, setHoldingDrawerOpen] = useState(false);
  const [timeframe, setTimeframe] = useState<'1M' | '6M' | '1Y' | '5Y' | 'MAX'>('1Y');

  // Filtered holdings list
  const filteredHoldings = useMemo(() => {
    return HOLDINGS_LIST.filter(h => {
      const matchSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.account.toLowerCase().includes(searchQuery.toLowerCase());

      const matchAsset =
        assetFilter === 'ALL' ||
        (assetFilter === 'EQUITY' && h.category === 'Equity') ||
        (assetFilter === 'FIXED_INCOME' && h.category === 'Fixed Income') ||
        (assetFilter === 'ETF' && h.category === 'ETF');

      const matchAccount =
        accountFilter === 'ALL' || h.account.toLowerCase().includes(accountFilter.toLowerCase());

      return matchSearch && matchAsset && matchAccount;
    });
  }, [searchQuery, assetFilter, accountFilter]);

  const handleOpenHolding = (h: Holding) => {
    setSelectedHolding(h);
    setHoldingDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header & Action Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Portfolio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
              Active Allocation
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Institutional investment overview, multi-asset allocation, and holding tax lots.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              addToast('CSV Export Ready', 'All 28 holdings and tax-lot ledgers exported.', 'success');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setRebalanceModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Rebalance</span>
          </button>
          <button
            onClick={() => addToast('Report Generation', 'Compiling institutional performance attribution PDF...', 'info')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* 2. Portfolio Summary KPI Cards (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Portfolio */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Portfolio
            </span>
            <button
              onClick={() =>
                openExplain(
                  'Total Portfolio',
                  'Aggregated custodial value across 3 registered fiduciary accounts including liquid equivalents and equities.'
                )
              }
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white tracking-tight">
              $3,642,800
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-400 font-semibold mt-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+$312.8K (9.4%)</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Net inflows &amp; gains · 3 accounts</span>
        </div>

        {/* YTD Return */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              YTD Return
            </span>
            <button
              onClick={() =>
                openExplain(
                  'YTD Return & Alpha',
                  'Time-weighted return calculated net of management fees. Benchmark denotes a 70/30 blended global asset allocation model.'
                )
              }
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-blue-400 tracking-tight">
                +8.70%
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold">
                +0.8% Alpha
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>vs Benchmark +7.90%</span>
              <span className="font-semibold text-slate-200">Sharpe 1.84</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Net of 0.45% advisory fee</span>
        </div>

        {/* Est Annual Income */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Est. Annual Income
            </span>
            <button
              onClick={() =>
                openExplain(
                  'Estimated Annual Income',
                  'Projected 12-month forward dividends, municipal coupons, and treasury yields based on current security holdings.'
                )
              }
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white tracking-tight">
              $82,450
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Blended Yield</span>
              <span className="font-semibold text-blue-400">2.26%</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Next payout: Oct 15, 2026</span>
        </div>

        {/* Risk Profile */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Risk Profile
            </span>
            <button
              onClick={() =>
                openExplain(
                  'Risk Profile & VaR',
                  'Multi-factor risk indexing (1-100). VaR 95% indicates the maximum expected drawdown over a 1-month window within normal confidence.'
                )
              }
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-white tracking-tight">
                62 <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold text-slate-300">
                Moderate-Growth
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>VaR (95% 1-Mo)</span>
              <span className="font-semibold text-rose-400">-$152K (-4.2%)</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Max Drawdown (1Y): -7.8%</span>
        </div>

        {/* Tax Efficiency */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Tax Efficiency
            </span>
            <button
              onClick={() =>
                openExplain(
                  'Tax Efficiency & Harvesting',
                  'Fiduciary index evaluating asset location, municipal yield shielding, and immediate loss-harvesting availability.'
                )
              }
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-blue-400 tracking-tight">
                94 <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-[10px] font-bold text-blue-300">
                Optimized
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Tax Loss Harvesting</span>
              <span className="font-semibold text-blue-400">$18,400</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Available in BND &amp; Emerging</span>
        </div>
      </div>

      {/* 3. Performance Chart & Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Performance Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Portfolio Trajectory vs Benchmark
              </h2>
              <p className="text-xs text-slate-400">
                Institutional 70/30 Blended Benchmark (Net of Advisory Fees)
              </p>
            </div>
            <div className="flex items-center bg-white/5 border border-white/10 p-1 rounded-xl text-xs font-semibold">
              {(['1M', '6M', '1Y', '5Y', 'MAX'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    timeframe === tf
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PORTFOLIO_CHART_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={val => `$${(val / 1000000).toFixed(2)}M`}
                  domain={['dataMin - 100000', 'dataMax + 100000']}
                />
                <Tooltip
                  formatter={(val: number) => [`$${val.toLocaleString()}`, 'Value']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#portfolioGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#64748b"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Nexgile Portfolio (+8.7%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-slate-500" /> Benchmark (+7.9%)
              </span>
            </div>
            <span>52W High: $3.68M · Low: $3.32M</span>
          </div>
        </div>

        {/* Asset Allocation (4 cols) */}
        <div className="lg:col-span-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-white">
                Asset Allocation
              </h2>
              <p className="text-xs text-slate-400">Current drift vs target</p>
            </div>
            <button
              onClick={() =>
                openExplain(
                  'Allocation Drift & IPS Bands',
                  'Variance between current holding weights and Investment Policy Statement (IPS) targets. Drift over 2% warrants tax-aware rebalancing.'
                )
              }
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center my-3 relative">
            <div className="w-40 h-40 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ASSET_ALLOCATION}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={68}
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
                <span className="text-[10px] uppercase font-bold text-slate-400">Total</span>
                <span className="text-sm font-bold text-white">$3.64M</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            {ASSET_ALLOCATION.map(item => (
              <div
                key={item.name}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-slate-200">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Tgt {item.target}%</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      item.drift === 'Balanced'
                        ? 'bg-white/10 text-slate-300'
                        : item.drift.startsWith('+')
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {item.drift}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Risk & Factor Cards (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Beta & Risk */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Risk &amp; Beta
              </span>
              <button
                onClick={() =>
                  openExplain(
                    'Portfolio Beta (0.88)',
                    'Beta of 0.88 implies the portfolio experiences roughly 12% less systematic volatility than the broader equity index during market corrections.'
                  )
                }
                className="text-xs text-blue-400 font-semibold hover:underline"
              >
                Explain
              </button>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-extrabold text-white">0.88</span>
              <span className="text-xs text-blue-400 font-semibold">Low Systematic Beta</span>
            </div>
          </div>
          <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-white/10">
            <div className="flex justify-between">
              <span>Annual Volatility:</span>
              <span className="font-bold text-slate-200">11.4% (S&amp;P: 14.2%)</span>
            </div>
            <div className="flex justify-between">
              <span>Value at Risk (95%):</span>
              <span className="font-bold text-rose-400">$152,000 (1-Mo)</span>
            </div>
          </div>
        </div>

        {/* Sector Concentration */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Sector Weights
              </span>
              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-bold">
                Tech +4% O/W
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-extrabold text-white">28.0%</span>
              <span className="text-xs text-slate-400 font-semibold">Technology</span>
            </div>
          </div>
          <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-white/10">
            <div className="flex justify-between">
              <span>Financials: 17%</span>
              <span>Healthcare: 15%</span>
            </div>
            <div className="flex justify-between">
              <span>Industrials: 22%</span>
              <span>Other: 18%</span>
            </div>
          </div>
        </div>

        {/* Geographic Exposure */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Geographic Exposure
              </span>
              <span className="text-xs text-slate-400 font-semibold">Global</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-extrabold text-white">68%</span>
              <span className="text-xs text-slate-400 font-semibold">North America</span>
            </div>
          </div>
          <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-white/10">
            <div className="flex justify-between">
              <span>Developed Europe: 16%</span>
              <span>Asia-Pac: 11%</span>
            </div>
            <div className="flex justify-between">
              <span>Emerging Markets: 5%</span>
              <span className="text-blue-400 font-semibold">Diversified</span>
            </div>
          </div>
        </div>

        {/* ESG Sustainability */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                ESG Sustainability
              </span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold">
                Leader Tier
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-extrabold text-blue-400">AA</span>
              <span className="text-xs text-slate-400 font-semibold">(84 / 100)</span>
            </div>
          </div>
          <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-white/10">
            <div className="flex justify-between">
              <span>Carbon Intensity:</span>
              <span className="font-bold text-blue-400">-42% vs BM</span>
            </div>
            <div className="flex justify-between">
              <span>SFDR Article 8:</span>
              <span className="font-bold text-slate-200">100% Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Holdings Table Section */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">
              Portfolio Holdings Ledger
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-slate-300">
              {filteredHoldings.length} positions
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tickers, names, accounts..."
                className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            {/* Asset Class Filter */}
            <select
              value={assetFilter}
              onChange={e => setAssetFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-900/80 border border-white/10 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500/50"
            >
              <option value="ALL">All Asset Types</option>
              <option value="EQUITY">Equities</option>
              <option value="FIXED_INCOME">Fixed Income</option>
              <option value="ETF">ETFs &amp; Index Funds</option>
            </select>

            {/* Account Filter */}
            <select
              value={accountFilter}
              onChange={e => setAccountFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-900/80 border border-white/10 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500/50"
            >
              <option value="ALL">All Accounts</option>
              <option value="Taxable Brokerage">Taxable Brokerage</option>
              <option value="Roth IRA">Roth IRA</option>
              <option value="Traditional IRA">Traditional IRA</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-3 rounded-l-lg">Holding</th>
                <th className="py-3 px-3">Account</th>
                <th className="py-3 px-3 text-right">Shares</th>
                <th className="py-3 px-3 text-right">Market Value</th>
                <th className="py-3 px-3 text-right">Cost Basis</th>
                <th className="py-3 px-3 text-right">Gain / Loss</th>
                <th className="py-3 px-3 text-right">Weight</th>
                <th className="py-3 px-3 text-right">YTD</th>
                <th className="py-3 px-3 text-center rounded-r-lg">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-200">
              {filteredHoldings.map(h => {
                const isPositive = h.gainLoss >= 0;
                return (
                  <tr
                    key={h.ticker}
                    onClick={() => handleOpenHolding(h)}
                    className="hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center font-bold text-xs text-white shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
                          {h.ticker}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                            {h.name}
                          </span>
                          <span className="text-[11px] text-slate-400 truncate">{h.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{h.account}</td>
                    <td className="py-3 px-3 text-right font-medium">{h.shares.toLocaleString()}</td>
                    <td className="py-3 px-3 text-right font-bold text-white">
                      ${h.marketValue.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-400 font-medium">
                      ${h.costBasis.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPositive ? '+' : ''}${h.gainLoss.toLocaleString()}
                      </span>
                      <span className={`block text-[10px] ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPositive ? '+' : ''}{h.gainLossPct}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-white">{h.allocationPct}%</td>
                    <td className="py-3 px-3 text-right font-semibold text-blue-400">
                      +{h.ytdReturnPct}%
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenHolding(h);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredHoldings.length} of 28 holdings in active mandate</span>
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-medium">HIFO Tax Lot Accounting Active</span>
          </div>
        </div>
      </div>

      {/* 6. Holding Detail Slide-over Drawer */}
      {holdingDrawerOpen && selectedHolding && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
            onClick={() => setHoldingDrawerOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-slate-900/90 backdrop-blur-xl border-l border-white/10 text-white shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/25">
                  {selectedHolding.ticker}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {selectedHolding.name}
                  </h3>
                  <span className="text-xs text-slate-400">{selectedHolding.account}</span>
                </div>
              </div>
              <button
                onClick={() => setHoldingDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Strip */}
            <div className="grid grid-cols-4 gap-2 p-4 bg-white/5 text-center text-xs border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Market Value</span>
                <div className="font-bold text-white mt-0.5">
                  ${selectedHolding.marketValue.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Weight</span>
                <div className="font-bold text-white mt-0.5">
                  {selectedHolding.allocationPct}%
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Cost Basis</span>
                <div className="font-bold text-white mt-0.5">
                  ${selectedHolding.costBasis.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Gain / Loss</span>
                <div
                  className={`font-bold mt-0.5 ${
                    selectedHolding.gainLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {selectedHolding.gainLoss >= 0 ? '+' : ''}${selectedHolding.gainLoss.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* AI Concentration Insight */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">
                    WealthAgent Concentration Insight
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Fiduciary Advisory</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedHolding.name} represents <strong className="font-bold text-white">{selectedHolding.allocationPct}%</strong> of your total portfolio. Combined with top sector peers, your technological exposure is within the target corridor with low systematic volatility (Beta {selectedHolding.beta || 1.0}).
                </p>
              </div>

              {/* Tax Lot Breakdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Specific Tax Lot Ledger (HIFO Accounting)
                  </h4>
                  <span className="text-[10px] text-blue-400 font-semibold">MinTax Execution</span>
                </div>
                <div className="rounded-xl border border-white/10 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-white/10 text-[10px] font-bold uppercase text-slate-400">
                      <tr>
                        <th className="py-2 px-3">Acquired</th>
                        <th className="py-2 px-3 text-right">Shares</th>
                        <th className="py-2 px-3 text-right">Cost/Sh</th>
                        <th className="py-2 px-3 text-right">Unrealized</th>
                        <th className="py-2 px-3 text-center">Term</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      <tr>
                        <td className="py-2 px-3">Nov 14, 2021</td>
                        <td className="py-2 px-3 text-right font-bold text-white">500</td>
                        <td className="py-2 px-3 text-right text-slate-400">$129.20</td>
                        <td className="py-2 px-3 text-right text-emerald-400 font-bold">+$50,400</td>
                        <td className="py-2 px-3 text-center">
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">Long</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Aug 22, 2022</td>
                        <td className="py-2 px-3 text-right font-bold text-white">450</td>
                        <td className="py-2 px-3 text-right text-slate-400">$151.30</td>
                        <td className="py-2 px-3 text-right text-emerald-400 font-bold">+$35,415</td>
                        <td className="py-2 px-3 text-center">
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">Long</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">May 09, 2023</td>
                        <td className="py-2 px-3 text-right font-bold text-white">500</td>
                        <td className="py-2 px-3 text-right text-slate-400">$169.10</td>
                        <td className="py-2 px-3 text-right text-emerald-400 font-bold">+$30,450</td>
                        <td className="py-2 px-3 text-center">
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">Long</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fundamentals Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                  <span className="text-slate-400">P/E Ratio (TTM)</span>
                  <span className="font-bold text-white">
                    {selectedHolding.peRatio ? `${selectedHolding.peRatio}x` : 'N/A'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                  <span className="text-slate-400">Dividend Yield</span>
                  <span className="font-bold text-white">
                    {selectedHolding.dividendYield}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                  <span className="text-slate-400">Beta (5Y)</span>
                  <span className="font-bold text-white">
                    {selectedHolding.beta || 1.0}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                  <span className="text-slate-400">Shares Held</span>
                  <span className="font-bold text-white">
                    {selectedHolding.shares.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-white/10 bg-slate-950/40 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setHoldingDrawerOpen(false);
                  addToast('Tax Report Prepared', `Compiled lot tax impact report for ${selectedHolding.name}.`, 'info');
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
              >
                View Tax Impact
              </button>
              <button
                onClick={() => {
                  setHoldingDrawerOpen(false);
                  setRebalanceModalOpen(true);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all"
              >
                Simulate Rebalance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
