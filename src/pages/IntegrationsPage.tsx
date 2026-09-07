import React, { useState } from 'react';
import {
  Link2,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Building,
  Key,
  Database,
  ArrowRight,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CUSTODIANS_LIST } from '../data/mockData';
import { CustodianIntegration } from '../types';

interface EcosystemTool {
  id: string;
  name: string;
  category: string;
  status: 'Active' | 'Needs Auth' | 'Available';
  description: string;
  logoText: string;
}

const ECOSYSTEM_TOOLS: EcosystemTool[] = [
  {
    id: 'eco-1',
    name: 'RightCapital Financial Planning',
    category: 'Planning Engine',
    status: 'Active',
    description: 'Monte Carlo cash-flow synchronization and retirement probability modeling.',
    logoText: 'RC'
  },
  {
    id: 'eco-2',
    name: 'Intuit ProConnect & TurboTax',
    category: 'Tax Software',
    status: 'Active',
    description: 'Direct 1099-B Schedule D electronic data interchange for CPA tax returns.',
    logoText: 'TX'
  },
  {
    id: 'eco-3',
    name: 'DocuSign Fiduciary Enclave',
    category: 'E-Signatures',
    status: 'Active',
    description: 'Cryptographic compliance audit trails for account openings and trust restatements.',
    logoText: 'DS'
  },
  {
    id: 'eco-4',
    name: 'Plaid Private Wealth Aggregation',
    category: 'Open Banking',
    status: 'Active',
    description: 'OAuth 2.0 multi-bank reserve tracking with real-time liquidity detection.',
    logoText: 'PL'
  }
];

export const IntegrationsPage: React.FC = () => {
  const { addToast } = useApp();
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [custodians, setCustodians] = useState<CustodianIntegration[]>(CUSTODIANS_LIST);

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setTimeout(() => {
      setIsSyncingAll(false);
      setCustodians(prev =>
        prev.map(c => ({
          ...c,
          lastSync: 'Just now',
          syncStatus: 'Optimal'
        }))
      );
      addToast(
        'Custodial Reconciliation Synchronized',
        'Reconciled positions, cash balances, and pending settlement across all 4 institutional custodians.',
        'success'
      );
    }, 1200);
  };

  const handleSyncSingle = (id: string, name: string) => {
    addToast('Syncing Custodian', `Pulling real-time FIX protocol feeds from ${name}...`, 'info');
    setTimeout(() => {
      setCustodians(prev =>
        prev.map(c => (c.id === id ? { ...c, lastSync: 'Just now' } : c))
      );
      addToast('Custodian Synced', `${name} positions updated successfully.`, 'success');
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Integrations &amp; Custodians
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              FIX Protocol &amp; Open Banking
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Reconcile multi-custodial feeds, open-banking connectors, and fiduciary accounting engines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() =>
              addToast(
                'Connect New Custodian',
                'Custodian onboarding wizard initialized. Select Charles Schwab, Fidelity, Pershing, or Northern Trust.',
                'info'
              )
            }
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-blue-400" />
            <span>Link Custodial Feed</span>
          </button>
          <button
            onClick={handleSyncAll}
            disabled={isSyncingAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
            <span>{isSyncingAll ? 'Synchronizing...' : 'Sync All Feeds'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Custodial Network Health Strip */}
      <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">
              Institutional FIX &amp; Custodial Mesh: 100% Operational
            </h4>
            <p className="text-[11px] text-slate-400">
              Direct institutional API data pipes authenticated with Charles Schwab, Fidelity Institutional, Northern Trust, and Empower.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0">
          <div>
            <span className="text-slate-400 block text-[10px]">Total Linked Assets</span>
            <span className="font-bold text-white">$4.82M Multi-Custody</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Encryption Standard</span>
            <span className="font-bold text-blue-400">TLS 1.3 · Mutual Auth</span>
          </div>
        </div>
      </div>

      {/* 3. Primary Institutional Custodians Grid (4 Cards) */}
      <div>
        <h3 className="text-base font-bold text-white mb-3">
          Connected Institutional Custodians
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {custodians.map(c => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/25">
                    {c.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      {c.name}
                    </h4>
                    <span className="text-xs text-slate-400">{c.connectionType}</span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                  {c.status}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Accounts Linked:</span>
                  <span className="font-bold text-slate-200">
                    {c.accountsCount} Active Accounts
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Reconciled AUM:</span>
                  <span className="font-bold text-white">
                    ${(c.totalAum / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Synchronized:</span>
                  <span className="text-blue-400 font-medium">{c.lastSync}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-slate-400">Sync Status: {c.syncStatus}</span>
                <button
                  onClick={() => handleSyncSingle(c.id, c.name)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 text-blue-400" />
                  <span>Sync Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Ecosystem Integrations & FinTech Connectors */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Ecosystem &amp; FinTech Connectors
            </h3>
            <p className="text-xs text-slate-400">
              Financial planning engines, CPA software bridges, and e-signature enclaves.
            </p>
          </div>
          <span className="text-xs text-blue-400 font-semibold">
            4 Active Bridges
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ECOSYSTEM_TOOLS.map(tool => (
            <div
              key={tool.id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-white/10 text-slate-200 flex items-center justify-center font-bold text-xs">
                  {tool.logoText}
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                  {tool.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs text-white">
                  {tool.name}
                </h4>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  {tool.category}
                </span>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {tool.description}
                </p>
              </div>

              <button
                onClick={() =>
                  addToast(
                    `Bridge Settings: ${tool.name}`,
                    `Data permissions and webhook configurations opened for ${tool.name}.`,
                    'info'
                  )
                }
                className="w-full py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
              >
                Configure Bridge
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
