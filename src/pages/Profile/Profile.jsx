import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tabs from "../../components/Tabs/Tabs";
import "./Profile.css";
import Info from "./Info";
import Address from "./Address";
import Wishlist from "./Wishlist.jsx";
import MyOrder from "./MyOrder.jsx";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const user = localStorage.getItem("user");


    if (!token || !user) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

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
