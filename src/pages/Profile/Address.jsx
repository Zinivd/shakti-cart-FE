// Address.jsx (Page component) - UPDATED
import React, { useState } from "react";
import AddressCard from "../../components/Card/Address/Address";
import AddAddress from "../../components/Popup/AddAddress"
const Address = () => {
  const [modalMode, setModalMode] = useState("add");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // This function only sets the data
  const handleEdit = (addressData) => {
    setModalMode("edit");
    setSelectedAddress(addressData);
  };

  const handleAddNew = () => {
    setModalMode("add");
    setSelectedAddress(null);
  };

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="mt-2">
      <div className="body-head mb-4 d-flex justify-content-between">
        <h4><span>|</span> Address</h4>
        <button
          className="formbtn"
          data-bs-toggle="modal"
          data-bs-target="#addAddress" // Opens the modal
          onClick={handleAddNew}
        >
          Add Address
        </button>
      </div>

      <AddressCard key={refreshKey} onEdit={handleEdit} />
      <AddAddress
        mode={modalMode}
        addressData={selectedAddress}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Address;