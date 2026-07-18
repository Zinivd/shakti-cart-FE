import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./Forgot.css";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code) {
      toast.error("Verification code is required");
      return;
    }

    setApiError("");
    setLoading(true);

    // Simulate request
    setTimeout(() => {
      setLoading(false);
      toast.success("Code verified");
      navigate("/create-password", { state: { email, code } });
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
                  <span className="pe-2">|</span> Verification{" "}
                  <span className="ps-2">|</span>
                </h4>
                <h6 className="mb-0 text-sub">Verify your code</h6>
              </div>
            </div>
            <Link to="/login" className="back-link">
              Back
            </Link>
          </div>

          <div className="portal-form mt-4">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Code */}
                <div className="col-sm-12 mb-2">
                  <label>Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
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

                {/* Verify Button */}
                <div className="col-sm-12 d-flex justify-content-center mt-4">
                  <button type="submit" className="loginbtn" disabled={loading}>
                    {loading ? "Verifying..." : "Verify Code"}
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

export default Verification;