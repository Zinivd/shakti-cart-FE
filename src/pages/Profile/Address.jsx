// Address.jsx (Page component) - UPDATED
import React, { useState } from "react";
import AddressCard from "../../components/Card/Address/Address";
import AddAddress from "../../components/Popup/AddAddress";
import { NoAddress } from "../../../public/Assets";
const Address = () => {
  const [address, setAddress] = useState(null);
  const [editMode, setEditMode] = useState("add");
  const [editAddress, setEditAddress] = useState(null);

  const handleEdit = (address) => {
    setEditMode("edit");
    setEditAddress(address);
  };

  const handleSuccess = () => {
    setEditMode("add");
    setEditAddress(null);
    loadAddresses(); // 🔥 refresh list
  };

  return (
    <div className="mt-2">
      <div className="body-head mb-4 d-flex justify-content-between">
        <h4>
          <span>|</span> Address
        </h4>
        <button
          className="formbtn"
          data-bs-toggle="modal"
          data-bs-target="#addAddress" // Opens the modal
        >
          Add Address
        </button>
      </div>

      {address ? (
        <AddressCard address={address} onEdit={handleEdit} />
      ) : (
        <div className="empty-state">
          <img src={NoAddress} alt="" />
          <h6 className="mb-2">No Address Found</h6>
        </div>
      )}

      <AddAddress
        mode={editMode}
        addressData={editAddress}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Address;
