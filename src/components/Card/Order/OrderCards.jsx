import React, { useState } from "react";
import OrderDetails from "./OrderDetails";

const OrderCards = ({ orders = [], onViewDetails }) => {
  const [openOrderId, setOpenOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 🔹 SHOW ORDER DETAILS PAGE
  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  const toggleAccordion = (orderId) => {
    setOpenOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="order-cards">
      {orders.map((order) => {
        const firstItem = order.items?.[0];
        const isOpen = openOrderId === order.order_id;

        return (
          <div className="order-content mb-3" key={order.order_id}>
            <div
              className="order-headcard"
              onClick={() => toggleAccordion(order.order_id)}
            >
              <div className="order-headleft">
                <h5 className="mb-2">Order no: {order.order_id}</h5>
                <h6 className="mb-2">
                  <span className="text-dark">Order Date :</span>{" "}
                  {new Date(order.created_at).toLocaleString()}
                </h6>
                <h6 className="mb-2">
                  <span className="text-dark">Order Status :</span>{" "}
                  {order.order_status}
                </h6>
                {/* <h6 className="mb-0">
                  <span className="text-dark">Estimated Delivery Date :</span>{" "}
                  {order.delivered_at || "-"}
                </h6> */}
              </div>

              <div className="order-headright">
                <h6 className="mb-0">
                  <span className="text-dark">Payment Method :</span>{" "}
                  {order.payment_mode}
                </h6>
                <div className="mt-2 text-end">{isOpen ? "▲" : "▼"}</div>
              </div>
            </div>

            {/* 🔹 SINGLE PREVIEW PRODUCT */}
            {isOpen && (
              <div className="order-bottomcard mt-1">
                <div className="order-bottomleft">
                  <div className="product-detail">
                    <img
                      src={
                        firstItem?.product?.images?.[0] ||
                        "https://dummyimage.com/100x100/eee/000.png&text=No+Image"
                      }
                      width="100px"
                      height="100px"
                      className="rounded-1 object-fit-cover"
                      alt=""
                    />
                    <div className="product-content">
                      <h5 className="mb-1">
                        {firstItem?.product?.product_name} | {firstItem?.product?.brand}
                      </h5>
                      <h6 className="mb-1">
                        Color: {firstItem?.product?.color}
                      </h6>
                      <h6 className="mb-0">
                        Qty: {firstItem?.quantity} item(s)
                      </h6>
                    </div>
                  </div>
                </div>

                <div className="order-bottomright ms-auto">
                  <button
                    className="darkbtn"
                    type="button"
                    onClick={() => onViewDetails(order)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderCards;
