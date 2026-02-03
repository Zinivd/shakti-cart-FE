import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartTable from "../../components/Cart/Table.jsx";
import { createOrder, getCartProducts, placeOrder } from "../../service/api";
import "./Cart.css";

const SHIPPING_CHARGE = 0;

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const fetchCartProducts = async () => {
    try {
      const response = await getCartProducts();
      if (response?.data?.success) {
        setCartProducts(response.data.data || []);        
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  // CALCULATIONS
  const subTotal = cartProducts.reduce(
    (sum, item) =>
      sum +
      Number(item.product?.selling_price || 0) * Number(item.quantity || 1),
    0,
  );

  const shipping = cartProducts.length > 0 ? SHIPPING_CHARGE : 0;
  const grandTotal = subTotal + shipping;
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  
  const handleCheckout = async () => {
    navigate('/checkout');
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
            <Link to="/Cart" className="active">
              Cart
            </Link>
          </h6>
          {!isAuthenticated && (
            <h6 className="mb-1 text-start">
              Please fill in the fields below and click place order to complete
              your purchase! <br />
              Already registered?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </h6>
          )}
        </div>
      </div>

      <hr className="mb-0" />

      {/* CART TABLE */}
      <div className="cart-table">
        <CartTable
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          refreshCart={fetchCartProducts}
          // setCartTableData = {setCartTableData}
        />
      </div>

      {/* Cart Total */}
      {isAuthenticated && (
        <div className="cart-total mt-3">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
            {/* <div className="body-head d-block">
              <h5 className="mb-2 text-dark text-start">Discount Codes</h5>
              <h6 className="mb-3 text-start">
                Enter your coupon code if you have one
              </h6>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your coupon code"
                />
                <button className="couponbtn">Apply Coupon</button>
              </div>
            </div> */}
            <div className="w-50">
              <div className="shipping-card my-3">
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    {/* <label>Arrives by Monday, June 7</label> */}
                    <label>
                      <i className="fas fa-truck-fast"></i>&nbsp; Ships from{" "}
                      <span className="text-dark fw-bold">
                        Professional Courier
                      </span>
                    </label>
                  </li>
                  <hr />
                  <li className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <label>
                      Delivery Charges <br />
                      <span className=" text-muted">
                        Additional fess may apply
                      </span>
                    </label>
                    <label className="fw-bold"> FREE</label>
                  </li>
                </ul>
              </div>
            </div>

            <div className="cart-summary-table">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th>Sub Total</th>
                    <th>₹ {subTotal.toFixed(2)}</th>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <th>FREE</th>
                  </tr>
                  <tr>
                    <th>Grand Total</th>
                    <th>₹ {grandTotal.toFixed(2)}</th>
                  </tr>
                </tbody>
              </table>
              <hr />
              <button className="darkbtn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offer */}
      {/* <div className="main-header">
        <Offer />
      </div> */}
    </div>
  );
};

export default Cart;
