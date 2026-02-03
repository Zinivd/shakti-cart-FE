import React from "react";
import "./ResponsiveNav.css";
import { NavLink } from "react-router-dom";

const ResponsiveNav = () => {
  return (
    <div className="responsiveNavbar">
      <div className="responsiveNav-container">
        <NavLink to="/" className="respnav-item">
          <button className="respnavbtn">
            <i className="bx bx-home icon"></i>
            <span>Home</span>
          </button>
        </NavLink>
        <NavLink to="/products" className="respnav-item">
          <button className="respnavbtn">
            <i className="bx bx-dashboard icon"></i>
            <span>Products</span>
          </button>
        </NavLink>
        {/* <NavLink to="/cart" className="respnav-item">
          <button className="respnavbtn">
            <i className="fi fi-rr-bell icon"></i>
            <span>Notification</span>
          </button>
        </NavLink> */}
        <NavLink to="/profile" className="respnav-item">
          <button className="respnavbtn">
            <i className="bx bx-user icon"></i>
            <span>Profile</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ResponsiveNav;
