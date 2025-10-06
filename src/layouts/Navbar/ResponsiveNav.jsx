import React from "react";
import "./ResponsiveNav.css";
import { NavLink } from "react-router-dom";

const ResponsiveNav = () => {
  return (
    <div className="responsiveNavbar">
      <div className="responsiveNav-container">
        <NavLink to="/" className="respnav-item">
          <button className="respnavbtn">
            <i class="fi fi-rr-home icon"></i>
            <span>Home</span>
          </button>
        </NavLink>
        <NavLink to="/categories" className="respnav-item">
          <button className="respnavbtn">
            <i class="fi fi-rr-apps-add icon"></i>
            <span>Categories</span>
          </button>
        </NavLink>
        <NavLink to="/cart" className="respnav-item">
          <button className="respnavbtn">
            <i class="fi fi-rr-bell icon"></i>
            <span>Notification</span>
          </button>
        </NavLink>
        <NavLink to="/profile" className="respnav-item">
          <button className="respnavbtn">
            <i class="fi fi-rr-user icon"></i>
            <span>Profile</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ResponsiveNav;
