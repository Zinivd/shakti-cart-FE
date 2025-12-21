import React, { useEffect, useState } from "react";
import EllipsisCard from "./EllipsisCard.jsx";
import "./Ellipsis.css";
import { getAllCategories } from "../../service/api";

const Ellipsis = ({ onLoaded }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data || []);
    onLoaded?.(data?.length || 0); // 🔥 PASS COUNT
  };

  if (!categories.length) {
    return <p className="text-center">No categories found</p>;
  }

  return (
    <>
        {categories.map((item) => (
          <EllipsisCard
            key={item.category_id}
            ellipsisImg={item.image}   
            ellipsish6={item.category_name}
            categoryId={item.category_id}
          />
        ))}
    </>
  );
};

export default Ellipsis;
