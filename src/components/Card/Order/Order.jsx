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

  const [selectedOrder, setSelectedOrder] = useState(null);

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

      <div className="tab-content" id="profileTabContent">

        {/* ACTIVE ORDERS */}
        <div className="tab-pane fade show active" id="activeOrders">
          {loading ? (
            <h6 className="text-center mt-4">Loading...</h6>
          ) : selectedOrder ? (
            <OrderDetails
              order={selectedOrder}
              onBack={() => setSelectedOrder(null)}
            />
          ) : activeOrders.length === 0 ? (
            <h6 className="text-center mt-4">No active orders</h6>
          ) : (
            <OrderCards
              orders={activeOrders}
              onViewDetails={setSelectedOrder}
            />
          )}
        </div>

        {/* CANCELLED ORDERS */}
        <div className="tab-pane fade" id="cancelOrders">
          {selectedOrder ? (
            <OrderDetails
              order={selectedOrder}
              onBack={() => setSelectedOrder(null)}
            />
          ) : cancelledOrders.length === 0 ? (
            <h6 className="text-center mt-4" style={{ fontSize: "14px" }}>
              No cancelled orders
            </h6>
          ) : (
            <OrderCards
              orders={cancelledOrders}
              onViewDetails={setSelectedOrder}
            />
          )}
        </div>

        {/* COMPLETED ORDERS */}
        <div className="tab-pane fade" id="completedOrders">
          {selectedOrder ? (
            <OrderDetails
              order={selectedOrder}
              onBack={() => setSelectedOrder(null)}
            />
          ) : completedOrders.length === 0 ? (
            <h6 className="text-center mt-4" style={{ fontSize: "14px" }}>
              No completed orders
            </h6>
          ) : (
            <OrderCards
              orders={completedOrders}
              onViewDetails={setSelectedOrder}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default Order;
