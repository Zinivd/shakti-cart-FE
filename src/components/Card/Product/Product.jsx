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
  const displayLimit = props.limit || 16;

  useEffect(() => {
    loadProducts();
  }, [props.filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      let apiProducts = [];

      // 🔥 SAFETY GUARD
      if (props.filters && props.filters.category_id) {
        const response = await getProductsByCategory(
          props.filters.category_id
        );
        apiProducts = response?.data?.data || [];
      } else {
        const response = await getAllProducts();
        apiProducts = response?.data?.data || [];
      }

      // 🔥 PRICE FILTER (SAFE DEFAULTS)
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
      setProducts([]); // 🔥 prevent crash
    } finally {
      setLoading(false);
    }
  };

  const visibleProducts = products.slice(0, displayLimit);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="product">
      <div className="product-list">
        {products.map((item, index) => (
          <React.Fragment key={item.id}>
            <ProductCard {...item} showCartBtn={props.showCartBtn} />

            {(index + 1) % 8 === 0 && (
              <div className="inter-card-wrapper">
                {(index + 1) === 8 && <Card1 />}
                {(index + 1) === 16 && <Card2 />}
                {(index + 1) === 24 && <Offer />}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {products.length > displayLimit && (
        <div className="text-center mt-4">
          <Link to="/products" className="btn btn-primary">
            View All
          </Link>
        </div>
      )}
    </div>
  );
};

export default Product;
