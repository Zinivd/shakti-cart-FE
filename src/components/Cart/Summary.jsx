import React from "react";

const Summary = () => {
  const orderItems = [
    {
      image:
        "https://cdn.shopify.com/s/files/1/0523/9934/1736/products/102761-2_7-kurkure-namkeen-masala-munch.jpg?v=1633507330",
      name: "Kurkure Masala Munch (mixture) (75 g)",
      price: 50.00,
      quantity: 1,
      color: "Orange",
    },
    {
      image: "https://m.media-amazon.com/images/I/71Af8qfZQUL.jpg",
      name: "Lay's Spaish Tomato Tango Chips (82 g)",
      price: 100.00,
      quantity: 1,
      color: "Red",
    },
  ];
  return (
    <div className="summary mb-3">
      <div className="summary-header">
        <h5 className="mb-0">Order Summary</h5>
        <h5 className="mb-0">Sub Total</h5>
      </div>
      <hr />
      <div className="summary-body">
        {orderItems.map((item, index) => (
          <div className="summary-products" key={index}>
            <div className="summary-list mb-2">
              <div className="d-flex align-items-start column-gap-2">
                <img
                  src={item.image}
                  alt=""
                  height="75px"
                  className="rounde-2 object-fit-cover"
                />
                <div className="summary-product">
                  <h5 className="mt-1 mb-2">
                    {item.name} * {item.quantity}
                  </h5>
                  <h6 className="mb-1"><span className="text-dark">Color</span> : {item.color}</h6>
                </div>
              </div>
              <div className="summary-price">
                <h6 className="mb-0">₹ {item.price}</h6>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="summary-footer">
        <div className="subtotal">
          <h5 className="mb-2">SubTotal</h5>
          <h6 className="mb-2">513.00</h6>
        </div>
        <div className="savings">
          <h5 className="mb-0">Savings</h5>
          <h6 className="mb-0">- ₹ 100.00</h6>
        </div>
        <hr />
        <div className="shipping">
          <h5 className="mb-0">Shipping</h5>
          <h6 className="mb-0">- ₹ 5.00</h6>
        </div>
        <hr />
        <div className="total">
          <h5 className="mb-0">Total</h5>
          <h6 className="mb-0">₹ 513.00</h6>
        </div>
      </div>
    </div>
  );
};

export default Summary;
