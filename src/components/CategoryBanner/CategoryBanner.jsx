import React, { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import CategoryBannerCard from "./CategoryBannerCard";
import "./CategoryBanner.css";

import { Hero_BG_1, Hero_BG_2, HomeCL } from "../../../public/Assets";

const CategoryBanner = () => {
  const splideRef = useRef(null);

  useEffect(() => {
    let splide;
    if (splideRef.current) {
      splide = new Splide(splideRef.current, {
        type: "loop",
        perPage: 1,
        autoplay: true,
        interval: 3000,
        arrows: true,
        pagination: true,
        speed: 700,
      });
      splide.mount();
    }
    return () => {
      if (splide) splide.destroy();
    };
  }, []);

  const bannerData = [
    {
      bannerClass: "category-slide-1",
      bannerImg: HomeCL,
      bannerTopLine: "Let's Celebrate! | Over 6000 Chic Styles Now At 70% Off.",
      bannerSmall: "Best Deal online on Clothing's",
      bannerTitle: "SMART WEARABLE",
      bannerSubTitle: "UP to 80% OFF",
    },
    {
      bannerClass: "category-slide-2",
      bannerImg: Hero_BG_1,
      bannerTopLine: "New Season | Fresh Styles Just Dropped.",
      bannerSmall: "Latest Collection",
      bannerTitle: "NEW ARRIVALS",
      bannerSubTitle: "LIMITED OFFER",
    },
    {
      bannerClass: "category-slide-3",
      bannerImg: Hero_BG_2,
      bannerTopLine: "Trending Now | Handpicked Styles For You.",
      bannerSmall: "Exclusive Collection",
      bannerTitle: "TRENDING STYLES",
      bannerSubTitle: "UP to 60% OFF",
    },
  ];

  return (
    <div className="category-banner">
      <div className="splide category-banner-slider" ref={splideRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {bannerData.map((item, index) => (
              <CategoryBannerCard key={index} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
