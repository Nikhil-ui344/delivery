import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../AppContext';
import { Star, Send } from 'lucide-react';
import './Reviews.css';

function Reviews() {
  const { reviews, addReview, currentUser } = useApp();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    itemId: null
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    addReview({
      ...newReview,
      userName: currentUser.name,
      date: new Date().toISOString().split('T')[0]
    });
    setNewReview({ rating: 5, comment: '', itemId: null });
    setShowReviewForm(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        fill={i < rating ? 'var(--gold)' : 'none'}
        color={i < rating ? 'var(--gold)' : '#ccc'}
      />
    ));
  };

  return (
    <div className="reviews-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="reviews-header">
            <h1 className="page-title">Customer Reviews</h1>
            <motion.button
              className="btn-primary"
              onClick={() => setShowReviewForm(!showReviewForm)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </motion.button>
          </div>
        </motion.div>

        {/* Review Form */}
        {showReviewForm && (
          <motion.div
            className="review-form-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h2>Write Your Review</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Your Rating</label>
                <div className="star-rating-input">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                      className="star-btn"
                    >
                      <Star
                        size={32}
                        fill={i < newReview.rating ? 'var(--gold)' : 'none'}
                        color={i < newReview.rating ? 'var(--gold)' : '#ccc'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your experience with us..."
                  rows="5"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="submit-review-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                Submit Review
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Reviews List */}
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <h3>{review.userName}</h3>
                    <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>

              <p className="review-comment">{review.comment}</p>

              <div className="review-footer">
                <span className="helpful-badge">👍 Helpful</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          className="reviews-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Rating Overview</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>{reviews.length}</h3>
              <p>Total Reviews</p>
            </div>
            <div className="stat-item">
              <h3>
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0).toFixed(1)}
              </h3>
              <p>Average Rating</p>
              <div className="average-stars">
                {renderStars(Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length))}
              </div>
            </div>
            <div className="stat-item">
              <h3>{reviews.filter(r => r.rating === 5).length}</h3>
              <p>5-Star Reviews</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Reviews;
