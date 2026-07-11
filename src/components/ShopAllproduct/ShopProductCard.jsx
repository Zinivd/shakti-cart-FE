import React, { useState } from "react";

const getBadgeColor = (badge) => {
  switch (badge) {
    case "Best Seller":
      return "#ff9800";
    case "Top Rated":
      return "#4caf50";
    case "Trending Now":
      return "#FF0000";
    case "Top Offer":
      return "#9c27b0";
    default:
      return "#9c27b0";
  }
};

const ShopProductCard = (props) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="shop-product-card">
      <div className="shop-product-img">
        <img src={props.productImg} alt={props.productname} />

        {props.badge && (
          <h6
            className="m-0 shop-product-badge"
            style={{ backgroundColor: getBadgeColor(props.badge) }}
          >
            {props.badge}
          </h6>
        )}

        <div
          className={`shop-heart ${isWishlisted ? "active" : ""}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <span>
            <i className="fa fa-heart"></i>
          </span>
        </div>
      </div>

      <div className="shop-product-content">
        <div className="shop-product-head mb-2">
          <h6>{props.code}</h6>
          <h5>
            <i className="fa fa-star"></i> {props.rating}
          </h5>
        </div>

        <div className="shop-product-details mb-2">
          <h5>{props.productname}</h5>
          <h6>
            ₹{props.price} <span>₹{props.slashprice}</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;
