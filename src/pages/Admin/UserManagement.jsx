import { motion } from 'framer-motion';
import { useApp } from '../../AppContext';
import { User, Phone, ShoppingBag, DollarSign } from 'lucide-react';
import './UserManagement.css';

function UserManagement() {
  const { users } = useApp();

  return (
    <div className="user-management-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">User Management</h1>
        </motion.div>

        <div className="users-grid">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              className="user-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="user-avatar">
                <User size={40} />
              </div>
              <div className="user-info">
                <h3>{user.name}</h3>
                <p className="user-detail">
                  <Phone size={16} />
                  {user.phone}
                </p>
                <p className="user-detail">
                  <ShoppingBag size={16} />
                  {user.orderCount} orders
                </p>
                <p className="user-detail total-spent">
                  <DollarSign size={16} />
                  ₹{user.totalSpent.toFixed(2)} spent
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
