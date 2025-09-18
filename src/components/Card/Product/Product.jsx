import React from "react";
import { VegIcon } from "../../../../public/Assets.js";
import ProductCard from "./ProductCard.jsx";
import "./Product.css";

const Product = () => {
  const productData = [
    {
      productImg:
        "https://www.unibicfoods.com/wp-content/uploads/2022/12/cashew-badam.png",
      brand: "Unibic",
      rating: "4",
      productname: "Cadbury Oreo Vanilla Flavour Biscuit (41.75 g)",
      price: "45",
      slashprice: "50",
      badge: "Best Seller",
      icon: VegIcon,
    },
    {
      productImg:
        "https://images-eu.ssl-images-amazon.com/images/I/51uDcl29JoL._AC_UL600_SR600,600_.jpg",
      brand: "Nivea",
      rating: "3.5",
      productname: "Nivea Haarmilch Shampoo (100ml)",
      price: "25",
      slashprice: "30",
      badge: "Top Rated",
    },
    {
      productImg:
        "https://cdn.shopify.com/s/files/1/0523/9934/1736/products/102761-2_7-kurkure-namkeen-masala-munch.jpg?v=1633507330",
      brand: "Kurkure",
      rating: "4.5",
      productname: "Kurkure Masala Munch (mixture) (75 g)",
      price: "45",
      slashprice: "50",
      icon: VegIcon,
    },
    {
      productImg:
        "https://m.media-amazon.com/images/I/71Af8qfZQUL.jpg",
      brand: "Lays",
      rating: "5",
      productname: "Lay's Spaish Tomato Tango Chips (82 g)",
      price: "90",
      slashprice: "100",
      icon: VegIcon,
    },
    {
      productImg:
        "https://images-eu.ssl-images-amazon.com/images/I/51uDcl29JoL._AC_UL600_SR600,600_.jpg",
      brand: "Nivea",
      rating: "3.5",
      productname: "Nivea Haarmilch Shampoo (100ml)",
      price: "25",
      slashprice: "30",
    },
    {
      productImg:
        "https://cdn.shopify.com/s/files/1/0523/9934/1736/products/102761-2_7-kurkure-namkeen-masala-munch.jpg?v=1633507330",
      brand: "Kurkure",
      rating: "4.5",
      productname: "Kurkure Masala Munch (mixture) (75 g)",
      price: "45",
      slashprice: "50",
      badge: "Trending Now",
      icon: VegIcon,
    },
    {
      productImg:
        "https://m.media-amazon.com/images/I/71Af8qfZQUL.jpg",
      brand: "Lays",
      rating: "5",
      productname: "Lay's Spaish Tomato Tango Chips (82 g)",
      price: "90",
      slashprice: "100",
      badge: "Top Rated",
      icon: VegIcon,
    },
    {
      productImg:
        "https://m.media-amazon.com/images/I/71Af8qfZQUL.jpg",
      brand: "Lays",
      rating: "5",
      productname: "Lay's Spaish Tomato Tango Chips (82 g)",
      price: "90",
      slashprice: "100",
      badge: "Best Seller",
      icon: VegIcon,
    },
  ];
  return (
    <div className="product">
      <div className="product-list">
        {productData.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Product;
