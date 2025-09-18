import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

const Card1 = () => {
  const category = [
    {
      categoryClass: "peech",
      categoryh4: "Low Price",
      categoryh2: "Stylish clothes for women.",
      categoryh6: "Upto 50% Off",
    },
    {
      categoryClass: "blue",
      categoryh4: "Beyoung Presents",
      categoryh2: "Clothes for men, casual and formal.",
      categoryh6: "Upto 50% Off",
    },
  ];

  return (
    <>
      {category.map((category, index) => (
        <div className={`category-cards ${category.categoryClass}`} key={index}>
          <div className="category-card1">
            <h4 className="mb-2">{category.categoryh4}</h4>
            <h2 className="mb-2">{category.categoryh2}</h2>
            <h6 className="mb-2">{category.categoryh6}</h6>
            <Link>
              <button className="explorebtn">Explore Items</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card1;
