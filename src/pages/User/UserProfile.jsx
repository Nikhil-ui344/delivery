import { motion } from 'framer-motion';
import { useApp } from '../../AppContext';
import { User, Phone, Mail, ShoppingBag, Calendar, DollarSign } from 'lucide-react';
import './UserProfile.css';

function UserProfile() {
  const { currentUser, orders } = useApp();

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="user-profile-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">My Profile</h1>
        </motion.div>

        <div className="profile-layout">
          {/* Profile Card */}
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="profile-avatar">
              <User size={60} />
            </div>
            <h2>{currentUser.name}</h2>
            
            <div className="profile-info">
              <div className="info-row">
                <Phone size={18} />
                <span>{currentUser.phone}</span>
              </div>
              <div className="info-row">
                <Mail size={18} />
                <span>guest@sangammexico.com</span>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
                <ShoppingBag size={28} />
                <h3>{orders.length}</h3>
                <p>Total Orders</p>
              </div>
              <div className="stat-card">
                <DollarSign size={28} />
                <h3>${totalSpent.toFixed(2)}</h3>
                <p>Total Spent</p>
              </div>
            </div>
          </motion.div>

          {/* Order History */}
          <motion.div
            className="order-history-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Order History</h2>
            
            {orders.length === 0 ? (
              <div className="no-orders-message">
                <ShoppingBag size={60} />
                <p>No orders yet</p>
                <p className="subtitle">Start ordering to see your history here</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    className="order-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="order-card-header">
                      <div>
                        <h3>Order #{order.id.toString().slice(-6)}</h3>
                        <p className="order-date">
                          <Calendar size={14} />
                          {new Date(order.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="order-card-items">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-mini-item">
                          <img src={item.image} alt={item.name} />
                          <div className="mini-item-info">
                            <span className="mini-item-name">{item.name}</span>
                            <span className="mini-item-qty">x{item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-card-footer">
                      <span className="total-label">Total:</span>
                      <span className="total-value">₹{order.total.toFixed(2)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
