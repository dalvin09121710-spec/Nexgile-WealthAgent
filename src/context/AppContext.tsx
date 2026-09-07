import React, { createContext, useContext, useState, useEffect } from 'react';
import { ViewAsRole, TimeHorizon, ToastMessage, ClientProfile, TaxOpportunity, AuthUser } from '../types';
import { ADVISOR_CLIENTS, TAX_OPPORTUNITIES } from '../data/mockData';

interface ExplainModalState {
  open: boolean;
  title: string;
  content: string;
}

interface AppContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => { success: boolean; error?: string };
  signup: (data: { name: string; email: string; password: string; accountType: ViewAsRole }) => { success: boolean; error?: string };
  logout: () => void;
  viewAs: ViewAsRole;
  setViewAs: (role: ViewAsRole) => void;
  timeRange: TimeHorizon;
  setTimeRange: (range: TimeHorizon) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  persona: string;
  setPersona: (p: any) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  explainModal: ExplainModalState;
  openExplain: (title: string, content: string) => void;
  closeExplain: () => void;
  rebalanceModalOpen: boolean;
  setRebalanceModalOpen: (open: boolean) => void;
  uploadModalOpen: boolean;
  setUploadModalOpen: (open: boolean) => void;
  scheduleMeetingModalOpen: boolean;
  setScheduleMeetingModalOpen: (open: boolean) => void;
  setScheduleModalOpen: (open: boolean) => void;
  clientDrawerProfile: ClientProfile | null;
  setClientDrawerProfile: (profile: ClientProfile | null) => void;
  openClient360: (profile?: any) => void;
  harvestDrawerItem: TaxOpportunity | null;
  setHarvestDrawerItem: (item: TaxOpportunity | null) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  lastUpdated: string;
  triggerRefresh: () => void;
  isRefreshing: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State with localStorage persistence
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const savedAuth = localStorage.getItem('nexgile_auth');
      if (savedAuth) {
        return JSON.parse(savedAuth);
      }
    } catch (e) {
      console.error('Failed to parse nexgile_auth from localStorage', e);
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const savedAuth = localStorage.getItem('nexgile_auth');
      return !!savedAuth;
    } catch {
      return false;
    }
  });

  const [viewAs, setViewAs] = useState<ViewAsRole>(() => {
    try {
      const savedAuth = localStorage.getItem('nexgile_auth');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed.role) return parsed.role;
      }
    } catch {
      // fallback
    }
    return 'Private Client';
  });
  const [timeRange, setTimeRange] = useState<TimeHorizon>('1Y');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [explainModal, setExplainModal] = useState<ExplainModalState>({
    open: false,
    title: '',
    content: ''
  });
  const [rebalanceModalOpen, setRebalanceModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [scheduleMeetingModalOpen, setScheduleMeetingModalOpen] = useState(false);
  const [clientDrawerProfile, setClientDrawerProfile] = useState<ClientProfile | null>(null);
  const [harvestDrawerItem, setHarvestDrawerItem] = useState<TaxOpportunity | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Updated 2m ago');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Convenient aliases for pages
  const openClient360 = (profile: any) => {
    setClientDrawerProfile(profile || ADVISOR_CLIENTS[0]);
  };

  const setScheduleModalOpen = (open: boolean) => {
    setScheduleMeetingModalOpen(open);
  };

  const handleSetTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSetPersona = (p: any) => {
    if (p === 'client') setViewAs('Private Client');
    else if (p === 'advisor') setViewAs('Advisor');
    else if (p === 'participant') setViewAs('Participant');
    else if (p === 'sponsor') setViewAs('Plan Sponsor');
    else setViewAs(p);
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 7);
    setToasts(prev => [...prev, { id, title, message, type, timestamp: Date.now() }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openExplain = (title: string, content: string) => {
    setExplainModal({ open: true, title, content });
  };

  const closeExplain = () => {
    setExplainModal(prev => ({ ...prev, open: false }));
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const login = (emailInput: string, passwordInput: string, rememberMe = true) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    // 1. Check Demo Credentials
    if (cleanEmail === 'demo@nexgile.com' && cleanPass === 'Demo@123') {
      const demoUser: AuthUser = {
        name: 'Alex Morgan',
        email: 'demo@nexgile.com',
        role: 'Private Client',
        avatarInitials: 'AM'
      };
      setUser(demoUser);
      setIsAuthenticated(true);
      setViewAs('Private Client');
      localStorage.setItem('nexgile_auth', JSON.stringify(demoUser));
      addToast('Welcome Back, Alex Morgan', 'Successfully authenticated into Nexgile Fiduciary WealthAgent.', 'success');
      return { success: true };
    }

    // 2. Check registered users in localStorage
    try {
      const storedUsers = localStorage.getItem('nexgile_registered_users');
      if (storedUsers) {
        const usersList = JSON.parse(storedUsers);
        const match = usersList.find((u: any) => u.email.toLowerCase() === cleanEmail && u.password === cleanPass);
        if (match) {
          const authUser: AuthUser = {
            name: match.name,
            email: match.email,
            role: match.accountType || 'Private Client',
            avatarInitials: match.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'UX'
          };
          setUser(authUser);
          setIsAuthenticated(true);
          setViewAs(match.accountType || 'Private Client');
          localStorage.setItem('nexgile_auth', JSON.stringify(authUser));
          addToast(`Welcome Back, ${match.name}`, 'Authenticated successfully with your institutional account.', 'success');
          return { success: true };
        }
      }
    } catch (e) {
      console.error('Error reading registered users', e);
    }

    return {
      success: false,
      error: 'Invalid email or password. Please use demo credentials (demo@nexgile.com / Demo@123) or sign up.'
    };
  };

  const signup = (data: { name: string; email: string; password: string; accountType: ViewAsRole }) => {
    const cleanEmail = data.email.trim().toLowerCase();
    
    // Check if demo email or already registered
    if (cleanEmail === 'demo@nexgile.com') {
      return { success: false, error: 'This email is reserved for demo access. Please use a different email or sign in directly.' };
    }

    try {
      const storedUsers = localStorage.getItem('nexgile_registered_users');
      const usersList = storedUsers ? JSON.parse(storedUsers) : [];
      
      const existing = usersList.find((u: any) => u.email.toLowerCase() === cleanEmail);
      if (existing) {
        return { success: false, error: 'An account with this email address already exists. Please sign in.' };
      }

      usersList.push({
        name: data.name.trim(),
        email: cleanEmail,
        password: data.password,
        accountType: data.accountType,
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('nexgile_registered_users', JSON.stringify(usersList));
      addToast('Account Created Successfully', 'Your institutional access has been provisioned. Please sign in.', 'success');
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Failed to create account. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('nexgile_auth');
    setUser(null);
    setIsAuthenticated(false);
    addToast('Signed Out', 'You have been safely disconnected from your fiduciary session.', 'info');
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated('Updated just now');
      setIsRefreshing(false);
      addToast('Data Refreshed', 'Live custodial feeds updated across Schwab, Morgan Stanley, and Northern Trust.', 'success');
    }, 800);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        viewAs,
        setViewAs,
        timeRange,
        setTimeRange,
        theme,
        setTheme: handleSetTheme,
        toggleTheme,
        persona: viewAs,
        setPersona: handleSetPersona,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        commandPaletteOpen,
        setCommandPaletteOpen,
        explainModal,
        openExplain,
        closeExplain,
        rebalanceModalOpen,
        setRebalanceModalOpen,
        uploadModalOpen,
        setUploadModalOpen,
        scheduleMeetingModalOpen,
        setScheduleMeetingModalOpen,
        setScheduleModalOpen,
        clientDrawerProfile,
        setClientDrawerProfile,
        openClient360,
        harvestDrawerItem,
        setHarvestDrawerItem,
        mobileNavOpen,
        setMobileNavOpen,
        lastUpdated,
        triggerRefresh,
        isRefreshing
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
