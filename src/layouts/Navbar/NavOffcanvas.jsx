import React from "react";
import { NavLink } from "react-router-dom";
import { Logo_Main } from "../../../public/Assets";
import "./NavOffcanvas.css";

const NavOffcanvas = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="navOffcanvas">
      <div className="offcanvas-header py-2 ps-3 pe-4">
        <a href="/">
          <img src={Logo_Main} height="40px" alt="Logo" />
        </a>
        <button
          type="button"
          className="btn-close bg-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body py-2 px-4">
        <ul className="list-unstyled mt-2">

          {/* COMMON LINKS */}
          <li className="nav-item" data-bs-dismiss="offcanvas">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>

          <li className="nav-item" data-bs-dismiss="offcanvas">
            <NavLink className="nav-link" to="/categories">
              All Categories
            </NavLink>
          </li>
            <li className="nav-item" id="outfit" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="outfit">
                Outfit Chemistry
              </NavLink>
            </li>
            <li className="nav-item" id="studio" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="studio">
                Studio
              </NavLink>
            </li>
            <li className="nav-item" id="blog" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="blog">
                Blog
              </NavLink>
            </li>
            {/* <li className="nav-item" id="about" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item" id="contact" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="contact">
                Contact Us
              </NavLink>
            </li> */}
          
          <hr className="w-50 mx-auto my-5" />

          {/* AUTHENTICATION BASED UI */}
          {isAuthenticated === "true" ? (
            <li
              className="nav-item mt-4"
              data-bs-dismiss="offcanvas"
            >
              <button
                className="darkbtn w-100 rounded-1 text-uppercase"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Sign Out
              </button>
            </li>
          ) : (
            /* 🟢 SIGN IN & SIGN UP */
            <li className="nav-item d-flex align-items-center justify-content-between column-gap-2 mt-4">
              <NavLink className="nav-link w-50" to="/login">
                <button
                  className="homebannerbtn w-100 rounded-1 text-dark text-uppercase"
                  data-bs-dismiss="offcanvas"
                >
                  Sign In
                </button>
              </NavLink>

              <NavLink className="nav-link w-50" to="/register">
                <button
                  className="darkbtn w-100 rounded-1 text-uppercase"
                  data-bs-dismiss="offcanvas"
                >
                  Sign Up
                </button>
              </NavLink>
            </li>
          )}

        </ul>
      </div>
    </div>
  );
};

export default NavOffcanvas;
