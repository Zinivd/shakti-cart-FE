import React, { useState } from "react";

const ProductContent = () => {
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

  const [quantity, setQuantity] = useState(1);
  const incQty = () => {
    setQuantity((prev) => prev + 1);
  };
  const decQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <div className="product-details-content pt-3">
      <h3 className="mb-3">Allen Solly</h3>
      <h5>Allen Solly Men's Solid Crew Neck T-Shirt</h5>
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
        ₹ 1800.00
        <span className="mrp ms-2">₹ 2500.00</span>
        <span className="offer-price ms-2">19% (Off)</span>
      </h4>
      <hr />
      <div className="colors-main">
        <h6 className="mb-3">Colors Available</h6>
        <div className="colors-div">
          {colors.map((item, index) => (
            <div className="text-center" key={index}>
              <li
                className="color-li"
                style={{
                  backgroundColor: item.code,
                  border: item.border ? "1px solid var(--primary)" : "none",
                }}
              ></li>
            </div>
          ))}
        </div>
      </div>
      <div className="sizes-main">
        <h6 className="mb-3">Sizes Available</h6>
        <div className="sizes-div">
          {sizes.map((item, index) => (
            <li className="sizes-li" key={index}>
              <button className="sizebtn mx-auto">
                <span>{item.size}</span>
              </button>
            </li>
          ))}
        </div>
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
          />
          <button className="qtybtn plus" onClick={() => incQty()}>
            +
          </button>
        </span>
      </div>
      <hr />
      <div className="d-flex align-items-center column-gap-2 mt-4">
        <button className="addcartbtn w-50 py-2">Add to Cart</button>
        <button className="buybtn w-50 py-2">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductContent;
