import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Forgot.css";

const Create = () => {
  const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email || "";
//   const code = location.state?.code || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Password and Confirm Password are required");
      return;
    }

    if (password !== confirmPassword) {
      setApiError("New password and conform password do not match");
      return;
    }

    setApiError("");
    setLoading(true);

    // Simulate request
    setTimeout(() => {
      setLoading(false);
      toast.success("Password reset successful!");
      navigate("/login");
    }, 800);
  };

  return (
    <div className="portal-main my-4">
      <div className="portal-div">
        {/* Left image side
        <div className="portal-left">
          <div className="portal-img-placeholder">Img</div>
        </div>
        */}

        <div className="portal-right mt-3">
          <div className="portal-header-row">
            <div className="body-head d-block mb-2">
              <div>
                <h4 className="mb-2">
                  <span className="pe-2">|</span> Create New Password{" "}
                  <span className="ps-2">|</span>
                </h4>
                <h6 className="mb-0">
                  Your new password must be different from previous used
                  passwords.
                </h6>
              </div>
            </div>
            <Link to="/login" className="back-link">
              Back
            </Link>
          </div>

          <div className="portal-form mt-4">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Password */}
                <div className="col-sm-12 mb-4">
                  <label>Password</label>
                  <div className="input-double-flex">
                    <input
                      type={showPass ? "text" : "password"}
                      className="form-control border-0 border-end rounded-end-0"
                      placeholder="**********"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (apiError) setApiError("");
                      }}
                      autoFocus
                    />
                    <label className="mb-0 text-center">
                      <i
                        className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"}`}
                        onClick={() => setShowPass(!showPass)}
                      ></i>
                    </label>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="col-sm-12 mb-2">
                  <label>Conform Password</label>
                  <div className="input-double-flex">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      className="form-control border-0 border-end rounded-end-0"
                      placeholder="**********"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (apiError) setApiError("");
                      }}
                    />
                    <label className="mb-0 text-center">
                      <i
                        className={`fas ${showConfirmPass ? "fa-eye-slash" : "fa-eye"}`}
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                      ></i>
                    </label>
                  </div>
                  {apiError && (
                    <small className="text-danger d-block mt-2">
                      {apiError}
                    </small>
                  )}
                </div>

                {/* Reset Button */}
                <div className="col-sm-12 d-flex justify-content-center mt-4">
                  <button type="submit" className="loginbtn" disabled={loading}>
                    {loading ? "Resetting..." : "Reset password"}
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

export default Create;