import React, { useState } from "react";
import { removeAddress, updateAddress } from "../../../service/api";
import { toast } from "react-toastify";
import "./Address.css";

const Address = ({ addresses, selectedAddressId, onSelect, onRemove }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

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

  const [current_select_address, setcurrent_select_address] = useState({});
  
  const handle_current_address = (item) => {
    const { firstName, lastName } = splitName(item?.name);

    setFormData({
      firstName,
      lastName,
      company: item?.building_name || "",
      streetAddress: item?.address_1 || "",
      landmark: item?.landmark || "",
      city: item?.city || "",
      state: item?.state || "",
      pincode: item?.pincode || "",
      country: item?.district || "",
      phone: item?.phone || "",
    });

    setcurrent_select_address(item);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    const fieldMap = {
      edit_f_name: "firstName",
      edit_l_name: "lastName",
      edit_company: "company",
      edit_street_address: "streetAddress",
      edit_landmark: "landmark",
      edit_city: "city",
      edit_state: "state",
      edit_pincode: "pincode",
      edit_country: "country",
      edit_phone: "phone",
    };

    const key = fieldMap[id];

    if (key) {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const splitName = (fullName = "") => {
    const [first, ...rest] = fullName.trim().split(" ");
    return {
      firstName: first || "",
      lastName: rest.join(" "),
    };
  };

  const formatAddress = (item) =>
    `${item.building_name}, ${item.address_1}, ${item.address_2 || ""}, ${item.city}, ${item.state} - ${item.pincode}`;

  const closeModal = () => {
    const modalElement = document.getElementById("editAddress");
    if (!modalElement || !window.bootstrap) return;

    const modalInstance =
      window.bootstrap.Modal.getInstance(modalElement) ||
      new window.bootstrap.Modal(modalElement);

    modalInstance.hide();
  };

  const handleUpdate = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email;
    const token = localStorage.getItem("access-token");

    if (
      !formData.firstName ||
      !formData.phone ||
      !formData.streetAddress ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        id: current_select_address.id,
        address: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          building_name: formData.company,
          address_1: formData.streetAddress,
          address_2: "",
          city: formData.city,
          district: formData.country,
          state: formData.state,
          pincode: formData.pincode,
          landmark: formData.landmark,
          address_type: current_select_address.address_type || "home",
        },
      };

      const result = await updateAddress(userEmail, payload, token);

      if (result?.data?.success || result?.success) {
        toast.success("Address Updated Successfully");
        closeModal();
        onRemove();
      } else {
        toast.error(result?.data?.message || "Failed to update address");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="address-form">
        <form>
          <div className="address-main">
            {addresses.map((item) => (
              <div className="address-card mb-3" key={item.id}>
                <label className="w-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="mb-2">{item.name}</h5>
                    <input
                      type="radio"
                      id="address-div"
                      name="selectedAddress"
                      checked={selectedAddressId === item.id}
                      onChange={() => onSelect(item.id)}
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
                      className="formbtn"
                      data-bs-toggle="modal"
                      data-bs-target="#editAddress"
                      onClick={() => handle_current_address(item)}
                      // onClick={() => onEdit(item)}
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
      <div
        className="modal fade"
        id="editAddress"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Address</h4>
              <button className="btn-close" data-bs-dismiss="modal" />
            </div>

            <div className="modal-body row form">
              {[
                ["f_name", "First Name", "firstName"],
                ["l_name", "Last Name", "lastName"],
                ["company", "Building Name", "company"],
                ["street_address", "Street Address", "streetAddress"],
                ["landmark", "Landmark", "landmark"],
                ["city", "City", "city"],
                ["state", "State", "state"],
                ["pincode", "Pincode", "pincode"],
                ["country", "Country / Region", "country"],
                ["phone", "Phone", "phone"],
              ].map(([id, label, field]) => (
                <div key={id} className="col-md-6 mb-2">
                  <label htmlFor={`edit_${id}`}>
                    {label} <span>*</span>
                  </label>
                  <input
                    id={`edit_${id}`}
                    className="form-control"
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div className="modal-footer justify-content-center">
              <button
                className="formbtn"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Address"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
