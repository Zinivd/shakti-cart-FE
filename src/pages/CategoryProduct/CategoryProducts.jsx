import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Product from "../../components/Card/Product/Product.jsx";
import { filters } from "../../data/filter.js";
import NewsletterBanner from "../../components/NewsLetterBanner/NewsLetter.jsx";
import { Discover2, NoSimilar } from "../../assets/Assets.js";
import Loader from "../../components/Loader/Loader.jsx";
import { getAllCategories, getProductsByCategory } from "../../service/api";
import "./CategoryProducts.css";

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
  const categoryIdFromUrl = searchParams.get("category_id");

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
  // FIX: compare against the numeric `id` (same id used when building the link
  // from AllCategories: `cat.id`) instead of the string `category_id` code
  // (e.g. "CTGRY4"). Previously this mismatch made matchedCategory almost
  // always resolve only via the name check, and the wrong id got sent to the
  // products API below.
  const matchedCategory = useMemo(
    () =>
      categoriesData.find(
        (c) =>
          c.category_name.toLowerCase() === rawCategory ||
          String(c.id) === String(categoryIdFromUrl),
      ),
    [categoriesData, rawCategory, categoryIdFromUrl],
  );

  const category = rawCategory; // used for matching products by category field

  // ---------- PRODUCTS FROM API (replaces static products.js) ----------
  const [rawProducts, setRawProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    // FIX: use matchedCategory.id (numeric) instead of matchedCategory.category_id
    // (string code) so the correct category id is sent to the API.
    const categoryId = matchedCategory?.id || categoryIdFromUrl;
    if (!categoryId) return;

    let ignore = false;

    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const response = await getProductsByCategory(categoryId);
        const apiProducts = response?.data?.data?.data || [];
        if (!ignore) setRawProducts(apiProducts);
      } catch (err) {
        console.log(err);
        if (!ignore) setRawProducts([]);
      } finally {
        if (!ignore) setProductsLoading(false);
      }
    };

    fetchProducts();
    return () => {
      ignore = true;
    };
  }, [matchedCategory, categoryIdFromUrl]);

  // map API shape -> the shape this page's existing filter logic expects
  // (same field names as the old static products.js: id, name, image, color, size, price, oldPrice, rating)
  // FIX: added a client-side safety-net filter so that even if the API ever
  // returns products from other categories (e.g. backend ignores the id, or
  // sends every product), only products belonging to the current category
  // are shown on the right-hand side.
  const categoryBaseProducts = useMemo(() => {
    const targetId = matchedCategory?.id ?? categoryIdFromUrl;

    const scoped = rawProducts.filter((item) => {
      const itemCatId = item.category_id ?? item.category?.id;
      const itemCatName = (item.category?.category_name || "").toLowerCase();

      const idMatches =
        targetId != null && String(itemCatId) === String(targetId);
      const nameMatches = rawCategory && itemCatName === rawCategory;

      // If we don't have a target id/name to compare against yet, don't
      // filter anything out (avoids flashing an empty grid on first render).
      if (targetId == null && !rawCategory) return true;

      return idMatches || nameMatches;
    });

    return scoped.map((item) => {
      const firstColorImage = item.colors?.[0]?.images?.[0];
      const fallbackImage = item.images?.[0];
      const image =
        firstColorImage ||
        fallbackImage ||
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

      const sizes =
        item.colors?.flatMap(
          (c) => c.inventories?.map((inv) => inv.size) || [],
        ) || [];

      // subcategory is also a nested object: item.subcategory.sub_category_name
      const subcategory = item.subcategory?.sub_category_name || "";

      const price = Number(item.selling_price);
      const oldPrice = Number(item.actual_price);
      const rating = Number(item.rating || 4);

      return {
        id: item.id,
        subcategory,
        name: item.name,
        image,
        size: sizes,
        price,
        oldPrice,
        rating,
        badge:
          item.product_list_type ||
          getBadgeForProduct({ price, oldPrice, rating }),
      };
    });
  }, [rawProducts, matchedCategory, categoryIdFromUrl, rawCategory]);

  // ---------- FILTER STATE ----------
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
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

  const toggleSubcategory = (name) => {
    setSelectedSubcategories((prev) =>
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

    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.size?.some((s) => selectedSizes.includes(s)));
    }

    list = list.filter((p) => p.price <= maxPrice);

    return list;
  }, [
    categoryBaseProducts,
    selectedSubcategories,
    selectedSizes,
    maxPrice,
  ]);

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

  if (productsLoading) {
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
          <Link to="/allcategories">All Categories</Link>
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
                return (
                  <Link
                    to={`/productdetail/${product.id}`}
                    className="product-card"
                    key={product.id}
                  >
                    <div className="product-card-img">
                      <img src={product.image} alt={product.name} />

                      {product.badge && (
                        <span
                          className="product-badge"
                          style={{
                            backgroundColor: getBadgeColor(product.badge),
                          }}
                        >
                          {product.badge}
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

        <Product paginated showTabs hideAds />
      </div>

      <NewsletterBanner />
    </>
  );
};

export default CategoryProduct;