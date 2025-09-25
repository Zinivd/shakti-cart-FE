import React from "react";
import { Link } from "react-router-dom";
import Product from "../../components/Card/Product/Product";
import Filter from "../../components/Filter/Filter";
import Card2 from "../../components/Card/Discover/Card2.jsx";
import Offer from "../../components/Card/Offer/Offer.jsx";

import "./Products.css";

const Products = () => {
  return (
    <div className="main">
      <div className="main-header pb-0">
        <div className="body-head">
          <h6 className="d-flex column-gap-2 flex-wrap">
            <Link to="/">
                Home
                <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/categories">
                All Categories
                <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/products" className="active">
              All Products
            </Link>
          </h6>
        </div>
      </div>

      <hr />

      {/* Product Cards */}
      <div className="product-main">
        <div className="product-flex">
          <div className="product-left">
            <Filter />
          </div>
          <div className="product-right">
            <div className="body-head mt-2 mb-3">
              <h5>
                Women's Wear <span>Collections</span>
              </h5>
              <h6
                className="filter-responsive"
                data-bs-toggle="offcanvas"
                data-bs-target="#filter-offcanvas"
                aria-controls="filter-offcanvas"
              >
                <i
                  className="fas fa-sliders"
                  style={{ rotate: "90deg" }}
                ></i>
                Filters
              </h6>
              <h6 className="d-flex column-gap-3 flex-wrap">
                <span className="active">All</span>
                <span>Trending Now</span>
                <span>Best Sellers</span>
                <span>Top Offers</span>
              </h6>
            </div>
            <Product showCartBtn={true} />
            <Product showCartBtn={true} />
          </div>
        </div>
      </div>

      {/* Discover */}
      <div className="main-header">
        <Card2 />
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

export default Products;
