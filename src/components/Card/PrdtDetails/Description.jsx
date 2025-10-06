import React from "react";
import { DescriptionBG } from "../../../../public/Assets";

const Description = () => {
  return (
    <div className="product-description-div">
      <div className="product-description-left">
        <h6 className="description-h6 mb-3">
          100% Bio-washed Cotton - makes the fabric extra soft & silky. Flexible
          ribbed crew neck. Precisely stitched with no pilling & no fading.
          Provide all-time comfort. Anytime, anywhere. Infinite range of
          matte-finish HD prints.
        </h6>
        <div className="product-description-table mb-3">
          <div className="description-div h-100 border-bottom border-end">
            <h6 className="mb-2">Material</h6>
            <h5 className="mb-0">Cotton</h5>
          </div>
          <div className="description-div h-100 border-bottom border-end border-start">
            <h6 className="mb-2">Pattern</h6>
            <h5 className="mb-0">Printed</h5>
          </div>
          <div className="description-div h-100 border-bottom border-start">
            <h6 className="mb-2">Fit</h6>
            <h5 className="mb-0">Regular-Fit</h5>
          </div>
          <div className="description-div h-100 border-top border-end">
            <h6 className="mb-2">Neck</h6>
            <h5 className="mb-0">Rounded-Neck</h5>
          </div>
          <div className="description-div h-100 border-top border-end border-start">
            <h6 className="mb-2">Sleeves</h6>
            <h5 className="mb-0">Half-Sleeve</h5>
          </div>
          <div className="description-div h-100 border-top border-start">
            <h6 className="mb-2">Style</h6>
            <h5 className="mb-0">Casual Wear</h5>
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
