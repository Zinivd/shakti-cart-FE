import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner/Banner.jsx";
import Product from "../../components/Card/Product/Product.jsx";
import Card1 from "../../components/Card/Discover/Card1.jsx";
import Offer from "../../components/Card/Offer/Offer.jsx";
import Category from "../../components/Card/Category/Category.jsx";
import Feature from "../../components/Card/Feature/Feature.jsx";
import { getAllCategories } from "../../service/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(Array.isArray(data) ? data : []);
  };

  return (
    <div className="main">
      <Banner />

      {/* ALL CATEGORIES */}
      <div className="category-main">
        <div className="body-head d-block text-center mb-4">
          <h3>
            All <span>Categories</span>
          </h3>
        </div>

        {/* ✅ PASS ARRAY ONCE */}
        <Category categories={categories} />
      </div>

      {/* FEATURED COLLECTIONS (KEEP AS YOU ASKED) */}
      {/* <div className="body-head mb-4">
        <h5>
          Featured <span>Collections</span>
        </h5>
      </div>
      <div className="category-main">
        <Feature />
      </div> */}

      {/* DISCOVER */}
      <div className="main-header">
        <Card1 />
      </div>

      {/* PRODUCTS */}
      <div className="main-header">
        <div className="body-head mb-4">
          <h5>
            Shop All <span>Products</span>
          </h5>
        </div>

        <Product />

        <div className="d-flex align-items-center justify-content-center my-3">
          <Link to="/products">
            <button className="darkbtn">
              View All <i className="fa fa-arrow-right ps-1"></i>
            </button>
          </Link>
        </div>
      </div>

      <div className="main-header">
        <Offer />
      </div>
    </div>
  );
};

export default Categories;