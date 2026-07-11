import React from "react";
import { Link } from "react-router-dom";
import CategoryBanner from "../../components/CategoryBanner/CategoryBanner";
import ShopAllProducts from "../../components/ShopAllproduct/ShopAllProducts.jsx";
import ReelsShowcase from "../../components/ReelsShowCase/ReelsShowcase.jsx";
import "../../components/Card/Category/Category.css";
import NewsletterBanner from "../../components/NewsLetterBanner/NewsLetter.jsx";

const staticCategories = [
  {
    category_id: 1,
    category_name: "Women",
    image: "./assets/images/Category-Women.png",
  },
  {
    category_id: 2,
    category_name: "Men",
    image: "./assets/images/Category-Men.png",
  },
  {
    category_id: 3,
    category_name: "Kids",
    image: "./assets/images/Category-Kids.png",
  },
  {
    category_id: 4,
    category_name: "Wedding",
    image: "./assets/images/Category-Wedding.png",
  },
  {
    category_id: 5,
    category_name: "Night Suits",
    image: "./assets/images/Category-Night.png",
  },
  {
    category_id: 6,
    category_name: "Bottom Wear",
    image: "./assets/images/Category-Bottom.png",
  },
];

const AllCategories = () => {

  return (
    <>
      <div className="main">
        <CategoryBanner />

        <div className="category-main">
          <div className="body-head d-block text-center mb-4">
            <h3>
              All <span>categories</span>
            </h3>
          </div>
          <div className="body-head mb-3">
            <h5>
              Fashion <span>Categories</span>
            </h5>
          </div>

          <div className="category">
            <div className="category-list">
              {staticCategories.map((cat) => (
                <Link
                  to={`/categoryproducts?category=${cat.category_name.toLowerCase()}`}
                  key={cat.category_id}
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
                      <h6 className="mb-1 text-center">Stylish Clothes for</h6>
                      <h3 className="mb-0 text-center">{cat.category_name}</h3>
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
