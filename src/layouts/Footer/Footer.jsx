import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo_Main } from "../../../public/Assets";
import "./Footer.css";

const Footer = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const toggleCollapse = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <div className="footercol">
            <div className="footer-div">
              {/* Footer Logo / SM Links */}
              <div className="footer-item mb-2">
                <div className="d-flex justify-content-start align-items-start flex-column">
                  <div className="col footerlogo bg-white p-2 rounded-3">
                    <img
                      src={Logo_Main}
                      className="d-flex mx-auto"
                      height="50px"
                      alt=""
                    />
                  </div>
                  <br />

                  {/* Social Media */}
                  <ul className="nav flex-row column-gap-2" id="brands">
                    <li className="nav-item mb-3">
                      <a
                        href=""
                        target="_blank"
                        id="facebook"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        data-bs-title="Facebook"
                      >
                        <div className="brand-icons">
                          <i className="fa-brands fa-facebook-f"></i>
                        </div>
                      </a>
                    </li>
                    <li className="nav-item mb-3">
                      <a
                        href=""
                        target="_blank"
                        id="instagram"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        data-bs-title="Instagram"
                      >
                        <div className="brand-icons">
                          <i className="fa-brands fa-instagram"></i>
                        </div>
                      </a>
                    </li>
                    <li className="nav-item mb-3">
                      <a
                        href=""
                        target="_blank"
                        id="linkedin"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        data-bs-title="LinkedIn"
                      >
                        <div className="brand-icons">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </div>
                      </a>
                    </li>
                    <li className="nav-item mb-3">
                      <a
                        href=""
                        target="_blank"
                        id="twitter"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        data-bs-title="Twitter"
                      >
                        <div className="brand-icons">
                          <i className="fa-brands fa-x-twitter"></i>
                        </div>
                      </a>
                    </li>
                    <li className="nav-item mb-3">
                      <a
                        href=""
                        target="_blank"
                        id="whatsapp"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        data-bs-title="WhatsApp"
                      >
                        <div className="brand-icons">
                          <i className="fa-brands fa-whatsapp"></i>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer Links */}
              <div className="footer-item mb-2">
                <h5 onClick={() => toggleCollapse("help")}>
                  Need Help
                  <i
                    className={`bx ${
                      openMenu === "help" ? "bx-plus" : "bx-minus"
                    }`}
                  ></i>
                </h5>
                <br />
                <ul
                  className={`nav flex-column collapse-wrapper ${
                    openMenu === "help" ? "hide" : ""
                  }`}
                >
                  <li className="nav-item mb-2">
                    <NavLink to="contact" className="p-0">
                      Contact Us
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="tracking" className="p-0">
                      Track Order
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="faq" className="p-0">
                      FAQ's
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="career" className="p-0">
                      Career
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="sitemap" className="p-0">
                      Sitemap
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="footer-item mb-2">
                <h5 onClick={() => toggleCollapse("company")}>
                  Company
                  <i
                    className={`bx ${
                      openMenu === "company" ? "bx-plus" : "bx-minus"
                    }`}
                  ></i>
                </h5>
                <br />
                <ul
                  className={`nav flex-column collapse-wrapper ${
                    openMenu === "company" ? "hide" : ""
                  }`}
                >
                  <li className="nav-item mb-2">
                    <NavLink to="about" className="p-0">
                      About Us
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="blog" className="p-0">
                      Blog
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="collaboration" className="p-0">
                      Collaboration
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="media" className="p-0">
                      Media
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="footer-item mb-2">
                <h5 onClick={() => toggleCollapse("policy")}>
                  Policies
                  <i
                    className={`bx ${
                      openMenu === "policy" ? "bx-plus" : "bx-minus"
                    }`}
                  ></i>
                </h5>
                <br />
                <ul
                  className={`nav flex-column collapse-wrapper ${
                    openMenu === "policy" ? "hide" : ""
                  }`}
                >
                  <li className="nav-item mb-2">
                    <NavLink to="/terms-and-condition" className="p-0">
                      Terms & Conditions
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/privacy-policy" className="p-0">
                      Privacy Policy
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/refund-policy" className="p-0">
                      Returns & Refund Policy
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/shipping-policy" className="p-0">
                      Shipping Policy
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="footer-item mb-2">
                <h5 onClick={() => toggleCollapse("location")}>
                  Location
                  <i
                    className={`bx ${
                      openMenu === "location" ? "bx-plus" : "bx-minus"
                    }`}
                  ></i>
                </h5>
                <br />
                <ul
                  className={`nav flex-column collapse-wrapper ${
                    openMenu === "location" ? "hide" : ""
                  }`}
                >
                  <li className="nav-item mb-2">
                    <a href="mailto: support@sakthicart.in" className="p-0">
                      support@sakthicart.in
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="location" className="p-0">
                      (NH 47- Near Hotel) Erode, India- 000 002.
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <hr />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <h6 className="text-center">
                Copyright &copy; 2025 Sakthi Cart Pvt Ltd. All rights reserved
              </h6>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
