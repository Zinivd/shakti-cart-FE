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
            <li className="nav-item" id="home" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item" id="categories" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="/categories">
                All Categories
              </NavLink>
            </li>
            {/* <li className="nav-item" id="outfit" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="outfit">
                Outfit Chemistry
              </NavLink>
            </li>
            <li className="nav-item" id="studio" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="studio">
                Studio
              </NavLink>
            </li>
            <li className="nav-item" id="about" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item" id="blog" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="blog">
                Blog
              </NavLink>
            </li>
            <li className="nav-item" id="contact" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="contact">
                Contact Us
              </NavLink>
            </li> */}
            <li className="nav-item" id="logout" data-bs-dismiss="offcanvas">
              <NavLink className="nav-link" to="logout">
                Logout
              </NavLink>
            </li>
            <hr className="w-50 mx-auto" />
            <li className="nav-item d-flex align-items-center justify-content-between column-gap-2 mt-5">
              <NavLink className="nav-link w-50" to="/login">
                <button className="homebannerbtn w-100 rounded-1 text-dark text-uppercase" data-bs-dismiss="offcanvas">
                  Sign In
                </button>
              </NavLink>
              <NavLink className="nav-link w-50" to="/register">
                <button className="darkbtn w-100 rounded-1 text-uppercase" data-bs-dismiss="offcanvas">
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
