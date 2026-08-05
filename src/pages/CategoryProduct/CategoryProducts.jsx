import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ShopAllProducts from "../../components/ShopAllproduct/ShopAllProducts.jsx";
import { products } from "../../data/products.js";
import { filters } from "../../data/filter.js";
import NewsletterBanner from "../../components/NewsLetterBanner/NewsLetter.jsx";
import { Discover2 } from "../../../public/Assets.js";
import { NoSimilar } from "../../../public/Assets.js";
import Loader from "../../components/Loader/Loader.jsx";
import { getAllCategories } from "../../service/api";
import "./CategoryProducts.css";

const colorSwatch = {
  Black: "#111111",
  White: "#ffffff",
  Blue: "#2f80ed",
  Green: "#38a169",
  Grey: "#a0a0a0",
  Red: "#e63946",
  Pink: "#f4a6c1",
  Yellow: "#f2c94c",
  Purple: "#8e44ad",
  Brown: "#8d5524",
  Cream: "#f5e9d8",
  Orange: "#f77f00",
  Beige: "#e8dcc8",
  Maroon: "#7a1f2b",
  Navy: "#1b2a4a",
  Olive: "#6b7a3a",
  Gold: "#d4af37",
  Silver: "#c0c0c0",
  Multicolor:
    "linear-gradient(45deg, red, orange, yellow, green, blue, purple)",
};

const getBadgeForProduct = (product) => {
  const discountPercent =
    product.oldPrice && product.price
      ? ((product.oldPrice - product.price) / product.oldPrice) * 100
      : 0;

  if (discountPercent >= 35) return "Top Offer";
  if (product.rating >= 4.7) return "Trending Now";
  if (product.rating >= 4.5) return "Top Rated";
  if (discountPercent >= 25) return "Best Seller";

  return null;
};

const getBadgeColor = (badge) => {
  switch (badge) {
    case "Best Seller":
      return "#ff9800";
    case "Top Rated":
      return "#4caf50";
    case "Trending Now":
      return "#FF0000";
    case "Top Offer":
      return "#9c27b0";
    default:
      return "#9c27b0";
  }
};

const CategoryProduct = () => {
  const [searchParams] = useSearchParams();
  const rawCategory = (searchParams.get("category") || "").toLowerCase();

  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  // ---------- CATEGORY DATA FROM API ----------
  const [categoriesData, setCategoriesData] = useState([]);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategoriesData(Array.isArray(data) ? data : []);
  };

  // matched category object (with its subcategories) for the current URL param
  const matchedCategory = useMemo(
    () =>
      categoriesData.find(
        (c) => c.category_name.toLowerCase() === rawCategory,
      ),
    [categoriesData, rawCategory],
  );

  const category = rawCategory; // used for matching products by category field

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category]);

  // ---------- FILTER STATE ----------
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const categoryLabel = matchedCategory
    ? matchedCategory.category_name
    : rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  const priceRange = filters.common.price || { min: 0, max: 50000 };
  const [maxPrice, setMaxPrice] = useState(priceRange.max);

  // reset filters whenever category changes
  useEffect(() => {
    setSelectedSubcategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setMaxPrice(priceRange.max);
  }, [category]);

  // ---------- SUBCATEGORY LIST: dynamic from categories API ----------
  const availableSubcategories = useMemo(() => {
    if (!matchedCategory || !Array.isArray(matchedCategory.subcategories)) {
      return [];
    }
    return matchedCategory.subcategories.map((s) => s.sub_category_name);
  }, [matchedCategory]);

  // products belonging to this top-level category only (base for building color list)
  const categoryBaseProducts = useMemo(
    () =>
      products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      ),
    [category],
  );

  // colors that actually exist for this category's products
  const availableColors = useMemo(() => {
    const set = new Set(categoryBaseProducts.map((p) => p.color).filter(Boolean));
    return Array.from(set).sort();
  }, [categoryBaseProducts]);

  const toggleSubcategory = (name) => {
    setSelectedSubcategories((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const toggleColor = (name) => {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const toggleSize = (name) => {
    setSelectedSizes((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  let categoryProducts = useMemo(() => {
    let list = categoryBaseProducts;

    if (selectedSubcategories.length > 0) {
      list = list.filter((p) => selectedSubcategories.includes(p.subcategory));
    }

    if (selectedColors.length > 0) {
      list = list.filter((p) => selectedColors.includes(p.color));
    }

    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.size?.some((s) => selectedSizes.includes(s)));
    }

    list = list.filter((p) => p.price <= maxPrice);

    return list;
  }, [categoryBaseProducts, selectedSubcategories, selectedColors, selectedSizes, maxPrice]);

  if (activeTab === "Trending now") {
    categoryProducts = categoryProducts.filter(
      (p) => getBadgeForProduct(p) === "Trending Now",
    );
  } else if (activeTab === "best sellers") {
    categoryProducts = categoryProducts.filter(
      (p) => getBadgeForProduct(p) === "Best Seller",
    );
  }

  const filterSidebarContent = (
    <>
      <div className="filter-head">
        <h5>Filter</h5>
        <button
          type="button"
          className="filter-close-btn"
          onClick={() => setShowMobileFilter(false)}
          aria-label="Close filters"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="filter-block">
        <div className="filter-block-head">
          <h6>Category</h6>
        </div>
        <ul className="filter-collection-list">
          {availableSubcategories.map((sub) => (
            <li key={sub} className="filter-checkbox-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(sub)}
                  onChange={() => toggleSubcategory(sub)}
                />
                <span>{sub}</span>
              </label>
            </li>
          ))}

          {availableSubcategories.length === 0 && (
            <li className="filter-checkbox-item">
              <span style={{ color: "#999" }}>No subcategories</span>
            </li>
          )}
        </ul>
      </div>

      {/* PRICE */}
      <div className="filter-block">
        <div className="filter-block-head">
          <h6>Price</h6>
        </div>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="price-range"
        />
        <div className="price-values">
          <span className="price-pill">₹{priceRange.min}</span>
          <span className="price-pill">₹{maxPrice}</span>
        </div>
      </div>

      {/* COLORS */}
      <div className="filter-block">
        <div className="filter-block-head">
          <h6>Colors</h6>
        </div>
        <div className="color-grid">
          {availableColors.map((c) => (
            <div
              className={`color-item ${selectedColors.includes(c) ? "selected" : ""}`}
              key={c}
              onClick={() => toggleColor(c)}
            >
              <span
                className="color-dot"
                style={{ background: colorSwatch[c] || "#ccc" }}
              ></span>
              <small>{c}</small>
            </div>
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div className="filter-block">
        <div className="filter-block-head">
          <h6>Size</h6>
        </div>
        <div className="size-grid">
          {filters.common.sizes.map((s) => (
            <div
              className={`size-box ${selectedSizes.includes(s) ? "selected" : ""}`}
              key={s}
              onClick={() => toggleSize(s)}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="main category-product-page">
        <div className="cp-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/all-categories">All Categories</Link>
          <span>/</span>
          <span className="active">{categoryLabel}</span>
        </div>

        <div className="category-product-wrap">
          <aside
            className={`filter-sidebar ${showMobileFilter ? "mobile-open" : ""}`}
          >
            {filterSidebarContent}
          </aside>

          {showMobileFilter && (
            <div
              className="filter-backdrop"
              onClick={() => setShowMobileFilter(false)}
            ></div>
          )}

          <div className="category-product-main">
            <div className="category-product-head">
              <h4>
                {categoryLabel} <span>Collections</span>
              </h4>
              <div className="head-right">
                <div className="product-tabs">
                  {["All", "Trending now", "best sellers"].map((tab) => (
                    <span
                      key={tab}
                      className={activeTab === tab ? "active" : ""}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mobile-filter-btn"
                  onClick={() => setShowMobileFilter(true)}
                  aria-label="Open filters"
                >
                  <i className="bi bi-sliders"></i>
                </button>
              </div>
            </div>

            <div className="product-grid">
              {categoryProducts.map((product) => {
                const badge = getBadgeForProduct(product);

                return (
                  <Link
                    to={`/productdetail/${product.id}`}
                    className="product-card"
                    key={product.id}
                  >
                    <div className="product-card-img">
                      <img src={product.image} alt={product.name} />

                      {badge && (
                        <span
                          className="product-badge"
                          style={{ backgroundColor: getBadgeColor(badge) }}
                        >
                          {badge}
                        </span>
                      )}

                      <span
                        className="wishlist-icon"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="bi bi-heart"></i>
                      </span>
                    </div>

                    <div className="product-card-content">
                      <div className="product-meta">
                        <span className="product-sku">
                          CS-NB-{String(product.id).padStart(3, "0")}
                        </span>
                        <span className="product-rating">
                          <i className="bi bi-star-fill"></i> {product.rating}
                        </span>
                      </div>
                      <h6 className="product-name">{product.name}</h6>
                      <div className="product-price">
                        <span className="price">₹{product.price}</span>
                        <span className="old-price">₹{product.oldPrice}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {categoryProducts.length === 0 && (
                <div className="no-products">
                  <img
                    className="no-product-img"
                    src={NoSimilar}
                    alt="No products"
                  />
                  <p>No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="klarna-banner">
          <div className="klarna-left">
            <h2 className="klarna-logo">Klarna.</h2>
          </div>

          <div className="klarna-image">
            <img src={Discover2} alt="Pets" />
          </div>

          <div className="klarna-content">
            <p>Pay with 4 installment, 0% interest</p>
            <h3>
              <strong>Buy Now,</strong> Pay Later
            </h3>
          </div>

          <div className="klarna-action">
            <button className="klarna-btn">DISCOVER NOW</button>
          </div>
        </div>

        <ShopAllProducts />
      </div>

      <NewsletterBanner />
    </>
  );
};

export default CategoryProduct;