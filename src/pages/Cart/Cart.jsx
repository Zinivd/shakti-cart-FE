import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartTable from "../../components/Cart/Table.jsx";
import { getCartProducts } from "../../service/api";
import "./Cart.css";

const SHIPPING_CHARGE = 50;

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);

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

  // 🔹 CALCULATIONS
  const subTotal = cartProducts.reduce(
    (sum, item) =>
      sum +
      Number(item.product?.selling_price || 0) *
        Number(item.quantity || 1),
    0
  );

  const shipping = cartProducts.length > 0 ? SHIPPING_CHARGE : 0;
  const grandTotal = subTotal + shipping;

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

      {/* CART TABLE */}
      <div className="cart-table">
        <CartTable
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          refreshCart={fetchCartProducts}
        />
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
                <th>₹ {subTotal.toFixed(2)}</th>
              </tr>
              <tr>
                <th>Shipping</th>
                <th>₹ {shipping.toFixed(2)}</th>
              </tr>
              <tr>
                <th>Grand Total</th>
                <th>₹ {grandTotal.toFixed(2)}</th>
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
