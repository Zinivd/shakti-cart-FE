import React from "react";
import {
  Women,
  Men,
  Kids,
  Bottom,
  Night,
  Wedding,
} from "../../../../public/Assets.js";
import CategoryCard from "./CategoryCard.jsx";
import "./Category.css";

const Category = (props) => {
  const categoryData = [
    {
      categoryImg: Women,
      categoryHead: "Stylish Clothes for",
      categoryMain: "Women",
      categoryOffer: "Upto 50% Off",
    },
    {
      categoryImg: Men,
      categoryHead: "Stylish Clothes for",
      categoryMain: "Men",
      categoryOffer: "Upto 50% Off",
    },
    {
      categoryImg: Kids,
      categoryHead: "Stylish Clothes for",
      categoryMain: "Kids",
      categoryOffer: "Upto 50% Off",
    },
    {
      categoryImg: Wedding,
      categoryHead: "Stylish Clothes for",
      categoryMain: "Wedding",
      categoryOffer: "Upto 50% Off",
    },
    {
      categoryImg: Night,
      categoryHead: "Stylish Clothes for",
      categoryMain: "Night Suits",
      categoryOffer: "Upto 50% Off",
    },
    {
      categoryImg: Bottom,
      categoryHead: "Stylish Clothes for",
      categoryMain: "Bottom Wear",
      categoryOffer: "Upto 50% Off",
    },
  ];
  return (
    <div className="category">
      <div className="category-list">
        {categoryData.map((item, index) => (
          <CategoryCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Category;
