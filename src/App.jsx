import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import WasteScannerPage from './pages/WasteScannerPage';
import WastePassport from './pages/WastePassport';
import WastePassportDetailPage from './pages/WastePassportDetailPage';
import CollectionRequests from './pages/CollectionRequests';
import Marketplace from './pages/Marketplace';
import MarketplaceDetailPage from './pages/MarketplaceDetailPage';
import SellItemPage from './pages/SellItemPage';
import CheckoutPage from './pages/CheckoutPage';
import Impact from './pages/Impact';
import Leaderboard from './pages/Leaderboard';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';
import CollectorDashboard from './pages/CollectorDashboard';
import CollectorRouteMap from './pages/CollectorRouteMap';
import CollectorScanPage from './pages/CollectorScanPage';
import HotspotsPage from './pages/HotspotsPage';

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page & Auth Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Platform Application Routes wrapped in MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="scan" element={<WasteScannerPage />} />
              <Route path="scanner" element={<Navigate to="/scan" replace />} />
              <Route path="passport" element={<WastePassport />} />
              <Route path="passport/:id" element={<WastePassportDetailPage />} />
              <Route path="collections" element={<CollectionRequests />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="marketplace/:id" element={<MarketplaceDetailPage />} />
              <Route path="sell" element={<SellItemPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="impact" element={<Impact />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="challenges" element={<Challenges />} />
              <Route path="profile" element={<Profile />} />
              <Route path="collector" element={<CollectorDashboard />} />
              <Route path="collector/route" element={<CollectorRouteMap />} />
              <Route path="collector/scan" element={<CollectorScanPage />} />
              <Route path="hotspots" element={<HotspotsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
