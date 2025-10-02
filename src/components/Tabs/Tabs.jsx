import React from "react";
import { Avatar } from "../../../public/Assets";
import "./Tabs.css";

const Tabs = () => {
  return (
    <div className="tabs-main">
      <div className="tabs-div">
        <div className="tabs-header">
          <div className="tabs-img">
            <img src={Avatar} className="avatar" alt="" />
          </div>
          <div className="tabs-head">
            <h5 className="mb-3">Sheik Shah Shuaib K S</h5>
            <h6 className="mb-0">sheik4748@gmail.com</h6>
          </div>
        </div>

        <ul
          className="nav nav-tabs mt-4 border-0"
          id="profileTab"
          role="tablist"
        >
          <li className="nav-item w-100 mb-2" role="presentation">
            <button
              className="tabsbtn w-100 active"
              data-bs-toggle="tab"
              type="button"
              data-bs-target="#acctinfo"
            >
              <span>Account Info</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </li>
          <li className="nav-item w-100 mb-2" role="presentation">
            <button
              className="tabsbtn w-100"
              data-bs-toggle="tab"
              type="button"
              data-bs-target="#myorder"
            >
              <span>My Orders</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </li>
          <li className="nav-item w-100 mb-2" role="presentation">
            <button
              className="tabsbtn w-100"
              data-bs-toggle="tab"
              type="button"
              data-bs-target="#wishlist"
            >
              <span>Wishlist</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </li>
          <li className="nav-item w-100 mb-2" role="presentation">
            <button
              className="tabsbtn w-100"
              role="tab"
              data-bs-toggle="tab"
              type="button"
              data-bs-target="#address"
            >
              <span>My Address</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </li>
          <li className="nav-item w-100" role="presentation">
            <button
              className="tabsbtn w-100"
              role="tab"
              data-bs-toggle="tab"
              type="button"
              data-bs-target="#signout"
            >
              <span>Sign Out</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
