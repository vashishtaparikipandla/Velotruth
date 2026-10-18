import React from 'react';
import { EnterpriseProvider, useEnterprise } from './context/EnterpriseContext';
import EnterpriseHeader from './components/EnterpriseHeader';
import Stage1CompanySetup from './components/Stages/Stage1CompanySetup';
import Stage2RolesWorkflows from './components/Stages/Stage2RolesWorkflows';
import Stage3PeopleRoster from './components/Stages/Stage3PeopleRoster';
import Stage4ManagerReview from './components/Stages/Stage4ManagerReview';
import Stage5EmployeePortal from './components/Stages/Stage5EmployeePortal';
import MonochromeToast from './components/MonochromeToast';

function MainEnterpriseApp() {
  const { currentStep, company } = useEnterprise();

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Bar with Company Context & 5-Step Nav */}
      <EnterpriseHeader />

      {/* Main 5-Stage View Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentStep === 1 && <Stage1CompanySetup />}
        {currentStep === 2 && <Stage2RolesWorkflows />}
        {currentStep === 3 && <Stage3PeopleRoster />}
        {currentStep === 4 && <Stage4ManagerReview />}
        {currentStep === 5 && <Stage5EmployeePortal />}
      </main>

      {/* Clean Monochrome Footer */}
      <footer className="border-t border-gray-200 py-6 px-4 bg-neutral-50 text-xs text-neutral-500 font-mono text-center space-y-1">
        <div>
          TrueImpact AI Enterprise Engine • {company.legalEntity}
        </div>
        <div className="text-[11px] text-neutral-400">
          Strict Light Monochrome Standard • Google Sans Typography • Grounded in Vertex AI Telemetry
        </div>
      </footer>

      {/* Toast Notification */}
      <MonochromeToast />
    </div>
  );
}

export default function App() {
  return (
    <EnterpriseProvider>
      <MainEnterpriseApp />
    </EnterpriseProvider>
  );
}
