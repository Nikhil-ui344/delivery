import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../AppContext';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import './ManageMenu.css';

function ManageMenu() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, toggleItemAvailability, categories } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    category: 'breakfast',
    price: '',
    image: '',
    description: '',
    available: true,
    spiceLevels: ['Mild', 'Medium', 'Hot'],
    toppings: [],
    popular: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      ...formData,
      price: parseFloat(formData.price),
      rating: 4.5,
      reviews: 0
    };

    if (editingItem) {
      updateMenuItem(editingItem.id, itemData);
      setEditingItem(null);
    } else {
      addMenuItem(itemData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'breakfast',
      price: '',
      image: '',
      description: '',
      available: true,
      spiceLevels: ['Mild', 'Medium', 'Hot'],
      toppings: [],
      popular: false
    });
    setShowAddForm(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      image: item.image,
      description: item.description,
      available: item.available,
      spiceLevels: item.spiceLevels || [],
      toppings: item.toppings || [],
      popular: item.popular || false
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(id);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="manage-menu-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="page-header">
            <h1 className="page-title">Manage Menu</h1>
            <motion.button
              className="btn-primary"
              onClick={() => {
                setShowAddForm(!showAddForm);
                if (showAddForm) resetForm();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              {showAddForm ? 'Cancel' : 'Add New Item'}
            </motion.button>
          </div>
        </motion.div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              className="menu-form-card"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h2>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
              <form onSubmit={handleSubmit} className="menu-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Item Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Image URL *</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="available"
                      checked={formData.available}
                      onChange={handleInputChange}
                    />
                    <span>Available</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="popular"
                      checked={formData.popular}
                      onChange={handleInputChange}
                    />
                    <span>Mark as Popular</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => setSelectedCategory('all')}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={selectedCategory === cat.id ? 'active' : ''}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="menu-items-grid">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`menu-admin-card ${!item.available ? 'unavailable' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="item-image">
                <img src={item.image} alt={item.name} />
                {!item.available && (
                  <div className="unavailable-overlay">OUT OF STOCK</div>
                )}
              </div>

              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price.toFixed(2)}</p>
                <p className="item-category">{item.category}</p>
              </div>

              <div className="item-actions">
                <motion.button
                  className="action-btn availability"
                  onClick={() => toggleItemAvailability(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={item.available ? 'Mark Unavailable' : 'Mark Available'}
                >
                  {item.available ? <Eye size={18} /> : <EyeOff size={18} />}
                </motion.button>

                <motion.button
                  className="action-btn edit"
                  onClick={() => handleEdit(item)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit2 size={18} />
                </motion.button>

                <motion.button
                  className="action-btn delete"
                  onClick={() => handleDelete(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageMenu;
