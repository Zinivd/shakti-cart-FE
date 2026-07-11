import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ShopAllProducts from "../../components/ShopAllproduct/ShopAllProducts.jsx";
import { products } from "../../data/products.js";
import { filters } from "../../data/filter.js";
import NewsletterBanner from "../../components/NewsLetterBanner/NewsLetter.jsx";
import { Discover2 } from "../../../public/Assets.js";
import { NoSimilar } from "../../../public/Assets.js";
import Loader from "../../components/Loader/Loader.jsx";
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

const categoryKeyMap = {
  women: "women",
  men: "men",
  kids: "kids",
  wedding: "wedding",
  "night suits": "nightSuit",
  nightsuit: "nightSuit",
  "bottom wear": "bottomWear",
  bottomwear: "bottomWear",
};

const categoryLabelMap = {
  men: "Men's Wear",
  women: "Women's Wear",
  kids: "Kids Wear",
  wedding: "Wedding Collection",
  nightSuit: "Night Suits",
  bottomWear: "Bottom Wear",
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
  const rawCategory = (searchParams.get("category") || "men").toLowerCase();
  const category = categoryKeyMap[rawCategory] || rawCategory;

  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category]);

  // ---------- FILTER STATE ----------
  const [openMainCategories, setOpenMainCategories] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const categoryLabel =
    categoryLabelMap[category] ||
    `${category.charAt(0).toUpperCase() + category.slice(1)}'s Wear`;

  const categoryFilters = filters[category] || {};

  const mainCategories =
    categoryFilters.category || categoryFilters.mainCategory || {};
  const priceRange = filters.common.price || { min: 0, max: 50000 };
  const [maxPrice, setMaxPrice] = useState(priceRange.max);

  const toggleMainCategory = (name) => {
    setOpenMainCategories((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const toggleCollection = (name) => {
    setSelectedCollections((prev) =>
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
    let list = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );

    if (selectedCollections.length > 0) {
      list = list.filter((p) => selectedCollections.includes(p.collection));
    }

    if (selectedColors.length > 0) {
      list = list.filter((p) => selectedColors.includes(p.color));
    }

    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.size?.some((s) => selectedSizes.includes(s)));
    }

    list = list.filter((p) => p.price <= maxPrice);

    return list;
  }, [category, selectedCollections, selectedColors, selectedSizes, maxPrice]);

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
        <ul className="filter-maincat-list">
          {Object.keys(mainCategories).map((mainCat) => {
            const isOpen = openMainCategories.includes(mainCat);
            return (
              <li key={mainCat} className="filter-maincat-item">
                <div
                  className="filter-maincat-head"
                  onClick={() => toggleMainCategory(mainCat)}
                >
                  <span>{mainCat}</span>
                  {isOpen ? (
                    <i className="bi bi-chevron-down"></i>
                  ) : (
                    <i className="bi bi-chevron-right"></i>
                  )}
                </div>

                {isOpen && (
                  <ul className="filter-collection-list">
                    {mainCategories[mainCat].map((collection) => (
                      <li key={collection} className="filter-checkbox-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedCollections.includes(collection)}
                            onChange={() => toggleCollection(collection)}
                          />
                          <span>{collection}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
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
          {filters.common.colors.map((c) => (
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
