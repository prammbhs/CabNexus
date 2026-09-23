import { Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from '@/context/RoleContext';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import DashboardOverview from '@/pages/dashboard/DashboardOverview';
import VendorsPage from '@/pages/dashboard/VendorsPage';
import FleetPage from '@/pages/dashboard/FleetPage';
import DriversPage from '@/pages/dashboard/DriversPage';
import CompliancePage from '@/pages/dashboard/CompliancePage';
import PermissionsPage from '@/pages/dashboard/PermissionsPage';

export function App() {
  return (
    <RoleProvider>
      <Routes>
        {/* Public Marketing Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth / Role Switcher */}
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated Dashboard Shell with Nested Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="fleet" element={<FleetPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="compliance" element={<CompliancePage />} />
          <Route path="permissions" element={<PermissionsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </RoleProvider>
  );
}

export default App;
