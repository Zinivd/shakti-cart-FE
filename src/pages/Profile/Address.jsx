import React, { useState, useEffect } from "react";
import AddressCard from "../../components/Card/Address/Address";
import AddAddress from "../../components/Popup/AddAddress";
import { NoAddress } from "../../../public/Assets";
import { getUserAddresses } from "../../service/api";
import { toast } from "react-toastify";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [editMode, setEditMode] = useState("add");
  const [editAddress, setEditAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  useEffect(() => {
    if (userEmail) {
      loadAddresses();
    }
  }, [userEmail]);

  useEffect(() => {
    if (addresses.length && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses]);

  const loadAddresses = async () => {
    try {
      const res = await getUserAddresses(userEmail);
      const addressList = res?.data?.data || [];
      setAddresses(addressList);
    } catch (err) {
      console.error("Failed to load addresses", err);
    }
  };

  const handleEdit = (address) => {
    setEditMode("edit");
    setEditAddress(address);
  };

  const handleSuccess = () => {
    setEditMode("add");
    setEditAddress(null);
    loadAddresses().then(() => {
      if (editedId) {
        setSelectedAddressId(editedId); // 🔥 keep selection
      }
    });
  };

  return (
    <div className="mt-2">
      <div className="body-head mb-3 d-flex justify-content-between">
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

      {addresses.length > 0 ? (
        <AddressCard
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelect={setSelectedAddressId}
          onEdit={handleEdit}
          onRemove={loadAddresses}
        />
      ) : (
        <div className="empty-state">
          <img src={NoAddress} alt="" />
          <h6 className="mb-2">No Address Found</h6>
        </div>
      )}

      <AddAddress
        key={editAddress?.id || "add"}
        mode={editMode}
        addressData={editAddress}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Address;
