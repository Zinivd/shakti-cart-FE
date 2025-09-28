import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PortalBG } from "../../../public/Assets";
import "./Portal.css";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  // Phone Validation
  const phoneValidate = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setPhone(value);
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
            {/* <Link>
              <h6>Back</h6>
            </Link> */}
          </div>

          <div className="portal-form">
            <form action="">
              <div className="row">
                <div className="col-sm-12 mb-4">
                  <label htmlFor="name">
                    Full Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Full Name"
                    autoFocus
                  />
                </div>
                <div className="col-sm-12 mb-4">
                  <label htmlFor="name">
                    Contact Number <span>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter your Contact Number"
                    value={phone}
                    onChange={phoneValidate}
                  />
                </div>
                <div className="col-sm-12 mb-4">
                  <label htmlFor="email">
                    Email Address <span>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your Email Address"
                  />
                </div>
                <div className="col-sm-12 mb-4">
                  <label htmlFor="password">
                    Password <span>*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your Password"
                  />
                </div>
                <div className="col-sm-12 mb-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center column-gap-2">
                      <input type="checkbox" name="remember" id="remember" />
                      <label htmlFor="remember" className="mb-0 text-muted">
                        <h6 className="mb-0">
                          By signing up you agree to our{" "}
                          <Link className="text-dark fw-bold">
                            terms and conditions
                          </Link>
                        </h6>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 mb-4">
                  <button className="loginbtn">Create Account</button>
                </div>
                <div className="col-sm-12">
                  <h6>
                    ALREADY AN USER ? <Link to="/login">LOGIN</Link>
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
