import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tabs from "../../components/Tabs/Tabs";
import "./Profile.css";
import Info from "./Info";
import Address from "./Address";
import Wishlist from "./Wishlist.jsx";
import MyOrder from "./MyOrder.jsx";

// Maps the Bootstrap tab-pane id to what the breadcrumb should show
const TAB_LABELS = {
  acctinfo: "Account Info",
  wishlist: "Wishlist",
  myorder: "My Order",
  address: "Address",
};

const Profile = () => {
  const navigate = useNavigate();
  const [activeLabel, setActiveLabel] = useState("Info");

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const user = localStorage.getItem("user");


    if (!token || !user) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Keep the breadcrumb's last crumb in sync with whichever tab is active
  useEffect(() => {
    const tabTriggers = document.querySelectorAll('[data-bs-toggle="tab"]');

    const handleShown = (e) => {
      const targetId =
        e.target.getAttribute("href")?.replace("#", "") ||
        e.target.getAttribute("data-bs-target")?.replace("#", "");
      if (targetId && TAB_LABELS[targetId]) {
        setActiveLabel(TAB_LABELS[targetId]);
      }
    };

    tabTriggers.forEach((el) =>
      el.addEventListener("shown.bs.tab", handleShown),
    );

    return () => {
      tabTriggers.forEach((el) =>
        el.removeEventListener("shown.bs.tab", handleShown),
      );
    };
  }, []);

  return (
    <div className="main">
      <div className="main-header">
        <div className="body-head d-block">
          <h6 className="d-flex column-gap-2 flex-wrap mb-3">
            <Link to="/">
              Home
              <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/profile" className="active">
              Profile
            </Link>
            <span className="active">
              <i className="fa fa-angle-right pe-1"></i>
              {activeLabel}
            </span>
          </h6>
        </div>

        <div className="profile">
          <div className="profile-left">
            <Tabs />
          </div>

          <div className="profile-right">
            <div className="tab-content" id="profileTabContent">
              <div
                className="tab-pane fade show active"
                id="acctinfo"
                role="tabpanel"
              >
                <Info />
              </div>

              <div className="tab-pane fade" id="wishlist" role="tabpanel">
                <Wishlist />
              </div>

              <div className="tab-pane fade" id="myorder" role="tabpanel">
                <MyOrder />
              </div>

              <div className="tab-pane fade" id="address" role="tabpanel">
                <Address />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;