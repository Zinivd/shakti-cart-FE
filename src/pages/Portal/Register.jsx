import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../service/api";
import { toast } from "react-toastify";
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
  const [showPass, setShowPass] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) return;
      setFormData({
        ...formData,
        phone: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

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

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        user_type: formData.user_type,
      };

      const response = await registerUser(payload);
      if (response?.data?.success || response?.data?.status === "success") {
        toast.success("Registration Successful!");
        const result = await loginUser(formData.email, formData.password);
        if (!result?.data?.token || !result?.data?.user) {
          throw new Error("Login failed after registration");
        }

        localStorage.setItem("access-token", result?.data?.token);
        localStorage.setItem("user", JSON.stringify(result?.data?.user));
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
      } else {
        toast.error(
          response?.data?.error ||
            response?.data?.message ||
            "Registration failed",
        );
      }
    } catch (error) {
      console.error("Register Error:", error);
      localStorage.removeItem("access-token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portal-main my-4">
      <div className="portal-div">
        {/* Left image side */}
        {/* <div className="portal-left">
          <div className="portal-img-placeholder">Img</div>
        </div> */}

        <div className="portal-right ">
          <div className="portal-header-row">
            <div className="body-head d-block mb-4">
              <div>
                <h4 className="mb-2">
                  <span className="pe-2">|</span> Register{" "}
                  <span className="ps-2">|</span>
                </h4>
                <h6 className="mb-0">Join To Us</h6>
              </div>
            </div>
            <Link to="/" className="back-link">
              Back
            </Link>
          </div>

          <div className="portal-form">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Name */}
                <div className="col-sm-12 mb-4">
                  <div className="floating-group">
                    <input
                      type="text"
                      className="form-control"
                      id="regName"
                      placeholder=" "
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoFocus
                    />
                    <label htmlFor="regName">Full Name</label>
                  </div>
                  {errors.name && (
                    <small className="text-danger">{errors.name}</small>
                  )}
                </div>

                {/* Phone */}
                <div className="col-sm-12 mb-4">
                  <div className="floating-group">
                    <input
                      type="text"
                      className="form-control"
                      id="regPhone"
                      placeholder=" "
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <label htmlFor="regPhone">Contact Number</label>
                  </div>
                  {errors.phone && (
                    <small className="text-danger">{errors.phone}</small>
                  )}
                </div>

                {/* Email */}
                <div className="col-sm-12 mb-4">
                  <div className="floating-group">
                    <input
                      type="email"
                      className="form-control"
                      id="regEmail"
                      placeholder=" "
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="regEmail">Email Address</label>
                  </div>
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>

                {/* Password */}
                <div className="col-sm-12 mb-4">
                  <div className="floating-group password-group">
                    <input
                      type={showPass ? "text" : "password"}
                      className="form-control"
                      id="regPassword"
                      placeholder=" "
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <label htmlFor="regPassword">Password</label>
                    <span
                      className="toggle-icon"
                      onClick={() => setShowPass(!showPass)}
                    >
                      <i
                        className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"}`}
                      ></i>
                    </span>
                  </div>
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>

                {/* Terms */}
                <div className="col-sm-12 mb-3">
                  <div className="d-flex align-items-center column-gap-2 checkbox-row">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <h6 className="mb-0">
                      By signing up you agree to our{" "}
                      <Link to="/terms">
                        <strong>Terms and Conditions</strong>
                      </Link>
                    </h6>
                  </div>
                </div>

                {/* Submit */}
                <div className="col-sm-12 d-flex justify-content-center mb-4">
                  <button className="loginbtn" disabled={loading}>
                    {loading ? "Registering..." : "Create Account"}
                  </button>
                </div>

                <div className="col-sm-12">
                  <h6 className="text-center">
                    ALREADY A USER? <Link to="/login">LOGIN</Link>
                  </h6>
                </div>

                {/* Divider */}
                <div className="col-sm-12">
                  <div className="divider-or">
                    <span></span>
                    <p>OR</p>
                    <span></span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="col-sm-12 d-flex justify-content-center">
                  <button type="button" className="whatsapp-btn">
                    <i className="fab fa-whatsapp"></i> Continue With Whats app
                  </button>
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
