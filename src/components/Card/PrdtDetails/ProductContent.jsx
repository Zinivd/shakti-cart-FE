import React from "react";

const ProductContent = ({ product }) => {
  return (
    <div className="product-details-content">
      <h4 className="product-title mb-2">{product.product_name}</h4>

      <h6 className="product-brand mb-2">
        Brand : <span>{product.brand}</span>
      </h6>

      <div className="product-price mb-3 d-flex align-items-center column-gap-3">
        <h4 className="selling-price m-0">₹{product.selling_price}</h4>
        <h6 className="actual-price text-decoration-line-through m-0">
          ₹{product.actual_price}
        </h6>
        <span className="discount">{product.discount}% OFF</span>
      </div>

      <div className="product-size mb-3">
        <h6 className="mb-1">Size</h6>
        <div className="d-flex column-gap-2">
          {product.size_unit?.map((s, i) => (
            <button key={i} className="size-btn">{s.size}</button>
          ))}
        </div>
      </div>

      <div className="product-actions d-flex column-gap-3">
        <button className="darkbtn w-100">Add to Cart</button>
        <button className="borderbtn w-100">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductContent;
