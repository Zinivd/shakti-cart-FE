import React, { useState } from "react";
import { addToWishlist, removeFromWishlist } from "../../service/api";
import { toast } from "react-toastify";

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
  const [isWishlisted, setIsWishlisted] = useState(props.isWishlisted || false);
  const [wishLoading, setWishLoading] = useState(false);

 const handleAddWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (wishLoading) return;
    setWishLoading(true);

    try {
      const body = {
        product_id: props.id,
        size: props.size || "S",
      };

      const res = await addToWishlist(body);

      if (res?.data?.success || res) {
        setIsWishlisted(true);
        toast.success("Added to Wishlist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add wishlist");
    } finally {
      setWishLoading(false);
    }
  };

  const handleRemoveWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (wishLoading) return;
    setWishLoading(true);

    try {
      const payload = {
        product_id: props.id,
        size: props.size || "S",
      };

      const res = await removeFromWishlist(payload);

      if (res?.data?.success || res) {
        setIsWishlisted(false);
        toast.error("Removed from Wishlist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove wishlist");
    } finally {
      setWishLoading(false);
    }
  };

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
          onClick={isWishlisted ? handleRemoveWishlist : handleAddWishlist}
        >
          <span>
            <i className={isWishlisted ? "fas fa-heart" : "fa fa-heart"}></i>
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