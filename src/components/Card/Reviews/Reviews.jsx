import React from "react";
import "./Reviews.css";

const Reviews = () => {
  const ratingData = [
    { stars: 5, count: 36, color: "#37B66A" },
    { stars: 4, count: 26, color: "#37B66A" },
    { stars: 3, count: 2, color: "#37B66A" },
    { stars: 2, count: 5, color: "#FF6B6B" },
    { stars: 1, count: 10, color: "#FF6B6B" },
  ];

  const totalReviews = ratingData.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <div className="review-summary">
      <div className="review-left">
        <h1>
          4.3<span>★</span>
        </h1>
        <h6>{totalReviews} Verified Buyers</h6>
      </div>

      <div className="review-right">
        {ratingData.map((item) => {
          const percent = (item.count / totalReviews) * 100;
          return (
            <div key={item.stars} className="review-bar mb-1">
              <span className="review-star">{item.stars}</span>
              <span className="star-icon">★</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${percent}%`, backgroundColor: item.color }}
                ></div>
              </div>
              <span className="count">{item.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
