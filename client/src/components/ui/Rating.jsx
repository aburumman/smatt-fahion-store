import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, maxStars = 5, showCount = false, count = 0 }) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} className="star-icon filled" />);
    } else if (value >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="star-icon filled" />);
    } else {
      stars.push(<FaRegStar key={i} className="star-icon" />);
    }
  }

  return (
    <div className="rating">
      {stars}
      {showCount && <span className="rating-count">({count})</span>}
    </div>
  );
};

export default Rating;
