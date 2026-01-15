import './SkeletonLoader.css';

function SkeletonLoader({ type = 'card', count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-footer">
                <div className="skeleton-price"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="skeleton-list-item">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-list-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
            </div>
          </div>
        );
      default:
        return <div className="skeleton-line"></div>;
    }
  };

  return (
    <div className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}

export default SkeletonLoader;
