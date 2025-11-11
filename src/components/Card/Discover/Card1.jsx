import React from "react";
import { Discover1 } from "../../../../public/Assets.js";
import "./Card1.css";

const Card_1 = () => {
  return (
    <div className="card1">
      <div className="card1-left">
        <h4 className="mb-2 text-uppercase">Pre Order</h4>
        <h6 className="mb-2 text-uppercase">Be the First to Own</h6>
        <h5 className="mb-0">From ₹399</h5>
      </div>
      <div className="card1-center">
        <img src={Discover1} alt="Discover" />
      </div>
      <div className="card1-right mx-auto">
        <h4 className="mb-2">Opplo Watch Sport Series 8</h4>
        <h2 className="mb-0">A healthy leap ahead</h2>
      </div>
      <div className="card1-right ms-auto">
        <button className="discoverbtn">Discover Now</button>
      </div>
    </div>
  );
};

export default Card_1;
