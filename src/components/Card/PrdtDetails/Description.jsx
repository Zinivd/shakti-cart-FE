import React from "react";
import { DescriptionBG } from "../../../../public/Assets";

const Description = ({ product }) => {
  return (
    <div className="product-description-div">
      <div className="product-description-left">
        <h6 className="description-h6 mb-3">
          {product.description}
        </h6>

        <div className="product-description-table mb-3">
          <div className="description-div h-100 border-bottom border-end">
            <h6 className="mb-2">Brand</h6>
            <h5 className="mb-0">{product.brand}</h5>
          </div>
          
          <div className="description-div h-100 border-bottom border-start">
            <h6 className="mb-2">Product Name</h6>
            <h5 className="mb-0">{product.product_name}</h5>
          </div>

          <div className="description-div h-100 border-bottom border-end border-start">
            <h6 className="mb-2">Color</h6>
            <h5 className="mb-0">{product.color}</h5>
          </div>

          <div className="description-div h-100 border-bottom border-start">
            <h6 className="mb-2">Actual Price</h6>
            <h5 className="mb-0">₹ {product.actual_price}</h5>
          </div>
          
          <div className="description-div h-100 border-bottom border-start">
            <h6 className="mb-2">Selling Price</h6>
            <h5 className="mb-0">₹ {product.selling_price}</h5>
          </div>
          
          <div className="description-div h-100 border-bottom border-start">
            <h6 className="mb-2">Discount</h6>
            <h5 className="mb-0">{product.discount}%</h5>
          </div>
        </div>
      </div>

      <div className="product-description-right">
        <img src={DescriptionBG} className="w-100" alt="" />
      </div>
    </div>
  );
};

export default Description;
