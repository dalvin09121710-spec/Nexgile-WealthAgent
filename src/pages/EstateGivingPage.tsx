import React, { useState } from 'react';
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
  Download,
  Building,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRUSTS_LIST, BENEFICIARIES_LIST } from '../data/mockData';

export const EstateGivingPage: React.FC = () => {
  const { openExplain, addToast } = useApp();
  const [activeTrustFilter, setActiveTrustFilter] = useState('ALL');

  const filteredTrusts = TRUSTS_LIST.filter(t => {
    if (activeTrustFilter === 'ALL') return true;
    if (activeTrustFilter === 'IRREVOCABLE') return t.type === 'Irrevocable';
    if (activeTrustFilter === 'REVOCABLE') return t.type === 'Revocable';
    if (activeTrustFilter === 'DAF') return t.type === 'DAF';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Estate &amp; Giving
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              Dynasty Architecture
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Trust structures, beneficiary alignment, lifetime gift exemptions, and philanthropic giving.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() =>
              addToast(
                'Beneficiary Sync Triggered',
                'Pinging Charles Schwab and Morgan Stanley custodial transfer-on-death APIs.',
                'info'
              )
            }
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Verify Beneficiaries</span>
          </button>
          <button
            onClick={() =>
              addToast(
                'Estate Blueprint Exported',
                'Comprehensive flow diagram and trustee digest compiled for Kirkland & Ellis LLP.',
                'success'
              )
            }
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Estate Dossier</span>
          </button>
        </div>
      </div>

      {/* 2. Lifetime Exemption & Sunset Warning Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/60 to-slate-900/60 backdrop-blur-md border border-blue-500/30 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
              2026 TCJA Sunset Advisory
            </span>
            <span className="text-xs text-slate-300">Couples Federal Exemption</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            $24.82M Remaining Federal Unified Gift/Estate Exemption
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl">
            $2.40M used to date via Dynasty Trust funding. The individual exemption is slated to sunset by approximately 50% on Dec 31, 2025 unless extended by Congress.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              openExplain(
                'TCJA Exemption Sunset Strategy',
                'The Tax Cuts and Jobs Act (TCJA) doubled estate exemption levels ($13.61M per individual in 2024/2026). Locking in lifetime gifts into irrevocable dynasty trusts prior to sunset preserves pre-sunset exemption amounts under IRS anti-clawback regulations.'
              )
            }
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold backdrop-blur-xs border border-white/10 transition-colors shadow-sm"
          >
            Explain Strategy
          </button>
        </div>
      </div>

      {/* 3. Four Active Trusts and Entities */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-white">
            Active Estate Structures &amp; Trusts
          </h3>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl text-xs font-semibold">
            {(['ALL', 'IRREVOCABLE', 'REVOCABLE', 'DAF'] as const).map(f => (
              <button
                key={f}
                onClick={() => setActiveTrustFilter(f)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTrustFilter === f
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredTrusts.map(trust => (
            <div
              key={trust.id}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 flex flex-col justify-between hover:shadow-lg transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-slate-300 font-bold uppercase tracking-wider">
                  {trust.type || trust.structure || 'Trust'}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white">
                  {trust.name}
                </h4>
                <span className="text-xs text-slate-400">Trustee: {trust.trustee || trust.trustees}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assets Managed:</span>
                  <span className="font-bold text-white">
                    ${(trust.assetValue ?? trust.assets ?? 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Established:</span>
                  <span className="text-slate-200">{trust.establishedYear || 2021}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jurisdiction:</span>
                  <span className="font-semibold text-blue-400">{trust.jurisdiction || 'Delaware'}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                Primary: <strong className="text-slate-200">{trust.beneficiaries || 'Morgan Family Lineage'}</strong>
              </div>

              <button
                onClick={() =>
                  addToast(
                    `Trust Dossier: ${trust.name}`,
                    `Governing deed and asset schedule opened for ${trust.name}.`,
                    'info'
                  )
                }
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
              >
                Inspect Trust Deed →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Visual Estate Hierarchy Architecture (Flow Diagram) */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Wealth Transfer &amp; Generation Flow Architecture
            </h3>
            <p className="text-xs text-slate-400">
              Visual mapping of assets, grantor powers, and distribution triggers upon death or incapacity.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold">
            All Deeds In Sync
          </span>
        </div>

        {/* Diagram Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {/* Node 1: Grantors */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Step 1: Origin</span>
            <h4 className="font-bold text-sm text-white">
              Alex &amp; Taylor Morgan
            </h4>
            <p className="text-xs text-slate-400">Grantors &amp; Primary Asset Owners</p>
            <div className="pt-2 text-[11px] text-blue-400 font-semibold flex items-center gap-1">
              <span>Full Revocable Control</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Node 2: Revocable Trust */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Step 2: Primary Hub</span>
            <h4 className="font-bold text-sm text-white">
              Morgan Revocable Trust
            </h4>
            <p className="text-xs text-slate-400">Avoids Probate · Holds $2.10M</p>
            <div className="pt-2 text-[11px] text-blue-400 font-semibold flex items-center gap-1">
              <span>Pour-over Will Sub-trusts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Node 3: Dynasty & Gifting */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex flex-col justify-between space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300">
              Step 3: Multi-Gen Vault
            </span>
            <h4 className="font-bold text-sm text-white">
              Dynasty Trust (Delaware)
            </h4>
            <p className="text-xs text-slate-400">GST-Exempt · Generation Skipping</p>
            <div className="pt-2 text-[11px] text-blue-400 font-semibold flex items-center gap-1">
              <span>Perpetual Protection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Node 4: Beneficiaries & Giving */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Step 4: Legacy</span>
            <h4 className="font-bold text-sm text-white">
              Lucas, Sophia &amp; DAF
            </h4>
            <p className="text-xs text-slate-400">Educational milestones &amp; Charity</p>
            <div className="pt-2 text-[11px] text-blue-400 font-semibold">
              <span>Disbursement at Age 25/30</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Beneficiary Designation Audit Table */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white">
              Beneficiary Designation Audit
            </h3>
            <p className="text-xs text-slate-400">
              Reconciliation against Charles Schwab, Morgan Stanley, and retirement custodial records.
            </p>
          </div>
          <span className="text-xs text-blue-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            All 5 Accounts Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white/5 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3 rounded-l-lg">Account</th>
                <th className="py-3 px-3">Primary Beneficiary</th>
                <th className="py-3 px-3 text-right">Allocation</th>
                <th className="py-3 px-3">Contingent Beneficiary</th>
                <th className="py-3 px-3">Last Verified</th>
                <th className="py-3 px-3 text-center rounded-r-lg">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {BENEFICIARIES_LIST.map(b => (
                <tr key={b.id} className="hover:bg-white/10 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{b.account || b.linkedAccount}</td>
                  <td className="py-3 px-3 text-slate-200">{b.primaryBeneficiary || b.name}</td>
                  <td className="py-3 px-3 text-right font-bold text-blue-400">{b.allocationPct ? `${b.allocationPct}%` : (b.allocation || '100%')}</td>
                  <td className="py-3 px-3 text-slate-400">{b.contingent || 'Contingent Trust'}</td>
                  <td className="py-3 px-3 text-slate-400">{b.lastVerified || 'Aug 14, 2026'}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'Synced' || b.verified
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                          : 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
                      }`}
                    >
                      {b.status || (b.verified ? 'Synced' : 'Review Needed')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Philanthropic Giving Radar & Appreciated Stock Gifting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* DAF Summary Card (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Donor-Advised Fund (DAF)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold">
                Fidelity Charitable
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              $320,000 Balance
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Grants disbursed: <strong className="text-white">$45,000 YTD</strong> across 4 non-profit partners.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Next Scheduled Grant:</span>
              <span className="font-bold text-slate-200">$10,000 · Mayo Clinic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date:</span>
              <span className="text-slate-300">November 15, 2026</span>
            </div>
          </div>

          <button
            onClick={() =>
              addToast(
                'DAF Grant Portal Opened',
                'Connecting to Fidelity Charitable grant recommendation module.',
                'info'
              )
            }
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all flex items-center justify-center gap-1.5"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Recommend Grant</span>
          </button>
        </div>

        {/* Appreciated Stock Gifting Calculator (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Tax-Smart Philanthropy
              </span>
              <span className="text-xs font-bold text-blue-400">Zero Capital Gain</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Direct Appreciated Stock Gifting
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Donating highly appreciated shares (e.g. Apple or Microsoft) directly to your DAF eliminates capital gains taxes and provides an immediate fair-market value charitable deduction.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-400">Candidate Lot:</span>
              <span className="font-bold text-slate-200">AAPL (Cost basis $129.20 · Current $228.50)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Gains Tax Avoided on $50K Gift:</span>
              <span className="font-bold text-emerald-400">+$11,900</span>
            </div>
          </div>

          <button
            onClick={() =>
              addToast(
                'Stock Gifting Transfer Form Prepared',
                'Schwab direct DTC transfer letter of authorization generated for $25,000 AAPL shares.',
                'success'
              )
            }
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Generate Stock Gifting Form</span>
          </button>
        </div>
      </div>
    </div>
  );
};
