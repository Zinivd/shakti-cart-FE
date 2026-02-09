import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import { Link } from "react-router-dom";
import {
  getWishlistProducts,
  addToCart,
  removeFromWishlist,
} from "../../../service/api";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { NoWishlist } from "../../../../public/Assets.js";

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = async () => {
    try {
      setLoading(true);
      const res = await getWishlistProducts();
      if (res?.data?.success) {
        setWishlistData(res.data.data || []);
      } else {
        setWishlistData([]);
      }
    } catch (err) {
      console.error("Wishlist fetch error", err);
      setWishlistData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    const payload = {
      product_id: productId,
      quantity: 1,
    };

    try {
      const res = await addToCart(payload);
      if (res?.data?.success) {
        toast.success("Added to Cart");
        handleRemoveWishlist(productId);
      }
    } catch (err) {
      console.error("Add to cart error", err);
      toast.success("failed to Cart");
    }
  };

  const handleRemoveWishlist = async (productId) => {
    const payload = { product_id: productId };

    try {
      const res = await removeFromWishlist(payload);
      if (res?.data?.success) {
        setWishlistData((prev) =>
          prev.filter((item) => item.product_id !== productId),
        );
        toast.error("Removed from Wishlist!");
      }
    } catch (err) {
      console.error("Remove wishlist error", err);
    }
  };

  if (loading) {
    return (
      <div className="wishlistCard text-center py-5">
        <Loader />
      </div>
    );
  }

  if (!loading && wishlistData.length === 0) {
    return (
      <div className="empty-state wishlistCard">
        <img src={NoWishlist} alt="" />
        <h6 className="mb-0">No Items Found in Wishlist</h6>
        <Link to="/">
          <button className="darkbtn mt-3">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlistCard">
      {wishlistData.map((item, index) => (
        <div className="wishlist-div" key={index}>
          <div className="wishlist-grid">
            <div className="close-icon">
              <i
                className="fas fa-xmark"
                onClick={() => handleRemoveWishlist(item.product_id)}
              ></i>
            </div>

            <div className="product-detail">
              <img
                src={
                  item.product?.images?.[0] ||
                  "https://dummyimage.com/200x200/eee/000.png&text=No+Image"
                }
                width="100%"
                height="100px"
                className="object-fit-cover"
                alt=""
              />
              <div className="product-content">
                <h5 className="mb-1">{item.product.product_name}</h5>
                <h6 className="mb-1">Color : {item.product.color}</h6>
                <h6 className="mb-0">
                  Quantity : {item.product.size_unit?.[0]?.unit || 1}
                </h6>
              </div>
            </div>

            <div className="product-content">
              <h5 className="mb-0">₹ {item.product.selling_price}.00</h5>
            </div>

            <Link to={`/products-details/${item.product_id}`}>
              <button className="darkbtn">
                View Product
              </button>
            </Link>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
