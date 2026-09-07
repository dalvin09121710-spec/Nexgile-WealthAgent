export type ViewAsRole = 'Private Client' | 'Advisor' | 'Participant' | 'Plan Sponsor' | 'Compliance';

export interface AuthUser {
  name: string;
  email: string;
  role: ViewAsRole;
  avatarInitials?: string;
}

export type PersonaType = 'client' | 'advisor' | 'sponsor' | 'participant' | 'compliance' | ViewAsRole;

export type TimeHorizon = '1M' | '6M' | '1Y' | '5Y' | 'Custom' | 'All';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: number;
}

export interface Holding {
  ticker: string;
  name: string;
  category: 'Equity' | 'Fixed Income' | 'ETF' | 'Alternative' | 'Cash';
  account: string;
  shares: number;
  marketValue: number;
  costBasis: number;
  gainLoss: number;
  gainLossPct: number;
  allocationPct: number;
  ytdReturnPct: number;
  harvestEligible?: boolean;
  peRatio?: number;
  dividendYield?: number;
  beta?: number;
}

export interface GoalItem {
  id: string;
  name: string;
  category: 'Retirement' | 'Education' | 'Home' | 'Legacy';
  targetYear: number;
  currentAmount: number;
  targetAmount: number;
  fundedPct: number;
  monthlyContribution: number;
  successProbability: number;
  status: 'On Track' | 'At Risk' | 'Needs Review';
  note?: string;
}

export interface TaxOpportunity {
  id: string;
  ticker: string;
  name: string;
  unrealizedLoss: number;
  potentialBenefit: number;
  proxyTicker: string;
  proxyName: string;
  washSaleStatus: 'Cleared' | 'Restricted' | 'Pending' | string;
  lockoutDays?: number;
  status: 'Pre-Approved' | 'Pending Lockout' | 'Harvested' | string;
}

export type TaxLossHarvestItem = TaxOpportunity;

export interface EstateDirective {
  id: string;
  name: string;
  type: 'Will' | 'Trust' | 'Power of Attorney' | 'Healthcare Directive' | string;
  lastReviewed: string;
  nextReview: string;
  status: 'Active & Verified' | 'Review Recommended' | 'Awaiting Signature' | string;
  legalCounsel: string;
  docReference: string;
}

export interface TrustEntity {
  id: string;
  name: string;
  structure?: string;
  type?: string;
  assets?: number;
  assetValue?: number;
  trustees?: string;
  trustee?: string;
  establishedYear?: number;
  jurisdiction?: string;
  beneficiaries?: string;
  nextReview?: string;
  distributionType?: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  relationship: string;
  linkedAccount?: string;
  account?: string;
  allocation?: string;
  allocationPct?: number;
  primaryBeneficiary?: boolean;
  contingent?: boolean;
  lastVerified?: string;
  status?: string;
  verified?: boolean;
}

export interface InstitutionalFund {
  ticker: string;
  name: string;
  category: string;
  planAssets: number;
  planPct: number;
  ytdReturn: number;
  benchmarkDiff: number;
  sharpe: number;
  expenseRatio: number;
  status: 'Approved Core' | 'Compliant QDIA' | 'Compliant / Good' | 'Watchlist - Q2' | string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  household: string;
  tier: string;
  aum: number;
  custodians: string;
  ytdReturn: number;
  goalsMet: string;
  taxOpportunity: string;
  healthScore: number;
  avatar: string;
  requiresAttention?: boolean;
  attentionReason?: string;
  accountsCount: number;
  lastLogin: string;
}

export interface ClientHousehold extends Partial<ClientProfile> {
  id: string;
  name: string;
  primaryContact?: string;
  modelPortfolio?: string;
  driftStatus?: string;
  lastMeetingDate?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  title?: string;
  category: 'Estate' | 'Tax' | 'Portfolio' | 'Retirement' | 'Statements' | 'Legal' | string;
  owner?: string;
  fileSize?: string;
  size?: string;
  sharedWith?: string[];
  expiryDate?: string;
  date?: string;
  status: 'Active' | 'Awaiting Signature' | 'Verified' | 'Review Pending' | 'Archived' | 'Action Req' | string;
  lastModified?: string;
  custodian?: string;
}

export interface CustodianIntegration {
  id: string;
  name: string;
  connectionType?: string;
  category?: string;
  status: string;
  syncStatus?: string;
  accountsCount?: number;
  totalAum?: number;
  lastSync?: string;
  lastSynced?: string;
  latencyMs?: number;
  recordsCount?: string;
  iconType?: string;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  senderInitials: string;
  time: string;
  content: string;
  isSelf?: boolean;
  attachment?: {
    name: string;
    size: string;
    type: string;
    pendingSignature?: boolean;
  };
  meetingCard?: {
    title: string;
    time: string;
    location: string;
  };
}

export interface ReportItem {
  id: string;
  title: string;
  description: string;
  category: 'client' | 'tax' | 'erisa' | 'sched';
  version: string;
  lastGenerated: string;
  schedule: string;
  format: string;
  status: 'Ready / Published' | 'Delivered to CPA' | 'Review Required' | 'Ready for Committee' | 'Active / Published' | 'Scheduled';
}

export interface IntegrationFeed {
  id: string;
  name: string;
  category: 'Custodian' | 'Bank' | 'CRM' | 'Tax' | 'Retirement' | 'Market Data';
  lastSynced: string;
  latencyMs: number;
  status: 'Connected' | 'Stale' | 'Reconcile' | 'Error';
  statusDetails?: string;
  recordsCount: string;
  iconType: string;
}

export interface ExceptionItem {
  id: string;
  severity: 'High' | 'Medium' | 'Low' | 'Resolved';
  source: string;
  account: string;
  details: string;
  detectedTime: string;
  status: 'Needs Reconciliation' | 'Stale OAuth' | 'Quarantined' | 'Resolved';
}
