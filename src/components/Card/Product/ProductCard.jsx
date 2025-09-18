import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  // Like
  const [isWished, setIsWished] = useState(false);
  const toggleWish = () => {
    setIsWished(!isWished);
  };

  // Badge Color
  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Best Seller":
        return "#ff9800";
      case "Top Rated":
        return "#4caf50";
      case "Trending Now":
        return "#FF0000";
      default:
        return "#9c27b0";
    }
  };
  return (
    <Link className={`product-card mb-3`}>
      <div className="product-img">
        <img src={props.productImg} alt={props.productname} />
      </div>

      {/* Badge */}
      {props.badge && (
        <h6
          className="m-0 badge"
          style={{ backgroundColor: getBadgeColor(props.badge) }}
        >
          {props.badge}
        </h6>
      )}

      {/* Heart */}
      <h6
        className={`heart m-0 ${isWished ? "active" : ""}`}
        onClick={toggleWish}
      >
        <span>
          <i className={isWished ? "fas fa-heart" : "fa-regular fa-heart"}></i>
        </span>
      </h6>
      <hr />

      {/* Product Content */}
      <div className="product-content">
        <div className="product-head">
          <div className="d-flex align-items-center column-gap-2">
            {props.icon && (
              <img src={props.icon} alt={props.productname} className="mb-2" height="15px" />
            )}
            <h6 className="mb-2">{props.brand}</h6>
          </div>
          <h5 className="mb-2">
            <i className="fas fa-star text-warning"></i> {props.rating}
          </h5>
        </div>
        <div className="product-details">
          <h5 className="mb-2">{props.productname}</h5>
          <h6 className="mb-2">
            ₹ {props.price}
            <span className="ps-2 text-decoration-line-through">
              ₹ {props.slashprice}
            </span>
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
