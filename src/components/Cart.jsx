import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2, Edit2, ShoppingBag } from 'lucide-react';
import EmptyState from './EmptyState';
import './Cart.css';

function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { cart, removeFromCart, updateCartQuantity, updateCartItem, getCartTotal, getCartCount, menuItems } = useApp();
  const navigate = useNavigate();

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (cartId, spiceLevel, selectedToppings) => {
    updateCartItem(cartId, spiceLevel, selectedToppings);
    setEditingItem(null);
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <motion.button
        className="cart-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingCart size={24} />
        {getCartCount() > 0 && (
          <motion.span
            className="cart-count"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={getCartCount()}
          >
            {getCartCount()}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="cart-header">
                <h2>Your Cart ({getCartCount()} items)</h2>
                <button onClick={() => setIsOpen(false)} className="close-btn">
                  <X size={24} />
                </button>
              </div>

              <div className="cart-items">
                {cart.length === 0 ? (
                  <EmptyState
                    icon={ShoppingBag}
                    title="Your cart is empty"
                    message="Add some delicious items to your cart to get started!"
                    action={() => setIsOpen(false)}
                    actionText="Browse Menu"
                  />
                ) : (
                  <>
                    {cart.map((item) => (
                      <motion.div
                        key={item.cartId}
                        className="cart-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                      >
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p className="cart-item-customizations">
                            Spice: {item.spiceLevel}
                            {item.selectedToppings.length > 0 && (
                              <span> • Toppings: {item.selectedToppings.join(', ')}</span>
                            )}
                          </p>
                          <div className="cart-item-price">
                            ₹{item.totalPrice.toFixed(2)}
                          </div>
                        </div>
                        <div className="cart-item-actions">
                          <div className="quantity-controls">
                            <button
                              onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="action-buttons">
                            <button
                              className="edit-btn"
                              onClick={() => handleEditItem(item)}
                              title="Edit item"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="remove-btn"
                              onClick={() => removeFromCart(item.cartId)}
                              title="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span className="total-amount">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <motion.button
                    className="checkout-btn"
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
        
        {/* Edit Item Modal */}
        {editingItem && (
          <EditCartItemModal
            item={editingItem}
            onClose={() => setEditingItem(null)}
            onSave={handleSaveEdit}
            menuItems={menuItems}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Edit Cart Item Modal Component
function EditCartItemModal({ item, onClose, onSave, menuItems }) {
  const originalItem = menuItems.find(m => m.id === item.id);
  const [spiceLevel, setSpiceLevel] = useState(item.spiceLevel);
  const [selectedToppings, setSelectedToppings] = useState(item.selectedToppings);

  const handleToppingToggle = (topping) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter(t => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleSave = () => {
    onSave(item.cartId, spiceLevel, selectedToppings);
  };

  return (
    <>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="edit-cart-modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h3>Edit {item.name}</h3>
        
        {originalItem?.spiceLevels && originalItem.spiceLevels.length > 0 && (
          <div className="edit-section">
            <h4>Spice Level</h4>
            <div className="spice-options">
              {originalItem.spiceLevels.map((level) => (
                <button
                  key={level}
                  className={`option-btn ${spiceLevel === level ? 'active' : ''}`}
                  onClick={() => setSpiceLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {originalItem?.toppings && originalItem.toppings.length > 0 && (
          <div className="edit-section">
            <h4>Toppings</h4>
            <div className="toppings-grid">
              {originalItem.toppings.map((topping) => (
                <button
                  key={topping}
                  className={`topping-btn ${selectedToppings.includes(topping) ? 'active' : ''}`}
                  onClick={() => handleToppingToggle(topping)}
                >
                  {topping}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="edit-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default Cart;
