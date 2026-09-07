import React, { useState } from 'react';
import {
  Search,
  RefreshCw,
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  CheckCircle,
  ExternalLink,
  LogOut,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewAsRole } from '../../types';
import { useNavigate } from 'react-router-dom';

const VIEW_AS_OPTIONS: { role: ViewAsRole; title: string; subtitle: string; defaultRoute: string }[] = [
  {
    role: 'Private Client',
    title: 'Alex Morgan',
    subtitle: 'Private Wealth Tier ($4.82M)',
    defaultRoute: '/'
  },
  {
    role: 'Advisor',
    title: 'Marcus Vance, CFP®',
    subtitle: 'Senior Wealth Lead ($1.84B AUM)',
    defaultRoute: '/advisor-workstation'
  },
  {
    role: 'Participant',
    title: 'Alex Morgan',
    subtitle: 'OmniCorp 401(k) Participant ($184K)',
    defaultRoute: '/participant'
  },
  {
    role: 'Plan Sponsor',
    title: 'Plan Sponsor Committee',
    subtitle: 'OmniCorp 401(k) Master Plan ($284.6M)',
    defaultRoute: '/retirement-plans'
  },
  {
    role: 'Compliance',
    title: 'Fiduciary Compliance Officer',
    subtitle: 'SEC / ERISA §404(c) Surveillance',
    defaultRoute: '/reports'
  }
];

export const TopHeader: React.FC = () => {
  const {
    user,
    logout,
    viewAs,
    setViewAs,
    theme,
    toggleTheme,
    lastUpdated,
    triggerRefresh,
    isRefreshing,
    setCommandPaletteOpen,
    setMobileNavOpen,
    addToast
  } = useApp();

  const [viewAsDropdownOpen, setViewAsDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const currentOption = VIEW_AS_OPTIONS.find(opt => opt.role === viewAs) || VIEW_AS_OPTIONS[0];

  const displayName = user?.name || currentOption.title;
  const displayRole = user?.role || viewAs;
  const displayEmail = user?.email || 'demo@nexgile.com';
  const displayInitials = user?.avatarInitials || displayName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  const handleRoleChange = (opt: typeof VIEW_AS_OPTIONS[0]) => {
    setViewAs(opt.role);
    setViewAsDropdownOpen(false);
    addToast(`Switched Persona: ${opt.role}`, `Now viewing workspace as ${opt.title} (${opt.subtitle})`, 'info');
    navigate(opt.defaultRoute);
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-slate-900/40 backdrop-blur-xl z-30 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.25)] select-none">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger & Search input */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search Bar / Command Palette Trigger */}
          <div
            onClick={() => setCommandPaletteOpen(true)}
            className="relative w-full flex items-center cursor-pointer group"
          >
            <Search className="absolute left-3 w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Search portfolio, holdings, tax alpha, documents... (Cmd+K)"
              className="w-full pl-9 pr-20 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none cursor-pointer transition-all border border-white/10 hover:border-white/20"
            />
            <div className="absolute right-2.5 flex items-center pointer-events-none">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-slate-300 text-[10px] font-semibold tracking-wider">
                Ctrl + K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right: Actions, View As selector, Theme, Profile */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Last Updated badge */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>{lastUpdated}</span>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={triggerRefresh}
            title="Refresh Live Feeds"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
          </button>

          {/* Notifications Trigger & Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(prev => !prev)}
              className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-slate-900">
                4
              </span>
            </button>

            {/* Notifications Popover */}
            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-50 p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">
                        Priority Notifications
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                        4 Urgent
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setNotificationsOpen(false);
                        addToast('Notifications Cleared', 'All pending alerts marked as acknowledged.', 'info');
                      }}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="divide-y divide-white/5 max-h-72 overflow-y-auto mt-2">
                    <div className="py-2.5 flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-200">
                          Tax-Loss Harvesting Alert ($18,420 Alpha)
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          BND & Emerging Markets lots eligible for proxy swap
                        </p>
                      </div>
                    </div>
                    <div className="py-2.5 flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-200">
                          2026 Restated POA Pending Signature
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          Remote ink signature due before 2:00 PM session
                        </p>
                      </div>
                    </div>
                    <div className="py-2.5 flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-200">
                          Fiduciary Form 5500 Audit Signed
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          KPMG LLP certified report ready for transmission
                        </p>
                      </div>
                    </div>
                    <div className="py-2.5 flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.8)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-200">
                          Upcoming Meeting with Marcus Vance, CFP®
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          Today at 2:00 PM EST in Boston Boardroom & Zoom #418
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          <div className="h-6 w-px bg-white/10 hidden sm:block mx-1" />

          {/* "View As" Persona Selector Dropdown (Frosted Glass Pill) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setViewAsDropdownOpen(prev => !prev)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer transition-all"
            >
              <span className="text-[11px] text-slate-400">View As:</span>
              <span className="text-xs font-medium text-white">{viewAs}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {/* Dropdown Menu */}
            {viewAsDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setViewAsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-50 p-2 space-y-1">
                  <div className="px-3 py-2 border-b border-white/10">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Switch Role Context
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Change perspective across private client, advisor, or plan sponsor.
                    </p>
                  </div>
                  {VIEW_AS_OPTIONS.map(opt => {
                    const isCurrent = opt.role === viewAs;
                    return (
                      <button
                        key={opt.role}
                        type="button"
                        onClick={() => handleRoleChange(opt)}
                        className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                          isCurrent
                            ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300 font-semibold'
                            : 'hover:bg-white/5 text-slate-300'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">{opt.role}</span>
                          <span className="text-[11px] text-slate-400 truncate">
                            {opt.subtitle}
                          </span>
                        </div>
                        {isCurrent && <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* User Profile Capsule & Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserMenuOpen(prev => !prev)}
              className="flex items-center gap-2.5 pl-1 p-1 rounded-xl hover:bg-white/5 transition-colors cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-indigo-500/25 shrink-0">
                {displayInitials}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-medium text-white leading-tight">
                  {displayName}
                </span>
                <span className="text-[10px] text-blue-400 font-medium">
                  {displayRole}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5 hidden md:block" />
            </button>

            {/* Profile Dropdown */}
            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-50 p-2 space-y-1 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2.5 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-indigo-500/25 shrink-0">
                        {displayInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{displayName}</p>
                        <p className="text-[11px] text-slate-400 truncate">{displayEmail}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                        {displayRole}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Session Active
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/settings');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>Account Settings</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-white/10">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-200 hover:bg-rose-500/10 transition-colors flex items-center gap-2.5 cursor-pointer font-medium"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
