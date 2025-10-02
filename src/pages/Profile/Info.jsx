import React from "react";

const Info = () => {
  return (
    <div className="info mt-2">
      <div className="body-head mb-4">
        <h4>
          <span>|</span> Account Info
        </h4>
      </div>

      <div className="form">
        <form action="">
          <div className="row">
            <div className="col-sm-12 col-md-6 mb-4">
              <label htmlFor="firstname">First Name <span>*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                required
                autoFocus
              />
            </div>
            <div className="col-sm-12 col-md-6 mb-4">
              <label htmlFor="lastname">Last Name <span>*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="col-sm-12 col-md-6 mb-4">
              <label htmlFor="email">Email Address <span>*</span></label>
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="col-sm-12 col-md-6 mb-4">
              <label htmlFor="contact">Contact Number <span>*</span></label>
              <input
                type="number"
                className="form-control"
                placeholder="Contact Number"
                required
              />
            </div>
            <div className="col-sm-12 col-md-6 mb-4">
              <label htmlFor="gender">Gender <span>*</span></label>
              <div className="d-flex align-items-center column-gap-3">
                <div className="d-flex align-items-center column-gap-2">
                  <input type="radio" name="gender" id="male" value="male" />
                  <label htmlFor="male" className="mb-0">
                    Male
                  </label>
                </div>
                <div className="d-flex align-items-center column-gap-2">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                  />
                  <label htmlFor="female" className="mb-0">
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 d-flex align-items-center justify-content-start">
            <button className="darkbtn">Save Account Information</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Info;
