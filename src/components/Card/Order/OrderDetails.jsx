// Ordered → Packaged → Shipped → Delivered
import React from "react";
import "./Tracking.css";

const OrderDetails = ({ order, onBack }) => {
  const STATUS_FLOW = ["PLACED", "PACKAGED", "SHIPPED", "DELIVERED"];
  const currentStatusIndex = STATUS_FLOW.indexOf(order?.order_status);
  const progressWidth =
    currentStatusIndex >= 0
      ? ((currentStatusIndex + 1) / STATUS_FLOW.length) * 100
      : 0;

  console.log(order);

  return (
    <div className="order-details">
      {/* 🔹 BACK BUTTON */}
      <button className="darkbtn mb-3" onClick={onBack}>
        ← Back to Orders
      </button>

      <div className="order-cards">
        {/* ORDER HEADER */}
        <div className="order-content mb-3">
          <div className="order-headcard">
            <div className="order-headleft">
              <h5 className="mb-2">Order no: {order?.order_id}</h5>
              <h6 className="mb-0">
                <span className="text-dark">Placed On :</span>{" "}
                {new Date(order.created_at).toLocaleString()}
              </h6>
            </div>

            <div className="order-headright">
              <h5>
                Total :{" "}
                <span className="text-muted">₹ {order.total_amount}</span>
              </h5>
            </div>
          </div>
        </div>

        {/* 🔹 TRACKING TIMELINE */}
        <div className="order-timeline mt-5">
          <div className="col-8 mx-auto rounded">
            <div className="horizontal timeline">
              <div className="steps">
                {STATUS_FLOW.map((status, index) => (
                  <div
                    key={status}
                    className={`step ${
                      index <= currentStatusIndex ? "completed" : ""
                    }`}
                  >
                    <span>
                      {status === "PLACED" && "Ordered"}
                      {status === "PACKAGED" && "Packaged"}
                      {status === "SHIPPED" && "Shipped"}
                      {status === "DELIVERED" && "Delivered"}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="line active"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 🔹 PRODUCTS LIST */}
        <div className="order-content" style={{ marginTop: "75px" }}>
          <div className="order-headcard d-block">
            <div className="table-wrapper">
              <table className="table">
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-start column-gap-2">
                          <img
                            src={item.product?.images?.[0]}
                            width="75px"
                            height="75px"
                            className="object-fit-contain"
                            alt=""
                          />
                          <div className="product-content">
                            <h5 className="mb-2">
                              {item.product?.product_name}
                            </h5>
                            <h6 className="mb-2">
                              Color : {item.product?.color || "-"}
                            </h6>
                            <h6 className="mb-0">
                              Size : {item.size || "-"}
                            </h6>
                          </div>
                        </div>
                      </td>

                      <td>
                        <h5>
                          Qty :{" "}
                          <span className="text-muted">
                            {item.quantity}
                          </span>
                        </h5>
                      </td>

                      <td>
                        <h5>
                          Total :{" "}
                          <span className="text-muted">
                            ₹ {item.total}
                          </span>
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
