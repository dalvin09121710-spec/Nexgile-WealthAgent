import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  ShieldCheck,
  Building,
  CheckCircle2,
  Calendar,
  FileText,
  Mail,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export const Client360Drawer: React.FC = () => {
  const { clientDrawerProfile, setClientDrawerProfile, setScheduleMeetingModalOpen, addToast } = useApp();

  if (!clientDrawerProfile) return null;

  const handleAction = (msg: string) => {
    addToast('Advisor Action Executed', msg, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={() => setClientDrawerProfile(null)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl border-l border-white/10 h-full flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-2 text-blue-400">
            <User className="w-5 h-5" />
            <h3 className="font-bold text-sm text-white">
              Client 360 Relationship Dossier
            </h3>
          </div>
          <button
            onClick={() => setClientDrawerProfile(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Client Header Info */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center font-bold text-base shadow-sm">
                {clientDrawerProfile.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-base text-white">
                    {clientDrawerProfile.name}
                  </h4>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold">
                    {clientDrawerProfile.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {clientDrawerProfile.email} • {clientDrawerProfile.household}
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Last Login: {clientDrawerProfile.lastLogin}
            </span>
          </div>

          {/* Attention Alert if Any */}
          {clientDrawerProfile.requiresAttention && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-rose-300">
                  Fiduciary Action Required
                </h5>
                <p className="text-[11px] text-rose-200/80 mt-0.5 leading-snug">
                  {clientDrawerProfile.attentionReason}
                </p>
              </div>
            </div>
          )}

          {/* Key Relationship Financials (3 Metrics) */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Total AUM
              </span>
              <div className="text-base font-extrabold text-white mt-0.5">
                ${(clientDrawerProfile.aum / 1000000).toFixed(2)}M
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">
                +{clientDrawerProfile.ytdReturn}% YTD
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Health Score
              </span>
              <div className="text-base font-extrabold text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
                <span>{clientDrawerProfile.healthScore}</span>
                <span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <span className="text-[10px] text-slate-400">Tier: Excellent</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Accounts
              </span>
              <div className="text-base font-extrabold text-white mt-0.5">
                {clientDrawerProfile.accountsCount} Custodied
              </div>
              <span className="text-[10px] text-slate-400 truncate block">
                {clientDrawerProfile.custodians}
              </span>
            </div>
          </div>

          {/* Custodial Accounts Overview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Custodial Account Sleeves
              </h5>
              <span className="text-xs text-emerald-400 font-medium">
                Real-Time Feeds Active
              </span>
            </div>
            <div className="divide-y divide-white/10 rounded-xl bg-white/5 border border-white/10 p-2 text-xs">
              <div className="py-2 px-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">
                    Taxable Brokerage Sleeve
                  </span>
                  <span className="block text-[11px] text-slate-400">Charles Schwab • #4912</span>
                </div>
                <span className="font-bold text-white">$6,200,000</span>
              </div>
              <div className="py-2 px-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">
                    Morgan Revocable Living Trust
                  </span>
                  <span className="block text-[11px] text-slate-400">Morgan Stanley • #8819</span>
                </div>
                <span className="font-bold text-white">$2,850,000</span>
              </div>
              <div className="py-2 px-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">
                    OmniCorp Exec 401(k) / Roth
                  </span>
                  <span className="block text-[11px] text-slate-400">Fidelity RTS • #3011</span>
                </div>
                <span className="font-bold text-white">$184,620</span>
              </div>
              <div className="py-2 px-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">
                    Philanthropic DAF
                  </span>
                  <span className="block text-[11px] text-slate-400">Vanguard Charitable • #5520</span>
                </div>
                <span className="font-bold text-white">$415,200</span>
              </div>
            </div>
          </div>

          {/* Household Members */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Household Governance &amp; Advisory Team
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-white block">
                  Eleanor Morgan
                </span>
                <span className="text-[11px] text-slate-400">Spouse &amp; Primary Co-Trustee</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-white block">
                  Lucas (16) &amp; Sophia (12)
                </span>
                <span className="text-[11px] text-slate-400">529 &amp; Dynasty Trust Beneficiaries</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-white block">
                  Sarah Jenkins, CPA
                </span>
                <span className="text-[11px] text-slate-400">Deloitte Private Wealth Tax</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-white block">
                  Harrison Cole, Esq.
                </span>
                <span className="text-[11px] text-slate-400">Kirkland &amp; Ellis Estate Counsel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Action Bar */}
        <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between gap-2">
          <button
            onClick={() => handleAction(`Generated client executive portfolio report for ${clientDrawerProfile.name}`)}
            className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
          <button
            onClick={() => {
              setClientDrawerProfile(null);
              setScheduleMeetingModalOpen(true);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
