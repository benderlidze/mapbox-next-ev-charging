import React from "react";

import { GoldStar } from "./goldStar";
import { GrayStar } from "./grayStar";

const StarRating = ({ rating }: { rating: number }) => {
  const maxRating = 5; // Adjust this for your maximum rating

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      if (i <= rating) {
        stars.push(<GoldStar key={i} />);
      } else {
        stars.push(<GrayStar key={i} />);
      }
    }
    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default StarRating;
