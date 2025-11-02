import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Logo_Main } from "../../../public/Assets";
import "./NavOffcanvas.css";

const NavOffcanvas = () => {
  return (
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="navOffcanvas">
      <div className="offcanvas-header py-2 ps-3 pe-4">
        <a href="/">
          <img src={Logo_Main} height="50px" title="" alt="" />
        </a>
        <button
          type="button"
          className="btn-close bg-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body py-2 px-4">
        <div className="flex-shrink-0">
          <ul className="list-unstyled mt-2">
            <li className="nav-item" id="home">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item" id="categories">
              <NavLink className="nav-link" to="/categories">
                All Categories
              </NavLink>
            </li>
            <li className="nav-item" id="outfit">
              <NavLink className="nav-link" to="outfit">
                Outfit Chemistry
              </NavLink>
            </li>
            <li className="nav-item" id="studio">
              <NavLink className="nav-link" to="studio">
                Studio
              </NavLink>
            </li>
            <li className="nav-item" id="about">
              <NavLink className="nav-link" to="about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item" id="blog">
              <NavLink className="nav-link" to="blog">
                Blog
              </NavLink>
            </li>
            <li className="nav-item" id="contact">
              <NavLink className="nav-link" to="contact">
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item" id="logout">
              <NavLink className="nav-link" to="logout">
                Logout
              </NavLink>
            </li>
            <hr className="w-50 mx-auto" />
            <li className="nav-item d-flex align-items-center justify-content-between mt-5">
              <NavLink className="nav-link" to="/login">
                <button className="homebannerbtn rounded-1 text-dark text-uppercase">
                  Sign In
                </button>
              </NavLink>
              <NavLink className="nav-link" to="/register">
                <button className="darkbtn rounded-1 text-uppercase">
                  Sign Up
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavOffcanvas;
