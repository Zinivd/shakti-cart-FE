
import React, { useEffect, useState } from "react";
import { getCartProducts, removeCartProduct } from "../../service/api";
import "./CartTable.css";

const SAMPLE_IMAGE =
  "https://via.placeholder.com/80x80.png?text=Product";

const CartTable = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const fetchCartProducts = async () => {
    try {
      const response = await getCartProducts();

      if (response?.data?.success && Array.isArray(response.data.data)) {
        const mappedCart = response.data.data.map((item) => {
          const price = Number(item.product?.selling_price || 0);
          const qty = Number(item.quantity || 1);

          return {
            id: item.product_id, 
            name: item.product?.product_name,
            color: item.product?.color,
            price,
            quantity: qty,
            subtotal: price * qty,
            image:
              item.product?.images?.length > 0
                ? item.product.images[0]
                : SAMPLE_IMAGE,
          };
        });

        setCartProducts(mappedCart);
      } else {
        setCartProducts([]);
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
      setCartProducts([]);
    }
  };

  const handleRemoveCart = async (productId) => {
  try {
    const response = await removeCartProduct({
      product_id: productId,
    });

    if (response?.data?.success) {
      // Refresh cart after delete
      fetchCartProducts();
    } else {
      console.error("Failed to remove product");
    }
  } catch (error) {
    console.error("Remove cart error:", error);
  }
};

  const incQty = (index) => {
    setCartProducts((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item
      )
    );
  };

  const decQty = (index) => {
    setCartProducts((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: (item.quantity - 1) * item.price,
            }
          : item
      )
    );
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
              <td colSpan="7" className="text-center">
                Cart is empty
              </td>
            </tr>
          ) : (
            cartProducts.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex column-gap-2 align-items-center">
                    <img
                      src={item.image}
                      height="80"
                      width="80"
                      alt={item.name}
                    />
                    <div>
                      <h6>{item.name}</h6>
                      <p>Color: {item.color}</p>
                    </div>
                  </div>
                </td>

                <td>₹ {item.price}</td>

                <td>
                  <button onClick={() => decQty(index)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => incQty(index)}>+</button>
                </td>

                <td>Free</td>

                <td>₹ {item.subtotal}</td>

                <td>₹ {item.subtotal}</td>

                <td>
                  <i
                    className={`fas fa-trash-can ${
                      loadingId === item.id ? "disabled" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveCart(item.id)}
                  ></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
