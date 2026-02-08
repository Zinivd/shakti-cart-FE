// AddressCard.jsx (Updated)
import React from "react";
import { removeAddress } from "../../../service/api";
import Loader from "../../Loader/Loader.jsx";
import "./Address.css";
import { toast } from "react-toastify";

const Address = ({
  addresses,
  selectedAddressId,
  onSelect,
  onEdit,
  onRemove,
}) => {
  const handleRemove = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email;

    const result = await removeAddress({ id }, userEmail);

    if (result?.success || result?.data?.success) {
      toast.success("Address Removed Successfully!");
      onRemove();
    } else {
      toast.error("Failed to remove address");
    }
  };

  const formatAddress = (item) =>
    `${item.building_name}, ${item.address_1}, ${item.address_2 || ""}, ${item.city}, ${item.state} - ${item.pincode}`;

  return (
    <div className="address-form">
      <form>
        <div className="address-main">
          {addresses.map((item) => (
            <div className="address-card mb-3" key={item.id}>
              <label className="w-100">
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="mb-2">{item.name}</h5>
                  <input
                    type="checkbox"
                    id="address-div"
                    name="selectedAddress"
                    checked={selectedAddressId === item.id}
                    onChange={() => setSelectedAddress(item.id)}
                  />
                </div>
                <h6 className="mb-2">+91 {item.phone}</h6>
                <h6 className="mb-2 addressType">{formatAddress(item)}</h6>
                <button type="button" className="addressbtn mb-3">
                  {item.address_type.toUpperCase()}
                </button>
                <div className="d-flex align-items-center column-gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    data-bs-toggle="modal"
                    data-bs-target="#addAddress"
                    className="formbtn"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="darkbtn"
                  >
                    Remove
                  </button>
                </div>
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Address;
