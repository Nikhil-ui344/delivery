import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import './NotificationToast.css';

function NotificationToast() {
  const { notifications, removeNotification } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className="notification-container">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`notification-toast ${notification.type}`}
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <div className="notification-icon">
              {getIcon(notification.type)}
            </div>
            <p className="notification-message">{notification.message}</p>
            <button
              className="notification-close"
              onClick={() => removeNotification(notification.id)}
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default NotificationToast;
