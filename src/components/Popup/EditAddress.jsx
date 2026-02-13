import React, { useEffect, useState } from "react";
import { updateAddress, getUserAddresses } from "../../service/api";
import { toast } from "react-toastify";

const EditAddress = ({ addressData, onSuccess }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userEmail = user?.email;

  const loadAddresses = async () => {
    const res = await getUserAddresses(userEmail);
    setAddresses(res?.data?.data || []);
    console.log("hi : ",res?.data?.data);
    
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    const field = id.replace("edit_", "");

    const map = {
      f_name: "firstName",
      l_name: "lastName",
      company: "company",
      street_address: "streetAddress",
      landmark: "landmark",
      city: "city",
      state: "state",
      pincode: "pincode",
      country: "country",
      phone: "phone",
    };

    setFormData((prev) => ({
      ...prev,
      [map[field]]: value,
    }));
  };

  const splitName = (fullName = "") => {
    const [first, ...rest] = fullName.trim().split(" ");
    return {
      firstName: first || "",
      lastName: rest.join(" "),
    };
  };

  const { firstName, lastName } = splitName(addresses[0]?.name);

  const closeModal = () => {
    const modal = document.getElementById("editAddress");

    if (window.bootstrap?.Modal) {
      window.bootstrap.Modal.getInstance(modal)?.hide();
    }

    setTimeout(() => {
      document.body.classList.remove("modal-open");
      document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
    }, 100);
  };

  const handleUpdate = async () => {
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
        id: addressData.id,
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
          address_type: "home",
        },
      };

      const result = await updateAddress(userEmail, payload);

      if (result?.data?.success || result?.success) {
        toast.success("Address Updated Successfully");
        closeModal();
        onSuccess?.();
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
            <button
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body row form">
            {error && (
              <div className="col-12 mb-2">
                <div className="alert alert-danger">{error}</div>
              </div>
            )}
            {JSON.stringify(addresses)}
            {[
              ["f_name", "First Name", firstName],
              ["l_name", "Last Name", lastName],
              ["company", "Building Name", addresses[0]?.building_name],
              ["street_address", "Street Address", addresses[0]?.address_1],
              ["landmark", "Landmark", addresses[0]?.landmark],
              ["city", "City", addresses[0]?.city],
              ["state", "State", addresses[0]?.state],
              ["pincode", "Pincode", addresses[0]?.pincode],
              ["country", "Country / Region", addresses[0]?.district],
              ["phone", "Phone", addresses[0]?.phone],
            ].map(([id, label, value]) => (
              <div key={id} className="col-md-6 mb-2">
                <label htmlFor={`edit_${id}`}>
                  {label} <span>*</span>
                </label>
                <input
                  id={`edit_${id}`}
                  className="form-control"
                  value={value}
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
  );
};

export default EditAddress;
