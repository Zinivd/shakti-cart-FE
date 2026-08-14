import React, { useEffect, useState } from "react";
import { NoSimilar, VegIcon } from "../../../assets/Assets.js";
import ProductCard from "./ProductCard.jsx";
import Card1 from "../Discover/Card1.jsx";
import Card2 from "../Discover/Card2.jsx";
import Offer from "../Offer/Offer.jsx";
import { getAllProducts, getProductsByCategory } from "../../../service/api";
import "./Product.css";
import Loader from "../../Loader/Loader.jsx";

const DESKTOP_PREVIEW_COUNT = 8;
const ITEMS_PER_PAGE = 6;

const getBadgeForProduct = (price, oldPrice, rating) => {
  const discountPercent =
    oldPrice && price ? ((oldPrice - price) / oldPrice) * 100 : 0;
  if (discountPercent >= 35) return "Top Offer";
  if (rating >= 4.7) return "Trending Now";
  if (rating >= 4.5) return "Top Rated";
  if (discountPercent >= 25) return "Best Seller";
  return "";
};

const getPageNumbers = (current, total) => {
  const range = [];
  const left = Math.max(current - 2, 1);
  const right = Math.min(current + 2, total);
  for (let i = left; i <= right; i++) range.push(i);
  return { pages: range, showLeftDots: left > 1, showRightDots: right < total };
};

const Product = (props) => {
  const {
    filters,
    showCartBtn,
    categoryId,
    currentProductId,
    hideAds = false,
    onResult,
    selectedSize,
    showTabs = false,
    paginated = false, 
  } = props;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadProducts();
  }, [filters, categoryId]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      let apiProducts = [];

      if (categoryId) {
        const response = await getProductsByCategory(categoryId);
        apiProducts = response?.data?.data?.data || [];
      } else if (filters?.category_id) {
        const response = await getProductsByCategory(filters.category_id);
        apiProducts = response?.data?.data?.data || [];
      } else {
        const response = await getAllProducts();
        apiProducts = response?.data?.data?.data || [];
      }

      if (currentProductId) {
        apiProducts = apiProducts.filter((p) => p.id !== currentProductId);
      }

      const min = filters?.minPrice ?? 0;
      const max = filters?.maxPrice ?? 10000;
      const filteredProducts = apiProducts.filter((p) => {
        const price = Number(p.selling_price);
        return price >= min && price <= max;
      });

      const mappedProducts = filteredProducts.map((item) => {
        const firstColorImage = item.colors?.[0]?.images?.[0];
        const fallbackImage = item.images?.[0];
        const productImg =
          firstColorImage ||
          fallbackImage ||
          "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

        const firstSize = item.colors?.[0]?.inventories?.[0]?.size || "S";

        const price = Number(item.selling_price);
        const oldPrice = Number(item.actual_price);
        const rating = Number(item.rating || 4);

        return {
          id: item.id,
          productImg,
          brand: item.brand,
          rating: String(rating || "4.0"),
          productname: item.name,
          price: item.selling_price,
          slashprice: item.actual_price,
          badge: item.product_list_type || getBadgeForProduct(price, oldPrice, rating),
          icon: VegIcon,
          size: selectedSize || firstSize,
          isWishlisted: item.is_wishlisted,
        };
      });

      setProducts(mappedProducts);
      onResult?.(mappedProducts.length);
    } catch (error) {
      console.error("Product load error:", error);
      setProducts([]);
      onResult?.(0);
    } finally {
      setLoading(false);
    }
  };

  const tabFilteredProducts = products;

  const desktopProducts = showAll
    ? tabFilteredProducts
    : tabFilteredProducts.slice(0, DESKTOP_PREVIEW_COUNT);
  const showViewAllBtn = !showAll && tabFilteredProducts.length > DESKTOP_PREVIEW_COUNT;

  const totalPages = Math.max(Math.ceil(tabFilteredProducts.length / ITEMS_PER_PAGE), 1);
  const paginatedProducts = tabFilteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const { pages, showLeftDots, showRightDots } = getPageNumbers(currentPage, totalPages);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <Loader />;

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  if (!loading && hideAds && !paginated && tabFilteredProducts.length === 0) {
    return (
      <div className="empty-state">
        <img src={NoSimilar} alt="" />
        <h6>No Similar Products Found</h6>
      </div>
    );
  }

 
  const renderTabBar = () => (
    <div className="body-head mb-3">
          <h5>
            Shop All <span>Products</span>
          </h5>
        </div>
  );

  if (paginated) {
    return (
      <div className="product shop-products-main">
        {showTabs && renderTabBar()}

        <div className="product-list desktop-only">
          {desktopProducts.map((item) => (
            <ProductCard key={item.id} {...item} showCartBtn={showCartBtn} />
          ))}
        </div>

        {showViewAllBtn && (
          <div className="shop-view-all-wrap desktop-only">
            <button className="shop-view-all-btn" onClick={() => setShowAll(true)}>
              View All
            </button>
          </div>
        )}

        <div className="product-list mobile-only">
          {paginatedProducts.map((item) => (
            <ProductCard key={item.id} {...item} showCartBtn={showCartBtn} />
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
                className={`shop-page-number ${page === currentPage ? "active" : ""}`}
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
  }

  const productChunks = chunkArray(tabFilteredProducts, 8);

  return (
    <div className="product">
      {showTabs && renderTabBar()}

      {productChunks.map((chunk, chunkIndex) => (
        <React.Fragment key={chunkIndex}>
          <div className="product-list">
            {chunk.map((item) => (
              <ProductCard key={item.id} {...item} showCartBtn={showCartBtn} />
            ))}
          </div>
          {!hideAds && (
            <>
              {chunkIndex === 0 && tabFilteredProducts.length >= 8 && <Card1 />}
              {chunkIndex === 1 && tabFilteredProducts.length >= 16 && <Card2 />}
              {chunkIndex === 2 && tabFilteredProducts.length >= 24 && <Offer />}
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Product;