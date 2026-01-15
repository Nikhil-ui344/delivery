import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import UserHome from './pages/User/UserHome';
import Checkout from './pages/User/Checkout';
import OrderTracking from './pages/User/OrderTracking';
import UserProfile from './pages/User/UserProfile';
import Reviews from './pages/User/Reviews';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageMenu from './pages/Admin/ManageMenu';
import ManageOrders from './pages/Admin/ManageOrders';
import Inventory from './pages/Admin/Inventory';
import UserManagement from './pages/Admin/UserManagement';
import OffersManagement from './pages/Admin/OffersManagement';
import Analytics from './pages/Admin/Analytics';
import Navbar from './components/Navbar';
import NotificationToast from './components/NotificationToast';
import Cart from './components/Cart';
import IntroAnimation from './components/IntroAnimation';
import './App.css';

function AppContent() {
  const { isAdmin } = useApp();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Check if intro has been shown in this session
    const introShown = sessionStorage.getItem('introShown');
    if (introShown) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('introShown', 'true');
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <NotificationToast />
        <Cart />
        
        <motion.div
          className="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<UserHome />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track-order" element={<OrderTracking />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/reviews" element={<Reviews />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/menu" element={<ManageMenu />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/inventory" element={<Inventory />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/offers" element={<OffersManagement />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
