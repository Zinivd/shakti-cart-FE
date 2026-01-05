import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart, removeCartProduct } from "../../service/api";
import "./CartTable.css";

const SAMPLE_IMAGE = "https://via.placeholder.com/80x80.png?text=Product";

const CartTable = ({ cartProducts, setCartProducts, refreshCart }) => {
  const navigate = useNavigate();

  /* =========================
     AUTH CHECK
  ========================= */
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  const checkAuth = () => {
    if (!isAuthenticated) {
      toast.error("Please login to update cart");
      navigate("/login");
      return false;
    }
    return true;
  };

  /* =========================
     INCREASE QTY (API)
  ========================= */
 const incQty = async (item, index) => {
  if (!checkAuth()) return;

  try {
    const payload = {
      product_id: item.product_id,
      quantity: 1, // 🔥 ONLY INCREMENT BY 1
      size: item.product?.size,
      color: item.product?.color,
    };

    const response = await addToCart(payload);

    if (response?.data?.success) {
      setCartProducts((prev) =>
        prev.map((p, i) =>
          i === index ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    }
  } catch (err) {
    toast.error("Error updating cart");
  }
};


  /* =========================
     DECREASE QTY (API)
  ========================= */
  const decQty = async (item, index) => {
  if (item.quantity <= 1) return;
  if (!checkAuth()) return;

  try {
    const payload = {
      product_id: item.product_id,
      quantity: -1, // 🔥 DECREMENT
      size: item.product?.size,
      color: item.product?.color,
    };

    const response = await addToCart(payload);

    if (response?.data?.success) {
      setCartProducts((prev) =>
        prev.map((p, i) =>
          i === index ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    }
  } catch (err) {
    toast.error("Error updating cart");
  }
};

  /* =========================
     REMOVE CART
  ========================= */
  const handleRemoveCart = async (productId) => {
    if (!checkAuth()) return;

    try {
      const response = await removeCartProduct({ product_id: productId });
      if (response?.data?.success) {
        toast.success("Item removed from cart");
        refreshCart();
      }
    } catch (error) {
      console.error("Remove cart error:", error);
      toast.error("Error removing product");
    }
  };

  /* =========================
     UI (UNCHANGED)
  ========================= */
  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="table-wrapper desktop-only">
        <table className="table">
          <thead>
            <tr>
              <th>PRODUCT DETAILS</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>SHIPPING</th>
              <th>TOTAL</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {cartProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  Your Cart is Empty
                </td>
              </tr>
            ) : (
              cartProducts.map((item, index) => {
                const price = Number(item.product?.selling_price || 0);
                const qty = Number(item.quantity || 1);
                const subtotal = price * qty;

                return (
                  <tr key={item.product_id}>
                    <td>
                      <div className="d-flex column-gap-3 align-items-center">
                        <img
                          src={item.product?.images?.[0] || SAMPLE_IMAGE}
                          width="125px"
                          height="125px"
                          className="object-fit-cover rounded-2"
                          alt=""
                        />
                        <div>
                          <h6>{item.product?.brand}</h6>
                          <h5>{item.product?.product_name}</h5>
                          <h6>Size: {item.product?.size}</h6>
                          <h6>{item.product?.color}</h6>
                        </div>
                      </div>
                    </td>

                    <td>
                      <h5>₹ {price}</h5>
                      <h6 className="text-decoration-line-through">
                        ₹ {item.product?.actual_price}
                      </h6>
                    </td>

                    <td>
                      <div className="qtydiv" style={{ width: "125px" }}>
                        <button onClick={() => decQty(item, index)}>-</button>
                        <span className="mx-2">{qty}</span>
                        <button onClick={() => incQty(item, index)}>+</button>
                      </div>
                    </td>

                    <td>Free</td>

                    <td>
                      <h5>₹ {subtotal}</h5>
                    </td>

                    <td>
                      <i
                        className="fas fa-trash-can"
                        onClick={() => handleRemoveCart(item.product_id)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="mobile-only cart-cards">
        {cartProducts.map((item, index) => {
          const price = Number(item.product?.selling_price || 0);
          const qty = Number(item.quantity || 1);

          return (
            <div className="cart-card" key={item.product_id}>
              <img
                src={item.product?.images?.[0] || SAMPLE_IMAGE}
                alt=""
              />

              <h5>{item.product?.product_name}</h5>
              <p>₹ {price}</p>

              <div className="qtydiv">
                <button onClick={() => decQty(item, index)}>-</button>
                <span>{qty}</span>
                <button onClick={() => incQty(item, index)}>+</button>
              </div>

              <i
                className="fas fa-trash-can"
                onClick={() => handleRemoveCart(item.product_id)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CartTable;
