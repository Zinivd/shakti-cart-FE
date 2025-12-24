import React, { useState } from "react";
import { Link } from "react-router-dom";
import Offer from "../../components/Card/Offer/Offer.jsx";
import CartTable from "../../components/Cart/Table.jsx";
import "./Cart.css";

const Cart = () => {
  return (
    <div className="main">
      <div className="main-header pb-0">
        <div className="body-head d-block">
          <h6 className="d-flex column-gap-2 flex-wrap mb-3">
            <Link to="/">
              Home
              <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/Cart" className="active">
              Cart
            </Link>
          </h6>
          <h6 className="mb-1 text-start">
            Please fill in the fields below and click place order to complete your purchase! <br />
            Already registered? <Link to="/login" className="text-primary">Login</Link>
          </h6>
        </div>
      </div>

      <hr className="mb-0" />

      {/* Cart Table */}
      <div className="cart-table">
        <CartTable />
      </div>

      {/* Cart Total */}
      <div className="cart-total mt-3">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
            <div className="body-head d-block">
              <h5 className="mb-2 text-dark text-start">Discount Codes</h5>
              <h6 className="mb-3 text-start">Enter your coupon code if you have one</h6>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter your coupon code" />
                <button className="couponbtn">Apply Coupon</button>
              </div>
            </div>

            <div className="cart-summary-table">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                      <th>Sub Total</th>
                      <th>₹ 200.00</th>
                  </tr>
                  <tr>
                      <th>Shipping</th>
                      <th>₹ 50.00</th>
                  </tr>
                  <tr>
                      <th>Grand Total</th>
                      <th>₹ 250.00</th>
                  </tr>
                </tbody>
              </table>
              <hr />
              <Link to="/checkout" className="d-flex align-items-center justify-content-center mt-3">
                <button className="darkbtn">Proceed to Checkout</button>
              </Link>
            </div>
        </div>
      </div>

      {/* Offer */}
      {/* <div className="main-header">
        <Offer />
      </div> */}
    </div>
    
  );
};

export default Cart;
