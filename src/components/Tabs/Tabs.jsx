import React, { useState,useEffect } from "react";
import { Avatar } from "../../../public/Assets";
import "./Tabs.css";
import { logoutUser } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { Tab } from "bootstrap";
const Tabs = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const userName = user?.name || "Guest User";
  const userEmail = user?.email || "guest@email.com";

  const [showLogoutModal, setShowLogoutModal] = useState(false);

useEffect(() => {
  const hash = window.location.hash;
  if (!hash) return;

  const tabButton = document.querySelector(
    `button[data-bs-target="${hash}"]`
  );

  if (tabButton) {
    const tab = new Tab(tabButton);
    tab.show();
  }
}, []);

  const handleConfirmLogout = async () => {
    try {
      await logoutUser(userEmail);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.clear();
      navigate("/");
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="tabs-main">
      <div className="tabs-div">
        <div className="tabs-header">
          <div className="tabs-img">
            <img src={Avatar} className="avatar" alt="" />
          </div>
          <div className="tabs-head">
            <h5 className="mb-3">{userName}</h5>
            <h6 className="mb-0">{userEmail}</h6>
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

          <li className="nav-item w-100">
            <button
              className="tabsbtn w-100"
              type="button"
              onClick={() => setShowLogoutModal(true)}
            >
              <span>Sign Out</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </li>
        </ul>
      </div>

      {showLogoutModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Confirm Sign Out</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancelLogout}
                ></button>
              </div>

              <div className="modal-body">
                <p>Are you sure you want to sign out?</p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelLogout}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmLogout}
                >
                  Yes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
