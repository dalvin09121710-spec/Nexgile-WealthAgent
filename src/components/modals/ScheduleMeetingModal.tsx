import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, X, Video, Users, CheckCircle2 } from 'lucide-react';

export const ScheduleMeetingModal: React.FC = () => {
  const { scheduleMeetingModalOpen, setScheduleMeetingModalOpen, addToast } = useApp();
  const [topic, setTopic] = useState('Quarterly Fiduciary Strategy & Tax Review');
  const [date, setDate] = useState('2026-09-15');
  const [time, setTime] = useState('14:00');
  const [format, setFormat] = useState<'virtual' | 'in-person'>('virtual');
  const [isBooking, setIsBooking] = useState(false);

  if (!scheduleMeetingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setScheduleMeetingModalOpen(false);
      addToast(
        'Meeting Confirmed with Marcus Vance, CFP®',
        `Scheduled for ${date} at ${time} EST. Calendar invitation and secure Zoom Room #418 dispatched to email.`,
        'success'
      );
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="fixed inset-0" onClick={() => !isBooking && setScheduleMeetingModalOpen(false)} />
      <div className="relative w-full max-w-md bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/10 p-6 flex flex-col gap-4 z-10 animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Schedule Advisory Session
              </h3>
              <p className="text-xs text-slate-400">
                Direct booking with Lead Wealth Advisor Marcus Vance, CFP®
              </p>
            </div>
          </div>
          <button
            onClick={() => setScheduleMeetingModalOpen(false)}
            disabled={isBooking}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
              Meeting Focus &amp; Agenda
            </label>
            <select
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 rounded-xl text-xs font-medium text-white border border-white/10 focus:outline-none focus:border-blue-500/50"
            >
              <option value="Quarterly Fiduciary Strategy & Tax Review" className="bg-slate-900 text-white">Quarterly Fiduciary Strategy &amp; Tax Review</option>
              <option value="Multi-Year Roth Conversion Optimization" className="bg-slate-900 text-white">Multi-Year Roth Conversion Optimization</option>
              <option value="Estate Planning & Dynasty Trust Restructuring" className="bg-slate-900 text-white">Estate Planning &amp; Dynasty Trust Restructuring</option>
              <option value="Retirement 401(k) Committee Fiduciary Review" className="bg-slate-900 text-white">Retirement 401(k) Committee Fiduciary Review</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 rounded-xl text-xs font-medium text-white border border-white/10 focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                Time (EST)
              </label>
              <select
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 rounded-xl text-xs font-medium text-white border border-white/10 focus:outline-none focus:border-blue-500/50"
              >
                <option value="10:00" className="bg-slate-900 text-white">10:00 AM EST</option>
                <option value="11:30" className="bg-slate-900 text-white">11:30 AM EST</option>
                <option value="14:00" className="bg-slate-900 text-white">2:00 PM EST</option>
                <option value="15:30" className="bg-slate-900 text-white">3:30 PM EST</option>
                <option value="16:30" className="bg-slate-900 text-white">4:30 PM EST</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
              Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormat('virtual')}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold border transition-all ${
                  format === 'virtual'
                    ? 'bg-blue-600 border-transparent text-white shadow-md shadow-blue-500/25'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Virtual Zoom #418</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('in-person')}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold border transition-all ${
                  format === 'in-person'
                    ? 'bg-blue-600 border-transparent text-white shadow-md shadow-blue-500/25'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Boston Boardroom</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setScheduleMeetingModalOpen(false)}
              disabled={isBooking}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isBooking}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all flex items-center gap-1.5"
            >
              {isBooking ? (
                <span>Confirming Booking...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Reservation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
