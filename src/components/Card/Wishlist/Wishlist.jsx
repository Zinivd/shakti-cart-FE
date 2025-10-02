import React from "react";
import "./Wishlist.css";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlistData = [
    {
      image:
        "https://www.unibicfoods.com/wp-content/uploads/2022/12/cashew-badam.png",
      brand: "Unibic",
      name: "Cadbury Oreo Vanilla Flavour Biscuit (41.75 g)",
      qty: 5,
      price: "45",
    },
    {
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/51uDcl29JoL._AC_UL600_SR600,600_.jpg",
      brand: "Nivea",
      name: "Nivea Haarmilch Shampoo (100ml)",
      qty: 2,
      price: "25",
    },
    {
      image: "https://m.media-amazon.com/images/I/71Af8qfZQUL.jpg",
      brand: "Lays",
      name: "Lay's Spaish Tomato Tango Chips (82 g)",
      qty: 10,
      price: "90",
    },
    {
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/51uDcl29JoL._AC_UL600_SR600,600_.jpg",
      brand: "Nivea",
      name: "Nivea Haarmilch Shampoo (100ml)",
      qty: 2,
      price: "125",
    },
    {
      image:
        "https://www.unibicfoods.com/wp-content/uploads/2022/12/cashew-badam.png",
      brand: "Unibic",
      name: "Cadbury Oreo Vanilla Flavour Biscuit (41.75 g)",
      qty: 5,
      price: "45",
    },
    {
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/51uDcl29JoL._AC_UL600_SR600,600_.jpg",
      brand: "Nivea",
      name: "Nivea Haarmilch Shampoo (100ml)",
      qty: 2,
      price: "25",
    },
    {
      image: "https://m.media-amazon.com/images/I/71Af8qfZQUL.jpg",
      brand: "Lays",
      name: "Lay's Spaish Tomato Tango Chips (82 g)",
      qty: 10,
      price: "90",
    },
    {
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/51uDcl29JoL._AC_UL600_SR600,600_.jpg",
      brand: "Nivea",
      name: "Nivea Haarmilch Shampoo (100ml)",
      qty: 2,
      price: "125",
    },
  ];
  return (
    <div className="wishlistCard">
      {wishlistData.map((item, index) => (
        <div className="wishlist-div" key={index}>
          <div className="wishlist-grid">
            <div className="close-icon">
              <i className="fas fa-xmark"></i>
            </div>
            <div className="product-detail">
              <img
                src={item.image}
                width="100%"
                height="100px"
                className="object-fit-cover"
                alt=""
              />
              <div className="product-content">
                <h5 className="mb-1">{item.name}</h5>
                <h6 className="mb-1">Color : Black</h6>
                <h6 className="mb-0">Quantity : {item.qty}</h6>
              </div>
            </div>
            <div className="product-content">
              <h5 className="mb-0">₹ {item.price}.00</h5>
            </div>
            <Link to="/cart">
              <button className="darkbtn">Add to Cart</button>
            </Link>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
