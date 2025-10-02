import React from "react";

const OrderTabs = () => {
  return (
    <div className="order-tabs my-2">
      <ul
        className="nav nav-tabs d-flex align-items-center justify-content-between flex-md-row flex-wrap mt-4"
        id="orderTab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="ordertabs active"
            data-bs-toggle="tab"
            type="button"
            data-bs-target="#activeOrders"
          >
            Active
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="ordertabs"
            data-bs-toggle="tab"
            type="button"
            data-bs-target="#cancelOrders"
          >
            Cancelled
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="ordertabs"
            data-bs-toggle="tab"
            type="button"
            data-bs-target="#completedOrders"
          >
            Completed
          </button>
        </li>
        {/* <li className="nav-item d-none" role="presentation">
          <button
            className="ordertabs"
            data-bs-toggle="tab"
            type="button"
            data-bs-target="#orderdetails"
          >
            Order Details
          </button>
        </li> */}
      </ul>
    </div>
  );
};

export default OrderTabs;
