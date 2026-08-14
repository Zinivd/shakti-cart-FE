import React, { useEffect, useState } from "react";
import { NoSimilar, VegIcon } from "../../../../public/Assets.js";
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
    onResult,
    selectedSize
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

      if (categoryId) {
        const response = await getProductsByCategory(categoryId);
        // ⬇️ shakti-products index is paginated — data nested one level deeper
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

        return {
          id: item.id,
          productImg,
          brand: item.brand,
          rating: "4.0",
          productname: item.name,
          price: item.selling_price,
          slashprice: item.actual_price,
          badge: item.product_list_type?.toUpperCase() || "",
          icon: VegIcon,
          size: selectedSize || firstSize,
          isWishlisted: item.is_wishlisted
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

  if (loading) return <Loader />;

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
      <div className="empty-state">
        <img src={NoSimilar} alt="" />
        <h6>No Similar Products Found</h6>
      </div>
    );
  }

  return (
    <div className="product">
      {productChunks.map((chunk, chunkIndex) => (
        <React.Fragment key={chunkIndex}>
          <div className="product-list">
            {chunk.map((item) => (
              <ProductCard key={item.id} {...item} showCartBtn={showCartBtn} />
            ))}
          </div>
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