import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart, removeCartProduct } from "../../service/api";
import { NoCart } from "../../../public/Assets";
import "./CartTable.css";

const SAMPLE_IMAGE = "https://via.placeholder.com/80x80.png?text=Product";

const CartTable = ({
  cartProducts,
  setCartProducts,
  refreshCart,
  setCartTableData,
}) => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const checkAuth = () => {
    if (!isAuthenticated) {
      toast.error("Please login to update cart");
      navigate("/login");
      return false;
    }
    return true;
  };

  /* UPDATE QTY */
  const updateQty = async (item, newQty, index) => {
    if (newQty === item.quantity) return;
    if (!checkAuth()) return;
    if (newQty < 1) return;

    try {
      const payload = {
        product_id: item.product_id,
        size: item.size,
        color: item.product?.color,
        quantity: newQty,
      };

      const response = await addToCart(payload);

      if (response?.data?.success) {
        setCartProducts((prev) =>
          prev.map((p, i) => (i === index ? { ...p, quantity: newQty } : p)),
        );
      } else {
        toast.error(response?.data?.message || "Quantity update failed");
      }
    } catch (error) {
      console.error("Update qty error:", error);
      toast.error("Error updating quantity");
    }
  };

  const incQty = (item, index) => {
    updateQty(item, item.quantity + 1, index);
  };

  const decQty = (item, index) => {
    if (item.quantity <= 1) return;
    updateQty(item, item.quantity - 1, index);
  };

  const handleRemoveCart = async (productId) => {
    if (!checkAuth()) return;

    try {
      const response = await removeCartProduct({ product_id: productId });

      if (response?.data?.success) {
        toast.success("Item removed from cart");
        refreshCart();
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      console.error("Remove cart error:", error);
      toast.error("Error removing product");
    }
  };
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
                  <tr key={`${item.product_id}-${item.product?.size}`}>
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
                          <h6>Size: {item.size}</h6>
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
                        <button
                          className="qtybtn"
                          onClick={() => decQty(item, index)}
                        >
                          -
                        </button>
                        <span className="text-center">{qty}</span>
                        <button
                          className="qtybtn"
                          onClick={() => incQty(item, index)}
                        >
                          +
                        </button>
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
        {cartProducts.length === 0 ? (
          <div className="empty-state">
            <img src={NoCart} alt="" />
            <h6>Your Cart is Empty</h6>
          </div>
        ) : (
          cartProducts.map((item, index) => {
            const price = Number(item.product?.selling_price || 0);
            const qty = Number(item.quantity || 1);

            return (
              <div className="cart-card" key={`${item.product_id}-${index}`}>
                <div className="cart-card-left">
                  <img
                    src={item.product?.images?.[0] || SAMPLE_IMAGE}
                    alt=""
                    height="165px"
                    width="100%"
                    className="object-fit-cover"
                  />
                </div>
                <div className="cart-card-right">
                  <div className="cart-cart-head">
                    <h6 className="mb-2">{item.product?.brand}</h6>
                    <h5 className="mb-0">{item.product?.product_name}</h5>
                    <div className="d-flex align-items-center justify-content-start gap-3 my-2">
                      <h5 className="mb-0">
                        ₹{price} <span>₹{item.product.actual_price}</span>
                      </h5>
                      <h6 className="cart-offer mb-0">
                        ₹{item.product.discount}% OFF
                      </h6>
                    </div>
                  </div>
                  <div className="cart-card-middle my-2">
                    <div className="d-flex align-items-center justify-content-start gap-3">
                      <h5 className="mb-0">Size : {item.size}</h5>|
                      <h5 className="mb-0">{item.product?.color}</h5>
                    </div>
                  </div>

                  <div className="qty-row">
                    <div className="qtydiv">
                      <button
                        className="qtybtn"
                        onClick={() => decQty(item, index)}
                      >
                        -
                      </button>
                      <span className="text-center">{qty}</span>
                      <button
                        className="qtybtn"
                        onClick={() => incQty(item, index)}
                      >
                        +
                      </button>
                    </div>
                    <i
                      className="fas fa-trash-can fs-5"
                      onClick={() => handleRemoveCart(item.product_id)}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default CartTable;
