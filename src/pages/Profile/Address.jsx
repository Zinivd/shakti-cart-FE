import React from "react";
import AddressCard from "../../components/Card/Address/Address";

const Address = () => {
  return (
    <div className="mt-2">
      <div className="body-head mb-4">
        <h4 className="mb-0">
          <span>|</span> Address
        </h4>
        <a data-bs-toggle="modal" data-bs-target="#addAddress">
          <button type="button" className="formbtn">
            Add Address
          </button>
        </a>
      </div>
      <AddressCard />
    </div>
  );
};

export default Address;
