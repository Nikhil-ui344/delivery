import { motion } from 'framer-motion';
import { useApp } from '../../AppContext';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp,
  Clock,
  LayoutDashboard,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import ProgressBar from '../../components/ProgressBar';
import './AdminDashboard.css';

function AdminDashboard() {
  const { orders, menuItems, users } = useApp();

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const todayOrders = orders.filter(order => {
    const orderDate = new Date(order.timestamp).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  });

  const liveOrders = orders.filter(order => order.status !== 'delivered');
  const popularItems = menuItems.filter(item => item.popular);
  const unavailableItems = menuItems.filter(item => !item.available);

  const dashboardCards = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: <ShoppingBag size={40} />,
      color: '#4CAF50',
      link: '/admin/orders',
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Total Sales',
      value: `₹${totalSales.toFixed(2)}`,
      icon: <DollarSign size={40} />,
      color: '#F4C430',
      link: '/admin/analytics',
      change: '+8%',
      isPositive: true
    },
    {
      title: 'Live Orders',
      value: liveOrders.length,
      icon: <Clock size={40} />,
      color: '#FF9800',
      link: '/admin/orders',
      change: 'Real-time',
      isPositive: true
    },
    {
      title: 'Total Users',
      value: users.length,
      icon: <Users size={40} />,
      color: '#8B1E1E',
      link: '/admin/users',
      change: '+5%',
      isPositive: true
    },
    {
      title: 'Menu Items',
      value: menuItems.length,
      icon: <Package size={40} />,
      color: '#2196F3',
      link: '/admin/menu',
      change: '+3',
      isPositive: true
    },
    {
      title: 'Popular Items',
      value: popularItems.length,
      icon: <TrendingUp size={40} />,
      color: '#9C27B0',
      link: '/admin/analytics',
      change: '+15%',
      isPositive: true
    }
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">
            <LayoutDashboard size={32} /> Admin Dashboard
          </h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
        </motion.div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards-grid">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={card.link}>
                <motion.div
                  className="dashboard-card"
                  whileHover={{ y: -5, boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)' }}
                >
                  <div className="card-icon" style={{ color: card.color }}>
                    {card.icon}
                  </div>
                  <div className="card-content">
                    <h3>{card.title}</h3>
                    <p className="card-value">{card.value}</p>
                    <div className={`card-change ${card.isPositive ? 'positive' : 'negative'}`}>
                      {card.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                      <span>{card.change}</span>
                    </div>
                  </div>
                  <ProgressBar 
                    progress={Math.min((card.value / 100) * 100, 100)} 
                    showPercentage={false}
                    height="small"
                    color={card.isPositive ? 'success' : 'primary'}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="quick-stats-section">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2>Today's Orders</h2>
            <p className="stat-value">{todayOrders.length}</p>
            <p className="stat-label">orders placed today</p>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2>Unavailable Items</h2>
            <p className="stat-value">{unavailableItems.length}</p>
            <p className="stat-label">items out of stock</p>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          className="recent-orders-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="section-header">
            <h2>Recent Orders</h2>
            <Link to="/admin/orders" className="view-all-link">
              View All →
            </Link>
          </div>

          <div className="orders-table">
            <div className="table-header">
              <span>Order ID</span>
              <span>Customer</span>
              <span>Items</span>
              <span>Total</span>
              <span>Status</span>
            </div>
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="table-row">
                <span className="order-id">#{order.id.toString().slice(-6)}</span>
                <span>{order.userName}</span>
                <span>{order.items.length} items</span>
                <span className="order-total">${order.total.toFixed(2)}</span>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;
