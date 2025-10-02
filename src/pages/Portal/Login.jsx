import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PortalBG } from "../../../public/Assets";
import "./Portal.css";

const Login = () => {
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
            {/* <Link>
              <h6>Back</h6>
            </Link> */}
          </div>

          <div className="portal-form">
            <form action="">
              <div className="row">
                <div className="col-sm-12 mb-4">
                  <label htmlFor="email">
                    Email Address <span>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your Email Address"
                    autoFocus
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
                        <h6 className="mb-0">Remember Me</h6>
                      </label>
                    </div>
                    <Link to="/forgot">
                      <h6 className="mb-0">Forgot Password ?</h6>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-12 mb-4">
                  <Link to="/profile">
                    <button className="loginbtn">Login</button>
                  </Link>
                </div>
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
