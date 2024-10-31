import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import About from './components/About';
import ScanningInterface from './components/ScanningInterface';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

function App() {
  const [scanInfo, setScanInfo] = useState<{
    isScanning: boolean;
    targetInfo?: { type: 'domain' | 'ip'; value: string };
    isAdmin?: boolean;
  }>({
    isScanning: false,
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleScanStart = (targetInfo: { type: 'domain' | 'ip'; value: string }, isAdmin: boolean) => {
    setScanInfo({
      isScanning: true,
      targetInfo,
      isAdmin,
    });
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setShowAdminLogin(false);
  };

  if (showAdminLogin) {
    return <AdminLogin onLoginSuccess={handleAdminLogin} />;
  }

  if (isAdminAuthenticated) {
    return <AdminDashboard onLogout={() => setIsAdminAuthenticated(false)} />;
  }

  if (scanInfo.isScanning && scanInfo.targetInfo) {
    return <ScanningInterface targetInfo={scanInfo.targetInfo} isAdmin={scanInfo.isAdmin || false} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar onScanStart={handleScanStart} onAdminClick={() => setShowAdminLogin(true)} />
      <Hero onScanStart={handleScanStart} />
      <Features />
      <Services />
      <About />
    </div>
  );
}

export default App;