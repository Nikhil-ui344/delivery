import { motion } from 'framer-motion';
import './LoadingSpinner.css';

function LoadingSpinner({ size = 'medium', color = 'primary' }) {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  return (
    <div className={`loading-spinner ${sizeClasses[size]}`}>
      <motion.div
        className={`spinner ${color}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default LoadingSpinner;
