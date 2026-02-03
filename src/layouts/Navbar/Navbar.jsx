import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo_Main } from "../../../public/Assets";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import "./Navbar.css";
const Navbar = () => {
  // Toggler Icon Animation
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setTimeout(() => {
      setIsExpanded((prev) => !prev);
    }, 300);
  };
   

useEffect(() => {
  const hash = window.location.hash;

  if (hash) {
    const tabButton = document.querySelector(
      `[data-bs-target="${hash}"]`
    );

    if (tabButton) {
      tabButton.click(); // Activate Bootstrap tab
    }
  }
}, []);

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
          <div className="responsive-div w-100">
            <div className="responsive-button">
              <div className="logo-div d-flex align-items-center column-gap-2">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#navOffcanvas"
                >
                  <i className="bx bx-menu"></i>
                </button>
                <a href="/">
                  <img src={Logo_Main} height="50px" title="" alt="" />
                </a>
              </div>
              <div className="icons-div d-sm-flex d-lg-none align-items-center">
                <NavLink to="/profile#wishlist" className="me-3">
                  <i className="bx bx-heart"></i>
                </NavLink>
                <NavLink to="/cart">
                  <i className="bx bx-cart"></i>
                </NavLink>
              </div>
            </div>
            <div className="my-0">
              {/* <SearchBar /> */}
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
            <ul className="navbar-nav col-lg-3 align-items-lg-center justify-content-lg-evenly navbarNav">
              {/* <li className="nav-item" id="home">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item" id="categories">
                <NavLink className="nav-link" to="/categories">
                  All Categories
                </NavLink>
              </li>
              <li className="nav-item" id="blog">
                <NavLink className="nav-link" to="blog">
                  Blog
                </NavLink>
              </li>
              <li className="nav-item" id="about">
                <NavLink className="nav-link" to="about">
                  About Us
                </NavLink>
              </li> */}
              {/* <li className="nav-item" id="contact">
                <NavLink className="nav-link" to="contact">
                  Contact Us
                </NavLink>
              </li> */}
            </ul>

            {/* Search Div */}
            <ul className="navbar-nav col-lg-4 mb-0">
              {/* <li className="search-bar">
                <i className="bx bx-search text-center"></i>
                <input
                  type="text"
                  className="form-control border-0"
                  name="search"
                  id="search"
                  placeholder="Search for products..."
                />
              </li> */}
            </ul>

            {/* Icon Div */}
            <ul className="navbar-nav col-lg-3 d-flex align-items-center flex-row icon-end">
              <li className="nav-item" id="profile">
                <NavLink
                  className="nav-link d-flex align-items-center justify-content-center flex-column"
                  to="/profile"
                >
                  <i className="bx bx-user mb-1"></i>
                  Profile
                </NavLink>
              </li>
              <li className="nav-item" id="/">
             <NavLink
  className="nav-link d-flex align-items-center justify-content-center flex-column"
  to="/profile#wishlist"
>
  <i className="bx bx-heart mb-1"></i>
  Wishlist
</NavLink>
              </li>
              <li className="nav-item" id="cart">
                <NavLink
                  className="nav-link d-flex align-items-center justify-content-center flex-column"
                  to="/cart"
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
