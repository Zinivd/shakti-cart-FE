import React, { useEffect, useState } from "react";
import EllipsisCard from "./EllipsisCard.jsx";
import "./Ellipsis.css";
import { getAllProducts } from "../../service/api";
import Loader from "../Loader/Loader.jsx";
import { NoProducts } from "../../assets/Assets.js";

const Ellipsis = ({ onLoaded }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllProducts();
      // ⬇️ CHANGED: paginated response, product array nested one level deeper
      const products = response?.data?.data?.data || [];
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
    return (
      <div className="empty-state">
        <img src={NoProducts} alt="" />
        <h6>No Categories Found</h6>
      </div>
    );
  }

  return (
    <>
      {categories.map((item) => {
        const firstColorImage = item.colors?.[0]?.images?.[0];
        const fallbackImage = item.images?.[0];
        const displayImage = firstColorImage || fallbackImage;

        return (
          <EllipsisCard
            key={item.id}
            id={item.id}
            ellipsisImg={displayImage}
            ellipsish6={item.name}
          />
        );
      })}
    </>
  );
};

export default Ellipsis;