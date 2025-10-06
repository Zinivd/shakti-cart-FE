import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductDetails.css";
import Card_2 from "../../components/Card/Discover/Card2";
import Product from "../../components/Card/Product/Product";
import OfferProduct from "../../components/Card/Offer/OfferProduct";
import Offer from "../../components/Card/Offer/Offer";
import Gallery from "../../components/Card/PrdtDetails/Gallery";
import ShareProduct from "../../components/Card/PrdtDetails/ShareProduct";
import ProductContent from "../../components/Card/PrdtDetails/ProductContent";
import Description from "../../components/Card/PrdtDetails/Description";
import Reviews from "../../components/Card/Reviews/Reviews";
import Comments from "../../components/Card/Reviews/Comments";

const ProductDetails = () => {
  return (
    <div className="main">
      <div className="main-header">
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
            <Link to="/products">
              T-Shirts
              <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to={`/products/id`} className="active">
              Polo T-Shirt
            </Link>
          </h6>
        </div>

        <div className="product-details-main">
          <div className="product-details-left">
            <Gallery />
          </div>
          <div className="product-details-center">
            <ProductContent />
          </div>
          <div className="product-details-right">
            <OfferProduct />
            <ShareProduct />
          </div>
        </div>

        <div className="product-description my-3">
          <div className="body-head d-block mt-5">
            <h4 className="mb-3">
              <span>|</span> Product Description
            </h4>
            <h6 className="text-decoration-underline">Description</h6>
          </div>
          <Description />
        </div>

        {/* Reviews */}
        <div className="main-header">
          <div className="body-head d-block">
            <h4 className="mb-3">
              <span>|</span> Ratings
            </h4>
            <h6 className="text-decoration-underline">Ratings</h6>
          </div>
          <div className="reviews-main my-3">
            <Reviews />
          </div>
        </div>

        {/* User Comments */}
        <div className="product-description my-3">
          <div className="body-head d-block">
            <h4 className="mb-3">
              <span>|</span> User Comments
            </h4>
            <div className="d-flex align-items-center column-gap-3">
              <h6>Ratings</h6>
              <h6 className="text-decoration-underline">Comments</h6>
            </div>
          </div>
          <Comments />
        </div>

        {/* Discover */}
        <div className="main-header">
          <Card_2 />
        </div>

        {/* Product Cards */}
        <div className="main-header">
          <div className="body-head mb-4">
            <h5>
              Similar <span>Products</span>
            </h5>
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
    </div>
  );
};

export default ProductDetails;
