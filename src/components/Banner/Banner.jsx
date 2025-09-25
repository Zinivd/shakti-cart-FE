import React, { useEffect, useRef } from "react";
import { HomeCL } from "../../../public/Assets.js";
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
        pagination: true,
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
      bannerImg: HomeCL,
      bannerh6: "Let's Celebrate! | Over 6000 Chic Styles Now At 70% Off.",
      bannerh5: "Best Deal online on Clothing's",
      bannerh3: "SMART WEARABLE.",
      bannerh4: "Up to 80% Off",
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
