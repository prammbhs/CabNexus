import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import DashboardPlaceholder from '@/pages/DashboardPlaceholder';
import LoginPlaceholder from '@/pages/LoginPlaceholder';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPlaceholder />} />
      <Route path="/login" element={<LoginPlaceholder />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
