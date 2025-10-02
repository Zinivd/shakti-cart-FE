import React from "react";
import "./Tracking.css";

const OrderDetails = () => {
  const orderData = [
    {
      image:
        "https://www.unibicfoods.com/wp-content/uploads/2022/12/cashew-badam.png",
      brand: "Unibic",
      name: "Cadbury Oreo Vanilla Flavour Biscuit (41.75 g)",
      qty: 5,
      total: "150",
    },
    {
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/51uDcl29JoL._AC_UL600_SR600,600_.jpg",
      brand: "Nivea",
      name: "Nivea Haarmilch Shampoo (100ml)",
      qty: 10,
      total: "1500",
    },
  ];

  return (
    <div className="order-details">
      <div className="order-cards">
        {/* Order Cards */}
        <div className="order-content mb-3">
          <div className="order-headcard">
            <div className="order-headleft">
              <h5 className="mb-2">Order no: #123456789</h5>
              <h6 className="mb-0">
                <span className="text-dark">Placed On :</span> 2 June 2025 2:40
              </h6>
            </div>
            <div className="order-headright">
              <h5>
                Total : <span className="text-muted">₹ 150.00</span>
              </h5>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="order-timeline mt-5">
          <div className="col-8 mx-auto rounded">
            <div className="horizontal timeline">
              <div className="steps">
                <div className="step completed">
                  <span>Order Placed</span>
                </div>
                <div className="step completed">
                  <span>In Progress</span>
                </div>
                <div className="step">
                  <span>Shipped</span>
                </div>
              </div>
              <div className="line active" style={{ width: "69.6%" }}></div>
            </div>
          </div>
        </div>

        {/* Order Products */}
        <div className="order-content" style={{ marginTop: "75px" }}>
          <div className="order-headcard d-block">
            <div className="table-wrapper">
              <table className="table">
                <tbody>
                  {orderData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-start column-gap-2">
                          <img
                            src={item.image}
                            width="75px"
                            height="75px"
                            className="object-fit-contain"
                            alt=""
                          />
                          <div className="product-content">
                            <h5 className="mb-2">{item.name}</h5>
                            <h6 className="mb-0">Color : Black</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5>
                          Qty : <span className="text-muted">{item.qty}</span>
                        </h5>
                      </td>
                      <td>
                        <h5>
                          Total : <span className="text-muted">₹ 150.00</span>
                        </h5>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
