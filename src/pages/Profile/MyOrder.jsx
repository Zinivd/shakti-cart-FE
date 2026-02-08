import React from "react";
import Order from "../../components/Card/Order/Order";

const MyOrder = () => {
  return (
    <div className="mt-2">
      <div className="body-head mb-3">
        <h4 className="mb-0">
          <span>|</span> My Orders
        </h4>
      </div>
      <Order />
    </div>
  );
};

export default MyOrder;
