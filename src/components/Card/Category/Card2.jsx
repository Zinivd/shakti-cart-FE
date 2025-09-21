import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

const Card2 = ({ categoryData }) => {
  return (
    <>
      {categoryData.map((category, index) => (
        <div
          className={`category-card-30 mb-3 ${category.categoryClass}`}
          key={index}
        >
          <div className="category-div-30">
            <div className={`category-ct-30 ${category.categoryMargin}`}>
              <h2 className="mb-2" style={{ textAlign: category.categoryText }}>
                {category.categoryh2}
              </h2>
              <h6 className="mb-2" style={{ textAlign: category.categoryText }}>
                {category.categoryh6}
              </h6>
              <h4 className="mb-2" style={{ textAlign: category.categoryText }}>
                {category.categoryh4}
              </h4>
              <Link>
                <button
                  className={`shopnowbtn d-flex ${category.categoryMargin}`}
                >
                  Explore Items
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card2;
