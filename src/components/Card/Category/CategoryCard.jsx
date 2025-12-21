import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = (props) => {
  return (
    <Link to={`/products?category=${props.categoryMain}`}>
      <div className="category-card mb-3">
        <div className="category-card-overlay"></div>
        <div className="category-card-img">
          <img
            src={props.categoryImg || "/placeholder.png"}
            width="100%"
            alt={props.categoryMain}
          />
        </div>

        <div className="category-top">
          <h6 className="mb-0">{props.categoryOffer}</h6>
        </div>

        <div className="category-bottom">
          <h6 className="mb-1 text-center">{props.categoryHead}</h6>
          <h3 className="mb-0 text-center">{props.categoryMain}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;