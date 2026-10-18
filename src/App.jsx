import React from 'react';
import { EnterpriseProvider, useEnterprise } from './context/EnterpriseContext';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import ViewRoster from './components/Views/ViewRoster';
import ViewTransparencyPortal from './components/Views/ViewTransparencyPortal';
import ViewRolesWorkflows from './components/Views/ViewRolesWorkflows';
import ViewCompanyMcp from './components/Views/ViewCompanyMcp';
import AddEmployeeAidModal from './components/Modals/AddEmployeeAidModal';
import ManagerReviewDrawer from './components/Drawers/ManagerReviewDrawer';
import MonochromeToast from './components/MonochromeToast';

function SaaSAppLayout() {
  const { currentView } = useEnterprise();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-900 flex font-sans selection:bg-neutral-900 selection:text-white">
      {/* Left Persistent Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <TopHeader />

        {/* Dynamic SaaS View Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {currentView === 'roster' && <ViewRoster />}
          {currentView === 'transparency' && <ViewTransparencyPortal />}
          {currentView === 'roles' && <ViewRolesWorkflows />}
          {currentView === 'company' && <ViewCompanyMcp />}
        </main>
      </div>

      {/* Modals & Interactive Drawers */}
      <AddEmployeeAidModal />
      <ManagerReviewDrawer />

      {/* Clean System Toast */}
      <MonochromeToast />
    </div>
  );
}

export default function App() {
  return (
    <EnterpriseProvider>
      <SaaSAppLayout />
    </EnterpriseProvider>
  );
}
