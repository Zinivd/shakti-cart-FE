import React from "react";
import { Link } from "react-router-dom";

const BannerCard = (props) => {
  return (
    <li className={`splide__slide ${props.bannerClass} w-100`}>
      <div className="carousel-content">
        {/* <h6>{props.bannerh6}</h6> */}
        <h3>{props.bannerh3}</h3>
        <h5>{props.bannerh5}</h5>
        {/* <h4>{props.bannerh4}</h4> */}
        <Link to="/products">
          <button className="homebannerbtn">
            Shop Now <i className="fas fa-arrow-right ps-1"></i>
          </button>
        </Link>
      </div>
      <div className="carousel-img">
        <img
          src={props.bannerImg}
          className="d-flex mx-auto"
          alt=""
        />
      </div>
    </li>
  );
};

export default BannerCard;
