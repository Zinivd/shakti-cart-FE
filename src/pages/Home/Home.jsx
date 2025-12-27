import React, { useEffect, useRef } from "react";
import Banner from "../../components/Banner/Banner.jsx";
import Ellipsis from "../../components/Ellipsis/Ellipsis.jsx";
import Product from "../../components/Card/Product/Product.jsx";
import Offer from "../../components/Card/Offer/Offer.jsx";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Home = () => {
  const splideRef = useRef(null);

  const initSplide = (count) => {
    if (splideRef.current) return;

    splideRef.current = new Splide(".home_ellipsis", {
      type: count > 7 ? "loop" : "slide",
      perPage: Math.min(7, count),
      perMove: 1,
      pagination: false,
      arrows: count > 7,
      breakpoints: {
        1098: { perPage: Math.min(6, count) },
        768: { perPage: Math.min(5, count) },
        580: { perPage: Math.min(4, count) },
        480: { perPage: Math.min(2, count) },
        300: { perPage: Math.min(3, count) },
      },
    }).mount();
  };

  useEffect(() => {
    return () => splideRef.current?.destroy();
  }, []);

  return (
    <div className="main">
      <Banner />

      <div className="main-header">
        <div className="body-head mb-4">
          <h5>
            Popular <span>Categories</span>
          </h5>
        </div>

        <div className="home_ellipsis splide">
          <div className="ellipsis splide__track">
            <div className="ellipsis-list splide__list">
              <Ellipsis onLoaded={initSplide} />
            </div>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="body-head mb-4">
          <h5>
            Shop All <span>Products</span>
          </h5>
        </div>

        <div className="product-home">
          <Product limit={16} />
        </div>
      </div>

      <div className="main-header">
        <Offer />
      </div>
    </div>
  );
};

export default Home;
