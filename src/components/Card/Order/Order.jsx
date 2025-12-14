import React, { useEffect, useState } from "react";
import OrderTabs from "./OrderTabs";
import OrderCards from "./OrderCards";
import OrderDetails from "./OrderDetails";
import { getOrders } from "../../../service/api";
import "./Order.css";

const Order = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      if (res?.data?.success) {
        const orders = res.data.data || [];

        const active = [];
        const cancelled = [];
        const completed = [];

        orders.forEach((order) => {
          const status = order.order_status?.toLowerCase();

          if (status === "delivered") {
            completed.push(order);
          } else if (status === "cancelled") {
            cancelled.push(order);
          } else {
            active.push(order);
          }
        });

        setActiveOrders(active);
        setCancelledledOrders?.(cancelled); // safeguard if typo exists
        setCancelledOrders(cancelled);
        setCompletedOrders(completed);
      }
    } catch (err) {
      console.error("Order fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-list">
      <OrderTabs />
      <div className="">
        <div className="tab-content" id="profileTabContent">
          <div
            className="tab-pane fade show active"
            id="activeOrders"
            role="tabpanel"
          >
            {loading ? (
              <h6 className="text-center mt-4">Loading...</h6>
            ) : activeOrders.length === 0 ? (
              <h6 className="text-center mt-4">No active orders</h6>
            ) : (
              <OrderCards orders={activeOrders} />
            )}

            <OrderDetails />
          </div>

          <div className="tab-pane fade" id="cancelOrders" role="tabpanel">
            {cancelledOrders.length === 0 ? (
              <h6 className="text-center mt-4" style={{ fontSize: "14px" }}>
                No cancelled orders
              </h6>
            ) : (
              <OrderCards orders={cancelledOrders} />
            )}
          </div>

          <div className="tab-pane fade" id="completedOrders" role="tabpanel">
            {completedOrders.length === 0 ? (
              <h6 className="text-center mt-4" style={{ fontSize: "14px" }}>
                No completed orders
              </h6>
            ) : (
              <OrderCards orders={completedOrders} />
            )}
          </div>

          {/* <div className="tab-pane fade" id="orderdetails" role="tabpanel">
            <OrderDetails />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Order;
