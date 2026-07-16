import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CategoryBanner from "../../components/CategoryBanner/CategoryBanner";
import ShopAllProducts from "../../components/ShopAllproduct/ShopAllProducts.jsx";
import ReelsShowcase from "../../components/ReelsShowCase/ReelsShowcase.jsx";
import NewsletterBanner from "../../components/NewsLetterBanner/NewsLetter.jsx";
import "../../components/Card/Category/Category.css";

import { getAllCategories } from "../../service/api";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(Array.isArray(data) ? data : []);
  };

  return (
    <>
      <div className="main">
        <CategoryBanner />

        <div className="category-main">
          <div className="body-head d-block text-center mb-4">
            <h3>
              All <span>Categories</span>
            </h3>
          </div>

          <div className="body-head mb-3">
            <h5>
              Fashion <span>Categories</span>
            </h5>
          </div>

          <div className="category">
            <div className="category-list">
              {categories.map((cat) => (
                <Link
                  key={cat.category_id}
                  to={`/categoryproducts?category=${cat.category_name.toLowerCase()}`}
                  className="category-card-link"
                >
                  <div className="category-card mb-3">
                    <div className="category-card-overlay"></div>

                    <div className="category-card-img">
                      <img
                        src={cat.image || "/placeholder.png"}
                        width="100%"
                        alt={cat.category_name}
                      />
                    </div>

                    <div className="category-top">
                      <h6 className="mb-0">Upto 50% Off</h6>
                    </div>

                    <div className="category-bottom">
                      <h6 className="mb-1 text-center">
                        Stylish Clothes for
                      </h6>
                      <h3 className="mb-0 text-center">
                        {cat.category_name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <ShopAllProducts />
          <ReelsShowcase />
        </div>
      </div>

      <NewsletterBanner />
    </>
  );
};

export default AllCategories;