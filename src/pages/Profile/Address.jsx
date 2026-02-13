import React, { useState, useEffect } from "react";
import AddressCard from "../../components/Card/Address/Address";
import AddAddress from "../../components/Popup/AddAddress";
import { NoAddress } from "../../../public/Assets";
import { getUserAddresses } from "../../service/api";
import { toast } from "react-toastify";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editAddress, setEditAddress] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  useEffect(() => {
    if (userEmail) loadAddresses();
  }, [userEmail]);

  useEffect(() => {
    if (addresses.length && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses]);

  const loadAddresses = async () => {
    const res = await getUserAddresses(userEmail);
    setAddresses(res?.data?.data || []);
  };

  const handleEdit = (address) => {
    setEditAddress(address);
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
          data-bs-target="#addAddress"
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

      {/* {editAddress && (
        <EditAddress
          addressData={editAddress}
          onSuccess={() => {
            setEditAddress(null);
            loadAddresses();
          }}
        />
      )} */}

      <AddAddress onSuccess={loadAddresses} />
    </div>
  );
};

export default Address;
