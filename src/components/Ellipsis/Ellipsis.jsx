import React, { useEffect, useState } from "react";
import EllipsisCard from "./EllipsisCard.jsx";
import "./Ellipsis.css";
import { getAllProducts } from "../../service/api";

const Ellipsis = ({ onLoaded }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllProducts();

      console.log("API RESPONSE:", response);
      console.log("PRODUCT ARRAY:", response?.data?.data);

      const products = response?.data?.data || [];

      setCategories(products);
      onLoaded?.(products.length);
    } catch (error) {
      console.error("API ERROR:", error);
      setCategories([]);
      onLoaded?.(0);
    } finally {
      setLoading(false);
    }
  };

  // ✅ MUST COME FIRST
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  // ✅ ONLY after loading finished
  if (!categories.length) {
    return <p className="text-center">No categories found</p>;
  }

  return (
    <>
      {categories.map((item) => (
        <EllipsisCard
          key={item.product_id}
          ellipsisImg={item.images?.[0]}
          ellipsish6={item.product_name}
          categoryId={item.product_id}
        />
      ))}
    </>
  );
};

export default Ellipsis;
