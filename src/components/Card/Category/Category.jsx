import React from "react";
import CategoryCard from "./CategoryCard.jsx";
import "./Category.css";

const Category = ({ categories }) => {
  if (!Array.isArray(categories)) return null; // 🔥 safety

  return (
    <div className="category">
      <div className="category-list">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.category_id}
            categoryImg={cat.image}
            categoryHead="Stylish Clothes for"
            categoryMain={cat.category_name}
            categoryOffer="Upto 50% Off"
          />
        ))}
      </div>
    </div>
  );
};

export default Category;