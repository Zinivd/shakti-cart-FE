import React, { useState } from "react";
import { Link } from "react-router-dom";
import Shipping from "../../components/Cart/Shipping";
import "./Checkout.css";
import Summary from "../../components/Cart/Summary";
import AddressCard from "../../components/Card/Address/Address";

const Address = () => {
  return (
    <div className="main">
      <div className="main-header pb-0">
        <div className="body-head d-block">
          <h6 className="d-flex column-gap-2 flex-wrap mb-3">
            <Link to="/">
              Home
              <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/Cart">
              Cart
              <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/Checkout" className="active">
              Checkout
            </Link>
          </h6>
        </div>
      </div>

      <hr />

      <div className="checkout-main">
        <div className="checkout-left">
          <div className="body-head d-block">
            <h4 className="mb-3">
              <span>|</span> Check Out
            </h4>
            <h5 className="mb-3">Billing Details</h5>
          </div>
          <AddressCard />
          <Shipping />
        </div>
        <div className="checkout-right">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default Address;
