import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Product from "../../components/Card/Product/Product.jsx";
import { filters } from "../../data/filter.js";
import NewsletterBanner from "../../components/NewsLetterBanner/NewsLetter.jsx";
import { Discover2, NoSimilar } from "../../assets/Assets.js";
import Loader from "../../components/Loader/Loader.jsx";
import {
  getAllCategories,
  getProductsByCategory,
  addToWishlist,
  removeFromWishlist,
} from "../../service/api";
import { toast } from "react-toastify";
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

const normalize = (str) => (str || "").toString().trim().toLowerCase();

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

  // ---------- PRODUCTS FROM API ----------
  const [rawProducts, setRawProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState({});
  const [wishlistLoading, setWishlistLoading] = useState({});

  useEffect(() => {
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

  // map API shape -> the shape this page's filter logic expects
  const categoryBaseProducts = useMemo(() => {
    const targetId = matchedCategory?.id ?? categoryIdFromUrl;

    const scoped = rawProducts.filter((item) => {
      const itemCatId = item.category_id ?? item.category?.id;
      const itemCatName = normalize(item.category?.category_name);
      const idMatches =
        targetId != null && String(itemCatId) === String(targetId);
      const nameMatches = rawCategory && itemCatName === normalize(rawCategory);

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

      // Dedupe sizes per product (a color can repeat a size across variants)
      const sizes = Array.from(
        new Set(
          (
            item.colors?.flatMap(
              (c) => c.inventories?.map((inv) => inv.size) || [],
            ) || []
          ).filter(Boolean),
        ),
      );

      const subcategoryName = item.subcategory?.sub_category_name || "";
      const price = Number(item.selling_price);
      const oldPrice = Number(item.actual_price);
      const rating = Number(item.rating || 4);

      return {
        id: item.id,
        subcategory: subcategoryName,
        // normalized version used only for filter comparisons
        subcategoryNormalized: normalize(subcategoryName),
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

  // ---------- PRICE RANGE: derive from real product data ----------
  // Falls back to filters.common.price only when we don't have products yet,
  // so the slider always reflects what's actually filterable.
  const staticPriceRange = filters.common.price || { min: 0, max: 50000 };
  const derivedPriceRange = useMemo(() => {
    if (categoryBaseProducts.length === 0) return staticPriceRange;
    const prices = categoryBaseProducts
      .map((p) => p.price)
      .filter((p) => !Number.isNaN(p));
    if (prices.length === 0) return staticPriceRange;
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [categoryBaseProducts, staticPriceRange]);

  const [maxPrice, setMaxPrice] = useState(derivedPriceRange.max);

  // reset filters whenever category changes
  useEffect(() => {
    setSelectedSubcategories([]);
    setSelectedSizes([]);
  }, [category, categoryIdFromUrl]);

  // keep maxPrice in sync once real product prices are known
  useEffect(() => {
    setMaxPrice(derivedPriceRange.max);
  }, [derivedPriceRange.max, category, categoryIdFromUrl]);

  const availableSubcategories = useMemo(() => {
    const fromCategoryApi =
      matchedCategory && Array.isArray(matchedCategory.subcategories)
        ? matchedCategory.subcategories.map((s) => s.sub_category_name)
        : [];

    if (fromCategoryApi.length > 0) return fromCategoryApi;

    // Fallback: derive from the products we actually have
    const fromProducts = Array.from(
      new Set(categoryBaseProducts.map((p) => p.subcategory).filter(Boolean)),
    );
    return fromProducts;
  }, [matchedCategory, categoryBaseProducts]);

  // ---------- SIZE LIST: dynamic from actual product data,
  // falls back to the static filters.common.sizes if no products loaded yet ----------
  const availableSizes = useMemo(() => {
    const fromProducts = Array.from(
      new Set(categoryBaseProducts.flatMap((p) => p.size)),
    ).filter(Boolean);
    if (fromProducts.length > 0) return fromProducts;
    return filters.common.sizes || [];
  }, [categoryBaseProducts]);

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

  const selectedSubcategoriesNormalized = useMemo(
    () => selectedSubcategories.map(normalize),
    [selectedSubcategories],
  );

  const categoryProducts = useMemo(() => {
    let list = categoryBaseProducts;

    if (selectedSubcategoriesNormalized.length > 0) {
      list = list.filter((p) =>
        selectedSubcategoriesNormalized.includes(p.subcategoryNormalized),
      );
    }

    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.size?.some((s) => selectedSizes.includes(s)));
    }

    list = list.filter((p) => p.price <= maxPrice);

    return list;
  }, [
    categoryBaseProducts,
    selectedSubcategoriesNormalized,
    selectedSizes,
    maxPrice,
  ]);

  const handleAddWishlist = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (wishlistLoading[product.id]) return;

    setWishlistLoading((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    try {
      const body = {
        product_id: product.id,
        size: product.size?.[0] || "S",
      };

      const res = await addToWishlist(body);

      if (res?.data?.success || res) {
        setWishlistItems((prev) => ({
          ...prev,
          [product.id]: true,
        }));

        toast.success("Added to Wishlist");
      }
    } catch {
      toast.error("Failed to add wishlist");
    } finally {
      setWishlistLoading((prev) => ({
        ...prev,
        [product.id]: false,
      }));
    }
  };

  const handleRemoveWishlist = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (wishlistLoading[product.id]) return;

    setWishlistLoading((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    try {
      const payload = {
        product_id: product.id,
        size: product.size?.[0] || "S",
      };

      const res = await removeFromWishlist(payload);

      if (res?.data?.success || res) {
        setWishlistItems((prev) => ({
          ...prev,
          [product.id]: false,
        }));

        toast.error("Removed from Wishlist");
      }
    } catch {
      toast.error("Failed to remove wishlist");
    } finally {
      setWishlistLoading((prev) => ({
        ...prev,
        [product.id]: false,
      }));
    }
  };

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
          min={derivedPriceRange.min}
          max={derivedPriceRange.max}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="price-range"
        />
        <div className="price-values">
          <span className="price-pill">₹{derivedPriceRange.min}</span>
          <span className="price-pill">₹{maxPrice}</span>
        </div>
      </div>

      {/* SIZE */}
      <div className="filter-block">
        <div className="filter-block-head">
          <h6>Size</h6>
        </div>
        <div className="size-grid">
          {availableSizes.map((s) => (
            <div
              className={`size-box ${selectedSizes.includes(s) ? "selected" : ""}`}
              key={s}
              onClick={() => toggleSize(s)}
            >
              {s}
            </div>
          ))}
          {availableSizes.length === 0 && (
            <span style={{ color: "#999", fontSize: 12 }}>No sizes</span>
          )}
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
                        className={`wishlist-icon ${
                          wishlistItems[product.id] ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          if (wishlistItems[product.id]) {
                            handleRemoveWishlist(e, product);
                          } else {
                            handleAddWishlist(e, product);
                          }
                        }}
                      >
                        <i
                          className={
                            wishlistItems[product.id]
                              ? "bi bi-heart-fill"
                              : "bi bi-heart"
                          }
                        ></i>
                      </span>
                    </div>
                    <div className="product-card-content">
                      <div className="product-meta">
                        <span className="product-sku">
                          CS-NB-{String(product.id).padStart(3, "0")}
                        </span>
                        <span className="category-product-rating">
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
            <h2 className="klarna-logo">Klarna</h2>
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
