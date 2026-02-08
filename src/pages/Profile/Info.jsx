import React, { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from "../../service/api";
import { toast } from "react-toastify";

const Info = () => {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email || "guest@email.com";
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await getUserInfo(email);

      if (response?.data?.success) {
        const user = response.data.data;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          contact: user.phone || "",
        });
      }
    } catch (error) {
      toast.error("Failed to fetch user info");
    } finally {
      setLoading(false);
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
        toast.success("Account Info Updated!");
        setIsEdit(false);
        fetchUserDetails();
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
      <div className="body-head mb-3 d-flex justify-content-between align-items-center">
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
