import React, { useState, useEffect, useRef } from "react";
import { addAddress, updateAddress } from "../../service/api";
import { toast } from "react-toastify";

const AddAddress = ({ mode = "add", addressData = null, onSuccess }) => {
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

  useEffect(() => {
    if (mode === "edit" && addressData) {
      const nameParts = addressData.name?.split(" ") || [];

      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        country: addressData.district || "",
        company: addressData.building_name || "",
        streetAddress: addressData.address_1 || "",
        landmark: addressData.landmark || "",
        city: addressData.city || "",
        state: addressData.state || "",
        pincode: addressData.pincode || "",
        phone: addressData.phone || "",
      });
    } else {
      setFormData({
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
    }
  }, [mode, addressData]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userEmail = user?.email || "guest@email.com";

  const handleChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace("add_", "");
    const fieldMap = {
      f_name: "firstName",
      l_name: "lastName",
      country: "country",
      company: "company",
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
    try {
      const modalElement = document.getElementById("addAddress");

      if (window.bootstrap && window.bootstrap.Modal) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }

      setTimeout(() => {
        modalElement.classList.remove("show");
        modalElement.style.display = "none";
        modalElement.setAttribute("aria-hidden", "true");
        modalElement.removeAttribute("aria-modal");

        const backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach((backdrop) => backdrop.remove());

        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }, 100);
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (
        !formData.firstName ||
        !formData.phone ||
        !formData.city ||
        !formData.state ||
        !formData.pincode
      ) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        building_name: formData.company || "N/A",
        address_1: formData.streetAddress || "",
        address_2: "",
        city: formData.city,
        district: formData.country || formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark || "",
        address_type: "home",
      };

      let result;
      if (mode === "edit" && addressData) {
        result = await updateAddress(userEmail, {
          id: addressData.id,
          address: payload,
        });
      } else {
        result = await addAddress(userEmail, payload);
      }

      if (result?.data?.success || result?.success) {
        setFormData({
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
        closeModal();
        toast.success("Address Added Successfully!");
        window.location.reload();
        setTimeout(() => {
          if (onSuccess) {
            onSuccess(mode === "edit" ? addressData?.id : null);
          }
        }, 300);
      } else {
        setError(
          result?.data?.message || result?.message || "Failed to save address",
        );
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "An error occurred");
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
      aria-labelledby="addAddress"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="addAddress">
              {mode === "edit" ? "Edit Address" : "Add Address"}
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setError("");
              }}
            ></button>
          </div>
          <div className="modal-body form row">
            {error && (
              <div className="col-12 mb-2">
                <div className="alert alert-danger">{error}</div>
              </div>
            )}
            <div className="col-sm-12 col-md-6 col-xl-6 mb-3">
              <label htmlFor="add_f_name">
                First Name <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="add_f_name"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-3">
              <label htmlFor="add_l_name">
                Last Name <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="add_l_name"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-3">
              <label htmlFor="add_building">
                Building Name <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="add_building"
                placeholder="Building Name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-3">
              <label htmlFor="add_street_address">
                Street Address <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="add_street_address"
                placeholder="Street Address"
                value={formData.streetAddress}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-3">
              <label htmlFor="add_landmark">
                Landmark <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="add_landmark"
                placeholder="Landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-3">
              <label htmlFor="add_city">
                City <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="add_city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-3">
              <label htmlFor="add_state">
                State <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="add_state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-3">
              <label htmlFor="add_pincode">
                Pincode <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="add_pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-3">
              <label htmlFor="add_country">
                Country / Region <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="add_country"
                placeholder="Country / Region"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-3">
              <label htmlFor="add_phone">
                Phone <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="add_phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="formbtn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : mode === "edit"
                  ? "Update Address"
                  : "Add Address"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
