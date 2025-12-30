import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToWishlist, addToCart } from "../../../service/api";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const ProductCard = (props) => {
  const [isWished, setIsWished] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const isProductDetailsPage =
    location.pathname.startsWith("/products-details");
  const isSameProduct =
    isProductDetailsPage && location.pathname.endsWith(`/${props.id}`);

  // Wishlist
  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;
    setLoading(true);

    try {
      const body = { product_id: props.id };
      const response = await addToWishlist(body);

      if (response) {
        setIsWished(true);
        toast.success("Added to wishlist");
      } else {
        toast.error("Failed to add wishlist");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Add to Cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const payload = {
        product_id: props.id,
        quantity: 1,
      };

      const res = await addToCart(payload);
      if (res?.data?.success) {
        toast.success("Added to Cart");
      }
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  // Badge color
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
    <div className="product-card my-3">
      {/* Image → Product Details */}
      {isSameProduct ? (
        <div className="product-img">
          <img src={props.productImg} alt={props.productname} />
        </div>
      ) : (
        <Link to={`/products-details/${props.id}`}>
          <div className="product-img">
            <img src={props.productImg} alt={props.productname} />
          </div>
        </Link>
      )}

      {/* Badge */}
      {props.badge && (
        <h6
          className="m-0 product-badge"
          style={{ backgroundColor: getBadgeColor(props.badge) }}
        >
          {props.badge}
        </h6>
      )}

      {/* Wishlist */}
      <h6
        className={`heart m-0 ${isWished ? "active" : ""}`}
        onClick={handleWishlistClick}
      >
        <i className={isWished ? "fas fa-heart" : "fa-regular fa-heart"}></i>
      </h6>

      {/* Rating */}
      <h6 className="product-rating">
        <i className="bx bxs-star text-warning"></i> {props.rating}
      </h6>

      <hr className="mt-0" />

      {/* Content */}
      <div className="product-content">
        <div className="product-head">
          {/* {props.icon && (
            <img src={props.icon} alt={props.productname} height="15px" />
          )} */}
          <h6 className="mb-2">{props.brand}</h6>
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
              <button className="cartbtn" onClick={handleAddToCart}>
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
