import React, { useState } from "react";
import "./CartTable.css";

const CartTable = () => {
  const [quantity, setQuantity] = useState(1);
  const incQty = () => {
    setQuantity((prev) => prev + 1);
  };
  const decQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const cartProducts = [
    {
      productImg:
        "https://cdn.shopify.com/s/files/1/0523/9934/1736/products/102761-2_7-kurkure-namkeen-masala-munch.jpg?v=1633507330",
      productname: "Kurkure Masala Munch (mixture) (75 g)",
      productColor: "Yellow",
      price: "₹ 100.00",
      shipping: "FREE",
      subtotal: "₹ 100.00",
      total: "₹ 100.00",
    },
    {
      productImg: "https://m.media-amazon.com/images/I/71Af8qfZQUL.jpg",
      productname: "Lay's Spaish Tomato Tango Chips (82 g)",
      productColor: "Red",
      price: "₹ 50.00",
      shipping: "FREE",
      subtotal: "₹ 98.00",
      total: "₹ 100.00",
    },
    {
      productImg:
        "https://cdn.shopify.com/s/files/1/0523/9934/1736/products/102761-2_7-kurkure-namkeen-masala-munch.jpg?v=1633507330",
      productname: "Kurkure Masala Munch (mixture) (75 g)",
      productColor: "Yellow",
      price: "₹ 100.00",
      shipping: "FREE",
      subtotal: "₹ 100.00",
      total: "₹ 100.00",
    },
    {
      productImg: "https://m.media-amazon.com/images/I/71Af8qfZQUL.jpg",
      productname: "Lay's Spaish Tomato Tango Chips (82 g)",
      productColor: "Red",
      price: "₹ 50.00",
      shipping: "FREE",
      subtotal: "₹ 98.00",
      total: "₹ 100.00",
    },
  ];
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Product Details</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Shipping</th>
            <th>Subtotal</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-start column-gap-2 product-td">
                  <img
                    src={item.productImg}
                    height="100px"
                    className="object-fit-contain rounded-2"
                    alt=""
                  />
                  <div className="cart-product">
                    <h5 className="my-1">{item.productname}</h5>
                    <h6 className="mb-1">Color: {item.productColor}</h6>
                    <h6 className="mb-0">Size: M</h6>
                  </div>
                </div>
              </td>
              <td>{item.price}</td>
              <td>
                <span className="qtydiv">
                  <button className="qtybtn minus" onClick={() => decQty()}>
                    -
                  </button>
                  <input
                    type="number"
                    className="text-center w-100 count"
                    value={999}
                    readOnly
                  />
                  <button className="qtybtn plus" onClick={() => incQty()}>
                    +
                  </button>
                </span>
              </td>
              <td>{item.shipping}</td>
              <td>{item.subtotal}</td>
              <td>{item.total}</td>
              <td>
                <div className="d-flex align-items-center">
                  <i className="fas fa-trash-can"></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
