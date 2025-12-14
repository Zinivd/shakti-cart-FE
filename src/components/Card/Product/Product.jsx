import React, { useEffect, useState } from "react";
import { VegIcon } from "../../../../public/Assets.js";
import ProductCard from "./ProductCard.jsx";
import { getAllProducts } from "../../../service/api";
import "./Product.css";

const Product = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getAllProducts();

      const apiProducts = response?.data?.data || [];

      
      const mappedProducts = apiProducts.map((item) => ({
        id: item.product_id,

        productImg:
          item.images?.length > 0
            ? item.images[0]
            : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",

        brand: item.brand,
        rating: "4.0", 

        productname: item.product_name,

        price: item.selling_price,
        slashprice: item.actual_price,

        badge: item.product_list_type
          ? item.product_list_type.toUpperCase()
          : "",

        icon: VegIcon,
      }));

      setProducts(mappedProducts);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <div className="product">
      <div className="product-list">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            {...item}
            showCartBtn={props.showCartBtn}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
