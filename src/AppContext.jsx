import { createContext, useContext, useState, useEffect } from 'react';
import { menuItems as initialMenuItems, categories, reviews as initialReviews, users, offers } from './data/menuData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "Guest User",
    phone: "+1-555-0199",
    orderHistory: []
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);

  // Cart functions
  const addToCart = (item, customizations) => {
    const cartItem = {
      ...item,
      cartId: Date.now(),
      quantity: customizations.quantity || 1,
      spiceLevel: customizations.spiceLevel || 'Mild',
      selectedToppings: customizations.selectedToppings || [],
      totalPrice: calculateItemPrice(item, customizations)
    };
    setCart([...cart, cartItem]);
    addNotification(`${item.name} added to cart!`, 'success');
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const updateCartQuantity = (cartId, newQuantity) => {
    setCart(cart.map(item => 
      item.cartId === cartId 
        ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity }
        : item
    ));
  };

  const updateCartItem = (cartId, spiceLevel, selectedToppings) => {
    setCart(cart.map(item => {
      if (item.cartId === cartId) {
        const toppingsCost = selectedToppings.length * 1.5;
        const totalPrice = (item.price * item.quantity) + (toppingsCost * item.quantity);
        return {
          ...item,
          spiceLevel,
          selectedToppings,
          totalPrice
        };
      }
      return item;
    }));
    addNotification('Cart item updated!', 'success');
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateItemPrice = (item, customizations) => {
    let price = item.price * (customizations.quantity || 1);
    if (customizations.selectedToppings) {
      price += customizations.selectedToppings.length * 1.5;
    }
    return price;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Order functions
  const placeOrder = () => {
    if (cart.length === 0) return null;
    
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: getCartTotal(),
      status: 'preparing',
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userPhone: currentUser.phone
    };
    
    setOrders([newOrder, ...orders]);
    setActiveOrder(newOrder);
    clearCart();
    addNotification('Order placed successfully!', 'success');
    
    // Simulate order status updates
    setTimeout(() => updateOrderStatus(newOrder.id, 'ready'), 8000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'delivered'), 15000);
    
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder({ ...activeOrder, status: newStatus });
      
      if (newStatus === 'ready') {
        addNotification('Your order is ready for pickup!', 'success');
      } else if (newStatus === 'delivered') {
        addNotification('Order delivered successfully!', 'success');
      }
    }
  };

  // Menu management (Admin)
  const addMenuItem = (item) => {
    const newItem = { ...item, id: Date.now() };
    setMenuItems([...menuItems, newItem]);
    addNotification('Menu item added successfully!', 'success');
  };

  const updateMenuItem = (id, updates) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
    addNotification('Menu item updated!', 'success');
  };

  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    addNotification('Menu item deleted!', 'success');
  };

  const toggleItemAvailability = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  // Notification functions
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString()
    };
    setNotifications([notification, ...notifications]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Review functions
  const addReview = (review) => {
    const newReview = { ...review, id: Date.now() };
    setReviews([newReview, ...reviews]);
    addNotification('Review submitted successfully!', 'success');
  };

  const value = {
    menuItems,
    categories,
    cart,
    orders,
    activeOrder,
    notifications,
    currentUser,
    isAdmin,
    users,
    offers,
    reviews,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    updateCartItem,
    clearCart,
    getCartTotal,
    getCartCount,
    placeOrder,
    updateOrderStatus,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    addNotification,
    removeNotification,
    setIsAdmin,
    addReview
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
