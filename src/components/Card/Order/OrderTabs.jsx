import React from "react";

const TABS = [
  { key: "activeOrders", label: "Active" },
  { key: "cancelOrders", label: "Cancelled" },
  { key: "completedOrders", label: "Completed" },
];

const OrderTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="order-tabs my-2">
      <ul
        className="nav nav-tabs d-flex align-items-center justify-content-between flex-md-row flex-wrap mt-4"
        role="tablist"
      >
        {TABS.map((tab) => (
          <li className="nav-item" role="presentation" key={tab.key}>
            <button
              className={`ordertabs ${activeTab === tab.key ? "active" : ""}`}
              type="button"
              onClick={() => onTabChange(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderTabs;