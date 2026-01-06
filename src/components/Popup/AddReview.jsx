import React, { useState } from "react";
import { addProductReview } from "../../service/api";
import { toast } from "react-toastify";

const AddReview = ({ productId, onSuccess }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !comment) {
      toast.warning("Rating & Comment required");
      return;
    }

    setLoading(true);

    const payload = {
      product_id: productId,
      title: "User Review",
      description: comment,
      rating: Number(rating),
    };

    const response = await addProductReview(payload);

    if (response?.data?.success) {
      toast.success("Review added successfully");
      setRating("");
      setComment("");
      onSuccess(); // refresh comments
      document.querySelector("#addReview .btn-close").click();
    }

    setLoading(false);
  };

  return (
    <div className="modal fade" id="addReview" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Add Review</h4>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <label>Rating *</label>
            <select
              className="form-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Select Rating</option>
              {[1,2,3,4,5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <label className="mt-3">Comment *</label>
            <textarea
              className="form-control"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button className="formbtn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
