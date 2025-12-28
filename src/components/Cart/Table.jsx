import React from "react";
import { removeCartProduct } from "../../service/api";
import "./CartTable.css";

const SAMPLE_IMAGE =
  "https://via.placeholder.com/80x80.png?text=Product";

const CartTable = ({ cartProducts, setCartProducts, refreshCart }) => {

  const incQty = (index) => {
    setCartProducts((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decQty = (index) => {
    setCartProducts((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveCart = async (productId) => {
    try {
      const response = await removeCartProduct({ product_id: productId });
      if (response?.data?.success) {
        refreshCart();
      }
    } catch (error) {
      console.error("Remove cart error:", error);
    }
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>PRODUCT DETAILS</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>SHIPPING</th>
            <th>SUBTOTAL</th>
            <th>TOTAL</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {cartProducts.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">Cart is empty</td>
            </tr>
          ) : (
            cartProducts.map((item, index) => {
              const price = Number(item.product?.selling_price || 0);
              const qty = Number(item.quantity || 1);
              const subtotal = price * qty;

              return (
                <tr key={item.product_id}>
                  <td>
                  <div className="d-flex column-gap-2 align-items-center">
                      <img
                        src={item.product?.images?.[0] || SAMPLE_IMAGE}
                        width="80"
                        height="80"
                        alt=""
                      />
                      <div>
                        <h6>{item.product?.product_name}</h6>
                        <p>Color: {item.product?.color}</p>
                      </div>
                    </div>
                  </td>

                  <td>₹ {price}</td>

                  <td>
                    <button onClick={() => decQty(index)}>-</button>
                    <span className="mx-2">{qty}</span>
                    <button onClick={() => incQty(index)}>+</button>
                  </td>

                  <td>Free</td>
                  <td>₹ {subtotal}</td>
                  <td>₹ {subtotal}</td>

                  <td>
                    <i
                      className="fas fa-trash-can"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveCart(item.product_id)}
                    ></i>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
