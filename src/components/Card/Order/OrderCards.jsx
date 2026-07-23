import React from "react";

const OrderCards = ({ orders = [], onViewDetails }) => {
  return (
    <div className="order-cards order-tabs-content">
      {orders.map((order) => {
        const firstItem = order.items?.[0];

        return (
          <div className="order-content mb-3" key={order.order_id}>
            {/* HEADER — always expanded, no toggle */}
            <div className="order-headcard" style={{ cursor: "default" }}>
              <div className="order-headleft">
                <h5 className="mb-2">Order no: {order.order_id}</h5>
                <h6 className="mb-2">
                  <span className="text-dark">Order Date :</span>{" "}
                  {new Date(order.created_at).toLocaleString()}
                </h6>
                <h6 className="mb-0">
                  <span className="text-dark">Estimated Delivery Date :</span>{" "}
                  8 June 2025
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

            {/* PRODUCT PREVIEW — shown by default */}
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
                    <h5 className="mb-1">{firstItem?.product?.product_name}</h5>
                    <h6 className="mb-1">
                      Colour : {firstItem?.product?.color}
                    </h6>
                    <h6 className="mb-0">
                      Qty : {firstItem?.quantity}
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
                  View Detail
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