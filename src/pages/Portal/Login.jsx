import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/api";
import "./Portal.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      setLoading(true);
      const result = await loginUser(email, password);

      if (!result?.data?.token || !result?.data?.user) {
        throw new Error("Invalid Credentials!");
      }

      localStorage.setItem("access-token", result?.data?.token);
      localStorage.setItem("user", JSON.stringify(result?.data?.user));
      localStorage.setItem("isAuthenticated", "true");
      navigate("/profile");
    } catch (err) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      toast.error(err.message || "Invalid Credentials!");
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

        <div className="portal-right mt-3">
          <div className="portal-header-row">
            <div className="body-head d-block mb-4">
              <div>
                <h4 className="mb-2">
                  <span className="pe-2">|</span> Welcome Back{" "}
                  <span className="ps-2">|</span>
                </h4>
                <h6 className="mb-0">Login to continue</h6>
              </div>
            </div>
            <Link to="/" className="back-link">
              Back
            </Link>
          </div>

          <div className="portal-form">
            <form onSubmit={handleLogin}>
              <div className="row">
                {/* Email */}
                <div className="col-sm-12 mb-4">
                  <label>Email Address*</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>

                {/* Password */}
                <div className="col-sm-12 mb-3">
                  <label>Password*</label>
                  <div className="input-double-flex">
                    <input
                      type={showPass ? "text" : "password"}
                      className="form-control border-0 border-end rounded-end-0"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="mb-0 text-center">
                      <i
                        className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"}`}
                        onClick={() => setShowPass(!showPass)}
                      ></i>
                    </label>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="col-sm-12 mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center column-gap-2 checkbox-row">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <h6 className="mb-0">Remember Me</h6>
                    </div>
                    <Link to="/forgot" className="forgot-link">
                      <h6 className="mb-0">Forgot password?</h6>
                    </Link>
                  </div>
                </div>

                {/* Login Button */}
                <div className="col-sm-12 d-flex justify-content-center mb-4">
                  <button type="submit" className="loginbtn" disabled={loading}>
                    {loading ? "Logging In..." : "Login"}
                  </button>
                </div>

                {/* Register */}
                <div className="col-sm-12">
                  <h6 className="text-center">
                    NEW USER? <Link to="/register">SIGN UP</Link>
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

export default Login;