import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Forgot.css";

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    setApiError("");
    setLoading(true);

    // Simulate request
    setTimeout(() => {
      setLoading(false);
      toast.success("Verification code sent to your email");
      navigate("/verification", { state: { email } });
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
                  <span className="pe-2">|</span> Reset Your Password{" "}
                  <span className="ps-2">|</span>
                </h4>
                <h6 className="mb-0">
                  Enter your email and we'll send you a link to reset your
                  password.
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
                {/* Email */}
                <div className="col-sm-12 mb-2">
                  <label>Email Address*</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (apiError) setApiError("");
                    }}
                    autoFocus
                  />
                  {apiError && (
                    <small className="text-danger d-block mt-2">
                      {apiError}
                    </small>
                  )}
                </div>

                {/* Send Button */}
                <div className="col-sm-12 d-flex justify-content-center mt-4">
                  <button type="submit" className="loginbtn" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
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

export default Forgot;