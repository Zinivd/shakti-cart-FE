import React, { useEffect, useState } from "react";
import EllipsisCard from "./EllipsisCard.jsx";
import "./Ellipsis.css";
import { getAllProducts } from "../../service/api";
import Loader from "../Loader/Loader.jsx";

const Ellipsis = ({ onLoaded }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllProducts();

      // console.log("API RESPONSE:", response);
      // console.log("PRODUCT ARRAY:", response?.data?.data);

      const products = response?.data?.data || [];

      setCategories(products);
      setTimeout(() => {
        onLoaded?.(products.length);
      }, 0);
    } catch (error) {
      console.error("API ERROR:", error);
      setCategories([]);
      onLoaded?.(0);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!categories.length) {
    return <p className="text-center">No Categories Found</p>;
  }

  return (
    <>
      {categories.map((item) => (
        <EllipsisCard
          key={item.product_id}
          id={item.product_id}
          ellipsisImg={item.images?.[0]}
          ellipsish6={item.product_name}
          categoryId={item.product_id}
        />
      ))}
    </>
  );
};

export default Ellipsis;
