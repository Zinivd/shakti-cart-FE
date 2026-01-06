import React, { useEffect, useState } from "react";
import { getProductReviews } from "../../../service/api";
import "./Reviews.css";

const Comments = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    fetchComments();
  }, [productId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await getProductReviews(productId);

      if (response?.data?.success && response.data.data) {
        setComments([response.data.data]); // API returns single object
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Review fetch error", error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (comments.length === 0) {
    return <p className="text-muted">No reviews found for this product.</p>;
  }

  return (
    <div className="comments">
      {comments.map((item, index) => (
        <div className="comments-div mb-3" key={index}>
          <h6 className={`comments-descp ${expandedIndexes[index] ? "expanded" : ""}`}>
            {item.description}
          </h6>

          {item.description?.length > 80 && (
            <button className="toggle-btn" onClick={() => toggleExpand(index)}>
              {expandedIndexes[index] ? "Show less" : "Read more"}
            </button>
          )}

          <div className="star-div d-flex align-items-center column-gap-3 mb-3">
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className={`bx ${i < item.rating ? "bxs-star text-warning" : "bx-star"}`}
                ></i>
              ))}
            </div>
            <span>{item.rating}</span>
          </div>

          <div className="comments-user">
            <h6>{item.user_id || "Anonymous"}</h6>
            <h5>|</h5>
            <h6>{new Date(item.created_at).toDateString()}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
