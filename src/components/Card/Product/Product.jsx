import React, { useEffect, useState } from "react";
import { VegIcon } from "../../../../public/Assets.js";
import ProductCard from "./ProductCard.jsx";
import Card1 from "../Discover/Card1.jsx";
import Card2 from "../Discover/Card2.jsx";
import Offer from "../Offer/Offer.jsx";
import { getAllProducts, getProductsByCategory } from "../../../service/api";
import "./Product.css";
import Loader from "../../Loader/Loader.jsx";
const Product = (props) => {
  const {
    filters,
    showCartBtn,
    categoryId,
    currentProductId,
    hideAds = false,
  } = props;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [filters, categoryId]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      let apiProducts = [];

      // 🔥 FLOW 1 & 2 HANDLING
      if (categoryId) {
        // Similar products flow
        const response = await getProductsByCategory(categoryId);
        apiProducts = response?.data?.data || [];
      } else if (filters?.category_id) {
        const response = await getProductsByCategory(filters.category_id);
        apiProducts = response?.data?.data || [];
      } else {
        const response = await getAllProducts();
        apiProducts = response?.data?.data || [];
      }

      // ❌ REMOVE CURRENT PRODUCT (SIMILAR FLOW)
      if (currentProductId) {
        apiProducts = apiProducts.filter(
          (p) => p.product_id !== currentProductId
        );
      }

      // 💰 PRICE FILTER
      const min = filters?.minPrice ?? 0;
      const max = filters?.maxPrice ?? 10000;

      const filteredProducts = apiProducts.filter((p) => {
        const price = Number(p.selling_price);
        return price >= min && price <= max;
      });

      const mappedProducts = filteredProducts.map((item) => ({
        id: item.product_id,
        productImg:
          item.images?.[0] ||
          "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
        brand: item.brand,
        rating: "4.0",
        productname: item.product_name,
        price: item.selling_price,
        slashprice: item.actual_price,
        badge: item.product_list_type?.toUpperCase() || "",
        icon: VegIcon,
      }));

      setProducts(mappedProducts);
    } catch (error) {
      console.error("Product load error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  // 🔥 CHUNK PRODUCTS INTO GROUPS OF 8
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const productChunks = chunkArray(products, 8);

if (!loading && hideAds && products.length === 0) {
  return (
    <div className="text-center my-4">
      <h6>No similar products found</h6>
    </div>
  );
}


  return (
    <div className="product">
      {productChunks.map((chunk, chunkIndex) => (
        <React.Fragment key={chunkIndex}>
          {/* PRODUCT GRID */}
          <div className="product-list">
            {chunk.map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                showCartBtn={showCartBtn}
              />
            ))}
          </div>

          {/* 🚫 ADS DISABLED FOR SIMILAR PRODUCTS */}
          {!hideAds && (
            <>
              {chunkIndex === 0 && products.length >= 8 && <Card1 />}
              {chunkIndex === 1 && products.length >= 16 && <Card2 />}
              {chunkIndex === 2 && products.length >= 24 && <Offer />}
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Product;
