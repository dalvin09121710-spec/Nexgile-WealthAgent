import {
  Holding,
  GoalItem,
  TaxOpportunity,
  EstateDirective,
  TrustEntity,
  Beneficiary,
  InstitutionalFund,
  ClientProfile,
  DocumentItem,
  ChatMessage,
  ReportItem,
  IntegrationFeed,
  ExceptionItem
} from '../types';

export const OVERVIEW_METRICS = {
  netWorth: 4821490,
  netWorthFormatted: '$4.82M',
  netWorthYtdDelta: '+$386.4K (+8.7%)',
  investedAssets: 3642800,
  investedAssetsFormatted: '$3.64M',
  investedAssetsYtdDelta: '+$312.8K',
  cashBanking: 420000,
  cashBankingFormatted: '$420K',
  cashYield: '4.85% APY',
  ytdReturnPct: 8.7,
  ytdReturnAlpha: '+1.4% vs S&P 500',
  sharpeRatio: 1.84,
  wealthHealthScore: 87,
  wealthHealthTier: 'Tier: Excellent',
  lastUpdated: 'Updated 2m ago',
  asOfDate: 'September 7, 2026'
};

export const WEALTH_HEALTH_BREAKDOWN = [
  { factor: 'Diversification', score: 84, note: '84/100 · Slight tech overweight' },
  { factor: 'Goal Progress', score: 92, note: '92/100 · On track for 2038 retirement' },
  { factor: 'Tax Efficiency', score: 78, note: '78/100 · 3 actionable tax alpha ops' },
  { factor: 'Liquidity', score: 95, note: '95/100 · Optimal 12-mo reserve' },
  { factor: 'Risk Alignment', score: 88, note: '88/100 · Mod-Aggressive mandate' }
];

export const ATTENTION_ITEMS = [
  {
    id: 'att-1',
    title: '3 Tax Opportunities Available',
    description: 'Estimated tax alpha: $18,420 available before Q3 close',
    actionText: 'Review Opportunities',
    badge: 'Tax Alpha',
    category: 'tax',
    urgent: true
  },
  {
    id: 'att-2',
    title: '2 Documents Awaiting Signature',
    description: '2026 Restated Power of Attorney & 401(k) Committee Resolution',
    actionText: 'Sign & Review',
    badge: 'Legal',
    category: 'documents',
    urgent: true
  },
  {
    id: 'att-3',
    title: '1 Annual Beneficiary Review',
    description: 'Annual primary beneficiary audit for Morgan Dynasty Trust',
    actionText: 'Confirm',
    badge: 'Estate',
    category: 'estate',
    urgent: false
  },
  {
    id: 'att-4',
    title: '1 Portfolio Rebalance Required',
    description: 'Tech exposure +3.4% above target allocation corridor',
    actionText: 'Simulate',
    badge: 'Portfolio',
    category: 'portfolio',
    urgent: false
  }
];

export const PORTFOLIO_CHART_DATA = [
  { month: 'Jan 26', portfolio: 4430000, benchmark: 4400000 },
  { month: 'Feb 26', portfolio: 4485000, benchmark: 4440000 },
  { month: 'Mar 26', portfolio: 4520000, benchmark: 4490000 },
  { month: 'Apr 26', portfolio: 4490000, benchmark: 4460000 },
  { month: 'May 26', portfolio: 4590000, benchmark: 4530000 },
  { month: 'Jun 26', portfolio: 4670000, benchmark: 4580000 },
  { month: 'Jul 26', portfolio: 4720000, benchmark: 4620000 },
  { month: 'Aug 26', portfolio: 4780000, benchmark: 4660000 },
  { month: 'Sep 26', portfolio: 4821490, benchmark: 4695000 }
];

export const ASSET_ALLOCATION = [
  { name: 'US Equities', value: 1832000, percentage: 38, target: 36, drift: '+2.0%', color: '#131b2e' },
  { name: 'Fixed Income', value: 1157000, percentage: 24, target: 25, drift: '-1.0%', color: '#006a61' },
  { name: 'Int\'l Equities', value: 867000, percentage: 18, target: 18, drift: 'Balanced', color: '#7073ff' },
  { name: 'Alternatives', value: 578000, percentage: 12, target: 12, drift: 'Balanced', color: '#f59e0b' },
  { name: 'Cash Equiv.', value: 385000, percentage: 8, target: 9, drift: '-1.0%', color: '#0284c7' }
];

export const HOLDINGS_LIST: Holding[] = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    category: 'Equity',
    account: 'Taxable Brokerage',
    shares: 1450,
    marketValue: 333500,
    costBasis: 210250,
    gainLoss: 123250,
    gainLossPct: 58.6,
    allocationPct: 9.16,
    ytdReturnPct: 14.2,
    peRatio: 32.4,
    dividendYield: 0.52,
    beta: 1.12
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    category: 'Equity',
    account: 'Taxable Brokerage',
    shares: 720,
    marketValue: 316800,
    costBasis: 228000,
    gainLoss: 88800,
    gainLossPct: 38.9,
    allocationPct: 8.70,
    ytdReturnPct: 12.8,
    peRatio: 34.1,
    dividendYield: 0.72,
    beta: 1.15
  },
  {
    ticker: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    category: 'ETF',
    account: 'Roth IRA',
    shares: 2100,
    marketValue: 588000,
    costBasis: 490000,
    gainLoss: 98000,
    gainLossPct: 20.0,
    allocationPct: 16.15,
    ytdReturnPct: 9.4,
    peRatio: 24.6,
    dividendYield: 1.48,
    beta: 1.00
  },
  {
    ticker: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    category: 'ETF',
    account: 'Traditional IRA',
    shares: 1200,
    marketValue: 636000,
    costBasis: 550000,
    gainLoss: 86000,
    gainLossPct: 15.6,
    allocationPct: 17.47,
    ytdReturnPct: 9.8,
    peRatio: 25.2,
    dividendYield: 1.42,
    beta: 1.00
  },
  {
    ticker: 'BND',
    name: 'Vanguard Total Bond Market ETF',
    category: 'Fixed Income',
    account: 'Taxable Brokerage',
    shares: 4800,
    marketValue: 345600,
    costBasis: 362000,
    gainLoss: -16400,
    gainLossPct: -4.5,
    allocationPct: 9.49,
    ytdReturnPct: 2.1,
    harvestEligible: true,
    peRatio: 0,
    dividendYield: 4.15,
    beta: 0.28
  },
  {
    ticker: 'VXUS',
    name: 'Vanguard Total International Stock ETF',
    category: 'ETF',
    account: 'Taxable Brokerage',
    shares: 3800,
    marketValue: 235600,
    costBasis: 218000,
    gainLoss: 17600,
    gainLossPct: 8.1,
    allocationPct: 6.47,
    ytdReturnPct: 6.2,
    peRatio: 14.8,
    dividendYield: 3.12,
    beta: 0.84
  },
  {
    ticker: 'SCHD',
    name: 'Schwab U.S. Dividend Equity ETF',
    category: 'ETF',
    account: 'Taxable Brokerage',
    shares: 2500,
    marketValue: 205000,
    costBasis: 185000,
    gainLoss: 20000,
    gainLossPct: 10.8,
    allocationPct: 5.63,
    ytdReturnPct: 7.4,
    peRatio: 16.2,
    dividendYield: 3.45,
    beta: 0.79
  },
  {
    ticker: 'BRK.B',
    name: 'Berkshire Hathaway Inc. Class B',
    category: 'Equity',
    account: 'Taxable Brokerage',
    shares: 650,
    marketValue: 292500,
    costBasis: 230000,
    gainLoss: 62500,
    gainLossPct: 27.2,
    allocationPct: 8.04,
    ytdReturnPct: 11.1,
    peRatio: 18.5,
    dividendYield: 0.00,
    beta: 0.88
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'Equity',
    account: 'Taxable Brokerage',
    shares: 480,
    marketValue: 395000,
    costBasis: 142000,
    gainLoss: 253000,
    gainLossPct: 178.1,
    allocationPct: 10.84,
    ytdReturnPct: 32.4,
    peRatio: 48.2,
    dividendYield: 0.08,
    beta: 1.65
  },
  {
    ticker: 'US-TBILL',
    name: 'US Treasury Bills 3-Month',
    category: 'Cash',
    account: 'Taxable Brokerage',
    shares: 310,
    marketValue: 310800,
    costBasis: 300000,
    gainLoss: 10800,
    gainLossPct: 3.6,
    allocationPct: 8.53,
    ytdReturnPct: 4.85,
    peRatio: 0,
    dividendYield: 5.10,
    beta: 0.02
  }
];

export const GOALS_LIST: GoalItem[] = [
  {
    id: 'goal-1',
    name: 'Retirement Target',
    category: 'Retirement',
    targetYear: 2038,
    currentAmount: 3280000,
    targetAmount: 4000000,
    fundedPct: 82,
    monthlyContribution: 3450,
    successProbability: 94,
    status: 'On Track',
    note: 'Monte Carlo 10,000 simulations indicate 94% safety margin with $14,850/mo draw.'
  },
  {
    id: 'goal-2',
    name: 'Legacy & Dynasty Trust',
    category: 'Legacy',
    targetYear: 2040,
    currentAmount: 1850000,
    targetAmount: 2500000,
    fundedPct: 74,
    monthlyContribution: 2100,
    successProbability: 84,
    status: 'Needs Review',
    note: 'Municipal bond drag detected. Shifting to tax-managed index restores 91% certainty.'
  },
  {
    id: 'goal-3',
    name: 'Higher Education 529 (Lucas & Sophia)',
    category: 'Education',
    targetYear: 2028,
    currentAmount: 455000,
    targetAmount: 500000,
    fundedPct: 91,
    monthlyContribution: 1200,
    successProbability: 96,
    status: 'On Track',
    note: 'Fully on schedule for 2028 and 2032 matriculation dates.'
  },
  {
    id: 'goal-4',
    name: 'Aspen Vacation Residence',
    category: 'Home',
    targetYear: 2029,
    currentAmount: 580000,
    targetAmount: 1000000,
    fundedPct: 58,
    monthlyContribution: 1800,
    successProbability: 64,
    status: 'At Risk',
    note: 'Projected shortfall of $85,000. Recommend boosting monthly inflow by +$1,200/mo.'
  }
];

export const TAX_OPPORTUNITIES: TaxOpportunity[] = [
  {
    id: 'tax-1',
    ticker: 'BND',
    name: 'Vanguard Total Bond Market ETF',
    unrealizedLoss: -16400,
    potentialBenefit: 6068,
    proxyTicker: 'AGG',
    proxyName: 'iShares Core U.S. Aggregate Bond ETF (0.99 Beta)',
    washSaleStatus: 'Cleared',
    status: 'Pre-Approved'
  },
  {
    id: 'tax-2',
    ticker: 'VXUS',
    name: 'Vanguard Total International Stock ETF',
    unrealizedLoss: -12800,
    potentialBenefit: 4736,
    proxyTicker: 'IXUS',
    proxyName: 'iShares Core MSCI Total International Stock ETF (0.98 Beta)',
    washSaleStatus: 'Cleared',
    status: 'Pre-Approved'
  },
  {
    id: 'tax-3',
    ticker: 'SOXX',
    name: 'iShares Semiconductor ETF',
    unrealizedLoss: -14200,
    potentialBenefit: 5254,
    proxyTicker: 'SMH',
    proxyName: 'VanEck Semiconductor ETF',
    washSaleStatus: 'Restricted',
    lockoutDays: 11,
    status: 'Pending Lockout'
  },
  {
    id: 'tax-4',
    ticker: 'VYM',
    name: 'Vanguard High Dividend Yield ETF',
    unrealizedLoss: -9000,
    potentialBenefit: 3330,
    proxyTicker: 'SCHD',
    proxyName: 'Schwab U.S. Dividend Equity ETF (0.97 Beta)',
    washSaleStatus: 'Cleared',
    status: 'Pre-Approved'
  }
];

export const ESTATE_DIRECTIVES: EstateDirective[] = [
  {
    id: 'est-1',
    name: 'Last Will & Testament',
    type: 'Will',
    lastReviewed: 'Oct 14, 2025',
    nextReview: 'Oct 2027',
    status: 'Active & Verified',
    legalCounsel: 'Morgan Lewis & Bockius LLP',
    docReference: 'DOC-WL-2024-91'
  },
  {
    id: 'est-2',
    name: 'Revocable Living Trust',
    type: 'Trust',
    lastReviewed: 'Jan 18, 2026',
    nextReview: 'Jan 2028',
    status: 'Active & Verified',
    legalCounsel: 'Morgan Stanley Custody',
    docReference: 'DOC-RT-8840-X'
  },
  {
    id: 'est-3',
    name: 'Durable Power of Attorney',
    type: 'Power of Attorney',
    lastReviewed: 'Nov 12, 2023',
    nextReview: 'Immediate',
    status: 'Review Recommended',
    legalCounsel: 'Kirkland & Ellis LLP',
    docReference: 'DOC-POA-2026-v3.2'
  },
  {
    id: 'est-4',
    name: 'Healthcare Directive (HIPAA)',
    type: 'Healthcare Directive',
    lastReviewed: 'Feb 04, 2025',
    nextReview: 'Feb 2027',
    status: 'Active & Verified',
    legalCounsel: 'Stanford Medical Center Registrar',
    docReference: 'DOC-HIPAA-09'
  }
];

export const TRUSTS_LIST: TrustEntity[] = [
  {
    id: 'tru-1',
    name: 'Morgan Family Revocable Living Trust',
    structure: 'Revocable Living (Inter Vivos)',
    type: 'Revocable',
    assets: 2850000,
    assetValue: 2850000,
    trustees: 'Alex & Eleanor Morgan',
    trustee: 'Alex & Eleanor Morgan',
    establishedYear: 2019,
    jurisdiction: 'California',
    beneficiaries: 'Eleanor Morgan (100% Primary)',
    nextReview: 'Jan 2028',
    distributionType: 'Discretionary / Per Stirpes'
  },
  {
    id: 'tru-2',
    name: 'Morgan Dynasty Trust (ILIT)',
    structure: 'Generation-Skipping Irrevocable',
    type: 'Irrevocable',
    assets: 1110000,
    assetValue: 1110000,
    trustees: 'Northern Trust (Corporate Trustee)',
    trustee: 'Northern Trust',
    establishedYear: 2021,
    jurisdiction: 'Delaware',
    beneficiaries: 'Lucas & Sophia Morgan',
    nextReview: 'Nov 2026',
    distributionType: 'Crummey Powers Active'
  },
  {
    id: 'tru-3',
    name: 'Irrevocable Life Insurance Trust',
    structure: 'Special Wealth Vehicle',
    type: 'Irrevocable',
    assets: 750000,
    assetValue: 750000,
    trustees: 'Marcus Vance, CFP® (Special Trustee)',
    trustee: 'Marcus Vance, CFP®',
    establishedYear: 2023,
    jurisdiction: 'Nevada',
    beneficiaries: 'Morgan Family Lineage',
    nextReview: 'Mar 2027',
    distributionType: 'Premium Funded'
  },
  {
    id: 'tru-4',
    name: 'Morgan Philanthropic Donor-Advised Fund',
    structure: 'Donor-Advised Fund (DAF)',
    type: 'DAF',
    assets: 320000,
    assetValue: 320000,
    trustees: 'Alex Morgan (Grant Advisor)',
    trustee: 'Alex Morgan',
    establishedYear: 2022,
    jurisdiction: 'National 501(c)(3)',
    beneficiaries: 'Mayo Clinic, Stanford University & Non-Profit Partners',
    nextReview: 'Nov 2026',
    distributionType: 'Grant Discretionary'
  }
];

export const BENEFICIARIES_LIST: Beneficiary[] = [
  {
    id: 'ben-1',
    name: 'Eleanor Morgan',
    primaryBeneficiary: 'Eleanor Morgan',
    relationship: 'Spouse',
    account: 'Taxable Brokerage & Roth IRA',
    linkedAccount: 'Taxable Brokerage & Roth IRA',
    allocation: '100% Primary',
    allocationPct: 100,
    contingent: 'Lucas & Sophia Morgan (50/50)',
    lastVerified: 'Aug 14, 2026',
    status: 'Synced',
    verified: true
  },
  {
    id: 'ben-2',
    name: 'Lucas Morgan',
    primaryBeneficiary: 'Lucas Morgan',
    relationship: 'Child (Age 16)',
    account: 'Morgan Revocable Trust & 529 Plan',
    linkedAccount: 'Revocable Trust & 529 Plan',
    allocation: '50% Contingent',
    allocationPct: 50,
    contingent: 'Sophia Morgan',
    lastVerified: 'Aug 14, 2026',
    status: 'Synced',
    verified: true
  },
  {
    id: 'ben-3',
    name: 'Sophia Morgan',
    primaryBeneficiary: 'Sophia Morgan',
    relationship: 'Child (Age 12)',
    account: 'Revocable Living Trust',
    linkedAccount: 'Revocable Living Trust',
    allocation: '50% Contingent',
    allocationPct: 50,
    contingent: 'Lucas Morgan',
    lastVerified: 'Aug 14, 2026',
    status: 'Synced',
    verified: true
  },
  {
    id: 'ben-4',
    name: "Children's Health Foundation",
    primaryBeneficiary: "Children's Health Foundation",
    relationship: '501(c)(3) Nonprofit',
    account: 'Traditional Rollover IRA',
    linkedAccount: 'Traditional Rollover IRA',
    allocation: '10% Contingent',
    allocationPct: 10,
    contingent: 'Stanford Medical Foundation',
    lastVerified: 'Jul 22, 2026',
    status: 'Review Needed',
    verified: false
  }
];

export const RETIREMENT_PLAN_SUMMARY = {
  planId: '401(k)-CORP-8842',
  planName: 'OmniCorp Global 401(k) Master Plan',
  planAssets: 284600000,
  planAssetsFormatted: '$284.6M',
  ytdAssetGrowth: '+$18.4M (+6.9%)',
  totalParticipants: 4820,
  activeParticipants: 3940,
  participationRate: 91.4,
  nationalBenchmarkParticipation: 82.0,
  avgDeferralRate: 7.8,
  targetDeferralRate: 8.5,
  employerMatch: 4.2,
  annualMatchPool: '$8.4M',
  planHealthScore: 94,
  allInFee: '0.38% (38 bps)',
  peerAvgFee: '0.62% (62 bps)',
  annualFeeSavings: '$683,000'
};

export const RETIREMENT_LINEUP: InstitutionalFund[] = [
  {
    ticker: 'VINIX',
    name: 'Vanguard Institutional Index Fund',
    category: 'US Large Cap Core Equity',
    planAssets: 78200000,
    planPct: 27.5,
    ytdReturn: 18.4,
    benchmarkDiff: 0.05,
    sharpe: 1.34,
    expenseRatio: 0.035,
    status: 'Approved Core'
  },
  {
    ticker: 'VFIFX',
    name: 'Vanguard Target Retirement 2050 Fund',
    category: 'Target Date Lifecycle (QDIA)',
    planAssets: 92400000,
    planPct: 32.5,
    ytdReturn: 15.2,
    benchmarkDiff: 0.32,
    sharpe: 1.18,
    expenseRatio: 0.080,
    status: 'Compliant QDIA'
  },
  {
    ticker: 'FCNTX',
    name: 'Fidelity Contrafund Class K6',
    category: 'US Large Growth Active',
    planAssets: 34100000,
    planPct: 12.0,
    ytdReturn: 21.8,
    benchmarkDiff: 1.90,
    sharpe: 1.28,
    expenseRatio: 0.420,
    status: 'Compliant / Good'
  },
  {
    ticker: 'DODIX',
    name: 'Dodge & Cox Income Fund',
    category: 'Fixed Income Aggregate Core-Plus',
    planAssets: 29600000,
    planPct: 10.4,
    ytdReturn: 6.4,
    benchmarkDiff: 0.85,
    sharpe: 0.89,
    expenseRatio: 0.410,
    status: 'Compliant / Good'
  },
  {
    ticker: 'DFCEX',
    name: 'DFA Emerging Markets Core Equity',
    category: 'Emerging Markets Equity',
    planAssets: 14200000,
    planPct: 5.0,
    ytdReturn: 4.1,
    benchmarkDiff: -2.80,
    sharpe: 0.42,
    expenseRatio: 0.390,
    status: 'Watchlist - Q2'
  },
  {
    ticker: 'RERGX',
    name: 'American Funds EuroPacific Growth Class R-6',
    category: 'Non-US Developed Markets',
    planAssets: 18600000,
    planPct: 6.5,
    ytdReturn: 11.9,
    benchmarkDiff: 1.15,
    sharpe: 0.96,
    expenseRatio: 0.470,
    status: 'Approved Core'
  }
];

export const PARTICIPANT_PROFILE = {
  name: 'Alex Morgan',
  accountBalance: 184620,
  ytdReturnPct: 8.4,
  contributionRatePct: 8,
  employerMatchPct: 4,
  vestingPct: 100,
  projectedMonthlyIncome: 6240,
  retirementReadinessScore: 84,
  targetRetirementAge: 62,
  currentAge: 44,
  annualSavingsRate: 14760,
  remainingIrsCap: 8240,
  irsLimit: 23000
};

export const ADVISOR_CLIENTS: ClientProfile[] = [
  {
    id: 'cli-1',
    name: 'Alex & Eleanor Morgan',
    email: 'alex.morgan@omnicorp.io',
    household: 'Morgan Family Trust',
    tier: 'UHNW Tier 1 ($10M+)',
    aum: 14850000,
    custodians: 'Schwab / Morgan Stanley',
    ytdReturn: 14.2,
    goalsMet: '3/4 Track',
    taxOpportunity: '$18.4K TLH Ready',
    healthScore: 94,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    requiresAttention: true,
    attentionReason: '2026 Restated POA requires remote ink signature before 2:00 PM session.',
    accountsCount: 6,
    lastLogin: 'Today, 11:24 AM'
  },
  {
    id: 'cli-2',
    name: 'Charles Sterling III',
    email: 'csterling@sterlingdynasty.com',
    household: 'Sterling Dynasty 2012',
    tier: 'Private Wealth ($25M+)',
    aum: 28400000,
    custodians: 'Northern Trust',
    ytdReturn: 11.8,
    goalsMet: '5/5 Track',
    taxOpportunity: 'Roth $120K Headroom',
    healthScore: 98,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    requiresAttention: false,
    accountsCount: 9,
    lastLogin: 'Yesterday, 04:30 PM'
  },
  {
    id: 'cli-3',
    name: 'Dr. Evelyn Chen',
    email: 'echen@synapsebio.vc',
    household: 'Chen Holdings Group',
    tier: 'High Net Worth ($5M-$10M)',
    aum: 9650000,
    custodians: 'Fidelity Institutional',
    ytdReturn: 19.4,
    goalsMet: '3/4 Track',
    taxOpportunity: 'Tech Rebalance Breached',
    healthScore: 72,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    requiresAttention: true,
    attentionReason: 'Tech exposure drifted +4.5% above target; requires tax-efficient trim.',
    accountsCount: 4,
    lastLogin: 'Sep 4, 2026'
  },
  {
    id: 'cli-4',
    name: 'Julian Harrison',
    email: 'jharrison@harrcap.com',
    household: 'Harrison 2018 Revocable',
    tier: 'High Net Worth ($5M-$10M)',
    aum: 6400000,
    custodians: 'Schwab Institutional',
    ytdReturn: 10.4,
    goalsMet: '2/2 Track',
    taxOpportunity: 'No Action Required',
    healthScore: 88,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    requiresAttention: false,
    accountsCount: 3,
    lastLogin: 'Sep 2, 2026'
  },
  {
    id: 'cli-5',
    name: 'Dr. Maya Thorne',
    email: 'mthorne@neurosurg.partners',
    household: 'Thorne Medical Partners',
    tier: 'UHNW Tier 1 ($10M+)',
    aum: 12100000,
    custodians: 'Pershing LLC',
    ytdReturn: 13.1,
    goalsMet: '4/4 Track',
    taxOpportunity: 'Wash-Sale Lock (7d)',
    healthScore: 91,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    requiresAttention: false,
    accountsCount: 5,
    lastLogin: 'Aug 29, 2026'
  }
];

export const DOCUMENTS_VAULT: DocumentItem[] = [
  {
    id: 'doc-1',
    name: '2026 Restated Power of Attorney (Durable)',
    category: 'Estate',
    owner: 'Alex Morgan',
    fileSize: '2.4 MB',
    sharedWith: ['Marcus Vance, CFP®', 'Harrison Cole, Esq.'],
    expiryDate: 'Oct 15, 2026 (38d)',
    status: 'Awaiting Signature',
    lastModified: 'Today, 08:30 AM',
    custodian: 'Kirkland & Ellis Vault'
  },
  {
    id: 'doc-2',
    name: 'Q2 2026 Comprehensive Tax Alpha Summary',
    category: 'Tax',
    owner: 'Morgan Family Trust',
    fileSize: '4.1 MB',
    sharedWith: ['Sarah Jenkins, CPA (Deloitte)', 'Marcus Vance, CFP®'],
    status: 'Verified',
    lastModified: 'Sep 5, 2026',
    custodian: 'Charles Schwab Custody'
  },
  {
    id: 'doc-3',
    name: 'Morgan Family Revocable Living Trust Deed',
    category: 'Estate',
    owner: 'Morgan Family Trust',
    fileSize: '12.8 MB',
    sharedWith: ['Harrison Cole, Esq.', 'Marcus Vance, CFP®'],
    status: 'Active',
    lastModified: 'Jan 18, 2026',
    custodian: 'Morgan Stanley Trust'
  },
  {
    id: 'doc-4',
    name: 'OmniCorp 401(k) IPS & 408(b)(2) Fee Disclosure',
    category: 'Retirement',
    owner: 'OmniCorp Entity',
    fileSize: '1.9 MB',
    sharedWith: ['Marcus Vance, CFP®', 'Elena Rostova (Ops)'],
    expiryDate: 'Dec 31, 2026',
    status: 'Active',
    lastModified: 'Aug 28, 2026',
    custodian: 'Schwab Trust Bank'
  },
  {
    id: 'doc-5',
    name: 'Consolidated Charles Schwab Statement - Aug 2026',
    category: 'Statements',
    owner: 'Alex Morgan',
    fileSize: '8.6 MB',
    sharedWith: ['Elena Rostova (Ops)'],
    status: 'Archived',
    lastModified: 'Sep 2, 2026',
    custodian: 'Charles Schwab'
  },
  {
    id: 'doc-6',
    name: 'Northern Trust Dynasty Trustee Certification',
    category: 'Legal',
    owner: 'Morgan Dynasty Trust',
    fileSize: '1.1 MB',
    sharedWith: ['Harrison Cole, Esq.', 'Marcus Vance, CFP®'],
    expiryDate: 'Nov 28, 2026',
    status: 'Review Pending',
    lastModified: 'Aug 14, 2026',
    custodian: 'Northern Trust'
  },
  {
    id: 'doc-7',
    name: 'Private Equity Capital Call Notice - Blackstone Tac Opps IV',
    category: 'Portfolio',
    owner: 'Alex Morgan',
    fileSize: '840 KB',
    sharedWith: ['Marcus Vance, CFP®'],
    expiryDate: 'Sep 22, 2026',
    status: 'Action Req',
    lastModified: 'Sep 4, 2026',
    custodian: 'Morgan Stanley'
  }
];

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Marcus Vance, CFP®',
    senderRole: 'Lead Advisor',
    senderInitials: 'MV',
    time: '08:42 AM',
    content: "Good morning Alex, I've queued the 2026 Restated Power of Attorney for digital notary verification before our 2:00 PM session today. Also attached the Q3 Roth conversion schedule.",
    isSelf: false,
    attachment: {
      name: '2026_Restated_POA_v3.2.pdf',
      size: '2.4 MB',
      type: 'PDF',
      pendingSignature: true
    }
  },
  {
    id: 'msg-2',
    senderName: 'Alex Morgan',
    senderRole: 'Private Client',
    senderInitials: 'AM',
    time: '09:05 AM',
    content: 'Thanks Marcus. Eleanor and I reviewed the Roth threshold. Does this account for the recent NVDA appreciated stock gift to our DAF?',
    isSelf: true
  },
  {
    id: 'msg-3',
    senderName: 'Elena Rostova',
    senderRole: 'Fiduciary Operations',
    senderInitials: 'ER',
    time: '09:18 AM',
    content: 'Confirmed Alex! The $84.5K DAF distribution was routed via Schwab Trust at 09:15 AM EST. Trade confirmation #ST-99201 has been matched and logged in your Tax Center.',
    isSelf: false
  },
  {
    id: 'msg-4',
    senderName: 'Marcus Vance, CFP®',
    senderRole: 'Lead Advisor',
    senderInitials: 'MV',
    time: '10:02 AM',
    content: 'Excellent. Looking forward to reviewing our tactical technology trims and 2027 estate threshold updates at 2:00 PM EST. The secure virtual boardroom is initialized below.',
    isSelf: false,
    meetingCard: {
      title: 'Fiduciary Strategy Review',
      time: 'Today 2:00 PM EST',
      location: 'Boston Advisory Boardroom & Encrypted Zoom #418-92'
    }
  }
];

export const REPORTS_CATALOG: ReportItem[] = [
  {
    id: 'rep-1',
    title: 'Portfolio Performance & Attribution Report',
    description: 'Multi-asset time-weighted returns, benchmark delta (S&P 500 / MSCI ACWI / Agg), Brinson-Fachler attribution, and Sharpe metrics.',
    category: 'client',
    version: 'v4.2',
    lastGenerated: 'Today, 08:30 AM EST',
    schedule: 'Quarterly & On-Demand (T+3)',
    format: 'PDF, XLSX, Client Portal',
    status: 'Ready / Published'
  },
  {
    id: 'rep-2',
    title: 'Comprehensive Tax Alpha & 1099 Summary',
    description: 'Realized gains/losses, tax-loss harvesting execution log, qualified dividend splits, state apportionment, and wash-sale audit.',
    category: 'tax',
    version: 'v2.1',
    lastGenerated: 'Sep 5, 2026 • 04:15 PM',
    schedule: 'Monthly & Year-End Pack',
    format: 'Encrypted PDF, CCH CSV',
    status: 'Delivered to CPA'
  },
  {
    id: 'rep-3',
    title: 'Executive Wealth Plan & Milestone Audit',
    description: '10,000-run Monte Carlo probability corridor, cash flow waterfall, capital call liquidity schedule, and goal trajectory.',
    category: 'client',
    version: 'v3.0',
    lastGenerated: 'Yesterday, 02:00 PM',
    schedule: 'Bi-Annual / Post-Advisory',
    format: 'Presentation Deck, Portal',
    status: 'Review Required'
  },
  {
    id: 'rep-4',
    title: 'ERISA 401(k) Plan Health & Compliance Pack',
    description: 'Form 5500 Schedule H audit package, ADP/ACP non-discrimination test results, 408(b)(2) fee disclosure, and IPS fund scorecard.',
    category: 'erisa',
    version: 'v1.8',
    lastGenerated: 'Aug 28, 2026',
    schedule: 'Annual / Q3 Committee Cycle',
    format: 'SEC/DOL WORM PDF, ZIP',
    status: 'Ready for Committee'
  },
  {
    id: 'rep-5',
    title: 'Private Wealth Review & Fiduciary Brief',
    description: 'Holistic 360 household balance sheet, multi-custodial asset aggregation, trust beneficiary validation, and action checklist.',
    category: 'client',
    version: 'v5.0',
    lastGenerated: 'Sep 2, 2026 • 11:20 AM',
    schedule: 'Monthly Fiduciary Pulse',
    format: 'PDF, Tablet Dossier',
    status: 'Active / Published'
  },
  {
    id: 'rep-6',
    title: 'Retirement Participant Statement & Projection',
    description: 'Individual participant ledger, match vesting, personal rate of return, lifetime retirement income illustration, and allocation pie.',
    category: 'sched',
    version: 'v2.4',
    lastGenerated: 'Sep 1, 2026',
    schedule: 'Quarterly Statutory Mailing',
    format: 'Participant PDF, Push App',
    status: 'Scheduled'
  }
];

export const INTEGRATIONS_LIST: IntegrationFeed[] = [
  {
    id: 'int-1',
    name: 'Charles Schwab Trust Co.',
    category: 'Custodian',
    lastSynced: '4m ago',
    latencyMs: 42,
    status: 'Connected',
    recordsCount: '142,890 txs',
    iconType: 'account_balance'
  },
  {
    id: 'int-2',
    name: 'Morgan Stanley Wealth Management',
    category: 'Custodian',
    lastSynced: '12m ago',
    latencyMs: 58,
    status: 'Connected',
    recordsCount: '84,200 txs',
    iconType: 'domain'
  },
  {
    id: 'int-3',
    name: 'Northern Trust Corporation',
    category: 'Custodian',
    lastSynced: '18m ago',
    latencyMs: 64,
    status: 'Connected',
    recordsCount: '19,450 txs',
    iconType: 'verified'
  },
  {
    id: 'int-4',
    name: 'J.P. Morgan Private Bank',
    category: 'Bank',
    lastSynced: '1h ago',
    latencyMs: 72,
    status: 'Connected',
    recordsCount: '6,120 txs',
    iconType: 'payments'
  },
  {
    id: 'int-5',
    name: 'Salesforce Financial Services Cloud',
    category: 'CRM',
    lastSynced: '2m ago',
    latencyMs: 38,
    status: 'Connected',
    recordsCount: '1,840 records',
    iconType: 'contacts'
  },
  {
    id: 'int-6',
    name: 'eMoney & RightCapital Sync',
    category: 'CRM',
    lastSynced: '6h ago',
    latencyMs: 180,
    status: 'Stale',
    statusDetails: 'Auth refresh pending',
    recordsCount: '38 models',
    iconType: 'sync_problem'
  },
  {
    id: 'int-7',
    name: 'CCH ProSystem fx & Wolters Kluwer',
    category: 'Tax',
    lastSynced: '35m ago',
    latencyMs: 50,
    status: 'Connected',
    recordsCount: '84 entities',
    iconType: 'calculate'
  },
  {
    id: 'int-8',
    name: 'Fidelity Institutional / Schwab RTS',
    category: 'Retirement',
    lastSynced: '14m ago',
    latencyMs: 95,
    status: 'Reconcile',
    statusDetails: '0.42 lot discrepancy on VINIX',
    recordsCount: '4,820 parts',
    iconType: 'balance'
  },
  {
    id: 'int-9',
    name: 'FactSet & Refinitiv Streaming Feeds',
    category: 'Market Data',
    lastSynced: 'Live stream',
    latencyMs: 18,
    status: 'Connected',
    recordsCount: '220,000 ticks',
    iconType: 'query_stats'
  }
];

export const EXCEPTIONS_LIST: ExceptionItem[] = [
  {
    id: 'exc-1',
    severity: 'High',
    source: 'Fidelity RTS (401k)',
    account: 'OmniCorp Global Master',
    details: 'Trade mismatch on VINIX lot #8892: 0.42 shares variance vs custodial settle ($284.6M base).',
    detectedTime: '14m ago',
    status: 'Needs Reconciliation'
  },
  {
    id: 'exc-2',
    severity: 'Medium',
    source: 'eMoney Planning API',
    account: 'Morgan Family Trust',
    details: 'OAuth token expired at 03:00 AM refresh. Balances out of sync by >$4,500.',
    detectedTime: '6h ago',
    status: 'Stale OAuth'
  },
  {
    id: 'exc-3',
    severity: 'Low',
    source: 'Morgan Stanley Feed',
    account: 'Alex Morgan Taxable (#4912)',
    details: 'Duplicate dividend transaction ($1,842.50 NVDA Q3 Dividend) quarantined automatically.',
    detectedTime: 'Yesterday',
    status: 'Quarantined'
  },
  {
    id: 'exc-4',
    severity: 'Resolved',
    source: 'J.P. Morgan Cash Sweep',
    account: 'Alex & Eleanor Sweep',
    details: 'Cleared wire of $84,500 DAF grant matched against Northern Trust master ledger.',
    detectedTime: 'Sep 5, 2026',
    status: 'Resolved'
  }
];

// Compatibility aliases and mapped datasets
export const DOCUMENTS_LIST = DOCUMENTS_VAULT.map(doc => ({
  ...doc,
  title: doc.name,
  date: doc.lastModified,
  size: doc.fileSize
}));

export const CUSTODIANS_LIST = INTEGRATIONS_LIST.map(item => ({
  ...item,
  connectionType: 'Direct FIX / REST API',
  syncStatus: item.status === 'Connected' ? 'Live Streaming' : item.status,
  accountsCount: item.recordsCount.includes('k') ? 14 : 6,
  totalAum: 4820000,
  lastSync: item.lastSynced
}));

export const MESSAGES_LIST = CHAT_MESSAGES.map(msg => ({
  id: msg.id,
  sender: (msg.isSelf ? 'user' : msg.senderRole.includes('Advisor') ? 'advisor' : 'system') as 'advisor' | 'user' | 'system',
  name: msg.senderName,
  avatarText: msg.senderInitials,
  content: msg.content,
  snippet: msg.content.slice(0, 65) + '...',
  timestamp: msg.time,
  role: msg.senderRole,
  isAdvisor: !msg.isSelf,
  unread: msg.id === 'msg-1'
}));

export const RETIREMENT_PLAN_SPONSOR = {
  ...RETIREMENT_PLAN_SUMMARY,
  companyName: 'Apex Technologies, Inc.',
  totalPlanAssets: RETIREMENT_PLAN_SUMMARY.planAssets,
  averageBalance: Math.round(RETIREMENT_PLAN_SUMMARY.planAssets / RETIREMENT_PLAN_SUMMARY.totalParticipants)
};

export const PLAN_FUNDS_LIST = RETIREMENT_LINEUP.map(fund => ({
  ...fund,
  id: fund.ticker,
  assetClass: fund.category,
  assets: fund.planAssets,
  performance3Y: fund.ytdReturn
}));

export const HARVEST_OPPORTUNITIES = TAX_OPPORTUNITIES;

export const WASH_SALE_ITEMS = [
  {
    id: 'ws-1',
    ticker: 'SOXX',
    name: 'iShares Semiconductor ETF',
    unrealizedLoss: -14200,
    lossAmount: 14200,
    saleDate: 'Aug 18, 2026',
    lockExpiration: 'Sep 18, 2026',
    daysRemaining: 11,
    lockoutDays: 11,
    status: 'Restricted (11d left)',
    proxyTicker: 'SMH',
    potentialBenefit: 5254
  },
  {
    id: 'ws-2',
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    unrealizedLoss: -8900,
    lossAmount: 8900,
    saleDate: 'Aug 25, 2026',
    lockExpiration: 'Sep 25, 2026',
    daysRemaining: 4,
    lockoutDays: 4,
    status: 'Restricted (4d left)',
    proxyTicker: 'IDRV',
    potentialBenefit: 3120
  }
];

export const CLIENT_HOUSEHOLDS = ADVISOR_CLIENTS.map(c => ({
  id: c.id,
  name: c.name,
  primaryContact: c.email,
  tier: c.tier,
  aum: c.aum,
  modelPortfolio: '80/20 Growth with Tax-Managed Overlay',
  driftStatus: c.requiresAttention ? 'Exceeded +3% Threshold' : 'Aligned to Mandate',
  lastMeetingDate: c.lastLogin,
  healthScore: c.healthScore,
  email: c.email,
  household: c.household,
  custodians: c.custodians,
  ytdReturn: c.ytdReturn,
  goalsMet: c.goalsMet,
  taxOpportunity: c.taxOpportunity,
  avatar: c.avatar,
  requiresAttention: c.requiresAttention,
  attentionReason: c.attentionReason,
  accountsCount: c.accountsCount,
  lastLogin: c.lastLogin
}));

