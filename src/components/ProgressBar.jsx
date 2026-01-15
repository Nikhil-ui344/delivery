import { motion } from 'framer-motion';
import './ProgressBar.css';

function ProgressBar({ progress, showPercentage = true, color = 'primary', height = 'medium' }) {
  const heightClasses = {
    small: 'progress-small',
    medium: 'progress-medium',
    large: 'progress-large'
  };

  return (
    <div className={`progress-bar-container ${heightClasses[height]}`}>
      <div className="progress-bar-track">
        <motion.div
          className={`progress-bar-fill ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {showPercentage && (
            <span className="progress-percentage">{Math.round(progress)}%</span>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ProgressBar;
