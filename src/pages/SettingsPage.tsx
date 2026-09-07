import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Moon,
  Sun,
  Laptop,
  CheckCircle2,
  Key,
  Smartphone,
  Lock,
  FileText,
  Save,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PersonaType } from '../types';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme, persona, setPersona, addToast } = useApp();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [tradeConfirms, setTradeConfirms] = useState(true);
  const [washSaleAlerts, setWashSaleAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('15');

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(
      'Fiduciary Preferences Saved',
      'Account settings, notification preferences, and session controls updated.',
      'success'
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Settings &amp; Preferences
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              Security &amp; System
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Manage your personal profile, security credentials, notification channels, and platform theme.
          </p>
        </div>

        <button
          onClick={handleSavePreferences}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all self-start lg:self-auto"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* 2. Client Profile Card */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <h3 className="text-base font-bold text-white">
          Personal Profile &amp; Fiduciary Tier
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-xl shrink-0 shadow-md shadow-blue-500/25">
            AM
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white">
                Alex &amp; Taylor Morgan
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold">
                Private Wealth Tier ($3M+)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Account ID: #NW-89241-PW · Custodians: Charles Schwab &amp; Northern Trust
            </p>
            <p className="text-xs text-slate-400">
              Primary Advisor: <strong className="text-slate-200">Marcus Vance, CFP®</strong> (Sovereign Advisory Group)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
            <span className="font-semibold text-slate-200">alex.morgan@nexgile-demo.com</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Number</span>
            <span className="font-semibold text-slate-200">+1 (415) 892-4190</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Legal Domicile</span>
            <span className="font-semibold text-slate-200">Delaware (Dynasty Trust) / CA</span>
          </div>
        </div>
      </div>

      {/* 3. Demo Persona "View As" Quick Switcher */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Demo Persona Switcher (&ldquo;View As&rdquo;)
            </h3>
            <p className="text-xs text-slate-400">
              Quickly switch between stakeholder perspectives to test fiduciary capabilities across personas.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-400">
            Active: {persona}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {[
            {
              id: 'client' as PersonaType,
              title: 'Private Client',
              desc: 'Alex Morgan ($4.82M Net Worth)',
              route: '/'
            },
            {
              id: 'advisor' as PersonaType,
              title: 'Financial Advisor',
              desc: 'Marcus Vance, CFP® ($142.8M AUM)',
              route: '/advisor-workstation'
            },
            {
              id: 'sponsor' as PersonaType,
              title: 'Plan Sponsor',
              desc: 'Apex Tech 401(k) Committee ($48.2M)',
              route: '/retirement-plans'
            },
            {
              id: 'participant' as PersonaType,
              title: 'Participant',
              desc: 'Lucas Morgan, 401(k) Member ($148K)',
              route: '/participant'
            }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => {
                setPersona(p.id);
                addToast(
                  `Switched Persona: ${p.title}`,
                  `Perspective reconfigured for ${p.desc}.`,
                  'info'
                );
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                persona === p.id
                  ? 'border-blue-500/50 bg-blue-500/20 ring-1 ring-blue-500 text-white'
                  : 'border-white/10 hover:bg-white/5 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{p.title}</span>
                {persona === p.id && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Appearance & Theme Selection */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-3">
        <h3 className="text-base font-bold text-white">
          Appearance &amp; Theme Mode
        </h3>
        <p className="text-xs text-slate-400">
          Choose your visual preference or sync automatically with your operating system.
        </p>

        <div className="grid grid-cols-3 gap-3 pt-2 max-w-md">
          <button
            onClick={() => setTheme('light')}
            className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
              theme === 'light'
                ? 'bg-blue-600 text-white border-transparent shadow-md shadow-blue-500/25'
                : 'border-white/10 text-slate-300 hover:bg-white/5'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Light</span>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
              theme === 'dark'
                ? 'bg-blue-600 text-white border-transparent shadow-md shadow-blue-500/25'
                : 'border-white/10 text-slate-300 hover:bg-white/5'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => {
              setTheme('dark');
              addToast('System Theme', 'Frosted Glass theme active.', 'info');
            }}
            className="p-3 rounded-xl border border-white/10 text-slate-300 flex items-center justify-center gap-2 text-xs font-bold hover:bg-white/5"
          >
            <Laptop className="w-4 h-4" />
            <span>Auto</span>
          </button>
        </div>
      </div>

      {/* 5. Notification & Compliance Preferences */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <h3 className="text-base font-bold text-white">
          Fiduciary Notification Channels
        </h3>

        <div className="space-y-3 max-w-xl text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
            <div>
              <span className="font-bold text-white block">
                Tax-Loss Harvesting &amp; Alpha Alerts
              </span>
              <span className="text-[11px] text-slate-400">
                Instant notification when harvestable loss opportunity exceeds $5,000 threshold.
              </span>
            </div>
            <input
              type="checkbox"
              checked={washSaleAlerts}
              onChange={e => setWashSaleAlerts(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
            <div>
              <span className="font-bold text-white block">
                Trade Confirmations &amp; Rebalances
              </span>
              <span className="text-[11px] text-slate-400">
                Direct trade execution reports and SEC trade confirmations.
              </span>
            </div>
            <input
              type="checkbox"
              checked={tradeConfirms}
              onChange={e => setTradeConfirms(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
            <div>
              <span className="font-bold text-white block">
                SMS Urgent Fiduciary Security Alerts
              </span>
              <span className="text-[11px] text-slate-400">
                High-priority notifications for wire transfers, beneficiary updates, and logins.
              </span>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={e => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* 6. Security, Authentication & Session Inactivity */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <h3 className="text-base font-bold text-white">
          Security &amp; Inactivity Policy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Two-Factor Auth (2FA)</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                Hardware FIDO2 Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              YubiKey hardware security key paired alongside Google Authenticator fallback.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Automatic Inactivity Lock</span>
              <select
                value={sessionTimeout}
                onChange={e => setSessionTimeout(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-1 text-xs font-semibold text-white focus:outline-none focus:border-blue-500/50"
              >
                <option value="15" className="bg-slate-900 text-white">15 Minutes (Recommended)</option>
                <option value="30" className="bg-slate-900 text-white">30 Minutes</option>
                <option value="60" className="bg-slate-900 text-white">60 Minutes</option>
              </select>
            </div>
            <p className="text-[11px] text-slate-400">
              Enforces SEC Fiduciary standard workstation lock during idle periods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
