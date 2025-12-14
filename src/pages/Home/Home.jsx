import React, { useEffect } from "react";
import Banner from "../../components/Banner/Banner.jsx";
import Ellipsis from "../../components/Ellipsis/Ellipsis.jsx";
import Product from "../../components/Card/Product/Product.jsx";
import Card1 from "../../components/Card/Discover/Card1.jsx";
import Card2 from "../../components/Card/Discover/Card2.jsx";
import Grid from "../../components/Card/Grid/Grid.jsx";
import Offer from "../../components/Card/Offer/Offer.jsx";

const Home = () => {
  useEffect(() => {
    const splide = new Splide(".home_ellipsis", {
      type: "loop",
      perPage: 7,
      perMove: 1,
      autoplay: false,
      pagination: false,
      arrows: false,
      breakpoints: {
        1098: {
          perPage: 6,
          arrows: true,
        },
        768: {
          perPage: 5,
          arrows: true,
        },
        580: {
          perPage: 4,
          arrows: true,
        },
        480: {
          perPage: 2,
          arrows: true,
        },
        300: {
          perPage: 3,
          arrows: true,
        },
      },
    }).mount();

    return () => {
      splide.destroy();
    };
  }, []);
  return (
    <div className="main">
      {/* Banner */}
      <Banner />

      {/* Ellipsis */}
      <div className="main-header">
        <div className="body-head mb-4">
          <h5>
            Popular <span>Categories</span>
          </h5>
        </div>
        <div className="home_ellipsis splide">
          <Ellipsis />
        </div>
      </div>

      {/* Product Cards */}
      <div className="main-header">
        <div className="body-head mb-4">
          <h5>
            Shop All <span>Products</span>
          </h5>
          <h6 className="d-flex column-gap-3 flex-wrap">
            <span className="active">All</span>
            <span>Trending Now</span>
            <span>Best Sellers</span>
            <span>Top Offers</span>
          </h6>
        </div>
        <div className="product-home">
          <Product />
        </div>
      </div>

      {/* Discover */}
      <div className="main-header">
        <Card1 />
      </div>

      {/* Product Cards */}
      <div className="main-header">
        <Product />
      </div>

      {/* Discover */}
      <div className="main-header">
        <Card2 />
      </div>

      {/* Product Cards */}
      <div className="main-header">
        <Product />
      </div>

      {/* Grid Cards */}
      {/* <div className="main-header">
        <div className="body-head mb-4">
          <h5>
            Outfit <span>Chemistry</span>
          </h5>
        </div>
        <Grid />
      </div> */}

      {/* Offers */}
      <div className="main-header">
        <Offer />
      </div>
    </div>
  );
};

export default Home;
