import React, { useState, useEffect, useMemo } from "react";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
  getProductQuantities,
  getWishlistProducts,
} from "../../../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

const ProductContent = ({ product }) => {
  const navigate = useNavigate();
  const [isWished, setIsWished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizeQuantities, setSizeQuantities] = useState([]);

  const selectedSizeStock = useMemo(() => {
    if (!selectedSize) return 0;
    return sizeQuantities.find((s) => s.size === selectedSize)?.qty || 0;
  }, [sizeQuantities, selectedSize]);

  useEffect(() => {
    setIsWished(!!product?.is_wishlisted);
  }, [product]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await getWishlistProducts();
        if (res?.data?.success) {
          const sizes = res.data.data
            .filter((w) => w.product_id === product.product_id)
            .map((w) => w.size);

          setWishlistSizes(sizes);
        }
      } catch (err) {
        console.error("Wishlist fetch failed", err);
      }
    };

    fetchWishlist();
  }, [product]);

  useEffect(() => {
    const fetchQuantities = async () => {
      if (!product?.product_id) return;

      setLoading(true);

      try {
        const res = await getProductQuantities(product.product_id);

        if (res?.data?.success) {
          const quantities = res.data.data?.quantities || [];

          // normalize for UI
          const normalized = quantities.map((item) => ({
            size: item.size, // "S", "M", "L"
            qty: item.quantity, // number
            unit: item.unit, // optional
          }));

          setSizeQuantities(normalized);
        } else {
          setSizeQuantities([]);
        }
      } catch (err) {
        console.error("Failed to fetch product quantities", err);
        setSizeQuantities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuantities();
  }, [product]);

  useEffect(() => {
    if (!sizeQuantities.length || selectedSize) return;

    const firstAvailable = sizeQuantities.find((s) => s.qty > 0)?.size || "";

    setSelectedSize(firstAvailable);
    setQuantity(1);
  }, [sizeQuantities]);

  useEffect(() => {
    if (!selectedColor && product?.colors?.length) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    if (quantity > selectedSizeStock) {
      setQuantity(selectedSizeStock || 1);
    }
  }, [selectedSizeStock]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const incQty = () => {
    setQuantity((prev) => (prev < selectedSizeStock ? prev + 1 : prev));
  };

  const decQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      toast.error("Please Login to Add Products to Cart");
      navigate("/login");
      return false;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return false;
    }

    if (selectedSizeStock === 0) {
      toast.error("Selected size is out of stock");
      return false;
    }

    if (quantity > selectedSizeStock) {
      toast.error("Quantity exceeds available stock");
      return false;
    }

    try {
      const cartData = {
        product_id: product.product_id,
        size: selectedSize,
        quantity,
        color: selectedColor || null,
      };

      const response = await addToCart(cartData);

      if (response?.data?.success) {
        toast.success("Product added to cart");
        return true;
      } else {
        toast.error(response?.data?.message || "Failed to add product");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return false;
    }
  };

  const handleBuyNow = async () => {
    const success = await handleAddToCart();
    if (success) navigate("/cart");
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.product_name || "Check this product",
          text: "Check out this product",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Product link copied to clipboard");
      }
    } catch (error) {
      console.error("Share failed:", error);
      toast.error("Unable to share product");
    }
  };

  const handleAddWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;
    setLoading(true);

    try {
      const payload = {
        product_id: product.product_id,
      };

      const res = await addToWishlist(payload);

      if (res?.data?.success) {
        setIsWished(true);
        toast.success("Added to Wishlist");
      } else {
        toast.error("Failed to add to Wishlist");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;
    setLoading(true);

    try {
      const payload = {
        product_id: product.product_id,
      };

      const res = await removeFromWishlist(payload);

      if (res?.data?.success) {
        setIsWished(false);
        toast.success("Removed from Wishlist");
      } else {
        toast.error("Failed to remove from Wishlist");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="product-details-content pt-3">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <h3 className="mb-2">{product.brand || "Brand Name"}</h3>
        <div className="d-flex align-items-center column-gap-4">
          <h5
            className={`mb-3 heart ${isWished ? "active" : ""}`}
            onClick={isWished ? handleRemoveWishlist : handleAddWishlist}
          >
            <i
              className={isWished ? "fas fa-heart" : "fa-regular fa-heart"}
            ></i>
          </h5>
          <h5
            className="mb-3"
            title="Share"
            style={{ cursor: "pointer" }}
            onClick={handleShare}
          >
            <i className="fas fa-share-alt"></i>
          </h5>
        </div>
      </div>
      <h5>{product.product_name || "Product Name"}</h5>
      <div className="star-div d-flex align-items-center column-gap-3">
        <div className="stars d-flex align-items-center column-gap-1">
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bx-star"></i>
        </div>
        <span>4.0</span>
      </div>

      <h4>
        ₹ {product.selling_price || "0.00"}
        {product.actual_price && (
          <span className="mrp ms-2">₹ {product.actual_price}</span>
        )}
        {product.discount && (
          <span className="offer-price ms-2">{product.discount}% OFF</span>
        )}
      </h4>
      <hr />

      {/* Sizes */}
      <div className="sizes-main">
        <h6 className="mb-3">Sizes Available</h6>
        <div className="sizes-div">
          {sizeQuantities.map((s, i) => (
            <button
              key={i}
              className={`sizebtn ${selectedSize === s.size ? "active" : ""}`}
              disabled={s.qty === 0}
              onClick={() => {
                setSelectedSize(s.size);
                setQuantity(1);
              }}
              style={{
                opacity: s.qty === 0 ? 0.4 : 1,
                cursor: s.qty === 0 ? "not-allowed" : "pointer",
              }}
            >
              {s.size}
            </button>
          ))}
        </div>

        {/* {selectedSize && (
          <small className="text-muted">
            Available: <strong>{selectedSizeStock}</strong>
          </small>
        )} */}
      </div>

      {/* Colors - Add this section if you have colors */}
      {product.colors && product.colors.length > 0 && (
        <div className="colors-main mt-3">
          <h6 className="mb-3">Colors Available</h6>
          <div className="colors-div d-flex gap-2">
            {product.colors.map((color, i) => (
              <button
                key={i}
                className={`color-btn ${selectedColor === color ? "active" : ""}`}
                onClick={() => handleColorSelect(color)}
                style={{
                  backgroundColor: color.toLowerCase(),
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border:
                    selectedColor === color
                      ? "2px solid #000"
                      : "1px solid #ddd",
                }}
                title={color}
              />
            ))}
          </div>

          {/* Display selected color */}
          {selectedColor && (
            <div className="mt-2">
              <small className="text-muted">
                Selected Color: <strong>{selectedColor}</strong>
              </small>
            </div>
          )}
        </div>
      )}

      {/* Quantity */}
      <div className="qty-main mt-4">
        <h6 className="mb-2">Quantity</h6>
        <span className="qtydiv">
          <button className="qtybtn" onClick={decQty}>
            -
          </button>
          <input
            type="number"
            min={1}
            max={selectedSizeStock}
            value={quantity}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 1 && val <= selectedSizeStock) {
                setQuantity(val);
              }
            }}
          />
          <button className="qtybtn" onClick={incQty}>
            +
          </button>
        </span>
      </div>
      <hr />

      {/* Add to Cart */}
      <div className="d-flex align-items-center column-gap-2 mt-4">
        <button className="addcartbtn w-50 py-2" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="buybtn w-50 py-2" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductContent;
