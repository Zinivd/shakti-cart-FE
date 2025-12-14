import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PortalBG } from "../../../public/Assets";
import { loginUser } from "../../service/api";
import "./Portal.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      setLoading(true);
      const result = await loginUser(email, password);
      debugger
      localStorage.setItem("access-token", result?.data?.token);
      localStorage.setItem("user", JSON.stringify(result?.data?.user));
      navigate("/profile");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portal-main my-4">
      <div className="portal-div">
        <div className="portal-left">
          <img src={PortalBG} width="100%" height="500px" alt="portal-bg" />
        </div>

        <div className="portal-right mt-3">
          <div className="body-head mb-4">
            <div>
              <h4 className="mb-2">
                <span>|</span> Welcome Back
              </h4>
              <h6 className="mb-0">Login to continue</h6>
            </div>
          </div>

          <div className="portal-form">
            <form onSubmit={handleLogin}>
              <div className="row">

                {/* Email */}
                <div className="col-sm-12 mb-4">
                  <label>Email Address <span>*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>

                {/* Password */}
                <div className="col-sm-12 mb-4">
                  <label>Password <span>*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Remember + Forgot */}
                <div className="col-sm-12 mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center column-gap-2">
                      <input type="checkbox" />
                      <h6 className="mb-0">Remember Me</h6>
                    </div>
                    <Link to="/forgot">
                      <h6 className="mb-0">Forgot Password?</h6>
                    </Link>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="col-sm-12 mb-3">
                    <p className="text-danger">{error}</p>
                  </div>
                )}

                {/* Login Button */}
                <div className="col-sm-12 mb-4">
                  <button
                    type="submit"
                    className="loginbtn"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                {/* Register */}
                <div className="col-sm-12">
                  <h6>
                    NEW USER ? <Link to="/register">REGISTER</Link>
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

export default Login;
