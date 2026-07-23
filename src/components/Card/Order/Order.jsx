import React, { useEffect, useState } from "react";
import OrderTabs from "./OrderTabs";
import OrderCards from "./OrderCards";
import OrderDetails from "./OrderDetails";
import { getOrders } from "../../../service/api";
import "./Order.css";
import { NoCart, NoProducts, NoNotify } from "../../../../public/Assets";

const Order = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("activeOrders");

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

  // 🔹 LOCAL CANCEL — moves the order from Active → Cancelled in state.
  // No API call yet; swap the body of this function for a real cancel API later.
  const handleCancelOrder = (orderId) => {
    let cancelledEntry = null;

    setActiveOrders((prev) =>
      prev.filter((o) => {
        if (o.order_id === orderId) {
          cancelledEntry = { ...o, order_status: "Cancelled" };
          return false;
        }
        return true;
      })
    );

    if (cancelledEntry) {
      setCancelledOrders((prev) => [cancelledEntry, ...prev]);
    }

    setSelectedOrder(null);
    setActiveTab("cancelOrders");
  };

  // 🔹 ORDER DETAILS VIEW — fully replaces everything: no "My Orders" title, no tabs
  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
        onCancel={handleCancelOrder}
      />
    );
  }

  // 🔹 MY ORDER LIST VIEW
  return (
    <div className="order-list">
      <div className="body-head mb-3">
        <h4 className="mb-0">
          <span>|</span> My Orders
        </h4>
      </div>

      <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="tab-content">
        {activeTab === "activeOrders" && (
          <div className="tab-pane fade show active">
            {loading ? (
              <h6 className="text-center mt-4">Loading...</h6>
            ) : activeOrders.length === 0 ? (
              <div className="empty-state mt-5">
                <img src={NoNotify} alt="" />
                <h6>No Active Orders</h6>
              </div>
            ) : (
              <OrderCards
                orders={activeOrders}
                onViewDetails={setSelectedOrder}
              />
            )}
          </div>
        )}

        {activeTab === "cancelOrders" && (
          <div className="tab-pane fade show active">
            {cancelledOrders.length === 0 ? (
              <div className="empty-state mt-5">
                <img src={NoProducts} alt="" />
                <h6>No Cancelled Orders</h6>
              </div>
            ) : (
              <OrderCards
                orders={cancelledOrders}
                onViewDetails={setSelectedOrder}
              />
            )}
          </div>
        )}

        {activeTab === "completedOrders" && (
          <div className="tab-pane fade show active">
            {completedOrders.length === 0 ? (
              <div className="empty-state mt-5">
                <img src={NoCart} alt="" />
                <h6>No Completed Orders</h6>
              </div>
            ) : (
              <OrderCards
                orders={completedOrders}
                onViewDetails={setSelectedOrder}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;