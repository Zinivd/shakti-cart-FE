import React from "react";
import OrderTabs from "./OrderTabs";
import OrderCards from "./OrderCards";
import OrderDetails from "./OrderDetails";
import "./Order.css";

const Order = () => {
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
            <OrderCards />
            {/* <OrderDetails /> */}
          </div>

          <div className="tab-pane fade" id="cancelOrders" role="tabpanel">
            <h6 className="text-center mt-4" style={{fontSize: "14px"}}>No cancelled orders</h6>
          </div>

          <div className="tab-pane fade" id="completedOrders" role="tabpanel">
            <h6 className="text-center mt-4" style={{fontSize: "14px"}}>No completed orders</h6>
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
