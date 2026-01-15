import { motion } from 'framer-motion';
import './EmptyState.css';

function EmptyState({ 
  icon: Icon, 
  title, 
  message, 
  action, 
  actionText 
}) {
  return (
    <motion.div 
      className="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="empty-state-icon"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1
        }}
      >
        <Icon size={120} strokeWidth={1.5} />
      </motion.div>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-message">{message}</p>
      {action && actionText && (
        <motion.button
          className="empty-state-action"
          onClick={action}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {actionText}
        </motion.button>
      )}
    </motion.div>
  );
}

export default EmptyState;
