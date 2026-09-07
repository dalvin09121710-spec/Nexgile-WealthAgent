import React, { useState } from 'react';
import {
  Send,
  Paperclip,
  Phone,
  Video,
  Search,
  Sparkles,
  ShieldCheck,
  CheckCheck,
  Calendar,
  FileText,
  User,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MESSAGES_LIST } from '../data/mockData';

interface ChatMessage {
  id: string;
  sender: 'advisor' | 'user' | 'system';
  name: string;
  avatarText: string;
  content: string;
  timestamp: string;
  hasQuickAction?: boolean;
  actionType?: 'harvest' | 'meeting' | 'document';
}

const INITIAL_THREAD: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'advisor',
    name: 'Marcus Vance, CFP®',
    avatarText: 'MV',
    content: 'Good morning Alex. I reviewed your Q3 portfolio performance. Overall net worth is up +8.7% YTD, but your technology weighting has reached 28.0% due to recent rally in semiconductors.',
    timestamp: 'Today, 09:14 AM'
  },
  {
    id: 'm-2',
    sender: 'advisor',
    name: 'Marcus Vance, CFP®',
    avatarText: 'MV',
    content: 'We have a high-confidence opportunity to harvest -$16,400 in unrealized losses on your BND holding by swapping into AGG. This generates ~$6,068 in immediate tax alpha with zero wash-sale disruption.',
    timestamp: 'Today, 09:16 AM',
    hasQuickAction: true,
    actionType: 'harvest'
  },
  {
    id: 'm-3',
    sender: 'user',
    name: 'Alex Morgan',
    avatarText: 'AM',
    content: 'Thanks Marcus! That tax benefit sounds great. Does the AGG proxy match the exact duration and credit quality of BND?',
    timestamp: 'Today, 09:22 AM'
  },
  {
    id: 'm-4',
    sender: 'advisor',
    name: 'Marcus Vance, CFP®',
    avatarText: 'MV',
    content: 'Yes, exactly. AGG tracks the Bloomberg U.S. Aggregate Index with a 0.99 beta correlation, identical 6.2-year duration, and AAA sovereign backing. Let me know if you would like me to route the order.',
    timestamp: 'Today, 09:25 AM'
  }
];

export const MessagesPage: React.FC = () => {
  const { setScheduleModalOpen, setHarvestDrawerItem, addToast } = useApp();

  const [activeThreadId, setActiveThreadId] = useState('t-1');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_THREAD);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      name: 'Alex Morgan',
      avatarText: 'AM',
      content: inputText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulated advisor automated acknowledgement
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `adv-${Date.now()}`,
          sender: 'advisor',
          name: 'Marcus Vance, CFP®',
          avatarText: 'MV',
          content: 'Understood. I have logged your instructions in our fiduciary ledger and will execute per your mandate.',
          timestamp: 'Just now'
        }
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Messages &amp; Advisory Desk
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              FINRA / SEC Compliant
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Direct secure communication with your CFP® fiduciary advisory team and legal counsel.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setScheduleModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Review Call</span>
          </button>
        </div>
      </div>

      {/* 2. Communication Workspace: Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] overflow-hidden min-h-[620px]">
        {/* Left Side: Thread Directory (4 cols) */}
        <div className="lg:col-span-4 border-r border-white/10 flex flex-col bg-white/5">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {MESSAGES_LIST.map(thread => (
              <div
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                  activeThreadId === thread.id
                    ? 'bg-white/10 border-l-4 border-blue-500'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-blue-500/25">
                  {thread.sender.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-white truncate">
                      {thread.sender}
                    </h4>
                    <span className="text-[10px] text-slate-400">{thread.timestamp}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate">{thread.role}</span>
                  <p className="text-xs text-slate-300 mt-1 truncate">
                    {thread.snippet}
                  </p>
                </div>
                {thread.unread && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                )}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Encrypted Archival Active</span>
          </div>
        </div>

        {/* Right Side: Active Chat Thread (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          {/* Active Chat Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/25">
                  MV
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">
                  Marcus Vance, CFP®
                </h3>
                <span className="text-xs text-slate-400">Managing Partner · Sovereign Advisory Group</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => addToast('Direct Line Connected', 'Initiating encrypted voice call with Marcus Vance...', 'info')}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Voice Call"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setScheduleModalOpen(true)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Video Conference"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map(msg => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {msg.avatarText}
                    </div>
                  )}

                  <div
                    className={`max-w-md rounded-2xl p-4 text-xs space-y-2 ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-500/25'
                        : 'bg-white/10 text-slate-200 rounded-bl-none border border-white/10'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.content}</p>

                    {/* Quick Action in Chat */}
                    {msg.hasQuickAction && (
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setHarvestDrawerItem({
                              id: 'tax-1',
                              ticker: 'BND',
                              name: 'Vanguard Total Bond Market ETF',
                              unrealizedLoss: -16400,
                              potentialBenefit: 6068,
                              proxyTicker: 'AGG',
                              proxyName: 'iShares Core U.S. Aggregate Bond ETF (0.99 Beta)',
                              washSaleStatus: 'Cleared',
                              status: 'Pre-Approved'
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/25"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Review &amp; Execute BND → AGG Harvest</span>
                        </button>
                      </div>
                    )}

                    <div
                      className={`flex items-center justify-end gap-1 text-[10px] ${
                        isUser ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isUser && <CheckCheck className="w-3.5 h-3.5 text-blue-300" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-white/10 bg-white/5 flex items-center gap-2.5"
          >
            <button
              type="button"
              onClick={() => addToast('Attach Document', 'Document upload selector opened.', 'info')}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Type message to Marcus Vance, CFP®..."
              className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white active:scale-95 transition-all disabled:opacity-40 shadow-lg shadow-blue-500/25 border border-blue-400/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
