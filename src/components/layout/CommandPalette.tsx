import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  X,
  Target,
  PieChart,
  Receipt,
  HeartHandshake,
  PiggyBank,
  Briefcase,
  FolderOpen,
  MessageSquare,
  FileBarChart,
  ArrowLeftRight,
  Settings,
  Scale,
  Upload,
  Calendar,
  Layers
} from 'lucide-react';
import { HOLDINGS_LIST } from '../../data/mockData';

interface SearchOption {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Holding' | 'Action' | 'Client';
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setRebalanceModalOpen,
    setUploadModalOpen,
    setScheduleMeetingModalOpen,
    addToast
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const allOptions: SearchOption[] = useMemo(() => [
    // Navigation items
    {
      id: 'nav-overview',
      title: 'Overview',
      subtitle: 'Net Worth $4.82M, Health Score 87, Allocation',
      category: 'Navigation',
      icon: Layers,
      action: () => navigate('/')
    },
    {
      id: 'nav-portfolio',
      title: 'Portfolio & Holdings',
      subtitle: '$3.64M Invested, 28 holdings, Drift analysis',
      category: 'Navigation',
      icon: PieChart,
      action: () => navigate('/portfolio')
    },
    {
      id: 'nav-goals',
      title: 'Goals & Planning',
      subtitle: 'Retirement (82%), Education (91%), Monte Carlo',
      category: 'Navigation',
      icon: Target,
      action: () => navigate('/goals-and-planning')
    },
    {
      id: 'nav-tax',
      title: 'Tax Center',
      subtitle: 'Tax-loss harvesting, $18.4K alpha, Wash sale alerts',
      category: 'Navigation',
      icon: Receipt,
      action: () => navigate('/tax-center')
    },
    {
      id: 'nav-estate',
      title: 'Estate & Giving',
      subtitle: 'Wills, Revocable Trust, Beneficiaries, DAF $415K',
      category: 'Navigation',
      icon: HeartHandshake,
      action: () => navigate('/estate-and-giving')
    },
    {
      id: 'nav-retire',
      title: 'Retirement Plans',
      subtitle: 'OmniCorp 401(k) Master Plan, $284.6M assets',
      category: 'Navigation',
      icon: PiggyBank,
      action: () => navigate('/retirement-plans')
    },
    {
      id: 'nav-participant',
      title: 'Participant Portal',
      subtitle: 'Account balance $184K, 8% deferral, Readiness 84%',
      category: 'Navigation',
      icon: Target,
      action: () => navigate('/participant')
    },
    {
      id: 'nav-advisor',
      title: 'Advisor Workstation',
      subtitle: '184 client households, AUM $1.84B, Marcus Vance, CFP®',
      category: 'Navigation',
      icon: Briefcase,
      action: () => navigate('/advisor-workstation')
    },
    {
      id: 'nav-docs',
      title: 'Documents Vault',
      subtitle: '48 legal, tax, and trust instruments with SHA-256 hash',
      category: 'Navigation',
      icon: FolderOpen,
      action: () => navigate('/documents')
    },
    {
      id: 'nav-messages',
      title: 'Messages & Video Meetings',
      subtitle: 'Secure communication with Marcus Vance, CFP®',
      category: 'Navigation',
      icon: MessageSquare,
      action: () => navigate('/messages')
    },
    {
      id: 'nav-reports',
      title: 'Reports Catalog',
      subtitle: 'Performance attribution, Form 5500, Custom builder',
      category: 'Navigation',
      icon: FileBarChart,
      action: () => navigate('/reports')
    },
    {
      id: 'nav-integrations',
      title: 'Integrations & Custodial Feeds',
      subtitle: 'Schwab, Morgan Stanley, Northern Trust, Salesforce FSC',
      category: 'Navigation',
      icon: ArrowLeftRight,
      action: () => navigate('/integrations')
    },
    {
      id: 'nav-settings',
      title: 'Settings & Security',
      subtitle: 'User profile, MFA, Notifications, Theme preferences',
      category: 'Navigation',
      icon: Settings,
      action: () => navigate('/settings')
    },
    // Action items
    {
      id: 'act-rebalance',
      title: 'Simulate Portfolio Rebalance',
      subtitle: 'Trim US Equities (+2.0% drift) & harvest fixed income losses',
      category: 'Action',
      icon: Scale,
      action: () => setRebalanceModalOpen(true)
    },
    {
      id: 'act-upload',
      title: 'Upload Legal / Tax Document',
      subtitle: 'Ingest into WORM encrypted custodial vault',
      category: 'Action',
      icon: Upload,
      action: () => setUploadModalOpen(true)
    },
    {
      id: 'act-meeting',
      title: 'Schedule Advisor Strategy Review',
      subtitle: 'Book 45-minute fiduciary check-in with Marcus Vance, CFP®',
      category: 'Action',
      icon: Calendar,
      action: () => setScheduleMeetingModalOpen(true)
    },
    // Holdings
    ...HOLDINGS_LIST.map(h => ({
      id: `holding-${h.ticker}`,
      title: `${h.ticker} - ${h.name}`,
      subtitle: `${h.account} • $${h.marketValue.toLocaleString()} (${h.allocationPct}%) • Gain: +$${h.gainLoss.toLocaleString()}`,
      category: 'Holding' as const,
      icon: PieChart,
      action: () => {
        navigate('/portfolio');
        addToast(`Selected Holding ${h.ticker}`, `${h.name} currently represents ${h.allocationPct}% of total wealth.`, 'info');
      }
    }))
  ], [navigate, setRebalanceModalOpen, setUploadModalOpen, setScheduleMeetingModalOpen, addToast]);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return allOptions.slice(0, 10);
    const q = query.toLowerCase();
    return allOptions.filter(
      opt => opt.title.toLowerCase().includes(q) || opt.subtitle.toLowerCase().includes(q) || opt.category.toLowerCase().includes(q)
    );
  }, [allOptions, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredOptions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!commandPaletteOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredOptions.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredOptions.length) % Math.max(1, filteredOptions.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredOptions[selectedIndex]) {
          filteredOptions[selectedIndex].action();
          setCommandPaletteOpen(false);
          setQuery('');
        }
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, filteredOptions, selectedIndex, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/50 backdrop-blur-xs">
      <div
        className="fixed inset-0"
        onClick={() => {
          setCommandPaletteOpen(false);
          setQuery('');
        }}
      />
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command, holding, client, or action..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono font-bold">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-50 dark:divide-slate-800/50 max-h-96">
          {filteredOptions.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1">Try searching for AAPL, Rebalance, Roth, or Overview</p>
            </div>
          ) : (
            filteredOptions.map((opt, idx) => {
              const Icon = opt.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    opt.action();
                    setCommandPaletteOpen(false);
                    setQuery('');
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-teal-50/80 dark:bg-teal-950/60 text-teal-950 dark:text-teal-100'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold truncate">{opt.title}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {opt.subtitle}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ml-2 ${
                      opt.category === 'Action'
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                        : opt.category === 'Holding'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {opt.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 border rounded font-mono text-[9px]">↑</kbd>{' '}
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 border rounded font-mono text-[9px]">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 border rounded font-mono text-[9px]">↵</kbd> to select
            </span>
          </div>
          <span>Nexgile Fiduciary Search Engine</span>
        </div>
      </div>
    </div>
  );
};
