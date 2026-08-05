import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ShopProductCard from "./ShopProductCard.jsx";
import { products } from "../../data/products.js";
import "./ShopAllProducts.css";

const tabs = ["All", "Trending now", "best sellers", "top offers"];

const tabToBadge = {
  "Trending now": "Trending Now",
  "best sellers": "Best Seller",
  "top offers": "Top Offer",
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

const shopProducts = products.map((product) => ({
  id: product.id,
  productImg: product.image,
  code: `CS-NB-${String(product.id).padStart(3, "0")}`,
  rating: String(product.rating),
  productname: product.name,
  price: String(product.price),
  slashprice: String(product.oldPrice),
  badge: getBadgeForProduct(product),
}));

const DESKTOP_PREVIEW_COUNT = 8;
const ITEMS_PER_PAGE = 6;

const getPageNumbers = (current, total) => {
  const range = [];
  const left = Math.max(current - 2, 1);
  const right = Math.min(current + 2, total);

  for (let i = left; i <= right; i++) range.push(i);

  return {
    pages: range,
    showLeftDots: left > 1,
    showRightDots: right < total,
  };
};

const ShopAllProducts = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    return activeTab === "All"
      ? shopProducts
      : shopProducts.filter((item) => item.badge === tabToBadge[activeTab]);
  }, [activeTab]);

  const desktopProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, DESKTOP_PREVIEW_COUNT);
  const showViewAllBtn =
    !showAll && filteredProducts.length > DESKTOP_PREVIEW_COUNT;

  const totalPages = Math.max(
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
    1,
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const { pages, showLeftDots, showRightDots } = getPageNumbers(
    currentPage,
    totalPages,
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowAll(false);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="shop-products-main">
      <div className="shop-products-head">
        <h5>
          Shop all <span>Products</span>
        </h5>

        <div className="shop-products-tabs">
          {tabs.map((tab) => (
            <span
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="shop-mobile-filter-wrap" ref={filterRef}>
          <button
            className="shop-filter-icon-btn"
            onClick={() => setFilterOpen((o) => !o)}
            aria-label="Filter products"
          >
            <i className="fa fa-sliders-h"></i>
          </button>

          {filterOpen && (
            <div className="shop-filter-dropdown">
              {tabs.map((tab) => (
                <span
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="shop-products-list desktop-only">
        {desktopProducts.map((item) => (
          <Link
            to={`/productdetail/${item.id}`}
            className="shop-product-card-link"
            key={item.id}
          >
            <ShopProductCard {...item} />
          </Link>
        ))}
      </div>

      {showViewAllBtn && (
        <div className="shop-view-all-wrap desktop-only">
          <button
            className="shop-view-all-btn"
            onClick={() => setShowAll(true)}
          >
            View All
          </button>
        </div>
      )}

      <div className="shop-products-list mobile-only">
        {paginatedProducts.map((item) => (
          <Link
            to={`/productdetail/${item.id}`}
            className="shop-product-card-link"
            key={item.id}
          >
            <ShopProductCard {...item} />
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="shop-pagination-wrap mobile-only mt-4">
          <button
            className="shop-page-arrow"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <i className="fa fa-chevron-left"></i>
          </button>

          {showLeftDots && (
            <span
              className="shop-page-dots"
              onClick={() => goToPage(Math.max(currentPage - 5, 1))}
            >
              ..
            </span>
          )}

          {pages.map((page) => (
            <span
              key={page}
              className={`shop-page-number ${
                page === currentPage ? "active" : ""
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </span>
          ))}

          {showRightDots && (
            <span
              className="shop-page-dots"
              onClick={() => goToPage(Math.min(currentPage + 5, totalPages))}
            >
              ..
            </span>
          )}

          <button
            className="shop-page-arrow"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopAllProducts;
