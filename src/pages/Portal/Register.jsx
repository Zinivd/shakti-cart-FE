import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PortalBG } from "../../../public/Assets";
import { registerUser } from "../../service/api";
import "./Portal.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    user_type: "customer",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;

 
    if (name === "phone" && value.length > 10) return;

    setFormData({
      ...formData,
      [name]: value,
    });

    
    if (apiError) setApiError("");
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    if (formData.phone.length !== 10)
      tempErrors.phone = "Phone number must be 10 digits";
    if (!formData.password) tempErrors.password = "Password is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setApiError(""); 

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        user_type: formData.user_type,
      };

      const response = await registerUser(payload);
      debugger
      console.log("Register Success:", response);
 
     
      if (response?.data?.success || response?.data?.status === "success") {
       
        navigate("/");
      } else {
   
        setApiError(response?.data?.error || response?.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register Error:", error);
      
      // Handle error response from API
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        setApiError(errorData.error || errorData.message || "Registration failed");
      } else {
        setApiError(error.message || "Registration failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portal-main my-4">
      <div className="portal-div">
        <div className="portal-left">
          <img src={PortalBG} width="100%" height="700px" alt="portal-bg" />
        </div>

        <div className="portal-right mt-3">
          <div className="body-head mb-4">
            <div>
              <h4 className="mb-2">
                <span>|</span> Register
              </h4>
              <h6 className="mb-0">Join To Us</h6>
            </div>
          </div>

          <div className="portal-form">
            <form onSubmit={handleSubmit}>
              <div className="row">

                {/* Show API Error Message */}
                {apiError && (
                  <div className="col-sm-12 mb-3">
                    <div className="alert alert-danger" role="alert">
                      {apiError}
                    </div>
                  </div>
                )}

                {/* Name */}
                <div className="col-sm-12 mb-4">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                {/* Phone */}
                <div className="col-sm-12 mb-4">
                  <label>Contact Number *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>

                {/* Email */}
                <div className="col-sm-12 mb-4">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                {/* Password */}
                <div className="col-sm-12 mb-4">
                  <label>Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>

                {/* Submit */}
                <div className="col-sm-12 mb-4">
                  <button className="loginbtn" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>

                <div className="col-sm-12">
                  <h6>
                    ALREADY A USER? <Link to="/login">LOGIN</Link>
                  </h6>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;