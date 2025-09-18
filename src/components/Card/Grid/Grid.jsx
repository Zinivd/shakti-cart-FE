import React, { useEffect, useRef } from "react";
import {
  Grid1,
  Grid2,
  Grid3,
  Grid4,
  Grid5,
} from "../../../../public/Assets.js";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import GridCard from "./GridCard.jsx";
import "./Grid.css";

const Grid = () => {
  const splideRef = useRef(null);

  useEffect(() => {
    if (splideRef.current) {
      let splide = new Splide(`.grid-cl`, {
        type: "loop",
        perPage: 1.5,
        autoplay: true,
        interval: 3000,
        arrows: false,
        pagination: false,
      }).mount();

      return () => splide.destroy();
    }
  }, []);

  const gridSet1 = [
    { gridImg: Grid1, gridHeader: "Shirt", gridPrice: "499" },
    { gridImg: Grid2, gridHeader: "Sun Glass", gridPrice: "499" },
    { gridImg: Grid3, gridHeader: "Watch", gridPrice: "499" },
    { gridImg: Grid4, gridHeader: "Shoe", gridPrice: "499" },
    { gridImg: Grid5, gridHeader: "Ankle Fit", gridPrice: "499" },
  ];

  const gridSet2 = [
    { gridImg: Grid1, gridHeader: "Shirt", gridPrice: "499" },
    { gridImg: Grid2, gridHeader: "Sun Glass", gridPrice: "499" },
    { gridImg: Grid3, gridHeader: "Watch", gridPrice: "499" },
    { gridImg: Grid4, gridHeader: "Shoe", gridPrice: "499" },
    { gridImg: Grid5, gridHeader: "Ankle Fit", gridPrice: "499" },
  ];

  const slides = [gridSet1, gridSet2]; // Can be extended further

  return (
    <div className="splide grid-cl mb-4" ref={splideRef}>
      <div className="splide__track">
        <ul className="splide__list column-gap-3 mb-0">
          {slides.map((items, index) => (
            <li className="splide__slide" key={index}>
              <GridCard items={items} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Grid;
