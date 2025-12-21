import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserAddresses } from "../../../service/api";
import Loader from "../../Loader/Loader.jsx";
import "./Address.css";

const Address = () => {

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

                  {/* Checkbox */}
                  <input
                    type="checkbox" 
                    id="address-div"
                    name="selectedAddress"
                    checked={selectedAddress === item.id}
                    onChange={() => setSelectedAddress(item.id)}
                  />
                </div>

                <h6 className="mb-2">+91 {item.phone}</h6>

                <h6 className="mb-2 addressType">
                  {formatAddress(item)}
                </h6>

                <button
                  type="button"
                  className="addressbtn mb-2"
                >
                  {item.address_type.toUpperCase()}
                </button>

                <div className="d-flex align-items-center column-gap-2">
                  <Link to={`/address/edit/${item.id}`}>
                    <h6>Edit</h6>
                  </Link>
                  <h5>|</h5>
                  <Link to={`/address/delete/${item.id}`}>
                    <h6>Remove</h6>
                  </Link>
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
