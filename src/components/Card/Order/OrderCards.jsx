import React, { useState } from "react";
import OrderDetails from "./OrderDetails";

const OrderCards = ({ orders = [], onViewDetails }) => {

  const [selectedOrder, setSelectedOrder] = useState(null);

  // 🔹 SHOW ORDER DETAILS
  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="order-cards">
      {orders.map((order) => {
        const firstItem = order.items?.[0];

        return (
          <div className="order-content mb-4" key={order.order_id}>
            <div className="order-headcard">
              <div className="order-headleft">
                <h5 className="mb-2">Order no: {order.order_id}</h5>
                <h6 className="mb-2">
                  <span className="text-dark">Order Date :</span>{" "}
                  {new Date(order.created_at).toLocaleString()}
                </h6>
                <h6 className="mb-0">
                  <span className="text-dark">
                    Estimated Delivery Date :
                  </span>{" "}
                  {order.delivered_at || "-"}
                </h6>
              </div>

              <div className="order-headright">
                <h6 className="mb-2">
                  <span className="text-dark">Order Status :</span>{" "}
                  {order.order_status}
                </h6>
                <h6 className="mb-0">
                  <span className="text-dark">Payment Method :</span>{" "}
                  {order.payment_mode}
                </h6>
              </div>
            </div>

            {/* 🔹 SINGLE PREVIEW PRODUCT */}
            <div className="order-bottomcard">
              <div className="order-bottomleft">
                <div className="product-detail">
                  <img
                    src={
                      firstItem?.product?.images?.[0] ||
                      "https://dummyimage.com/100x100/eee/000.png&text=No+Image"
                    }
                    width="100px"
                    height="100px"
                    className="object-fit-contain"
                    alt=""
                  />
                  <div className="product-content">
                    <h5 className="mb-1">
                      {firstItem?.product?.product_name}
                    </h5>
                    <h6 className="mb-0">
                      {order.items.length} item(s)
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
          </div>
        );
      })}
    </div>
  );
};

export default OrderCards;
