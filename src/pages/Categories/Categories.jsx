import React, { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner/Banner.jsx";
import Product from "../../components/Card/Product/Product.jsx";
import Card1 from "../../components/Card/Discover/Card1.jsx";
import Offer from "../../components/Card/Offer/Offer.jsx";
import Category from "../../components/Card/Category/Category.jsx";
import Feature from "../../components/Card/Feature/Feature.jsx";

const Categories = () => {
  
  return (
    <div className="main">
      {/* Banner */}
      <Banner />

      {/* Category Cards */}
      <div className="category-main">
        <div className="body-head d-block text-center mb-4">
          <h3>
            All <span>Categories</span>
          </h3>
        </div>

        <div className="body-head mb-4">
          <h5>
            Fashion <span>Categories</span>
          </h5>
        </div>
        <div className="category-main mb-3">
          <Category />
        </div>

        <div className="body-head mb-4">
          <h5>
            Featured <span>Collections</span>
          </h5>
        </div>
        <div className="category-main">
          <Feature />
        </div>
      </div>

      {/* Discover */}
      <div className="main-header">
        <Card1 />
      </div>

      {/* Product Cards */}
      <div className="main-header">
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
      <div className="main-header">
        <Offer />
      </div>
    </div>
  );
};

export default Categories;
