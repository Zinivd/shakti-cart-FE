import React from "react";

const OrderCards = () => {
  const orderData = [
    {
      orderno: "123456789",
      date: "2 June 2025 2:40 PM",
      status: "In Progress",
      delivery: "8 June 2025",
      paymethod: "Cash On Delivery",
      image:
        "https://www.unibicfoods.com/wp-content/uploads/2022/12/cashew-badam.png",
      brand: "Unibic",
      name: "Cadbury Oreo Vanilla Flavour Biscuit (41.75 g)",
      qty: 5,
      price: "45",
      total: "150",
    },
    {
      orderno: "987654321",
      date: "4 July 2025 6:10 AM",
      status: "In Progress",
      delivery: "10 July 2025",
      paymethod: "Cash On Delivery",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/51uDcl29JoL._AC_UL600_SR600,600_.jpg",
      brand: "Nivea",
      name: "Nivea Haarmilch Shampoo (100ml)",
      qty: 2,
      price: "25",
      total: "50",
    },
    {
      orderno: "123456789",
      date: "2 June 2025 2:40 PM",
      status: "In Progress",
      delivery: "8 June 2025",
      paymethod: "Cash On Delivery",
      image:
        "https://www.unibicfoods.com/wp-content/uploads/2022/12/cashew-badam.png",
      brand: "Unibic",
      name: "Cadbury Oreo Vanilla Flavour Biscuit (41.75 g)",
      qty: 5,
      price: "45",
      total: "150",
    }
  ];
  return (
    <div className="order-cards">
      {orderData.map((item, index) => (
        <div className="order-content mb-4" key={index}>
          <div className="order-headcard">
            <div className="order-headleft">
              <h5 className="mb-2">Order no: {item.orderno}</h5>
              <h6 className="mb-2">
                <span className="text-dark">Order Date :</span> {item.date}{" "}
              </h6>
              <h6 className="mb-0">
                <span className="text-dark">Estimated Delivery Date :</span>{" "}
                {item.delivery}{" "}
              </h6>
            </div>
            <div className="order-headright">
              <h6 className="mb-2">
                <span className="text-dark">Order Status :</span> {item.status}
              </h6>
              <h6 className="mb-0">
                <span className="text-dark">Payment Method :</span>{" "}
                {item.paymethod}
              </h6>
            </div>
          </div>
          <div className="order-bottomcard">
            <div className="order-bottomleft">
              <div className="product-detail">
                <img
                  src={item.image}
                  width="100px"
                  height="100px"
                  className="object-fit-contain"
                  alt=""
                />
                <div className="product-content">
                  <h5 className="mb-1">{item.name}</h5>
                  <h6 className="mb-1">Color : Black</h6>
                  <h6 className="mb-1">Quantity : {item.qty}</h6>
                  <h6 className="mb-0">Total : ₹ {item.total}.00</h6>
                </div>
              </div>
            </div>
            <div className="order-bottomright ms-auto">
              <button
                className="darkbtn"
                type="button"
                data-bs-toggle="tab"
                data-bs-target="#orderdetails"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCards;
