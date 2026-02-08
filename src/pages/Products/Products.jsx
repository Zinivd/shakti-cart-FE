import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Product from "../../components/Card/Product/Product";
import Filter from "../../components/Filter/Filter";
import Card2 from "../../components/Card/Discover/Card2.jsx";
import Offer from "../../components/Card/Offer/Offer.jsx";
import "./Products.css";
import { NoSimilar } from "../../../public/Assets.js";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(null);
  const [hasProducts, setHasProducts] = useState(true);

  useEffect(() => {
    const catFromUrl = searchParams.get("cat");

    if (catFromUrl) {
      setFilters({
        category_id: catFromUrl,
        minPrice: 0,
        maxPrice: 10000,
      });
    }
  }, []);

  // 🔥 APPLY FILTER + UPDATE URL
  const handleFilterChange = (filterData) => {
    setFilters(filterData);
    if (filterData?.category_id) {
      setSearchParams({ cat: filterData.category_id });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="main">
      <div className="main-header pb-0">
        <div className="body-head">
          <h6 className="d-flex column-gap-2 flex-wrap">
            <Link to="/">
              Home <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/categories">
              All Categories <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/products" className="active">
              All Products
            </Link>
          </h6>
        </div>
      </div>

      <hr />

      {/* 🔥 FILTERED PRODUCTS */}
      <div className="product-main">
        <div className="product-flex">
          <div className="product-left">
            <Filter
              onFilterChange={handleFilterChange}
              activeCategory={filters?.category_id}
            />
          </div>

          <div className="product-right">
            <div className="body-head mt-2 mb-3">
              <h5>
                All <span>Collections</span>
              </h5>

              <h6
                className="filter-responsive"
                data-bs-toggle="offcanvas"
                data-bs-target="#filter-offcanvas"
              >
                <i className="fas fa-sliders" style={{ rotate: "90deg" }}></i>
                Filters
              </h6>
            </div>

            {hasProducts ? (
              <Product
                showCartBtn={true}
                filters={filters}
                onResult={(count) => setHasProducts(count > 0)}
              />
            ) : (
              <div className="empty-state mt-5 text-center">
                <img src={NoSimilar} alt="No products" />
                <h6>No Products Found</h6>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CARD2 */}
      <div className="main-header">{/* <Card2 /> */}</div>

      {/* ALL PRODUCTS */}
      <div className="main-header">
        <div className="body-head mb-3">
          <h5>
            Shop All <span>Products</span>
          </h5>
        </div>
        <Product />
      </div>

      <div className="main-header">{/* <Offer /> */}</div>
    </div>
  );
};

export default Products;
