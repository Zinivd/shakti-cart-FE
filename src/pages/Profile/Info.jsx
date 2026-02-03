import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../service/api";

const Info = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email || "guest@email.com";
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const response = await getUserInfo(email);

    if (response?.data?.success) {
      const user = response?.data?.data;
      const nameParts = user.name ? user.name.split(" ") : [];

      setFormData({
        name: nameParts[0] || "",
        email: user.email || "",
        contact: user.phone || "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.contact,
    };

    try {
      const result = await updateUserInfo(email, payload);

      if (result?.data?.success || result?.success) {
        toast.success("Account information updated successfully");
        setIsEdit(false);
      } else {
        toast.error("Failed to update account information");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="info mt-2">
      <div className="body-head mb-4 d-flex justify-content-between align-items-center">
        <h4>
          <span>|</span> Account Info
        </h4>

        {!isEdit && (
          <button
            type="button"
            className="darkbtn"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 col-md-6 mb-4">
              <label htmlFor="fullname">
                Full Name <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEdit || loading}
                required
              />
            </div>

            {/* <div className="col-sm-12 col-md-6 mb-4">
              <label htmlFor="lastname">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </div> */}

            <div className="col-sm-12 col-md-6 mb-4">
              <label htmlFor="email">
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                disabled
                required
              />
            </div>

            <div className="col-sm-12 col-md-6 mb-4">
              <label htmlFor="contact">
                Contact Number <span>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                disabled
                required
              />
            </div>

            {/* <div className="col-sm-12 col-md-6 mb-4">
              <label htmlFor="gender">
                Gender <span>*</span>
              </label>
              <div className="d-flex align-items-center column-gap-3">
                <div className="d-flex align-items-center column-gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    disabled={!isEdit}
                  />
                  <label htmlFor="male" className="mb-0">Male</label>
                </div>

                <div className="d-flex align-items-center column-gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    disabled={!isEdit}
                  />
                  <label htmlFor="female" className="mb-0">Female</label>
                </div>
              </div>
            </div> */}
          </div>

          {isEdit && (
            <div className="col-sm-12 d-flex align-items-center justify-content-start">
              <button type="submit" className="darkbtn" disabled={loading}>
                {loading ? "Saving..." : "Save Account Information"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Info;
