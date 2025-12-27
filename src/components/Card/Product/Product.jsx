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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [props.filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      let apiProducts = [];

      if (props.filters?.category_id) {
        const response = await getProductsByCategory(props.filters.category_id);
        apiProducts = response?.data?.data || [];
      } else {
        const response = await getAllProducts();
        apiProducts = response?.data?.data || [];
      }

      const min = props.filters?.minPrice ?? 0;
      const max = props.filters?.maxPrice ?? 10000;

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
              showCartBtn={props.showCartBtn}
            />
          ))}
        </div>

        {/* FULL WIDTH ADS - SAFE CONDITIONS */}
        {chunkIndex === 0 && products.length >= 8 && <Card1 />}
        {chunkIndex === 1 && products.length >= 16 && <Card2 />}
        {chunkIndex === 2 && products.length >= 24 && <Offer />}
      </React.Fragment>
    ))}
  </div>

  );
};


export default Product;
