import React from "react";
import AddressCard from "../../components/Card/Address/Address";

const Address = () => {
  return (
    <div className="mt-2">
      <div className="body-head mb-4">
        <h4 className="mb-0">
          <span>|</span> Address
        </h4>
      </div>
      <AddressCard />
    </div>
  );
};

export default Address;
