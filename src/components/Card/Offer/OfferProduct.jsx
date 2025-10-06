import React from "react";
import { Offer1 } from "../../../../public/Assets.js";
import "./Offer.css";

const OfferProduct = () => {
  return (
    <div className="offer-product">
      <div className="offer-product-center">
        <h2 className="text-center">Flat 40% OFF</h2>
        <h5 className="text-center">on Women's Dresses Limited Time!</h5>
        <button className="discoverbtn mx-auto">Discover Now</button>
      </div>
      <img src={Offer1} height="250px" alt="" className="d-flex mx-auto" />
    </div>
  );
};

export default OfferProduct;
