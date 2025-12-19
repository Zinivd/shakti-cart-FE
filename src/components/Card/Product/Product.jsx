import React, { useEffect, useState } from "react";
import { VegIcon } from "../../../../public/Assets.js";
import ProductCard from "./ProductCard.jsx";
import Card1 from "../Discover/Card1.jsx";
import Card2 from "../Discover/Card2.jsx";
import Offer from "../Offer/Offer.jsx";
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

        {products.map((item, index) => (
          <React.Fragment key={item.id}>

            {/* Product Card */}
            <ProductCard
              {...item}
              showCartBtn={props.showCartBtn}
            />

            {/* Insert card after every 8 products */}
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
    </div>
  );
};

export default Product;
