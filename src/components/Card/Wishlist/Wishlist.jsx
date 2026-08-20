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
import { NoWishlist } from "../../../assets/Assets.js";

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
      } else {
        toast.error(res?.data?.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Add to cart error", err);
      toast.error("Failed to add to cart");
    }
  };

  const handleRemoveWishlist = async (productId) => {
    const payload = {
      product_id: productId,
    };

    try {
      const res = await removeFromWishlist(payload);

      if (res?.data?.success) {
        setWishlistData((prev) =>
          prev.filter(
            (item) => String(item.product_id) !== String(productId)
          )
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

        <h6 className="mb-0">
          No Items Found in Wishlist
        </h6>

        <Link to="/">
          <button className="darkbtn mt-3">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlistCard">

      {wishlistData.map((item) => {
        const product = item.product;

        // First color variant
        const firstColor = product?.colors?.[0];

        // First image of selected color
        const productImage = firstColor?.images?.[0];

        // Color name
        const colorName = firstColor?.color?.name;

        return (
          <div
            className="wishlist-div"
            key={item.id}
          >

            <div className="wishlist-grid">

              {/* Remove wishlist */}
              <div className="close-icon">
                <i
                  className="fas fa-xmark"
                  onClick={() =>
                    handleRemoveWishlist(item.product_id)
                  }
                ></i>
              </div>

              {/* Product Details */}
              <div className="product-detail">

                <img
                  src={
                    productImage ||
                    "https://dummyimage.com/200x200/eee/000.png&text=No+Image"
                  }
                  width="100%"
                  height="100px"
                  className="object-fit-cover"
                  alt={product?.name || "Product"}
                />

                <div className="product-content">

                  {/* Product Name */}
                  <h5 className="mb-1">
                    {product?.name || "Product"}
                  </h5>

                  {/* Color */}
                  <h6 className="mb-1">
                    Color : {colorName || "N/A"}
                  </h6>

                  {/* Quantity */}
                  <h6 className="mb-0">
                    Quantity : 1
                  </h6>

                </div>
              </div>

              {/* Price */}
              <div className="product-content">
                <h5 className="mb-0">
                  ₹{" "}
                  {Number(
                    product?.selling_price || 0
                  ).toFixed(2)}
                </h5>
              </div>

              {/* View Product */}
              <Link
                to={`/productdetail/${item.product_id}`}
              >
                <button className="darkbtn">
                  View Product
                </button>
              </Link>

            </div>

            <hr />

          </div>
        );
      })}

    </div>
  );
};

export default Wishlist;