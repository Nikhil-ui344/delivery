import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../AppContext';
import { Menu, X, User, LayoutDashboard } from 'lucide-react';
import './Navbar.css';
import logo from '/logo.png';

function Navbar() {
  const { isAdmin, setIsAdmin } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleViewToggle = () => {
    const newAdminState = !isAdmin;
    setIsAdmin(newAdminState);
    // Navigate to appropriate default page
    if (newAdminState) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="brand-wrapper"
          >
            <img src={logo} alt="Sangam Mexico" className="navbar-logo" />
            <h1>Sangam Mexico</h1>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-menu">
          {!isAdmin ? (
            <>
              <Link to="/" className={isActive('/') ? 'active' : ''}>
                Menu
              </Link>
              <Link to="/track-order" className={isActive('/track-order') ? 'active' : ''}>
                Track Order
              </Link>
              <Link to="/reviews" className={isActive('/reviews') ? 'active' : ''}>
                Reviews
              </Link>
              <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
                <User size={20} />
              </Link>
            </>
          ) : (
            <>
              <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>
                Dashboard
              </Link>
              <Link to="/admin/menu" className={isActive('/admin/menu') ? 'active' : ''}>
                Menu
              </Link>
              <Link to="/admin/orders" className={isActive('/admin/orders') ? 'active' : ''}>
                Orders
              </Link>
              <Link to="/admin/analytics" className={isActive('/admin/analytics') ? 'active' : ''}>
                Analytics
              </Link>
            </>
          )}
        </div>

        <div className="navbar-actions">
          <motion.button
            className="mode-toggle"
            onClick={handleViewToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAdmin ? (
              <>
                <User size={18} />
                <span>User View</span>
              </>
            ) : (
              <>
                <LayoutDashboard size={18} />
                <span>Admin View</span>
              </>
            )}
          </motion.button>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {!isAdmin ? (
            <>
              <Link to="/" onClick={toggleMobileMenu}>Menu</Link>
              <Link to="/track-order" onClick={toggleMobileMenu}>Track Order</Link>
              <Link to="/reviews" onClick={toggleMobileMenu}>Reviews</Link>
              <Link to="/profile" onClick={toggleMobileMenu}>Profile</Link>
            </>
          ) : (
            <>
              <Link to="/admin" onClick={toggleMobileMenu}>Dashboard</Link>
              <Link to="/admin/menu" onClick={toggleMobileMenu}>Menu</Link>
              <Link to="/admin/orders" onClick={toggleMobileMenu}>Orders</Link>
              <Link to="/admin/users" onClick={toggleMobileMenu}>Users</Link>
              <Link to="/admin/offers" onClick={toggleMobileMenu}>Offers</Link>
              <Link to="/admin/analytics" onClick={toggleMobileMenu}>Analytics</Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;
