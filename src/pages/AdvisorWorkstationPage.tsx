import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Search,
  Filter,
  Sliders,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CLIENT_HOUSEHOLDS } from '../data/mockData';
import { ClientHousehold } from '../types';

export const AdvisorWorkstationPage: React.FC = () => {
  const {
    openClient360,
    setScheduleModalOpen,
    setRebalanceModalOpen,
    addToast,
    openExplain
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');

  const filteredClients = CLIENT_HOUSEHOLDS.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.primaryContact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.modelPortfolio.toLowerCase().includes(searchQuery.toLowerCase());

    const matchTier =
      tierFilter === 'ALL' ||
      (tierFilter === 'PRIVATE' && c.tier.includes('Private')) ||
      (tierFilter === 'HNW' && c.tier.includes('High Net Worth')) ||
      (tierFilter === 'INST' && c.tier.includes('Institutional'));

    return matchSearch && matchTier;
  });

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Advisor Workstation
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              RIA Practice Management
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Marcus Vance, CFP® · Sovereign Advisory Group · Book of Business Fiduciary Operations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setScheduleModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>Schedule Client Review</span>
          </button>
          <button
            onClick={() => setRebalanceModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Launch Batch Rebalance</span>
          </button>
        </div>
      </div>

      {/* 2. Practice Management KPIs (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total AUM */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total AUM
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold">
              +14.8% YTD
            </span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">$142.8M</div>
            <span className="text-xs text-slate-400">48 Client Households</span>
          </div>
          <span className="text-[11px] text-slate-400">Avg Household: $2.97M</span>
        </div>

        {/* Net New Assets */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Net New Assets (NNA)
            </span>
            <span className="text-[10px] text-blue-400 font-bold">2026 Inflows</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-emerald-400">+$18.4M</div>
            <span className="text-xs text-slate-400">6 New Households onboarded</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">
            Exceeded annual target (115%)
          </span>
        </div>

        {/* Fee Revenue Run-Rate */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Advisory Revenue
            </span>
            <span className="text-[10px] text-slate-400">Run-Rate</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">$785K / yr</div>
            <span className="text-xs text-slate-400">Effective blended fee: 0.55%</span>
          </div>
          <span className="text-[11px] text-slate-400">Quarterly billing cycle current</span>
        </div>

        {/* Households with Drift */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Corridor Drift
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-bold">
              Action
            </span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-rose-400">7 Accounts</div>
            <span className="text-xs text-slate-400">Drift exceeds 3.0% IPS tolerance</span>
          </div>
          <span className="text-[11px] text-rose-400 font-medium">Batch rebalancing ready</span>
        </div>

        {/* RMD Compliance */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              RMD Compliance
            </span>
            <span className="text-[10px] text-blue-400 font-bold">Age 73+ Rules</span>
          </div>
          <div className="my-1.5 flex items-baseline justify-between">
            <div className="text-2xl font-extrabold text-blue-400">96%</div>
            <span className="text-xs text-slate-400">Satisfied</span>
          </div>
          <span className="text-[11px] text-slate-400">2 pending end-of-year distributions</span>
        </div>
      </div>

      {/* 3. Advisor Action Queue (Urgent Tasks) */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Advisor Priority Action Queue
            </h3>
            <p className="text-xs text-slate-400">
              Client requests, fiduciary alerts, and trading authorizations pending signature.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-400">
            4 Urgent Follow-ups
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Item 1 */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-white">
                  Alex &amp; Taylor Morgan
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 border border-blue-500/30 text-blue-300">
                  Tax Alpha
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Approve proposed BND -&gt; AGG proxy swap to capture $6,068 tax-loss alpha.
              </p>
            </div>
            <button
              onClick={() => openClient360(CLIENT_HOUSEHOLDS[0])}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 border border-blue-400/30 transition-all shrink-0"
            >
              Open 360° View
            </button>
          </div>

          {/* Item 2 */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-white">
                  Eleanor Sterling
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 border border-rose-500/30 text-rose-300">
                  RMD Due
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                $42,000 IRA mandatory distribution due in 30 days. Custodial form pending.
              </p>
            </div>
            <button
              onClick={() => openClient360(CLIENT_HOUSEHOLDS[1])}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors shrink-0"
            >
              Review Client
            </button>
          </div>

          {/* Item 3 */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-white">
                  David Chen
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 border border-amber-500/30 text-amber-300">
                  Cash Drag
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                $450,000 cash balance in prime money market. Deploy into short treasuries.
              </p>
            </div>
            <button
              onClick={() => openClient360(CLIENT_HOUSEHOLDS[2])}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors shrink-0"
            >
              Review Client
            </button>
          </div>

          {/* Item 4 */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-white">
                  Apex Tech 401(k) Committee
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 border border-white/10 text-slate-300">
                  Committee
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Quarterly fiduciary committee meeting scheduled for Nov 18. Packets compiled.
              </p>
            </div>
            <button
              onClick={() => addToast('Opening 401(k) Meeting Packet', 'Governance committee agenda prepared.', 'info')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors shrink-0"
            >
              View Agenda
            </button>
          </div>
        </div>
      </div>

      {/* 4. Client Household Directory Table */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Client Household Roster
            </h3>
            <p className="text-xs text-slate-400">
              Click any client row to open their real-time Client 360° Diagnostic Drawer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search households, contacts, models..."
                className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Tier Filter */}
            <select
              value={tierFilter}
              onChange={e => setTierFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-white/10 rounded-xl text-xs font-medium text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Client Tiers</option>
              <option value="PRIVATE">Private Wealth Tier ($3M+)</option>
              <option value="HNW">High Net Worth Tier ($1M-$3M)</option>
              <option value="INST">Institutional / 401(k)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white/5 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3 rounded-l-lg">Household</th>
                <th className="py-3 px-3">Tier</th>
                <th className="py-3 px-3 text-right">AUM</th>
                <th className="py-3 px-3">Model Mandate</th>
                <th className="py-3 px-3 text-center">Drift</th>
                <th className="py-3 px-3">Last Meeting</th>
                <th className="py-3 px-3 text-center">Score</th>
                <th className="py-3 px-3 text-center rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredClients.map(c => (
                <tr
                  key={c.id}
                  onClick={() => openClient360(c)}
                  className="hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3">
                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                      {c.name}
                    </div>
                    <div className="text-[11px] text-slate-400">{c.primaryContact}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 border border-white/10 text-slate-300">
                      {c.tier}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-white">
                    ${(c.aum / 1000000).toFixed(2)}M
                  </td>
                  <td className="py-3 px-3 text-slate-300">{c.modelPortfolio}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.driftStatus === 'In Corridor'
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {c.driftStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{c.lastMeetingDate}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-blue-400">{c.healthScore}/100</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        openClient360(c);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-blue-400"
                      title="Open 360 View"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredClients.length} of {CLIENT_HOUSEHOLDS.length} active client households</span>
          <span className="text-blue-400 font-semibold">
            Schwab Institutional &amp; Fidelity Wealth Feeds Live
          </span>
        </div>
      </div>
    </div>
  );
};
