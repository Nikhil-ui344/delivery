import { motion } from 'framer-motion';
import { useApp } from '../../AppContext';
import { Tag, Calendar, Percent } from 'lucide-react';
import './OffersManagement.css';

function OffersManagement() {
  const { offers } = useApp();

  return (
    <div className="offers-management-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Offers & Discounts</h1>
        </motion.div>

        <div className="offers-grid">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="offer-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="offer-badge">
                <Percent size={32} />
                <span className="discount-value">{offer.discount}% OFF</span>
              </div>
              <h3>{offer.title}</h3>
              <p className="offer-description">{offer.description}</p>
              <div className="offer-code">
                <Tag size={16} />
                <span>{offer.code}</span>
              </div>
              <div className="offer-validity">
                <Calendar size={16} />
                <span>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
              </div>
              <span className={`offer-status ${offer.active ? 'active' : 'inactive'}`}>
                {offer.active ? 'Active' : 'Inactive'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OffersManagement;
