import React from "react";

const OrderCards = ({ orders = [] }) => {
  return (
    <div className="order-cards">
      {orders.map((order) =>
        order.items.map((item, index) => (
          <div className="order-content mb-4" key={`${order.order_id}-${index}`}>
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

            <div className="order-bottomcard">
              <div className="order-bottomleft">
                <div className="product-detail">
                  <img
                    src={
                      item.product?.images?.[0] ||
                      "https://dummyimage.com/100x100/eee/000.png&text=No+Image"
                    }
                    width="100px"
                    height="100px"
                    className="object-fit-contain"
                    alt=""
                  />
                  <div className="product-content">
                    <h5 className="mb-1">
                      {item.product?.product_name || "Product unavailable"}
                    </h5>
                    <h6 className="mb-1">
                      Color : {item.product?.color || "-"}
                    </h6>
                    <h6 className="mb-1">
                      Quantity : {item.quantity}
                    </h6>
                    <h6 className="mb-0">
                      Total : ₹ {item.total}
                    </h6>
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
        ))
      )}
    </div>
  );
};

export default OrderCards;
