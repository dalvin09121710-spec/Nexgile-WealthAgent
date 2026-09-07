import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  LayoutDashboard,
  PieChart,
  Target,
  Receipt,
  HeartHandshake,
  PiggyBank,
  UserCheck,
  Briefcase,
  FolderOpen,
  MessageSquare,
  FileBarChart,
  ArrowLeftRight,
  Settings,
  Sliders,
  Calendar,
  Upload,
  Sun,
  Moon,
  X,
  ArrowRight
} from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'View As';
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setRebalanceModalOpen,
    setScheduleMeetingModalOpen,
    setUploadModalOpen,
    toggleTheme,
    setViewAs,
    addToast
  } = useApp();

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: PaletteItem[] = [
    // Navigation
    {
      id: 'nav-overview',
      title: 'Go to Overview Dashboard',
      category: 'Navigation',
      icon: LayoutDashboard,
      action: () => navigate('/')
    },
    {
      id: 'nav-portfolio',
      title: 'Go to Portfolio & Asset Allocation',
      category: 'Navigation',
      icon: PieChart,
      action: () => navigate('/portfolio')
    },
    {
      id: 'nav-goals',
      title: 'Go to Goals & Financial Planning',
      category: 'Navigation',
      icon: Target,
      action: () => navigate('/goals')
    },
    {
      id: 'nav-tax',
      title: 'Go to Tax Center & Harvesting Radar',
      category: 'Navigation',
      icon: Receipt,
      action: () => navigate('/tax-center')
    },
    {
      id: 'nav-estate',
      title: 'Go to Estate & Charitable Giving',
      category: 'Navigation',
      icon: HeartHandshake,
      action: () => navigate('/estate-giving')
    },
    {
      id: 'nav-retirement',
      title: 'Go to Retirement Plans (Plan Sponsor)',
      category: 'Navigation',
      icon: PiggyBank,
      action: () => navigate('/retirement-plans')
    },
    {
      id: 'nav-participant',
      title: 'Go to Participant Experience',
      category: 'Navigation',
      icon: UserCheck,
      action: () => navigate('/participant')
    },
    {
      id: 'nav-advisor',
      title: 'Go to Advisor Workstation (RIA Desk)',
      category: 'Navigation',
      icon: Briefcase,
      action: () => navigate('/advisor-workstation')
    },
    {
      id: 'nav-docs',
      title: 'Go to Documents & Encrypted Vault',
      category: 'Navigation',
      icon: FolderOpen,
      action: () => navigate('/documents')
    },
    {
      id: 'nav-messages',
      title: 'Go to Messages & Advisory Desk',
      category: 'Navigation',
      icon: MessageSquare,
      action: () => navigate('/messages')
    },
    {
      id: 'nav-reports',
      title: 'Go to Reports & Fiduciary Disclosures',
      category: 'Navigation',
      icon: FileBarChart,
      action: () => navigate('/reports')
    },
    {
      id: 'nav-integrations',
      title: 'Go to Integrations & Custodians',
      category: 'Navigation',
      icon: ArrowLeftRight,
      action: () => navigate('/integrations')
    },
    {
      id: 'nav-settings',
      title: 'Go to Settings & Preferences',
      category: 'Navigation',
      icon: Settings,
      action: () => navigate('/settings')
    },
    // Actions
    {
      id: 'act-rebalance',
      title: 'Authorize Portfolio Rebalance',
      category: 'Actions',
      icon: Sliders,
      action: () => setRebalanceModalOpen(true)
    },
    {
      id: 'act-schedule',
      title: 'Schedule Fiduciary Review Call',
      category: 'Actions',
      icon: Calendar,
      action: () => setScheduleMeetingModalOpen(true)
    },
    {
      id: 'act-upload',
      title: 'Upload Fiduciary Document',
      category: 'Actions',
      icon: Upload,
      action: () => setUploadModalOpen(true)
    },
    {
      id: 'act-theme',
      title: 'Toggle Light / Dark Mode',
      category: 'Actions',
      icon: Sun,
      action: () => toggleTheme()
    },
    // View As
    {
      id: 'role-client',
      title: 'View As: Private Client (Alex Morgan)',
      category: 'View As',
      icon: UserCheck,
      action: () => {
        setViewAs('Private Client');
        navigate('/');
        addToast('Switched to Private Client View', 'Displaying Alex Morgan household assets.', 'info');
      }
    },
    {
      id: 'role-advisor',
      title: 'View As: Advisor (Marcus Vance, CFP®)',
      category: 'View As',
      icon: Briefcase,
      action: () => {
        setViewAs('Advisor');
        navigate('/advisor-workstation');
        addToast('Switched to Advisor View', 'Displaying RIA practice management workstation.', 'info');
      }
    },
    {
      id: 'role-sponsor',
      title: 'View As: Plan Sponsor (Apex Tech)',
      category: 'View As',
      icon: PiggyBank,
      action: () => {
        setViewAs('Plan Sponsor');
        navigate('/retirement-plans');
        addToast('Switched to Plan Sponsor View', 'Displaying 401(k) committee fiduciary oversight.', 'info');
      }
    },
    {
      id: 'role-participant',
      title: 'View As: Participant (Lucas Morgan)',
      category: 'View As',
      icon: UserCheck,
      action: () => {
        setViewAs('Participant');
        navigate('/participant');
        addToast('Switched to Participant View', 'Displaying 401(k) employee portal.', 'info');
      }
    }
  ];

  const filtered = items.filter(
    item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: PaletteItem) => {
    setCommandPaletteOpen(false);
    item.action();
  };

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="fixed inset-0" onClick={() => setCommandPaletteOpen(false)} />
      <div className="relative w-full max-w-xl bg-slate-900/85 backdrop-blur-xl rounded-2xl shadow-[0_16px_48px_0_rgba(0,0,0,0.5)] border border-white/15 overflow-hidden z-10 flex flex-col text-white">
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <Search className="w-5 h-5 text-blue-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command or search sections (e.g. tax, rebalance, advisor)..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 text-slate-300 group-hover:text-blue-300 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-950/40 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or arrow keys</span>
          <span className="font-mono text-[10px] bg-white/10 border border-white/10 px-1.5 py-0.5 rounded text-slate-300">
            ESC to close
          </span>
        </div>
      </div>
    </div>
  );
};
