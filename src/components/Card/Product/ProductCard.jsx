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
    <div className={`product-card mb-3`}>
      <Link to={`/products/${props.id}`}>
        <div className="product-img">
          <img src={props.productImg} alt={props.productname} />
        </div>
      </Link>

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

      {/* Rating */}
      <h6 className="product-rating">
        <i className="fas fa-star text-warning"></i> {props.rating}
      </h6>

      <hr className="mt-0" />

      {/* Product Content */}
      <div className="product-content">
        <div className="product-head">
          <div className="d-flex align-items-center column-gap-2">
            {props.icon && (
              <img
                src={props.icon}
                alt={props.productname}
                className="mb-2"
                height="15px"
              />
            )}
            <h6 className="mb-2">{props.brand}</h6>
          </div>
          {/* <h5 className="mb-2">
            <i className="fas fa-star text-warning"></i> {props.rating}
          </h5> */}
        </div>
        <div className="product-details">
          <h5 className="mb-2">{props.productname}</h5>
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0">
              ₹ {props.price}
              <span className="ps-1 text-decoration-line-through">
                ₹ {props.slashprice}
              </span>
            </h6>
            {props.showCartBtn && (
              <button className="cartbtn">
                <i className="fas fa-shopping-cart"></i>
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
