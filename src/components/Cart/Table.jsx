import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart, removeCartProduct } from "../../service/api";
import { NoCart } from "../../assets/Assets.js";
import "./CartTable.css";

const SAMPLE_IMAGE = "https://via.placeholder.com/80x80.png?text=Product";

// FIX: the API returns this relation as `product_color` (snake_case), not
// `productColor` — reading the wrong key meant it was always undefined,
// which is why the image/color/stock never showed up.
const getSizeStock = (productColor, size) => {
  if (!productColor?.inventories?.length || !size) return 0;
  const inv = productColor.inventories.find((i) => i.size === size);
  return Number(inv?.stock || 0);
};

const getProductImage = (productColor, product) => {
  const colorImage = productColor?.images?.[0];
  const fallbackImage = product?.images?.[0];
  return colorImage || fallbackImage || SAMPLE_IMAGE;
};

const getProductColorName = (productColor) => {
  return productColor?.color?.name || "";
};

const CartTable = ({ cartProducts, setCartProducts, refreshCart }) => {
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
        product_color_id: item.product_color_id,
        size: item.size,
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
    const stock = getSizeStock(item.product_color, item.size);
    if (item.quantity >= stock) {
      toast.error("Stock limit reached for this size");
      return;
    }
    updateQty(item, item.quantity + 1, index);
  };

  const decQty = (item, index) => {
    if (item.quantity <= 1) return;
    updateQty(item, item.quantity - 1, index);
  };

  const handleRemoveCart = async (item) => {
    if (!checkAuth()) return;
    try {
      const response = await removeCartProduct({
        product_id: item.product_id,
        product_color_id: item.product_color_id,
        size: item.size,
      });
      if (response?.data?.success) {
        toast.success("Item removed from cart");
        refreshCart();
      } else {
        toast.error(response?.data?.message || "Failed to remove product");
      }
    } catch (error) {
      console.error("Remove cart error:", error);
      toast.error("Error removing product");
    }
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="table-wrapper cart-table-desktop">
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
                const image = getProductImage(item.product_color, item.product);
                const colorName = getProductColorName(item.product_color);

                return (
                  <tr
                    key={`${item.product_id}-${item.product_color_id}-${item.size}`}
                  >
                    <td>
                      <div className="d-flex column-gap-3 align-items-center">
                        <img
                          src={image}
                          width="125px"
                          height="125px"
                          className="object-fit-cover rounded-2"
                          alt={item.product?.name || ""}
                        />
                        <div>
                          <h6>{item.product?.brand}</h6>
                          <h5>{item.product?.name}</h5>
                          <h6>Size: {item.size}</h6>
                          {colorName && <h6>Color: {colorName}</h6>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <h5>₹ {price}</h5>
                      {Number(item.product?.actual_price) > price && (
                        <h6 className="text-decoration-line-through">
                          ₹ {item.product?.actual_price}
                        </h6>
                      )}
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
                        onClick={() => handleRemoveCart(item)}
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
      <div className="cart-table-mobile cart-cards">
        {cartProducts.length === 0 ? (
          <div className="empty-state">
            <img src={NoCart} alt="" />
            <h6>Your Cart is Empty</h6>
          </div>
        ) : (
          cartProducts.map((item, index) => {
            const price = Number(item.product?.selling_price || 0);
            const qty = Number(item.quantity || 1);
            const image = getProductImage(item.product_color, item.product);
            const colorName = getProductColorName(item.product_color);

            return (
              <div
                className="cart-card"
                key={`${item.product_id}-${item.product_color_id}-${item.size}-${index}`}
              >
                <div className="cart-card-left">
                  <img
                    src={image}
                    alt={item.product?.name || ""}
                    height="165px"
                    width="100%"
                    className="object-fit-cover"
                  />
                </div>
                <div className="cart-card-right">
                  <div className="cart-cart-head">
                    <h6 className="mb-2">{item.product?.brand}</h6>
                    <h5 className="mb-0">{item.product?.name}</h5>
                    <div className="d-flex align-items-center justify-content-start gap-3 my-2">
                      <h5 className="mb-0">
                        ₹{price}{" "}
                        {Number(item.product?.actual_price) > price && (
                          <span>₹{item.product.actual_price}</span>
                        )}
                      </h5>
                      {Number(item.product?.discount_percent) > 0 && (
                        <h6 className="cart-offer mb-0">
                          {item.product.discount_percent}% OFF
                        </h6>
                      )}
                    </div>
                  </div>
                  <div className="cart-card-middle my-2">
                    <div className="d-flex align-items-center justify-content-start gap-3">
                      <h5 className="mb-0">Size : {item.size}</h5>
                      {colorName && (
                        <>
                          |<h5 className="mb-0">{colorName}</h5>
                        </>
                      )}
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
                      onClick={() => handleRemoveCart(item)}
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
