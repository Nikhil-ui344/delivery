import { motion } from 'framer-motion';
import { useApp } from '../../AppContext';
import { TrendingUp, DollarSign, Star } from 'lucide-react';
import './Analytics.css';

function Analytics() {
  const { orders, menuItems } = useApp();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = totalRevenue / orders.length || 0;
  const popularItems = menuItems.filter(item => item.popular).slice(0, 5);

  const salesByCategory = menuItems.reduce((acc, item) => {
    const itemOrders = orders.filter(order => 
      order.items.some(orderItem => orderItem.id === item.id)
    );
    const revenue = itemOrders.reduce((sum, order) => sum + order.total, 0);
    
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }
    acc[item.category] += revenue;
    return acc;
  }, {});

  return (
    <div className="analytics-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Sales & Analytics</h1>
        </motion.div>

        {/* Revenue Cards */}
        <div className="analytics-cards">
          <motion.div
            className="analytics-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <DollarSign size={40} />
            <h3>Total Revenue</h3>
            <p className="analytics-value">${totalRevenue.toFixed(2)}</p>
          </motion.div>

          <motion.div
            className="analytics-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TrendingUp size={40} />
            <h3>Average Order Value</h3>
            <p className="analytics-value">${avgOrderValue.toFixed(2)}</p>
          </motion.div>

          <motion.div
            className="analytics-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Star size={40} />
            <h3>Total Orders</h3>
            <p className="analytics-value">{orders.length}</p>
          </motion.div>
        </div>

        {/* Popular Items */}
        <motion.div
          className="popular-items-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Popular Food Items</h2>
          <div className="popular-items-list">
            {popularItems.map((item, index) => (
              <div key={item.id} className="popular-item">
                <span className="item-rank">#{index + 1}</span>
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>{item.category}</p>
                </div>
                <div className="item-stats">
                  <span className="item-rating">
                    <Star size={14} fill="currentColor" /> {item.rating}
                  </span>
                  <span className="item-price">₹{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sales by Category */}
        <motion.div
          className="category-sales-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Sales by Category</h2>
          <div className="category-bars">
            {Object.entries(salesByCategory).map(([category, revenue]) => {
              const percentage = (revenue / totalRevenue) * 100;
              return (
                <div key={category} className="category-bar-item">
                  <div className="category-label">
                    <span className="category-name">{category}</span>
                    <span className="category-value">₹{revenue.toFixed(2)}</span>
                  </div>
                  <div className="category-bar-bg">
                    <motion.div
                      className="category-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <span className="category-percentage">{percentage.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Analytics;
