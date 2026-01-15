import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../AppContext';
import { ShoppingBag, Trash2 } from 'lucide-react';
import './Checkout.css';

function Checkout() {
  const { cart, getCartTotal, clearCart, placeOrder } = useApp();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const order = placeOrder();
    if (order) {
      navigate('/track-order');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="page-container">
          <div className="empty-checkout">
            <ShoppingBag size={80} />
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to your cart before checking out</p>
            <motion.button
              className="btn-primary"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Menu
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Checkout</h1>
        </motion.div>

        <div className="checkout-layout">
          {/* Order Summary */}
          <motion.div
            className="order-summary-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.map((item) => (
                <div key={item.cartId} className="checkout-item">
                  <img src={item.image} alt={item.name} />
                  <div className="checkout-item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Spice: {item.spiceLevel}</p>
                    {item.selectedToppings.length > 0 && (
                      <p className="toppings">
                        Toppings: {item.selectedToppings.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="checkout-item-price">
                    ₹{item.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment Summary */}
          <motion.div
            className="payment-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="payment-card">
              <h2>Payment Summary</h2>
              
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Tax (10%)</span>
                  <span>₹{(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Delivery Fee</span>
                  <span>₹50.00</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>₹{(getCartTotal() * 1.1 + 50).toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                className="place-order-btn"
                onClick={handlePlaceOrder}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Place Order
              </motion.button>

              <motion.button
                className="clear-cart-btn"
                onClick={clearCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 size={18} />
                Clear Cart
              </motion.button>
            </div>

            {/* Delivery Info */}
            <div className="delivery-info">
              <h3>📍 Delivery Address</h3>
              <p>123 Main Street</p>
              <p>Anytown, ST 12345</p>
              <p>Phone: +1-555-0199</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
