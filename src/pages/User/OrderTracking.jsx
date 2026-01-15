import { motion } from 'framer-motion';
import { useApp } from '../../AppContext';
import { Package, CheckCircle, Clock, Truck } from 'lucide-react';
import EmptyState from '../../components/EmptyState';
import ProgressBar from '../../components/ProgressBar';
import './OrderTracking.css';

function OrderTracking() {
  const { activeOrder, orders } = useApp();

  const getStatusStep = (status) => {
    switch (status) {
      case 'preparing':
        return 0;
      case 'ready':
        return 1;
      case 'delivered':
        return 2;
      default:
        return 0;
    }
  };

  const statusSteps = [
    { name: 'Preparing', icon: <Clock size={32} />, description: 'Your order is being prepared' },
    { name: 'Ready', icon: <Package size={32} />, description: 'Order is ready for pickup' },
    { name: 'Delivered', icon: <CheckCircle size={32} />, description: 'Order delivered successfully' }
  ];

  if (!activeOrder && orders.length === 0) {
    return (
      <div className="order-tracking-page">
        <div className="page-container">
          <EmptyState
            icon={Truck}
            title="No Active Orders"
            message="Place an order to track it here and see real-time updates on your delivery!"
          />
        </div>
      </div>
    );
  }

  const currentOrder = activeOrder || orders[0];
  const currentStep = getStatusStep(currentOrder.status);

  return (
    <div className="order-tracking-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Track Your Order</h1>
        </motion.div>

        {/* Active Order Status */}
        <motion.div
          className="tracking-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="order-info">
            <h2>Order #{currentOrder.id.toString().slice(-6)}</h2>
            <p className="order-time">
              {new Date(currentOrder.timestamp).toLocaleString()}
            </p>
            <p className="order-total">
              Total: <span>₹{currentOrder.total.toFixed(2)}</span>
            </p>
            <ProgressBar 
              progress={((currentStep + 1) / statusSteps.length) * 100} 
              color="success"
              height="large"
            />
          </div>

          {/* Status Stepper */}
          <div className="status-stepper">
            {statusSteps.map((step, index) => (
              <div
                key={index}
                className={`status-step ${index <= currentStep ? 'active' : ''} ${
                  index === currentStep ? 'current' : ''
                }`}
              >
                <motion.div
                  className="step-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {step.icon}
                </motion.div>
                <div className="step-details">
                  <h3>{step.name}</h3>
                  <p>{step.description}</p>
                </div>
                {index < statusSteps.length - 1 && (
                  <div className={`step-connector ${index < currentStep ? 'completed' : ''}`} />
                )}
              </div>
            ))}
          </div>

          {/* Order Items */}
          <div className="order-items-section">
            <h3>Order Items</h3>
            <div className="order-items-list">
              {currentOrder.items.map((item) => (
                <div key={item.cartId} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="order-item-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">
                    ${item.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Order History */}
        {orders.length > 0 && (
          <motion.div
            className="order-history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Order History</h2>
            <div className="history-list">
              {orders.map((order) => (
                <div key={order.id} className="history-item">
                  <div className="history-header">
                    <span className="order-id">
                      Order #{order.id.toString().slice(-6)}
                    </span>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="history-date">
                    {new Date(order.timestamp).toLocaleString()}
                  </p>
                  <p className="history-total">${order.total.toFixed(2)}</p>
                  <p className="history-items">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default OrderTracking;
