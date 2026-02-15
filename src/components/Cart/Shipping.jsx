import React, { useState } from "react";
import { Gpay, PayPal, Visa, PayPass } from "../../../public/Assets.js";
import "./Shipping.css";
import { toast } from "react-toastify";
import { check_out, createOrder } from "../../service/api.js";
import RazorpayButton from "./Razorpay.jsx";

const Shipping = ({ cartItems = [], selectedAddress }) => {
  const [showPlaceOrder, setShowPlaceOrder] = useState(true);
  const [showPayNow, setShowPayNow] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const SHIPPING = 40;
  const SAVINGS = 0;

  const subTotal = cartItems.reduce((sum, item) => {
    return (
      sum +
      Number(item.product?.selling_price || 0) * Number(item.quantity || 1)
    );
  }, 0);

  const total = subTotal - SAVINGS + SHIPPING;

  const get_rzap_pay_order_id = async (order_id) => {
    try {
      const res = await check_out({ order_id: order_id });
      if (res?.data?.success && res?.data?.checkout) {
        // Store the complete checkout data from API
        setCheckoutData(res.data.checkout);
        setShowPlaceOrder(false);
        setShowPayNow(true);
        toast.success("Order Confirmed Successfully");
      } else {
        toast.error("Failed to initialize payment");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Something went wrong during checkout");
    }
  };

  const handleAddress = async () => {
    const orderBtn = document.getElementById("orderBtn");
    if (!selectedAddress || !orderBtn) {
      toast.warning("Please select an address and place order");
      return;
    }
    orderBtn.disabled = true;
    orderBtn.innerHTML = "Placing Order...";
    try {
      const payload = {
        user_id: cartItems[0]?.user_id,
        payment_mode: "razorpay",
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
        items: cartItems.map(item => ({
          product_id: item.product_id,
          size: item.size,
          quantity: item.quantity,
        })),
      };
      const response = await createOrder(payload);
      if (response?.data?.success) {
        toast.success("Order Placed Successfully");
        await get_rzap_pay_order_id(response.data.order_id);
      } else {
        toast.error("Failed to create order");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("Failed to place order");
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
              <span className="text-dark fw-bold">Courier</span>
            </label>
          </li>
          <hr />
          <li className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <label>
              Delivery Charges <br />
              <span className=" text-muted">Additional fees may apply</span>
            </label>
            <label> ₹ {SHIPPING}</label>
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
        <button className="darkbtn" id="orderBtn" onClick={handleAddress}>
          Place Order
        </button>
      )}
      {showPayNow && (
        <RazorpayButton checkoutData={checkoutData}  cartItems={cartItems} />
      )}
    </div>
  );
};

export default Shipping;
