import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { ExplainModal } from './components/modals/ExplainModal';
import { RebalanceModal } from './components/modals/RebalanceModal';
import { UploadDocumentModal } from './components/modals/UploadDocumentModal';
import { ScheduleMeetingModal } from './components/modals/ScheduleMeetingModal';
import { Client360Drawer } from './components/modals/Client360Drawer';
import { TaxLossHarvestDrawer } from './components/modals/TaxLossHarvestDrawer';
import { CommandPalette } from './components/common/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { GoalsPage } from './pages/GoalsPage';
import { TaxCenterPage } from './pages/TaxCenterPage';
import { EstateGivingPage } from './pages/EstateGivingPage';
import { RetirementPlansPage } from './pages/RetirementPlansPage';
import { ParticipantPage } from './pages/ParticipantPage';
import { AdvisorWorkstationPage } from './pages/AdvisorWorkstationPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { MessagesPage } from './pages/MessagesPage';
import { ReportsPage } from './pages/ReportsPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col antialiased selection:bg-blue-500/30 selection:text-white relative overflow-x-hidden font-sans">
      {/* Ambient background glows for frosted glass reflection */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-indigo-600/12 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[160px]" />
      </div>

      {/* Top Header */}
      <TopHeader />

      {/* Main Structure with Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row min-w-0 z-10">
        {/* Left Sidebar navigation */}
        <Sidebar />

        {/* Main Content Area with top offset for fixed header and left offset for sidebar */}
        <div className="flex-1 min-w-0 lg:pl-64 pt-16 flex flex-col">
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 transition-all">
            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/goals-and-planning" element={<GoalsPage />} />
              <Route path="/tax-center" element={<TaxCenterPage />} />
              <Route path="/tax" element={<TaxCenterPage />} />
              <Route path="/estate-giving" element={<EstateGivingPage />} />
              <Route path="/estate-and-giving" element={<EstateGivingPage />} />
              <Route path="/retirement-plans" element={<RetirementPlansPage />} />
              <Route path="/participant" element={<ParticipantPage />} />
              <Route path="/advisor-workstation" element={<AdvisorWorkstationPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Frosted Glass Footer */}
          <footer className="px-6 lg:px-8 py-4 bg-slate-900/50 backdrop-blur-md border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-4">
              <span>System Status: <span className="text-emerald-400 font-medium">Online</span></span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span>Last Sync: 14:02 EST</span>
            </div>
            <div className="flex items-center gap-6 text-[11px]">
              <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
              <span className="cursor-pointer hover:text-white transition-colors">Data Policy</span>
              <span className="text-slate-400">&copy; 2026 Nexgile Wealth Inc.</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Global Interactive Fiduciary Overlays & Modals */}
      <ExplainModal />
      <RebalanceModal />
      <UploadDocumentModal />
      <ScheduleMeetingModal />
      <Client360Drawer />
      <TaxLossHarvestDrawer />
      <CommandPalette />
      <ToastContainer />
    </div>
  );
};

const MainAppContent: React.FC = () => {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === '/login' ||
    location.pathname.startsWith('/login/') ||
    location.pathname === '/signup' ||
    location.pathname.startsWith('/signup/');

  if (isAuthRoute) {
    return (
      <>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }

  return <AppLayout />;
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
