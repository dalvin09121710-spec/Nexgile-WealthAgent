import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Key,
  X,
  Send
} from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const { login, addToast, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // If already authenticated, redirect to overview
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password, rememberMe);
      setIsLoading(false);

      if (result.success) {
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Invalid credentials. Please verify and try again.');
      }
    }, 600);
  };

  const handleQuickFillDemo = () => {
    setEmail('demo@nexgile.com');
    setPassword('Demo@123');
    setError('');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSubmitted(true);
    setTimeout(() => {
      setForgotSubmitted(false);
      setForgotModalOpen(false);
      setForgotEmail('');
      addToast(
        'Password Reset Email Dispatched',
        `A secure one-time fiduciary authorization token has been sent to ${forgotEmail}.`,
        'success'
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      {/* Ambient background glows for frosted glass aesthetic */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[160px]" />
      </div>

      <div className="relative w-full max-w-md z-10 flex flex-col items-center">
        {/* Branding Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="scale-110 mb-2">
            <BrandLogo />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-2 tracking-tight">
            Institutional Wealth Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
            Fiduciary intelligence, real-time custodial aggregation, and portfolio optimization.
          </p>
        </div>

        {/* Demo Credentials Quick Pill */}
        <div className="w-full mb-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-md flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Key className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <span className="text-[11px] font-semibold text-slate-300 block truncate">
                Demo: <code className="text-blue-300 font-mono">demo@nexgile.com</code>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Password: <code className="text-blue-300">Demo@123</code>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickFillDemo}
            className="px-2.5 py-1 rounded-lg bg-blue-600/40 hover:bg-blue-600 border border-blue-400/40 text-blue-200 hover:text-white text-[11px] font-semibold transition-all shrink-0 cursor-pointer shadow-sm"
          >
            Fill Demo
          </button>
        </div>

        {/* Frosted Glass Login Card */}
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-2xl p-6 sm:p-8">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-300 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Work / Institutional Email
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
                  placeholder="name@institution.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-white/5 rounded-xl text-xs font-medium text-white placeholder:text-slate-400 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-white/5 rounded-xl text-xs font-medium text-white placeholder:text-slate-400 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/5 border border-white/20 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 cursor-pointer accent-blue-600"
                />
                <span className="text-xs text-slate-300 font-medium">
                  Remember this workstation for 30 days
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-60"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Nexgile</span>
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
                New to Nexgile?
              </span>
            </div>
          </div>

          {/* Link to Sign Up */}
          <div className="text-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-medium text-xs transition-colors"
            >
              Create New Account &rarr;
            </Link>
          </div>
        </div>

        {/* Fiduciary Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Fiduciary Security: 256-Bit TLS • SEC Rule 17a-4 &amp; FINRA 4511 Vault</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="fixed inset-0" onClick={() => !forgotSubmitted && setForgotModalOpen(false)} />
          <div className="relative w-full max-w-sm bg-[#0F172A]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-400" />
                <span>Password Recovery</span>
              </h3>
              <button
                onClick={() => setForgotModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Enter your registered institutional email. We will dispatch a secure credential reset link verified with custodial zero-knowledge proofs.
            </p>
            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  placeholder="demo@nexgile.com"
                  className="w-full px-3 py-2 bg-white/5 rounded-xl text-xs text-white border border-white/10 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotSubmitted}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 border border-blue-400/30 flex items-center gap-1.5"
                >
                  {forgotSubmitted ? (
                    <span>Sending Token...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Recovery Token</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
