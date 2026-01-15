import { motion } from 'framer-motion';
import { Coffee, Utensils, UtensilsCrossed, Cookie, GlassWater } from 'lucide-react';
import './MenuTabs.css';

function MenuTabs({ categories, selectedCategory, onSelectCategory }) {
  const iconMap = {
    Coffee: Coffee,
    Utensils: Utensils,
    UtensilsCrossed: UtensilsCrossed,
    Cookie: Cookie,
    Glass: GlassWater
  };

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  return (
    <div className="menu-tabs">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          className={`menu-tab ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="tab-icon">{getIcon(category.icon)}</span>
          <span className="tab-name">{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
}

export default MenuTabs;
