import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Star, Sparkles } from 'lucide-react';
import './IntroAnimation.css';

function IntroAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="intro-animation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Circles */}
      <div className="intro-bg">
        <motion.div 
          className="intro-circle circle-1"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="intro-circle circle-2"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="intro-circle circle-3"
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, -180, -360],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ 
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Sparkles */}
      <div className="sparkles-container">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -50, -100]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="intro-content">
        {/* Logo Icon Animation */}
        <motion.div
          className="intro-icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 200
          }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          >
            <Utensils size={80} strokeWidth={2} />
          </motion.div>
        </motion.div>

        {/* Brand Name Animation */}
        <motion.div
          className="intro-brand"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Sangam <span className="brand-accent">Mexico</span>
          </motion.h1>
          
          <motion.div 
            className="brand-underline"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 1.3 }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="intro-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Authentic Indian Cuisine • Premium Experience
        </motion.p>

        {/* Decorative Stars */}
        <div className="intro-stars">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4,
                delay: 2 + (i * 0.1)
              }}
            >
              <Star size={20} fill="var(--gold)" color="var(--gold)" />
            </motion.div>
          ))}
        </div>

        {/* Loading Progress Bar */}
        <motion.div 
          className="intro-progress-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div 
            className="intro-progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="intro-wave">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="url(#waveGradient)"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary-red)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary-red)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}

export default IntroAnimation;
