import React, { useState, useEffect } from "react";
import { getProductById, addToCart } from "../../../service/api";

const ProductContent = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const incQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    try {
      const cartData = {
        product_id: productId,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      };

      const response = await addToCart(cartData);

      if (response?.success) {
        alert("Product added to cart successfully!");
        // You can add additional logic here like updating cart count in header
      } else {
        alert("Failed to add to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding to cart.");
    }
  };

  const handleBuyNow = () => {
    // First add to cart, then redirect to checkout
    handleAddToCart().then(() => {
      // Navigate to checkout page
      // window.location.href = "/checkout";
      // Or use navigate if using react-router:
      // navigate("/checkout");
    });
  };

  // if (loading) {
  //   return <div className="product-details-content pt-3">Loading...</div>;
  // }

  return (
    <div className="product-details-content pt-3">
      <h3 className="mb-2">{product.brand || "Brand Name"}</h3>
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
        <h6 className="mb-3">Sizes Availablbe</h6>
        <div className="sizes-div">
          {product.size_unit?.map((s, i) => (
            <li className="sizes-li" key={i}>
              <button key={i} className="sizebtn mx-auto">
                {s.size}
              </button>
            </li>
          ))}
        </div>
      </div>
      {/* Quantity */}
      <div className="qty-main">
        <span className="qtydiv" style={{ width: "175px" }}>
          <button className="qtybtn minus" onClick={() => decQty()}>
            -
          </button>
          <input
            type="number"
            className="text-center w-100 count"
            value={quantity}
            min="1"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1) {
                setQuantity(value);
              }
            }}
          />
          <button className="qtybtn plus" onClick={() => incQty()}>
            +
          </button>
        </span>
      </div>
      <hr />
      {/* Add to Cart */}
      <div className="d-flex align-items-center column-gap-2 mt-4">
        <button className="addcartbtn w-50 py-2">Add to Cart</button>
        <button className="buybtn w-50 py-2">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductContent;
