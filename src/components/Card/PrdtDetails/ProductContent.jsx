import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById,addToCart } from "../../../service/api";// Adjust the import path

const ProductContent = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const colors = [
    { name: "Purple", code: "#8E44AD" },
    { name: "Black", code: "#000000" },
    { name: "Red", code: "#E74C3C" },
    { name: "Orange", code: "#E67E22" },
    { name: "Navy", code: "#2C3E50" },
    { name: "White", code: "#FFFFFF", border: true },
    { name: "Brown", code: "#D35400" },
    { name: "Green", code: "#27AE60" },
    { name: "Yellow", code: "#F1C40F" },
    { name: "Grey", code: "#BDC3C7" },
    { name: "Pink", code: "#F78FB3" },
  ];
  
  const sizes = [
    { size: "XS" },
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
    { size: "XXL" },
    { size: "3XL" },
    { size: "4XL" },
  ];

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await getProductById(productId);
      if (response?.success) {
        setProduct(response.data);
        // Set default selections
        setSelectedColor(response.data.color || "");
        if (response.data.size_unit?.[0]) {
          setSelectedSize(response.data.size_unit[0].size || "");
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const incQty = () => {
    setQuantity((prev) => prev + 1);
  };
  
  const decQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
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

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  if (loading) {
    return <div className="product-details-content pt-3">Loading...</div>;
  }

  if (!product) {
    return <div className="product-details-content pt-3">Product not found</div>;
  }

  // Calculate discount percentage
  const discountPercentage = product.discount 
    ? Math.round((parseFloat(product.discount) / parseFloat(product.actual_price)) * 100)
    : 0;

  return (
    <div className="product-details-content pt-3">
      <h3 className="mb-3">{product.brand || "Brand Name"}</h3>
      <h5>{product.product_name}</h5>
      
      <div className="star-div d-flex align-items-center column-gap-3">
        <div className="stars d-flex align-items-center column-gap-1">
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bxs-star text-warning"></i>
          <i className="bx bx-star"></i>
          <i className="bx bx-star"></i>
        </div>
        <span>4.5</span>
      </div>
      
      <h4>
        ₹ {product.selling_price || "0.00"}
        {product.actual_price && (
          <span className="mrp ms-2">₹ {product.actual_price}</span>
        )}
        {discountPercentage > 0 && (
          <span className="offer-price ms-2">{discountPercentage}% (Off)</span>
        )}
      </h4>
      
      <hr />
      
      <div className="colors-main">
        <h6 className="mb-3">Colors Available</h6>
        <div className="colors-div">
          {colors.map((item, index) => (
            <div className="text-center" key={index}>
              <li
                className={`color-li ${selectedColor === item.name ? 'selected' : ''}`}
                style={{
                  backgroundColor: item.code,
                  border: item.border ? "1px solid var(--primary)" : "none",
                  cursor: "pointer",
                }}
                onClick={() => handleColorSelect(item.name)}
                title={item.name}
              ></li>
              {selectedColor === item.name && (
                <small>{item.name}</small>
              )}
            </div>
          ))}
        </div>
        {selectedColor && (
          <p className="mt-2">Selected: {selectedColor}</p>
        )}
      </div>
      
      <div className="sizes-main">
        <h6 className="mb-3">Sizes Available</h6>
        <div className="sizes-div">
          {sizes.map((item, index) => (
            <li className="sizes-li" key={index}>
              <button 
                className={`sizebtn mx-auto ${selectedSize === item.size ? 'selected' : ''}`}
                onClick={() => handleSizeSelect(item.size)}
              >
                <span>{item.size}</span>
              </button>
            </li>
          ))}
        </div>
        {selectedSize && (
          <p className="mt-2">Selected: {selectedSize}</p>
        )}
      </div>
      
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
      
      <div className="d-flex align-items-center column-gap-2 mt-4">
        <button 
          className="addcartbtn w-50 py-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button 
          className="buybtn w-50 py-2"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductContent;