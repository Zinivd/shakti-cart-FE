import React, { useEffect, useRef } from "react";
import { Hero_BG_1, Hero_BG_2 } from "../../../public/Assets.js";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import BannerCard from "./BannerCard.jsx";
import "./Banner.css";

const Banner = () => {
  const splideRef = useRef(null);
  useEffect(() => {
    if (splideRef.current) {
      let splide = new Splide(`.banner-cl`, {
        type: "fade",
        perPage: 1,
        autoplay: true,
        interval: 3000,
        arrows: true,
        pagination: false,
      }).mount();
      return () => {
        if (splide) {
          splide.destroy();
        }
      };
    }
  });

  const bannerData = [
    {
      bannerClass: "splide_1",
      bannerImg: Hero_BG_1,
      bannerh3: "New Arrivals",
      bannerh5: "Smart Shirts for College & Office",
    },
    {
      bannerClass: "splide_2",
      bannerImg: Hero_BG_2,
      bannerh3: "Flat 10% Off",
      bannerh5: "Limited Time Offer",
    },
    
  ];
  return (
    <div className="home-banner">
      <div className="splide banner-cl mb-4" ref={splideRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {bannerData.map((item, index) => (
              <BannerCard key={index} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
