import React from "react";
import { Discover2 } from "../../../../public/Assets.js";
import "./Card2.css";

const Card_2 = () => {
  return (
    <div className="card2 mb-2">
      <div className="card2-left">
        <h2 className="mb-0">Klarna.</h2>
      </div>
      <div className="card2-center">
        <img src={Discover2} alt="Discover" />
      </div>
      <div className="card2-right mx-auto">
        <h4 className="mb-1">Pay with 4 installment, 0% interest</h4>
        <h2 className="mb-0">
          <span className="fw-bolder">Buy Now,</span> Pay Later
        </h2>
      </div>
      <div className="card2-right ms-auto">
        <button className="discoverbtn text-dark">Discover Now</button>
      </div>
    </div>
  );
};

export default Card_2;
