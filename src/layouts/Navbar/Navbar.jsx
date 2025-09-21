import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Logo_Main } from "../../../public/Assets";
import "./Navbar.css";

const Navbar = () => {
  // Toggler Icon Animation
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setTimeout(() => {
      setIsExpanded((prev) => !prev);
    }, 300);
  };

  // Scroll effect
  // const [isScrolled, setIsScrolled] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <>
      <nav className={`navbar navbar-expand-lg ${isExpanded ? "solid" : ""}`}>
        <div className="container-fluid">
          {/* Resposnive Navbar */}
          <div className="responsive-button">
            <div className="logo-div">
              <a href="">
                <img src={Logo_Main} height="50px" title="" alt="" />
              </a>
            </div>
            <div>
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarcontent"
                aria-controls="navbarcontent"
                aria-label="Toggle navigation"
                onClick={handleToggle}
                aria-expanded={isExpanded ? "true" : "false"}
              >
                <i
                  className={`bx ${
                    isExpanded ? "bx-x" : "bx-menu-alt-right"
                  } toggler-icon`}
                ></i>
              </button>
            </div>
          </div>

          {/* Web Navbar */}
          <div
            className="navbar-collapse d-lg-flex justify-content-evenly align-items-center collapse"
            id="navbarcontent"
          >
            {/* Logo */}
            <div className="navbar-brand col-lg-2 me-0">
              <a href="/">
                <img src={Logo_Main} height="50px" title="" alt="" />
              </a>
            </div>

            {/* Header Content */}
            <ul className="navbar-nav col-lg-5 align-items-lg-center justify-content-lg-evenly navbarNav">
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
            </ul>

            {/* Search Div */}
            <ul className="navbar-nav col-lg-3 mb-0">
              <li className="search-bar">
                <i className="bx bx-search text-center"></i>
                <input
                  type="text"
                  className="form-control border-0"
                  name="search"
                  id="search"
                  placeholder="Search for products..."
                />
              </li>
            </ul>

            {/* Icon Div */}
            <ul className="navbar-nav col-lg-2 d-flex align-items-center flex-row icon-end">
              <li className="nav-item" id="profile">
                <NavLink
                  className="nav-link d-flex align-items-center justify-content-center flex-column"
                  to="profile"
                >
                  <i className="bx bx-user mb-1"></i>
                  Profile
                </NavLink>
              </li>
              <li className="nav-item" id="wishlist">
                <NavLink
                  className="nav-link d-flex align-items-center justify-content-center flex-column"
                  to="wishlist"
                >
                  <i className="bx bx-heart mb-1"></i>
                  Wishlist
                </NavLink>
              </li>
              <li className="nav-item" id="cart">
                <NavLink
                  className="nav-link d-flex align-items-center justify-content-center flex-column"
                  to="cart"
                >
                  <i className="bx bx-cart mb-1"></i>
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
