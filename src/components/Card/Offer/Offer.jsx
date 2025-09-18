import React from "react";
import { Offer1, Offer2, OfferBG } from "../../../../public/Assets.js";
import "./Offer.css";

const Offer = () => {
  return (
    <div className="offer">
      <div className="offer-left">
        <img src={Offer1} alt="" />
      </div>
      <div className="offer-center">
        <h2 className="text-center">Flat 40% OFF</h2>
        <h5 className="text-center">on Women's Dresses Limited Time!</h5>
        <button className="discoverbtn">Discover Now</button>
      </div>
      <div className="offer-right ms-auto">
        <img src={Offer2} alt="" />
      </div>
    </div>
  );
};

export default Offer;
