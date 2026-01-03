import React, { useState } from "react";

const AddReview = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div
      className="modal fade"
      id="addReview"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="addReview"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="addReview">
              Add Review
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body form row">
            <div className="col-sm-12 col-md-12 mb-3">
              <label htmlFor="add_rating">
                Rating <span>*</span>
              </label>
              <select className="form-select" id="add_rating">
                <option value="" disabled selected>
                  Select Rating
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col-sm-12">
              <label htmlFor="add_comment">
                Comments <span>*</span>
              </label>
              <textarea
                rows="3"
                className="form-control"
                id="add_comment"
                placeholder="Add Comment"
              />
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center align-items-center my-2">
            <button type="button" className="formbtn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
