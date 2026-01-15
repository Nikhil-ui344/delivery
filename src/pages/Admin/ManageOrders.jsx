import { motion } from 'framer-motion';
import { useApp } from '../../AppContext';
import { Clock, CheckCircle, Package } from 'lucide-react';
import './ManageOrders.css';

function ManageOrders() {
  const { orders, updateOrderStatus } = useApp();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'preparing':
        return <Clock size={20} />;
      case 'ready':
        return <Package size={20} />;
      case 'delivered':
        return <CheckCircle size={20} />;
      default:
        return null;
    }
  };

  const liveOrders = orders.filter(order => order.status !== 'delivered');
  const completedOrders = orders.filter(order => order.status === 'delivered');

  return (
    <div className="manage-orders-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Manage Orders</h1>
        </motion.div>

        {/* Live Orders */}
        <motion.div
          className="orders-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-title">🔴 Live Orders ({liveOrders.length})</h2>
          <div className="orders-grid">
            {liveOrders.length > 0 ? (
              liveOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  className="order-admin-card live"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="order-header">
                    <h3>Order #{order.id.toString().slice(-6)}</h3>
                    <span className="order-time">
                      {new Date(order.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="order-customer">
                    <p><strong>Customer:</strong> {order.userName}</p>
                    <p><strong>Phone:</strong> {order.userPhone}</p>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-total">
                    <strong>Total:</strong>
                    <span className="total-amount">₹{order.total.toFixed(2)}</span>
                  </div>

                  <div className="order-status-section">
                    <label>Update Status:</label>
                    <div className="status-buttons">
                      <button
                        className={`status-btn preparing ${order.status === 'preparing' ? 'active' : ''}`}
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                      >
                        {getStatusIcon('preparing')} Preparing
                      </button>
                      <button
                        className={`status-btn ready ${order.status === 'ready' ? 'active' : ''}`}
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                      >
                        {getStatusIcon('ready')} Ready
                      </button>
                      <button
                        className={`status-btn delivered ${order.status === 'delivered' ? 'active' : ''}`}
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                      >
                        {getStatusIcon('delivered')} Delivered
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="no-orders">No live orders at the moment</div>
            )}
          </div>
        </motion.div>

        {/* Completed Orders */}
        <motion.div
          className="orders-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="section-title">
            <CheckCircle size={24} /> Completed Orders ({completedOrders.length})
          </h2>
          <div className="orders-list">
            {completedOrders.map((order) => (
              <div key={order.id} className="completed-order-row">
                <span className="order-id">#{order.id.toString().slice(-6)}</span>
                <span>{order.userName}</span>
                <span>{order.items.length} items</span>
                <span className="order-total">₹{order.total.toFixed(2)}</span>
                <span className="order-date">
                  {new Date(order.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ManageOrders;
