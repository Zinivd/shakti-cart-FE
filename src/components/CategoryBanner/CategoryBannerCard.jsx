import React from "react";
import { Link } from "react-router-dom";

const CategoryBannerCard = (props) => {
  return (
    <li className={`splide__slide ${props.bannerClass}`}>
      <div className="category-banner-content">
        <p className="category-banner-topline">{props.bannerTopLine}</p>

        <h6>{props.bannerSmall}</h6>

        <h2>{props.bannerTitle}</h2>

        <h4>{props.bannerSubTitle}</h4>

        <Link to="/products">
          <button className="category-shop-btn">
            Shop Now <i className="fas fa-arrow-right ps-1"></i>
          </button>
        </Link>
      </div>

      <div className="category-banner-image">
        <img src={props.bannerImg} alt="BannerImage" />
      </div>
    </li>
  );
};

export default CategoryBannerCard;
