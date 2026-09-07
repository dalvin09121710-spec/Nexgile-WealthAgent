import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
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
  ShieldCheck,
  X,
  LogOut
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { useApp } from '../../context/AppContext';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'Portfolio', path: '/portfolio', icon: PieChart },
  { name: 'Goals & Planning', path: '/goals-and-planning', icon: Target },
  { name: 'Tax Center', path: '/tax-center', icon: Receipt, badge: '3 Ops', badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300' },
  { name: 'Estate & Giving', path: '/estate-and-giving', icon: HeartHandshake },
  { name: 'Retirement Plans', path: '/retirement-plans', icon: PiggyBank },
  { name: 'Participant', path: '/participant', icon: UserCheck, badge: '84%', badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' }
];

const SECONDARY_NAV_ITEMS: NavItem[] = [
  { name: 'Advisor Workstation', path: '/advisor-workstation', icon: Briefcase, badge: '4 Urgent', badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300' },
  { name: 'Documents', path: '/documents', icon: FolderOpen, badge: 'Vault', badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  { name: 'Messages', path: '/messages', icon: MessageSquare, badge: '2', badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300' },
  { name: 'Reports', path: '/reports', icon: FileBarChart },
  { name: 'Integrations', path: '/integrations', icon: ArrowLeftRight, badge: '9/9', badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' },
  { name: 'Settings', path: '/settings', icon: Settings }
];

export const Sidebar: React.FC = () => {
  const { mobileNavOpen, setMobileNavOpen, viewAs, setScheduleMeetingModalOpen, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const renderNavLinks = (items: NavItem[]) => {
    return items.map(item => {
      const Icon = item.icon;
      const isEstate = item.path === '/estate-and-giving' && (
        location.pathname === '/estate-and-giving' ||
        location.pathname === '/estate-giving' ||
        location.pathname === '/estate' ||
        location.pathname.startsWith('/estate')
      );
      const isGoals = item.path === '/goals-and-planning' && (
        location.pathname === '/goals-and-planning' ||
        location.pathname === '/goals' ||
        location.pathname.startsWith('/goals')
      );
      const isTax = item.path === '/tax-center' && (
        location.pathname === '/tax-center' ||
        location.pathname === '/tax' ||
        location.pathname.startsWith('/tax')
      );

      const isActive = item.path === '/' 
        ? location.pathname === '/' || location.pathname === '/overview'
        : (isEstate || isGoals || isTax || location.pathname.startsWith(item.path));

      return (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => setMobileNavOpen(false)}
          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
            isActive
              ? 'bg-white/10 text-blue-400 font-medium border border-white/10 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
            <span className="truncate">{item.name}</span>
          </div>
          {item.badge && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold tracking-wide shrink-0 ${
              isActive 
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                : 'bg-white/5 text-slate-300 border border-white/10'
            }`}>
              {item.badge}
            </span>
          )}
        </NavLink>
      );
    });
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
          <BrandLogo className="h-8 w-auto" />
          {mobileNavOpen && (
            <button
              onClick={() => setMobileNavOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* View As Persona Ribbon Indicator */}
        <div className="px-3 py-2 mx-3 my-2.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">
              Active Persona
            </span>
            <span className="text-[11px] font-semibold text-blue-300 truncate">
              {viewAs}
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        </div>

        {/* Primary Navigation Groups */}
        <div className="px-3 py-1 space-y-1">
          {renderNavLinks(PRIMARY_NAV_ITEMS)}
        </div>

        <div className="my-2 px-4">
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* Secondary Navigation Groups */}
        <div className="px-3 py-1 space-y-1">
          {renderNavLinks(SECONDARY_NAV_ITEMS)}
        </div>
      </div>

      {/* Bottom Advisor & Fiduciary Status Card */}
      <div className="p-3 m-3 rounded-xl bg-slate-800/50 backdrop-blur-md border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="truncate">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Lead Advisor</p>
            <p className="font-semibold text-slate-200 truncate">Marcus Vance, CFP®</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setScheduleMeetingModalOpen(true)}
          className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer underline flex items-center gap-1 font-medium pt-0.5"
        >
          Schedule Meeting &rarr;
        </button>

        <div className="pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              setMobileNavOpen(false);
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-slate-900/60 backdrop-blur-xl z-40 flex-col border-r border-white/10 shadow-[4px_0_30px_rgba(0,0,0,0.3)] overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop and Sidebar */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative w-64 max-w-[85vw] h-full bg-slate-900/90 backdrop-blur-2xl border-r border-white/10 shadow-2xl flex flex-col z-10 overflow-y-auto">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
