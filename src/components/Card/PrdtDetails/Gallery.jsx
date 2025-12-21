import React, { useEffect, useState } from "react";

const Gallery = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
      setGalleryImages(images.slice(1));
    }
  }, [images]);

  if (!mainImage) return null;

  return (
    <div className="product-details-img">
      <div className="product-details-main-img position-relative">
        <img src={mainImage} className="d-flex mx-auto" alt="" />
        <h6 className="m-0 badge" style={{ backgroundColor: "#ff9800" }}>NEW</h6>
      </div>

      <div className="product-details-gallery-img">
        {galleryImages.map((src, index) => (
          <img
            key={index}
            src={src}
            className="d-flex mx-auto"
            onClick={() => {
              const temp = mainImage;
              setMainImage(src);
              const updated = [...galleryImages];
              updated[index] = temp;
              setGalleryImages(updated);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;