import React from "react";
import Banner from "../../components/Banner/Banner.jsx";
import Product from "../../components/Card/Product/Product.jsx";
import Card1 from "../../components/Card/Discover/Card1.jsx";
import Offer from "../../components/Card/Offer/Offer.jsx";
import Category1 from "../../components/Card/Category/Card1.jsx";

const Category = () => {
  return (
    <div className="main">
      {/* Banner */}
      <Banner />

      {/* Category Cards */}
      <div className="category-main">
        <div className="category-double">
          <Category1 />
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
      </div>

      {/* Offers */}
      <div className="offers-main">
        <Offer />
      </div>
    </div>
  );
};

export default Category;
