import React from "react";
import { Gpay, PayPal, Visa, PayPass } from "../../../public/Assets.js";
import "./Shipping.css";
import { Link } from "react-router-dom";

const Shipping = () => {
  return (
    <div className="shipping mt-4 mb-3">
      {/* Shipping Address */}
      {/* <div className="body-head d-block">
        <h5 className="mb-2">Shipping Address</h5>
        <h6 className="mb-0">
          Select the address that matches your card or payment method.
        </h6>
      </div>
      <div className="shipping-card my-3">
        <ul className="list-unstyled mb-0">
          <li className="d-flex align-items-start column-gap-2">
            <input type="radio" name="address" id="address1" />
            <label htmlhtmlFor="address1">Same as Billing Address</label>
          </li>
          <hr />
          <li className="d-flex align-items-start column-gap-2">
            <input type="radio" name="address" id="address2" />
            <label htmlhtmlFor="address2">Use a different shipping address</label>
          </li>
        </ul>
      </div> */}

      {/* Shipping Method */}
      <div className="body-head d-block">
        <h5 className="mb-2">Shipping Method</h5>
      </div>
      <div className="shipping-card my-3">
        <ul className="list-unstyled mb-0">
          <li className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <label>Arrives by Monday, June 7</label>
            <label>
              <i className="fas fa-truck-fast"></i>&nbsp; Ships from{" "}
              <span className="text-dark fw-bold">Professional Courier</span>
            </label>
          </li>
          <hr />
          <li className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <label>
              Delivery Charges <br />
              <span className=" text-muted">Additional fess may apply</span>
            </label>
            <label>₹ 55.00</label>
          </li>
        </ul>
      </div>

      {/* Payment Method */}
      {/* <div className="body-head d-block">
        <h5 className="mb-2">Payment Method</h5>
        <h6 className="mb-0">All transactions are secure and encrypted.</h6>
      </div>
      <div className="shipping-card my-3">
        <ul className="list-unstyled mb-0">
          <li>
            <div className="d-flex align-items-start column-gap-2">
              <input type="radio" name="payment" id="payment1" />
              <label htmlhtmlFor="payment1" className="mb-2">
                Credit Card <br />
                <span className="text-muted">
                  We accept all major credit cards.
                </span>
              </label>
            </div>
            <div className="d-flex align-items-center justify-content-start flex-wrap gap-2 mb-3">
              <img src={Gpay} alt="" height="35px" />
              <img src={Visa} alt="" height="35px" />
              <img src={PayPass} alt="" height="35px" />
              <img src={PayPal} alt="" height="35px" />
            </div>
            <form action="">
              <div className="payment-form row">
                <div className="col-sm-12 col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Card Number"
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name of the Card"
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Expiry Date (MM/YY)"
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Security Code"
                  />
                </div>
              </div>
            </form>
          </li>
          <hr />
          <li className="d-flex align-items-start column-gap-2">
            <input type="radio" name="payment" id="payment2" />
            <label htmlhtmlFor="payment2">
              Cash On Delivery <br />
              <span className="text-muted">Pay with cash upon delivery.</span>
            </label>
          </li>
          <hr />
          <li className="d-flex align-items-start column-gap-2">
            <input type="radio" name="payment" id="payment3" />
            <label htmlhtmlFor="payment3">Paypal</label>
          </li>
        </ul>
      </div> */}
      <Link to="">
        <button className="darkbtn">Pay Now</button>
      </Link>
    </div>
  );
};

export default Shipping;
