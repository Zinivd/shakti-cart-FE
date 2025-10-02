import React from "react";
import { Link } from "react-router-dom";
import "./Address.css";

const Address = () => {
  const address = [
    {
      id: 1,
      name: "Sheik Shah Shuaib",
      phone: "+91 8608338833",
      address:
        "163, Opposite to VCC Mahal, Thiruvalluvar Saalai, Chinnathirupathi, Salem - 636008",
      type: "Home 1",
    },
    {
      id: 2,
      name: "Sibi Anand",
      phone: "+91 9025721952",
      address:
        "5/210/1, Arun Nagar, Opposite Of PMK MLA Office, Periya Pudhur, Salem - 636016",
      type: "Home 2",
    },
    {
      id: 3,
      name: "Zahir Khan",
      phone: "+91 7447970020",
      address:
        "73, Cherry Road, Opposite Of Old SKB Book Shop, Mullvaadi Gate, Salem - 636001",
      type: "Office",
    },
    {
      id: 4,
      name: "Poovarasan",
      phone: "+91 6381729596",
      address:
        "6/408, Kel easalpatti VI, Mel easalpatti P.O, Maniyathahalli, Dharmapuri-636807",
      type: "Other",
    },
  ];
  return (
    <div className="address-form">
      <form action="">
        <div className="address-main">
          {address.map((item, index) => (
            <div className="address-card mb-3" key={index}>
              <label htmlFor="address-div">
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="mb-2">{item.name}</h5>
                  <input type="checkbox" id="address-div" />
                </div>
                <h6 className="mb-2">{item.phone}</h6>
                <h6 className="mb-2 addressType">{item.address}</h6>
                <button className="addressbtn mb-2">{item.type}</button>
                <div className="d-flex align-items-center column-gap-2">
                  <Link>
                    <h6>Remove</h6>
                  </Link>
                  <h5>|</h5>
                  <Link>
                    <h6>Edit</h6>
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
