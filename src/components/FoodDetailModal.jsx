import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import { X, Star, Plus, Minus, Flame } from 'lucide-react';
import './FoodDetailModal.css';

function FoodDetailModal({ food, onClose }) {
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState(food.spiceLevels[0] || 'Mild');
  const [selectedToppings, setSelectedToppings] = useState([]);

  const handleToppingToggle = (topping) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter(t => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const calculateTotal = () => {
    const basePrice = food.price * quantity;
    let toppingsPrice = 0;
    
    if (food.toppings && Array.isArray(food.toppings)) {
      selectedToppings.forEach(selectedTopping => {
        const topping = food.toppings.find(t => 
          typeof t === 'object' ? t.name === selectedTopping : t === selectedTopping
        );
        if (topping) {
          const price = typeof topping === 'object' ? topping.price : 1.5;
          toppingsPrice += price * quantity;
        }
      });
    }
    
    return (basePrice + toppingsPrice).toFixed(2);
  };

  const handleAddToCart = () => {
    addToCart(food, {
      quantity,
      spiceLevel,
      selectedToppings
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="food-detail-modal"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <X size={28} />
          </button>

          <div className="modal-image">
            <img src={food.image} alt={food.name} />
            {food.popular && (
              <div className="modal-popular-badge">
                <Star size={16} fill="currentColor" /> Popular
              </div>
            )}
          </div>

          <div className="modal-content">
            <div className="modal-header">
              <h2>{food.name}</h2>
              <div className="modal-rating">
                <Star size={20} fill="var(--gold)" color="var(--gold)" />
                <span>{food.rating}</span>
                <span className="modal-reviews">({food.reviews} reviews)</span>
              </div>
            </div>

            <p className="modal-description">{food.description}</p>

            <div className="modal-price-display">
              <span className="price-label">Base Price:</span>
              <span className="price-value">₹{food.price.toFixed(2)}</span>
            </div>

            {/* Quantity Selector */}
            <div className="customization-section">
              <h3>Quantity</h3>
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={20} />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Spice Level */}
            {food.spiceLevels && food.spiceLevels.length > 0 && (
              <div className="customization-section">
                <h3>
                  <Flame size={18} /> Spice Level
                </h3>
                <div className="spice-options">
                  {food.spiceLevels.map((level) => (
                    <motion.button
                      key={level}
                      className={`spice-btn ${spiceLevel === level ? 'active' : ''}`}
                      onClick={() => setSpiceLevel(level)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Toppings */}
            {food.toppings && food.toppings.length > 0 && (
              <div className="customization-section">
                <h3>Extra Toppings</h3>
                <div className="toppings-grid">
                  {food.toppings.map((topping) => {
                    const toppingName = typeof topping === 'object' ? topping.name : topping;
                    const toppingPrice = typeof topping === 'object' ? topping.price : 1.5;
                    
                    return (
                      <motion.label
                        key={toppingName}
                        className="topping-checkbox"
                        whileHover={{ scale: 1.02 }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedToppings.includes(toppingName)}
                          onChange={() => handleToppingToggle(toppingName)}
                        />
                        <span className="topping-name">{toppingName}</span>
                        <span className="topping-price">+${toppingPrice.toFixed(2)}</span>
                      </motion.label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Total and Add to Cart */}
            <div className="modal-footer">
              <div className="total-price">
                <span>Total:</span>
                <span className="total-amount">${calculateTotal()}</span>
              </div>
              <motion.button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!food.available}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {food.available ? 'Add to Cart' : 'Currently Unavailable'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default FoodDetailModal;
