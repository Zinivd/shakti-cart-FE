import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner/Banner.jsx";
import NewsletterBanner from "../../components/NewsLetterBanner/NewsLetter.jsx";
import "../../components/Card/Category/Category.css";
import { getAllCategories } from "../../service/api";
import Loader from "../../components/Loader/Loader.jsx";

const ShopAllProducts = lazy(() =>
  import("../../components/ShopAllproduct/ShopAllProducts.jsx")
);
// import ReelsShowcase from "../../components/ReelsShowCase/ReelsShowcase.jsx";

const CategorySkeleton = () => (
  <div className="category-list">
    {Array.from({ length: 8 }).map((_, i) => (
      <div className="category-card mb-3 category-card-skeleton" key={i} />
    ))}
  </div>
);

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      setCategoryError(false);
      const data = await getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
      setCategoryError(true);
    } finally {
      setLoadingCategories(false);
    }
  };

  return (
    <>
      <div className="main">
        <Banner />
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
            {loadingCategories ? (
              <CategorySkeleton />
            ) : categoryError ? (
              <div className="empty-state text-center">
                <h6>Unable to load categories. Please try again.</h6>
              </div>
            ) : categories.length === 0 ? (
              <div className="empty-state text-center">
                <h6>No categories found.</h6>
              </div>
            ) : (
              <div className="category-list">
                {categories.map((cat) => (
                  <Link
                    key={cat.category_id}
                    to={`/categoryproducts?category_id=${cat.category_id}&category=${encodeURIComponent(
                      cat.category_name
                    )}`}
                    className="category-card-link"
                  >
                    <div className="category-card mb-3">
                      <div className="category-card-overlay"></div>
                      <div className="category-card-img">
                        <img
                          src={cat.image || "/placeholder.png"}
                          width="100%"
                          alt={cat.category_name}
                          loading="lazy"
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
            )}
          </div>

          <Suspense fallback={<Loader />}>
            <ShopAllProducts />
          </Suspense>
          {/* <ReelsShowcase /> */}
        </div>
      </div>
      <NewsletterBanner />
    </>
  );
};

export default AllCategories;