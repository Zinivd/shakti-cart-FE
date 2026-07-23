// Ordered → Packaged → Shipped → Delivered
import React, { useState } from "react";
import "./Tracking.css";

const OrderDetails = ({ order, onBack, onCancel }) => {
  const STATUS_FLOW = ["PLACED", "PACKAGED", "SHIPPED", "DELIVERED"];
  const currentStatusIndex = STATUS_FLOW.indexOf(order?.order_status);
  const progressWidth =
    currentStatusIndex >= 0
      ? (currentStatusIndex / (STATUS_FLOW.length - 1)) * 100
      : 0;

  const [cancelItem, setCancelItem] = useState(null);

  // 🔹 Now actually cancels the order locally via Order.jsx's handleCancelOrder,
  // then returns to the list on the Cancelled tab.
  const handleConfirmCancel = () => {
    if (onCancel) {
      onCancel(order.order_id);
    }
    setCancelItem(null);
  };

  return (
    <div className="order-details">
      <div className="order-cards">
        <div className="body-head mb-3 d-flex align-items-center justify-content-between">
          <h4 className="mb-0">
            <span>|</span> Order Details
          </h4>
          <span className="back-link" onClick={onBack}>
            Back
          </span>
        </div>

        <div className="order-content mb-3">
          <div className="order-headcard" style={{ cursor: "default" }}>
            <div className="order-headleft">
              <h5 className="mb-2">Order no: {order?.order_id}</h5>
              <h6 className="mb-0">
                <span className="text-dark">Placed On :</span>{" "}
                {new Date(order.created_at).toLocaleString()}
              </h6>
            </div>

            <div className="order-headright">
              <h5>
                Total : <span className="text-muted">₹ {order.total_amount}</span>
              </h5>
            </div>
          </div>
        </div>

        <div className="order-timeline mt-5">
          <div className="col-8 mx-auto rounded">
            <div className="horizontal timeline">
              <div className="steps">
                {STATUS_FLOW.map((status, index) => (
                  <div
                    key={status}
                    className={`step ${
                      index < currentStatusIndex ? "completed" : ""
                    } ${index === currentStatusIndex ? "current" : ""}`}
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

        <div className="order-content" style={{ marginTop: "75px" }}>
          <div className="order-headcard d-block" style={{ cursor: "default" }}>
            {order.items.map((item, index) => (
              <div className="order-detail-row" key={index}>
                <div className="d-flex align-items-start column-gap-2 flex-grow-1">
                  <img
                    src={item.product?.images?.[0]}
                    width="75px"
                    height="75px"
                    className="object-fit-contain rounded-1"
                    alt=""
                  />
                  <div className="product-content">
                    <h5 className="mb-2">{item.product?.product_name}</h5>
                    <h6 className="mb-2">
                      Color : {item.product?.color || "-"}
                    </h6>
                    <h6 className="mb-0">
                      Size : {item.size || "-"}
                    </h6>
                  </div>
                </div>

                <h5 className="mb-0">
                  Qty : <span className="text-muted">{item.quantity}</span>
                </h5>

                <h5 className="mb-0">
                  Total : <span className="text-muted">₹ {item.total}</span>
                </h5>

                <span
                  className="order-close-icon"
                  onClick={() => setCancelItem(item)}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {cancelItem && (
        <div className="cancel-modal-overlay">
          <div className="cancel-modal">
            <h5 className="mb-3">Cancel Order</h5>
            <p className="mb-4">
              Are you sure you want to cancel this order?
            </p>
            <div className="cancel-modal-actions">
              <button className="lightbtn" onClick={() => setCancelItem(null)}>
                No, Keep it
              </button>
              <button className="darkbtn" onClick={handleConfirmCancel}>
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;