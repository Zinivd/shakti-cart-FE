import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TShirt1,
  TShirt2,
  TShirt3,
  TShirt4,
  TShirt5,
} from "../../../../public/Assets";

const Gallery = () => {
  const [mainImage, setMainImage] = useState(TShirt1);
  // Like
  const [isWished, setIsWished] = useState(false);
  const toggleWish = () => {
    setIsWished(!isWished);
  };

  const [galleryImages, setGalleryImages] = useState([
    TShirt2,
    TShirt3,
    TShirt4,
    TShirt5,
  ]);

  const handleImageClick = (index) => {
    const clickedSrc = galleryImages[index];
    const mainSrc = mainImage;
    const newGallery = [...galleryImages];
    newGallery[index] = mainSrc;
    setMainImage(clickedSrc);
    setGalleryImages(newGallery);
  };
  return (
    <div className="product-details-img">
      {/* Main Image */}
      <div className="product-details-main-img position-relative">
        <img src={mainImage} alt="T-Shirt" className="d-flex mx-auto" />
        {/* Badge */}
        <h6 className="m-0 badge" style={{ backgroundColor: "#ff9800" }}>
          NEW
        </h6>
        {/* Heart */}
        <h6
          className={`heart m-0 ${isWished ? "active" : ""}`}
          onClick={toggleWish}
        >
          <span>
            <i
              className={isWished ? "fas fa-heart" : "fa-regular fa-heart"}
            ></i>
          </span>
        </h6>
      </div>
      {/* Gallery Images */}
      <div className="product-details-gallery-img">
        {galleryImages.map((src, index) => (
          <img
            key={index}
            src={src}
            className="d-flex mx-auto"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
