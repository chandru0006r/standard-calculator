import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import SEFPage from '../pages/SEFPage';
import CommunityFundPage from '../pages/CommunityFundPage';
import InvestorLoansPage from '../pages/InvestorLoansPage';
import MentorDashboard from '../pages/MentorDashboard';
import CollegeAdminPanel from '../pages/CollegeAdminPanel';
import Profile from '../pages/Profile';
import { useAppStore } from '../store/useAppStore';

function RequireAuth({ children }) {
  const { user } = useAppStore();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/sef" element={<RequireAuth><SEFPage /></RequireAuth>} />
        <Route path="/community" element={<RequireAuth><CommunityFundPage /></RequireAuth>} />
        <Route path="/investor" element={<RequireAuth><InvestorLoansPage /></RequireAuth>} />
        <Route path="/mentor" element={<RequireAuth><MentorDashboard /></RequireAuth>} />
        <Route path="/college-admin" element={<RequireAuth><CollegeAdminPanel /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
