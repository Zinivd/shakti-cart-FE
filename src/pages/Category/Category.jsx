import React, { useState } from "react";
import Banner from "../../components/Banner/Banner.jsx";
import Product from "../../components/Card/Product/Product.jsx";
import Card1 from "../../components/Card/Discover/Card1.jsx";
import Offer from "../../components/Card/Offer/Offer.jsx";
import Category1 from "../../components/Card/Category/Card1.jsx";
import Category2 from "../../components/Card/Category/Card2.jsx";
import { Link } from "react-router-dom";

const Category = () => {
  const [categoryData1, setCategoryData1] = useState([
    {
      categoryClass: "coral",
      categoryh4: "Low Price",
      categoryh2: "Stylish clothes for women.",
      categoryh6: "Upto 50% Off",
      categoryText: "left",
      categoryMargin: "me-auto",
    },
    {
      categoryClass: "blueberry",
      categoryh4: "Beyoung Presents",
      categoryh2: "Clothes for men, casual and formal.",
      categoryh6: "Upto 50% Off",
      categoryText: "left",
      categoryMargin: "me-auto",
    },
  ]);
  const [categoryData2, setCategoryData2] = useState([
    {
      categoryClass: "cyan",
      categoryh4: "Low Price",
      categoryh2: "Notebooks, planners, and essentials.",
      categoryh6: "Upto 50% Off",
      categoryText: "left",
      categoryMargin: "me-auto",
    },
    {
      categoryClass: "persian",
      categoryh4: "Beyoung Presents",
      categoryh2: "Traditional and festive wear",
      categoryh6: "Upto 50% Off",
      categoryText: "left",
      categoryMargin: "me-auto",
    },
  ]);
  const [categoryData3, setCategoryData3] = useState([
    {
      categoryClass: "amber",
      categoryh2: "Soft and cute outfits for kids",
      categoryh6: "Dress up in summer vibe",
      categoryh4: "Upto 50% Off",
      categoryText: "left",
      categoryMargin: "me-auto",
    },
    {
      categoryClass: "indigo",
      categoryh2: "Gadgets, mobiles, and devices",
      categoryh6: "New Designs Every Week",
      categoryh4: "Upto 40% Off",
      categoryText: "right",
      categoryMargin: "ms-auto",
    },
    {
      categoryClass: "olive",
      categoryh2: "Essentials for home and kitchen",
      categoryh6: "Move with style & comfort",
      categoryh4: "Upto 50% Off",
      categoryText: "right",
      categoryMargin: "ms-auto",
    },
    {
      categoryClass: "orchid",
      categoryh2: "Shoes and sandals for all",
      categoryh6: "Dress up in summer vibe",
      categoryh4: "Upto 50% Off",
      categoryText: "left",
      categoryMargin: "me-auto",
    },
    {
      categoryClass: "cerise",
      categoryh2: "Skincare, makeup, and grooming",
      categoryh6: "New Designs Every Week",
      categoryh4: "Upto 40% Off",
      categoryText: "left",
      categoryMargin: "me-auto",
    },
    {
      categoryClass: "brown",
      categoryh2: "Jewelry, bags, and accessories.",
      categoryh6: "Move with style & comfort",
      categoryh4: "Upto 50% Off",
      categoryText: "right",
      categoryMargin: "ms-auto",
    },
  ]);
  const [categoryData4, setCategoryData4] = useState([
    {
      categoryClass: "green",
      categoryh2: "Vitamins, supplements, and wellness items",
      categoryh6: "Dress up in summer vibe",
      categoryh4: "Upto 50% Off",
      categoryText: "left",
      categoryMargin: "me-auto",
    },
    {
      categoryClass: "gray",
      categoryh2: "Car and bike accessories",
      categoryh6: "New Designs Every Week",
      categoryh4: "Upto 40% Off",
      categoryText: "right",
      categoryMargin: "ms-auto",
    },
    {
      categoryClass: "gambage",
      categoryh2: "Creative art and handicrafts",
      categoryh6: "Move with style & comfort",
      categoryh4: "Upto 50% Off",
      categoryText: "right",
      categoryMargin: "ms-auto",
    },
    {
      categoryClass: "rose",
      categoryh2: "Food and essentials for pets",
      categoryh6: "Dress up in summer vibe",
      categoryh4: "Upto 50% Off",
      categoryText: "left",
      categoryMargin: "me-auto",
    },
    {
      categoryClass: "rebecca",
      categoryh2: "Bags, suitcases, and travel gear",
      categoryh6: "New Designs Every Week",
      categoryh4: "Upto 40% Off",
      categoryText: "left",
      categoryMargin: "me-auto",
    },
    {
      categoryClass: "teal",
      categoryh2: "Sportswear and fitness items",
      categoryh6: "Move with style & comfort",
      categoryh4: "Upto 50% Off",
      categoryText: "right",
      categoryMargin: "ms-auto",
    },
  ]);
  return (
    <div className="main">
      {/* Banner */}
      <Banner />

      {/* Category Cards */}
      <div className="category-main">
        <div className="body-head d-block text-center mb-4">
          <h5>
            All <span>Categories</span>
          </h5>
        </div>
        <div className="category-double">
          <Category1 categoryData={categoryData1} />
        </div>
        <div className="category-triple">
          <Category2 categoryData={categoryData3} />
        </div>
        <div className="category-double">
          <Category1 categoryData={categoryData2} />
        </div>
        <div className="category-triple">
          <Category2 categoryData={categoryData4} />
        </div>
      </div>

      {/* Discover */}
      <div className="discover-main">
        <Card1 />
      </div>

      {/* Product Cards */}
      <div className="products-main">
        <div className="body-head mb-4">
          <h5>
            Shop All <span>Products</span>
          </h5>
          <h6 className="d-flex column-gap-3 flex-wrap">
            <span className="active">All</span>
            <span>Trending Now</span>
            <span>Best Sellers</span>
            <span>Top Offers</span>
          </h6>
        </div>
        <Product />

        <div className="d-flex align-items-center justify-content-center my-3">
          <Link to="/products">
            <button className="darkbtn">
              View All <i className="fa fa-arrow-right ps-1"></i>
            </button>
          </Link>
        </div>
      </div>

      {/* Offers */}
      <div className="offers-main">
        <Offer />
      </div>
    </div>
  );
};

export default Category;
