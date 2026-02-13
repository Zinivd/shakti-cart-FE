import React, { useEffect, useRef } from "react";
import Banner from "../../components/Banner/Banner.jsx";
import Ellipsis from "../../components/Ellipsis/Ellipsis.jsx";
import Product from "../../components/Card/Product/Product.jsx";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Home = () => {
  const splideRef = useRef(null);
  const mountedRef = useRef(false);

  const initSplide = (count) => {
    if (count === 0) return;

    // Destroy existing instance
    if (splideRef.current) {
      splideRef.current.destroy(true);
      splideRef.current = null;
    }

    // Wait for DOM to be ready
    setTimeout(() => {
      const splideElement = document.querySelector(".home_ellipsis");
      if (!splideElement) return;

      splideRef.current = new Splide(".home_ellipsis", {
        type: count > 2 ? "loop" : "slide",
        perPage: Math.min(5, count),
        perMove: 1,
        pagination: false,
        arrows: count > 2, // Only show arrows if looping
        autoplay: true,
        interval: 2000,
        speed: 800,
        gap: "1rem",
        pauseOnHover: true,
        pauseOnFocus: true,
        resetProgress: false,
        breakpoints: {
          1098: { 
            perPage: Math.min(5, count),
            gap: "0.75rem"
          },
          768: { 
            perPage: Math.min(3, count),
            gap: "0.5rem"
          },
          580: { 
            perPage: Math.min(2, count),
            gap: "0.5rem"
          },
          480: { 
            perPage: Math.min(2, count),
            gap: "0.5rem"
          },
          300: { 
            perPage: Math.min(1, count),
            gap: "0.25rem"
          },
        },
      });

      splideRef.current.mount();
      mountedRef.current = true;
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (splideRef.current) {
        splideRef.current.destroy(true);
        splideRef.current = null;
      }
    };
  }, []);

  return (
    <div className="main">
      <Banner />

      <div className="main-header">
        <div className="body-head mb-3">
          <h5>
            Quick <span>Hits</span>
          </h5>
        </div>

        <div className="home_ellipsis splide">
          <div className="ellipsis splide__track">
            <ul className="ellipsis-list splide__list">
              <Ellipsis onLoaded={initSplide} />
            </ul>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="body-head mb-3">
          <h5>
            Shop All <span>Products</span>
          </h5>
        </div>

        <div className="product-home">
          <Product limit={16} />
        </div>
      </div>
    </div>
  );
};

export default Home;
