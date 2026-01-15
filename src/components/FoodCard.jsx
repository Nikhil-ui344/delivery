import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';
import './FoodCard.css';

function FoodCard({ item, index, onClick }) {
  return (
    <motion.div
      className={`food-card ${!item.available ? 'unavailable' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -10, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' }}
      onClick={onClick}
    >
      {/* Badge for Popular Items */}
      {item.popular && (
        <div className="popular-badge">
          <Star size={14} fill="currentColor" /> Popular
        </div>
      )}

      {/* Unavailable Badge */}
      {!item.available && (
        <div className="unavailable-badge">
          Currently Unavailable
        </div>
      )}

      {/* Food Image */}
      <div className="food-image">
        <img src={item.image} alt={item.name} />
      </div>

      {/* Food Details */}
      <div className="food-details">
        <h3>{item.name}</h3>
        <p className="food-description">{item.description}</p>

        <div className="food-meta">
          <div className="food-rating">
            <Star size={16} fill="var(--gold)" color="var(--gold)" />
            <span>{item.rating}</span>
            <span className="reviews-count">({item.reviews})</span>
          </div>
        </div>

        <div className="food-footer">
          <div className="food-price">₹{item.price.toFixed(2)}</div>
          <motion.button
            className="add-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!item.available}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {item.available ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default FoodCard;
