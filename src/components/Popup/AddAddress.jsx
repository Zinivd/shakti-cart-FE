import React, { useState, useRef } from "react";
import { addAddress } from "../../service/api";
import { toast } from "react-toastify";

const AddAddress = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    company: "",
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userEmail = user?.email || "guest@email.com";
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace("add_", "");

    const fieldMap = {
      f_name: "firstName",
      l_name: "lastName",
      country: "country",
      building: "company",
      street_address: "streetAddress",
      landmark: "landmark",
      city: "city",
      state: "state",
      pincode: "pincode",
      phone: "phone",
    };

    setFormData((prev) => ({
      ...prev,
      [fieldMap[fieldName]]: value,
    }));
  };

  const closeModal = () => {
    const modalElement = document.getElementById("addAddress");

    if (window.bootstrap?.Modal) {
      const instance = window.bootstrap.Modal.getInstance(modalElement);
      instance?.hide();
    }

    setTimeout(() => {
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      document.body.classList.remove("modal-open");
      document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
    }, 100);
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.phone ||
      !formData.streetAddress ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast.warning("Please fill all the required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        address_1: formData.streetAddress,
        landmark: formData.landmark || "",
        address_2: "",
        city: formData.city,
        district: formData.country || formData.city,
        state: formData.state,
        pincode: formData.pincode,
        building_name: formData.company || "",
        address_type: "home",
      };

      const result = await addAddress(userEmail, payload, token);

      if (result?.data?.success || result?.success) {
        toast.success("Address Added Successfully!");

        setFormData({
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

        closeModal();
        onSuccess?.();
        window.location.reload();
      } else {
        toast.error(result?.data?.message || "Failed to add address");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="addAddress"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add Address</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body form row">
            {[
              ["f_name", "First Name", formData.firstName, "required"],
              ["l_name", "Last Name", formData.lastName, ""],
              ["building", "Building Name", formData.company, "required"],
              ["street_address", "Street Address", formData.streetAddress, "required"],
              ["landmark", "Landmark", formData.landmark, "required"],
              ["city", "City", formData.city, "required"],
              ["state", "State", formData.state, "required"],
              ["pincode", "Pincode", formData.pincode, "required"],
              ["country", "Country / Region", formData.country, ""],
              ["phone", "Phone", formData.phone, "required"],
            ].map(([id, label, value, required]) => (
              <div key={id} className="col-md-6 mb-3">
                <label htmlFor={`add_${id}`}>{label} <span>{required && "*"}</span></label>
                <input
                  id={`add_${id}`}
                  className="form-control"
                  value={value}
                  onChange={handleChange}
                  placeholder={label}
                  required={required === "required"}
                />
              </div>
            ))}
          </div>
          <div className="modal-footer d-flex justify-content-center align-items-center">
            <button
              className="formbtn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Address"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
