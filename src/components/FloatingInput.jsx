import { useState } from 'react';
import { motion } from 'framer-motion';
import './FloatingInput.css';

function FloatingInput({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  icon: Icon,
  required = false,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value && value.length > 0;
  const shouldFloat = isFocused || hasValue;

  return (
    <div className="floating-input-wrapper">
      <div className={`floating-input-container ${error ? 'has-error' : ''} ${isFocused ? 'is-focused' : ''}`}>
        {Icon && (
          <div className="input-icon">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="floating-input"
          placeholder=" "
          {...props}
        />
        <motion.label
          className="floating-label"
          initial={false}
          animate={{
            top: shouldFloat ? '-10px' : '50%',
            fontSize: shouldFloat ? '0.75rem' : '1rem',
            color: isFocused ? 'var(--primary-red)' : error ? 'var(--danger)' : '#9CA3AF'
          }}
          transition={{ duration: 0.2 }}
        >
          {label} {required && <span className="required-star">*</span>}
        </motion.label>
      </div>
      {error && (
        <motion.div
          className="input-error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}

export default FloatingInput;
