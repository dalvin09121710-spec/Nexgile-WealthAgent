import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  Sliders,
  Sparkles,
  Printer,
  Share2,
  Clock,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ReportTemplate {
  id: string;
  title: string;
  category: string;
  pages: number;
  description: string;
  lastGenerated: string;
  format: 'PDF' | 'CSV' | 'XLSX';
}

const REPORT_CATALOG: ReportTemplate[] = [
  {
    id: 'rep-1',
    title: 'Executive Wealth & Attribution Dossier',
    category: 'Executive',
    pages: 14,
    description: 'Comprehensive net worth balance sheet, time-weighted returns, Sharpe ratio, and sector attribution.',
    lastGenerated: 'Today, 08:30 AM',
    format: 'PDF'
  },
  {
    id: 'rep-2',
    title: 'Tax Alpha & Harvesting Schedule D Reconciliation',
    category: 'Tax',
    pages: 8,
    description: 'Realized gains ledger, harvested loss carryforwards, and proxy swap basis tracking.',
    lastGenerated: 'Yesterday',
    format: 'PDF'
  },
  {
    id: 'rep-3',
    title: 'Investment Policy Statement (IPS) Audit Report',
    category: 'Fiduciary',
    pages: 10,
    description: 'Verification of asset allocation corridor boundaries, risk tolerance alignment, and liquidity testing.',
    lastGenerated: 'Sep 01, 2026',
    format: 'PDF'
  },
  {
    id: 'rep-4',
    title: 'Estate Hierarchy & Beneficiary Flow Audit',
    category: 'Estate',
    pages: 6,
    description: 'Entity mapping, grantor powers, Delaware dynasty trust digest, and TOD custodial designations.',
    lastGenerated: 'Aug 28, 2026',
    format: 'PDF'
  },
  {
    id: 'rep-5',
    title: 'ERISA 404(c) Fiduciary Governance Dossier',
    category: 'Retirement',
    pages: 22,
    description: 'DOL Form 5500 compliance, fee benchmarking vs industry peers, and quarterly watchlist minutes.',
    lastGenerated: 'Aug 15, 2026',
    format: 'PDF'
  }
];

export const ReportsPage: React.FC = () => {
  const { addToast } = useApp();

  const [selectedModules, setSelectedModules] = useState<string[]>([
    'performance',
    'allocation',
    'tax',
    'holdings'
  ]);
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'CSV' | 'SLIDES'>('PDF');
  const [selectedHorizon, setSelectedHorizon] = useState('YTD');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleModule = (mod: string) => {
    setSelectedModules(prev =>
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  const handleGenerateCustom = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      addToast(
        'Executive Fiduciary Report Generated',
        `Compiled ${selectedModules.length} analytical modules into an institutional ${selectedFormat} report.`,
        'success'
      );
    }, 1200);
  };

  const handleDownloadTemplate = (rep: ReportTemplate) => {
    addToast(
      'Report Download Ready',
      `Decrypted and downloaded "${rep.title}" (${rep.pages} pages, ${rep.format}).`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Reports &amp; Disclosures
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              Institutional Reporting
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Generate audited financial summaries, tax schedules, and fiduciary compliance packets.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() =>
              addToast(
                'Batch Archive Downloaded',
                'All 5 standard Q3 executive reports compiled into unified binder.',
                'info'
              )
            }
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Complete Q3 Binder</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Custom Report Compiler Engine */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Custom Report Builder &amp; Compiler
            </h3>
            <p className="text-xs text-slate-400">
              Select analytical modules, time horizon, and format to assemble an executive packet.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold">
            Live Reconciled Data
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Column 1: Analytical Modules */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              1. Analytical Modules
            </span>
            <div className="space-y-1.5">
              {[
                { id: 'performance', label: 'Portfolio Performance & Alpha' },
                { id: 'allocation', label: 'Multi-Asset Class Allocation & Drift' },
                { id: 'tax', label: 'Tax-Loss Harvesting & Lot Ledger' },
                { id: 'holdings', label: 'Detailed Holdings & Cost Basis' },
                { id: 'estate', label: 'Estate Hierarchy & Trust Mapping' },
                { id: 'governance', label: 'Fiduciary IPS Compliance Audit' }
              ].map(item => {
                const checked = selectedModules.includes(item.id);
                return (
                  <label
                    key={item.id}
                    onClick={() => toggleModule(item.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      checked
                        ? 'bg-blue-500/20 border-blue-500/40 text-white font-medium'
                        : 'border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        checked ? 'bg-blue-600 text-white' : 'border border-white/20'
                      }`}
                    >
                      {checked && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Column 2: Horizon & Benchmarking */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              2. Time Horizon &amp; Benchmark
            </span>
            <div className="space-y-2">
              <div className="space-y-1">
                <span className="text-xs text-slate-400">Reporting Window:</span>
                <select
                  value={selectedHorizon}
                  onChange={e => setSelectedHorizon(e.target.value)}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-blue-500/50"
                >
                  <option value="YTD" className="bg-slate-900 text-white">Year-to-Date (2026)</option>
                  <option value="1Y" className="bg-slate-900 text-white">Trailing 12 Months (1Y)</option>
                  <option value="3Y" className="bg-slate-900 text-white">Trailing 3 Years (3Y)</option>
                  <option value="INCEPTION" className="bg-slate-900 text-white">Since Inception (2021)</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400">Benchmark Model:</span>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="font-bold text-white block">
                    70/30 Global Growth Index
                  </span>
                  <span className="text-[11px] text-slate-400">
                    MSCI ACWI (70%) + Bloomberg US Agg (30%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Output Format & Assembly */}
          <div className="space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                3. Deliverable Format
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['PDF', 'CSV', 'SLIDES'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      selectedFormat === fmt
                        ? 'bg-blue-600 text-white border-transparent shadow-md shadow-blue-500/25'
                        : 'border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Estimated Length:</span>
                <span className="font-bold text-white">
                  {selectedModules.length * 2 + 2} Pages
                </span>
              </div>
              <button
                onClick={handleGenerateCustom}
                disabled={isGenerating || selectedModules.length === 0}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
              >
                {isGenerating ? (
                  <span>Compiling Real-Time Analytics...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Compile &amp; Download Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pre-Compiled Fiduciary Reports Catalog */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Standard Quarterly Reporting Catalog
            </h3>
            <p className="text-xs text-slate-400">
              Audited quarterly packages compiled for client reviews, tax filing, and trust administration.
            </p>
          </div>
          <span className="text-xs text-slate-400">All Signatures Verified</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white/5 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3 rounded-l-lg">Report Title</th>
                <th className="py-3 px-3">Classification</th>
                <th className="py-3 px-3 text-center">Pages</th>
                <th className="py-3 px-3">Last Generated</th>
                <th className="py-3 px-3 text-center rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {REPORT_CATALOG.map(rep => (
                <tr key={rep.id} className="hover:bg-white/10 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white">{rep.title}</div>
                    <div className="text-[11px] text-slate-400 max-w-md truncate">{rep.description}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300">
                      {rep.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-white">
                    {rep.pages}
                  </td>
                  <td className="py-3 px-3 text-slate-400">{rep.lastGenerated}</td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleDownloadTemplate(rep)}
                      className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-400" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
