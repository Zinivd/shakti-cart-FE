import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Shipping from "../../components/Cart/Shipping";
import "./Checkout.css";
import Summary from "../../components/Cart/Summary";
import { getCartProducts, placeOrder } from "../../service/api";
import { toast } from "react-toastify";

const Checkout = () => {
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [saveAddress, setSaveAddress] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  useEffect(() => {
  loadCart();
}, []);
const handlePlaceOrder = async () => {
  if (!selectedAddress) {
    toast.error("Please select address");
    return;
  }

  try {
    setPlacingOrder(true);

    const payload = {
      payment_mode: "UPI",
      address: selectedAddress,
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    };

    const res = await placeOrder(payload);

    if (res?.data?.success) {
      toast.success("Order placed successfully");
      navigate("/order-success");
    } else {
      toast.error("Order failed");
    }
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    setPlacingOrder(false);
  }
};

const loadCart = async () => {
  try {
    const res = await getCartProducts();
    if (res?.data?.success) {
      setCartItems(res.data.data || []);
    }
  } catch (err) {
    console.error("Cart load failed", err);
  }
};

  // Pincode Validation
  const pincodeValidate = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setPin(value);
    }
  };
  // Phone Validation
  const phoneValidate = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setPhone(value);
    }
  };
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

          <div className="form">
            <form action="">
              <div className="row">
                <div className="col-sm-12 col-md-6 mb-3">
                  <label htmlhtmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    autoFocus
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <label htmlhtmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <label htmlhtmlFor="country">Country / Region</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Country / Region"
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <label htmlhtmlFor="company">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <label htmlhtmlFor="address">Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Street Address"
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <label htmlhtmlFor="landmark">Landmark</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apartment, suite, unit etc. (optional)"
                  />
                </div>
                <div className="col-sm-12 col-md-4 mb-3">
                  <label htmlhtmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="col-sm-12 col-md-4 mb-3">
                  <label htmlhtmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                  />
                </div>
                <div className="col-sm-12 col-md-4 mb-3">
                  <label htmlhtmlFor="pin">Pin Code</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Pin Code"
                    value={pin}
                    onChange={pincodeValidate}
                  />
                </div>
                <div className="col-sm-12 col-md-4 mb-3">
                  <label htmlhtmlFor="phone">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Phone"
                    value={phone}
                    onChange={phoneValidate}
                  />
                </div>
              </div>
              <div className="mb-3">
                <Link to="/address">
                  <button className="formbtn">Continue to Delivery</button>
                </Link>
              </div>
              <div className="d-flex align-items-center column-gap-2">
                <input
  type="checkbox"
  checked={saveAddress}
  onChange={(e) => setSaveAddress(e.target.checked)}
/>

                <label htmlhtmlFor="saveaddress1" className="mb-0">
                  Save my information for a faster checkout
                </label>
              </div>
            </form>
          </div>
          <Shipping />
        </div>
        <div className="checkout-right">
          <Summary cartItems={cartItems} />

        </div>

        <button
  className="darkbtn"
  onClick={handlePlaceOrder}
  disabled={placingOrder}
>
  {placingOrder ? "Placing Order..." : "Place Order"}
</button>
      </div>
    </div>
  );  
};

export default Checkout;
