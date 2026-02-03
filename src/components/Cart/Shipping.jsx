import React, { useEffect, useState } from "react";
import { Gpay, PayPal, Visa, PayPass } from "../../../public/Assets.js";
import "./Shipping.css";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { check_out, createOrder, verify_checkout } from "../../service/api.js";
import RazorpayButton from "./Razorpay.jsx";

const Shipping = ({ cartItems = [], selectedAddress }) => {
  const [orderId, setOrderId] = useState("");
  const [showPlaceOrder, setShowPlaceOrder] = useState(true);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [showPayNow, setShowPayNow] = useState(false);
  const [razorpay_order_id, setRazorpayOrderId] = useState("");
  const SHIPPING = 0;
  const SAVINGS = 0;
  const subTotal = cartItems.reduce((sum, item) => {
    return (
      sum +
      Number(item.product?.selling_price || 0) * Number(item.quantity || 1)
    );
  }, 0);

  const total = subTotal - SAVINGS + SHIPPING;

  const get_rzap_pay_order_id = async () => {
    try {
      const res = await check_out({ order_id: orderId });
      setRazorpayOrderId(res?.data?.checkout?.order_id);
      setShowConfirmOrder(false);
      setShowPayNow(true);
      toast.success("Order Confirmed Successfully");
    } catch (err) {
      console.error("Something went wrong");
    }
  };

  const handleAddress = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }
    try {
      const payload = {
        user_id: cartItems[0]?.user_id,
        payment_mode: "Razorpay Payment",
        address: {
          building: selectedAddress.building_name || "",
          address_line1: selectedAddress.address_1 || "",
          address_line2: selectedAddress.address_2 || "",
          city: selectedAddress.city || "",
          district: selectedAddress.district || "",
          state: selectedAddress.state || "",
          pincode: selectedAddress.pincode || "",
          landmark: selectedAddress.landmark || "",
          address_type: selectedAddress.address_type || "home",
        },
        items: [
          {
            product_id: cartItems[0]?.product_id,
            size: cartItems[0]?.size,
            quantity: cartItems[0]?.quantity,
          },
        ],
      };
      const response = await createOrder(payload);
      if (response?.data?.success) {
        setOrderId(response.data.order_id);
        setShowPlaceOrder(false);
        setShowConfirmOrder(true);
        toast.success("Order Placed Successfully");
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

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
            <label> FREE</label>
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

      {showPlaceOrder && (
        <button className="darkbtn" onClick={handleAddress}>
          Place Order
        </button>
      )}
      {showConfirmOrder && (
        <button className="darkbtn" onClick={get_rzap_pay_order_id}>
          Confirm Order
        </button>
      )}
      {showPayNow && (
        <RazorpayButton total={total} razorpay_order_id={razorpay_order_id} />
      )}
    </div>
  );
};

export default Shipping;
