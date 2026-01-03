import React, { useState, useEffect } from "react";
import { getProductById, addToCart } from "../../../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ProductContent = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
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

  /* =========================
     1️⃣ CHECK AUTH STATUS
  ========================== */
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    toast.error("Please login to add products to cart");
    navigate("/login");   
    return;               
  }

  try {
    const cartData = {
      product_id: product.product_id,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    };

    const response = await addToCart(cartData);

    if (response?.data?.success) {
      toast.success("Product added to cart");
    } else {
      toast.error("Failed to add product to cart");
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("An error occurred while adding to cart");
  }
};


  const handleBuyNow = () => {
    handleAddToCart().then(() => {
      
      window.location.href = "/cart";
    });
  };

  // Initialize selected size if available
  useEffect(() => {
    if (product.size_unit?.length > 0 && !selectedSize) {
      setSelectedSize(product.size_unit[0].size);
    }
    
    if (product.colors?.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    
    setLoading(false);
  }, [product]);

  if (loading) {
    return <div className="product-details-content pt-3">Loading...</div>;
  }

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
        <h6 className="mb-3">Sizes Available</h6>
        <div className="sizes-div">
          {product.size_unit?.map((s, i) => (
            <li className="sizes-li" key={i}>
              <button 
                key={i} 
                className={`sizebtn mx-auto ${selectedSize === s.size ? 'active' : ''}`}
                onClick={() => handleSizeSelect(s.size)}
              >
                {s.size}
              </button>
            </li>
          ))}
        </div>
        
        {/* Display selected size */}
        {selectedSize && (
          <div className="mt-2">
            <small className="text-muted">Selected Size: <strong>{selectedSize}</strong></small>
          </div>
        )}
      </div>
      
      {/* Colors - Add this section if you have colors */}
      {product.colors && product.colors.length > 0 && (
        <div className="colors-main mt-3">
          <h6 className="mb-3">Colors Available</h6>
          <div className="colors-div d-flex gap-2">
            {product.colors.map((color, i) => (
              <button
                key={i}
                className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                onClick={() => handleColorSelect(color)}
                style={{
                  backgroundColor: color.toLowerCase(),
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  border: selectedColor === color ? '2px solid #000' : '1px solid #ddd'
                }}
                title={color}
              />
            ))}
          </div>
          
          {/* Display selected color */}
          {selectedColor && (
            <div className="mt-2">
              <small className="text-muted">Selected Color: <strong>{selectedColor}</strong></small>
            </div>
          )}
        </div>
      )}
      
      {/* Quantity */}
      <div className="qty-main mt-4">
        <h6 className="mb-2">Quantity</h6>
        <span className="qtydiv" style={{ width: "175px" }}>
          <button className="qtybtn minus" onClick={decQty}>
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
          <button className="qtybtn plus" onClick={incQty}>
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