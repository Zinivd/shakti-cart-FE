// AddressCard.jsx (Updated)
import React, { useEffect, useState } from "react";
import { getUserAddresses ,removeAddress} from "../../../service/api";
import Loader from "../../Loader/Loader.jsx";
import "./Address.css";
import { toast } from "react-toastify";
const Address = ({ onEdit }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email || "guest@email.com";

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const data = await getUserAddresses(userEmail);
      setAddresses(data?.data?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (item) => {
    return `${item.building_name}, ${item.address_1}, ${
      item.address_2
    }, ${item.city}, ${item.state} - ${item.pincode}`;
  };

  const handleEditClick = (item) => {
    if (onEdit) {
      onEdit(item);
    }
  };
  const handleRemove = async (id) => {
 

  const result = await removeAddress({ id }, userEmail);

  if (result?.success || result?.data?.success) {
    toast.success("Address removed successfully");
    loadAddresses(); // refresh list
  } else {
    toast.error("Failed to remove address");
  }
};


  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <div className="address-form">
      <form>
        <div className="address-main">
          {addresses.map((item) => (
            <div className="address-card mb-3" key={item.id}>
              <label>
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="mb-2">{item.name}</h5>
                  <input
                    type="checkbox"
                    id="address-div"
                    name="selectedAddress"
                    checked={selectedAddress === item.id}
                    onChange={() => setSelectedAddress(item.id)}
                  />
                </div>
                <h6 className="mb-2">+91 {item.phone}</h6>
                <h6 className="mb-2 addressType">{formatAddress(item)}</h6>
                <button type="button" className="addressbtn mb-2">
                  {item.address_type.toUpperCase()}
                </button>
                <div className="d-flex align-items-center column-gap-2">
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#addAddress"
                    onClick={() => handleEditClick(item)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <h6>Edit</h6>
                  </button>
                  <h5>|</h5>
                 <button
  type="button"
  onClick={() => handleRemove(item.id)}
  style={{
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
  }}
>
  <h6>Remove</h6>

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