import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../AppContext';
import { AlertTriangle, Package } from 'lucide-react';
import './Inventory.css';

function Inventory() {
  const { menuItems, updateMenuItem } = useApp();
  const [stockLevels, setStockLevels] = useState(
    menuItems.reduce((acc, item) => ({
      ...acc,
      [item.id]: item.stock || Math.floor(Math.random() * 100) + 20
    }), {})
  );

  const updateStock = (id, newStock) => {
    setStockLevels({ ...stockLevels, [id]: newStock });
    if (newStock === 0) {
      updateMenuItem(id, { available: false });
    } else if (newStock > 0 && !menuItems.find(item => item.id === id).available) {
      updateMenuItem(id, { available: true });
    }
  };

  const getLowStockItems = () => {
    return menuItems.filter(item => stockLevels[item.id] < 20);
  };

  return (
    <div className="inventory-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Inventory & Stock Management</h1>
        </motion.div>

        {/* Low Stock Alert */}
        {getLowStockItems().length > 0 && (
          <motion.div
            className="low-stock-alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertTriangle size={24} />
            <span>{getLowStockItems().length} items are running low on stock!</span>
          </motion.div>
        )}

        {/* Inventory Table */}
        <motion.div
          className="inventory-table-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => {
                const stock = stockLevels[item.id];
                const isLowStock = stock < 20;
                const isOutOfStock = stock === 0;

                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={isOutOfStock ? 'out-of-stock' : isLowStock ? 'low-stock' : ''}
                  >
                    <td>
                      <div className="item-cell">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="category-cell">{item.category}</td>
                    <td>
                      <div className="stock-level">
                        <input
                          type="number"
                          value={stock}
                          onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                          min="0"
                        />
                        <span className="stock-text">units</span>
                      </div>
                    </td>
                    <td>
                      <span className={`stock-badge ${isOutOfStock ? 'out' : isLowStock ? 'low' : 'good'}`}>
                        {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td>
                      <div className="stock-actions">
                        <button
                          className="restock-btn"
                          onClick={() => updateStock(item.id, stock + 50)}
                        >
                          + 50
                        </button>
                        <button
                          className="restock-btn"
                          onClick={() => updateStock(item.id, stock + 100)}
                        >
                          + 100
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Stock Summary */}
        <motion.div
          className="stock-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="summary-card">
            <Package size={40} />
            <h3>Total Items</h3>
            <p>{menuItems.length}</p>
          </div>
          <div className="summary-card low">
            <AlertTriangle size={40} />
            <h3>Low Stock</h3>
            <p>{getLowStockItems().length}</p>
          </div>
          <div className="summary-card out">
            <Package size={40} />
            <h3>Out of Stock</h3>
            <p>{menuItems.filter(item => stockLevels[item.id] === 0).length}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Inventory;
