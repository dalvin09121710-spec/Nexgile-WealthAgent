import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';
import { useApp } from '../context/AppContext';
import { ViewAsRole } from '../types';

const ACCOUNT_TYPES: { id: ViewAsRole; title: string; desc: string }[] = [
  { id: 'Private Client', title: 'Private Client', desc: 'High Net Worth & Family Offices ($1M+)' },
  { id: 'Advisor', title: 'Advisor', desc: 'RIA Wealth Advisor & Fiduciary Lead' },
  { id: 'Participant', title: 'Participant', desc: 'Corporate 401(k) / ERISA Employee' },
  { id: 'Plan Sponsor', title: 'Plan Sponsor', desc: 'Institutional Plan Committee Trustee' }
];

export const SignUpPage: React.FC = () => {
  const { signup, addToast } = useApp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState<ViewAsRole>('Private Client');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation checks
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid institutional email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }
    if (!agreeTerms) {
      setError('You must accept the Fiduciary Terms & Conditions to proceed.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = signup({
        name: fullName.trim(),
        email: email.trim(),
        password,
        accountType
      });
      setIsLoading(false);

      if (result.success) {
        addToast(
          'Account Provisioned',
          `Welcome aboard! Account created for ${fullName}. Please sign in with your credentials.`,
          'success'
        );
        navigate('/login');
      } else {
        setError(result.error || 'Failed to create account.');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans select-none py-10">
      {/* Ambient background glows for frosted glass aesthetic */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 right-1/3 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[160px]" />
      </div>

      <div className="relative w-full max-w-lg z-10 flex flex-col items-center">
        {/* Branding Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="scale-110 mb-2">
            <BrandLogo />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-2 tracking-tight">
            Open an Institutional Account
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed">
            Institutional custody integration, tax alpha optimization, and automated fiduciary reporting.
          </p>
        </div>

        {/* Frosted Glass Sign Up Card */}
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-2xl p-6 sm:p-8">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-300 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Full Legal Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full pl-9 pr-3 py-2.5 bg-white/5 rounded-xl text-xs font-medium text-white placeholder:text-slate-400 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Institutional Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="eleanor@vancecapital.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-white/5 rounded-xl text-xs font-medium text-white placeholder:text-slate-400 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>

            {/* Account Type Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Account Type / Fiduciary Role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ACCOUNT_TYPES.map(type => {
                  const isSelected = accountType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setAccountType(type.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-400/50 shadow-sm shadow-blue-500/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {type.title}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                        {type.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Password & Confirm Password in responsive 2-column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 6 chars"
                    className="w-full pl-9 pr-9 py-2.5 bg-white/5 rounded-xl text-xs font-medium text-white placeholder:text-slate-400 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-9 pr-9 py-2.5 bg-white/5 rounded-xl text-xs font-medium text-white placeholder:text-slate-400 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/5 border border-white/20 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 cursor-pointer accent-blue-600 mt-0.5"
                />
                <span className="text-xs text-slate-300 leading-snug">
                  I agree to the <span className="text-blue-400 hover:underline">Institutional Terms of Service</span>, <span className="text-blue-400 hover:underline">Fiduciary NDA</span>, and SEC Rule 17a-4 compliance mandate.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-60"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Provisioning Account...</span>
                </div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#0F172A] px-2 text-slate-400 font-bold tracking-wider">
                Already registered?
              </span>
            </div>
          </div>

          {/* Link back to Login */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-medium text-xs transition-colors"
            >
              &larr; Return to Sign In
            </Link>
          </div>
        </div>

        {/* Fiduciary Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Fiduciary Data Security: SOC2 Type II Certified • Custodial Feeds Read-Only</span>
        </div>
      </div>
    </div>
  );
};
