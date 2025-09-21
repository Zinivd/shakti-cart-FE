import React from "react";
import { Link } from "react-router-dom";
import Product from "../../components/Card/Product/Product";
import Filter from "../../components/Filter/Filter";

import "./Products.css";

const Products = () => {
  return (
    <div className="main">
      <div className="products-main pb-2">
        <div className="body-head">
          <h6 className="d-flex column-gap-2 flex-wrap">
            <Link to="/">
              <span>
                Home
                <i className="fa fa-angle-right ps-1"></i>
              </span>
            </Link>
            <Link to="/categories">
              <span>
                All Categories
                <i className="fa fa-angle-right ps-1"></i>
              </span>
            </Link>
            <Link to="/products" className="active">
              <span>All Products</span>
            </Link>
          </h6>
        </div>
      </div>

      <hr />

      {/* Product Cards */}
      <div className="product-flex">
        <div className="product-left">
            <Filter />
        </div>
        <div className="product-right">
          <Product />
        </div>
      </div>
    </div>
  );
};

export default Products;
