import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../AppContext';
import { Search, Filter, ChevronLeft, ChevronRight, Star, TrendingUp, Clock } from 'lucide-react';
import MenuTabs from '../../components/MenuTabs';
import FoodCard from '../../components/FoodCard';
import FoodDetailModal from '../../components/FoodDetailModal';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import './UserHome.css';

function UserHome() {
  const { menuItems, categories } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [priceFilter, setPriceFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter === 'low') matchesPrice = item.price < 10;
    else if (priceFilter === 'medium') matchesPrice = item.price >= 10 && item.price < 20;
    else if (priceFilter === 'high') matchesPrice = item.price >= 20;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Banner Slider State
  const banners = [
    {
      id: 1,
      title: "50% OFF on First Order!",
      subtitle: "Use code: FIRST50 at checkout",
      bgColor: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"
    },
    {
      id: 2,
      title: "Free Delivery on Orders Above ₹300",
      subtitle: "Limited time offer - Order now!",
      bgColor: "linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800"
    },
    {
      id: 3,
      title: "New Menu Items Available",
      subtitle: "Try our special Indian delicacies",
      bgColor: "linear-gradient(135deg, #B91C1C 0%, #7C2D12 100%)",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800"
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="user-home">
      {/* Modern Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Star size={16} fill="currentColor" /> Premium Quality
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome to <span className="brand-highlight">Sangam Mexico</span>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Authentic Indian Flavors, Delivered Fresh to Your Table
          </motion.p>
          <motion.div
            className="hero-features"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="hero-feature">
              <TrendingUp size={20} />
              <span>Top Rated</span>
            </div>
            <div className="hero-feature">
              <Clock size={20} />
              <span>Fast Delivery</span>
            </div>
            <div className="hero-feature">
              <Star size={20} fill="currentColor" />
              <span>4.8 Rating</span>
            </div>
          </motion.div>
        </div>
        <div className="hero-image">
          <motion.img
            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200"
            alt="Delicious Food"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </div>
        <div className="hero-decoration hero-decoration-1"></div>
        <div className="hero-decoration hero-decoration-2"></div>
      </motion.div>

      {/* Banner Slider */}
      <div className="banner-slider-container">
        <div className="banner-slider">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner}
              className="banner-slide"
              style={{ background: banners[currentBanner].bgColor }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="banner-content">
                <h2>{banners[currentBanner].title}</h2>
                <p>{banners[currentBanner].subtitle}</p>
              </div>
              <div className="banner-image">
                <img src={banners[currentBanner].image} alt="Offer" />
              </div>
            </motion.div>
          </AnimatePresence>
          
          <button className="banner-nav banner-prev" onClick={prevBanner}>
            <ChevronLeft size={24} />
          </button>
          <button className="banner-nav banner-next" onClick={nextBanner}>
            <ChevronRight size={24} />
          </button>
          
          <div className="banner-indicators">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`banner-indicator ${index === currentBanner ? 'active' : ''}`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* Search and Filter Bar */}
        <motion.div
          className="search-filter-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search for your favorite food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filters
          </button>
        </motion.div>

        {/* Filter Options */}
        {showFilters && (
          <motion.div
            className="filter-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="filter-group">
              <label>Price Range:</label>
              <div className="filter-buttons">
                <button
                  className={priceFilter === 'all' ? 'active' : ''}
                  onClick={() => setPriceFilter('all')}
                >
                  All
                </button>
                <button
                  className={priceFilter === 'low' ? 'active' : ''}
                  onClick={() => setPriceFilter('low')}
                >
                  Under $10
                </button>
                <button
                  className={priceFilter === 'medium' ? 'active' : ''}
                  onClick={() => setPriceFilter('medium')}
                >
                  $10 - $20
                </button>
                <button
                  className={priceFilter === 'high' ? 'active' : ''}
                  onClick={() => setPriceFilter('high')}
                >
                  $20+
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Meal Category Tabs */}
        <MenuTabs
          categories={[{ id: 'all', name: 'All Items', icon: 'Utensils' }, ...categories]}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Menu Grid */}
        <motion.div
          className="menu-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isLoading ? (
            <SkeletonLoader type="card" count={6} />
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <FoodCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedFood(item)}
              />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1' }}>
              <EmptyState
                icon={Search}
                title="No items found"
                message="Try adjusting your search or filters to find what you're looking for"
                action={() => {
                  setSearchQuery('');
                  setPriceFilter('all');
                  setSelectedCategory('all');
                }}
                actionText="Clear Filters"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Food Detail Modal */}
      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  );
}

export default UserHome;
