import React, { useState, useEffect } from "react";
import { Avatar, Logout } from "../../../public/Assets";
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
              <div className="modal-body d-flex align-items-center justify-content-center flex-column gap-3">
                <img src={Logout} height="100px" alt="" />
                <label>Are you sure you want to sign out?</label>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-center gap-2">
                <button
                  type="button"
                  className="darkbtn w-25 px-0"
                  onClick={handleCancelLogout}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="formbtn w-25 px-0"
                  onClick={handleConfirmLogout}
                >
                  Sign Out
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
