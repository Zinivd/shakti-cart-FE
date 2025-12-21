import React from "react";

const EditAddress = () => {
  return (
    <div
      className="modal fade"
      id="editAddress"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="editAddress"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="editAddress">
              Edit Address
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body form row">
            <div className="col-sm-12 col-md-6 col-xl-6 mb-2">
              <label htmlFor="edit_f_name">
                First Name <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="edit_f_name"
                placeholder="First Name"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-2">
              <label htmlFor="edit_l_name">
                Last Name <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="edit_l_name"
                placeholder="Last Name"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-2">
              <label htmlFor="edit_country">
                Country / Region <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="edit_country"
                placeholder="Country / Region"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-2">
              <label htmlFor="edit_company">
                Company Name <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="edit_company"
                placeholder="Company Name"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-2">
              <label htmlFor="edit_street_address">
                Street Address <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="edit_street_address"
                placeholder="Street Address"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-6 mb-2">
              <label htmlFor="edit_landmark">
                Landmark <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="edit_landmark"
                placeholder="Landmark"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4 mb-2">
              <label htmlFor="edit_city">
                City <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="edit_city"
                placeholder="City"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4 mb-2">
              <label htmlFor="edit_state">
                State <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="edit_state"
                placeholder="State"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4 mb-2">
              <label htmlFor="edit_pincode">
                Pincode <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="edit_pincode"
                placeholder="Pincode"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4 mb-2">
              <label htmlFor="edit_phone">
                Phone <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="edit_phone"
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center align-items-center my-2">
            <button type="button" className="formbtn">
              Update Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
