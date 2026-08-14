import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryBannerCard = (props) => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    if (!props.categoryId || !props.categoryName) {
      navigate("/products");
      return;
    }
    const params = new URLSearchParams({
      category_id: props.categoryId,
      category: props.categoryName,
    });
    navigate(`/categoryproducts?${params.toString()}`);
  };

  return (
    <li className={`splide__slide ${props.bannerClass}`}>
      <div className="category-banner-content">
        {props.bannerTopLine && (
          <p className="category-banner-topline">{props.bannerTopLine}</p>
        )}
        {props.bannerSmall && <h6>{props.bannerSmall}</h6>}
        {props.bannerTitle && <h2>{props.bannerTitle}</h2>}
        {props.bannerSubTitle && <h4>{props.bannerSubTitle}</h4>}
        <button className="category-shop-btn" onClick={handleShopClick}>
          Shop Now <i className="fas fa-arrow-right ps-1"></i>
        </button>
      </div>
      <div className="category-banner-image">
        <img src={props.bannerImg} alt={props.bannerTitle || "Banner"} />
      </div>
    </li>
  );
};

export default CategoryBannerCard;