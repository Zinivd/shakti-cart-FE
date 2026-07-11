import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ShopAllProducts from "../../components/ShopAllproduct/ShopAllProducts.jsx";
import NewsletterBanner from "../../components/NewsLetterBanner/NewsLetter.jsx";
import { products } from "../../data/products.js";
import { Discover2 } from "../../../public/Assets.js";
import "./ProductDetails.css";

const categoryLabelMap = {
  men: "Men's Wear",
  women: "Women's Wear",
  kids: "Kids Wear",
  wedding: "Wedding Collection",
  nightSuit: "Night Suits",
  bottomWear: "Bottom Wear",
};

const ProductDetail = () => {
  const { id } = useParams();

  const product =
    products.find((p) => String(p.id) === String(id)) || products[0];

  const gallery =
    product?.images && product.images.length > 0
      ? product.images
      : [
          product?.image,
          product?.image,
          product?.image,
          product?.image,
          product?.image,
        ].filter(Boolean);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openPanel, setOpenPanel] = useState(null);

  const sku = `CS-GP-${String(product?.id ?? 1).padStart(3, "0")}`;

  const discount =
    product?.oldPrice && product?.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : 0;

  const togglePanel = (key) => {
    setOpenPanel((prev) => (prev === key ? null : key));
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // ---------- CURATED PICKS ----------
  const curatedPicks = useMemo(() => {
    return products
      .filter((p) => p.category === product?.category && p.id !== product?.id)
      .slice(0, 4);
  }, [product]);

  const accordionData = [
    {
      key: "description",
      title: "Description",
      content:
        product?.description ||
        "A wardrobe staple crafted from breathable, premium fabric. Designed for an easy, everyday fit with clean lines and a considered finish that pairs effortlessly with the rest of your wardrobe.",
    },
    {
      key: "shipping",
      title: "Shipping and Delivery",
      content:
        "Orders are dispatched within 24-48 hours. Standard delivery takes 3-5 business days depending on your location. Free shipping is available on orders above ₹999.",
    },
    {
      key: "return",
      title: "Return & Exchange",
      content:
        "Easy 7-day returns and exchanges from the date of delivery. Items must be unused, unwashed, and returned with original tags and packaging.",
    },
    {
      key: "comments",
      title: "User Comments",
      content:
        "Be the first to share your thoughts on this product. Your feedback helps other shoppers make better choices.",
    },
  ];

  if (!product) {
    return (
      <div className="main product-details-page">
        <p className="no-products">Product not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="main ">
        <div className="container pd-breadcrumb-wrap">
          <div className="pd-breadcrumb">
            <Link to="/">Home</Link>
            <i className="bi bi-chevron-right"></i>
            <Link to="/all-categories">All Categories</Link>
            <i className="bi bi-chevron-right"></i>
            <Link to={`/category?category=${product.category}`}>
              {categoryLabelMap[product.category] ||
                `${product.category}'s Wear`}
            </Link>
            <i className="bi bi-chevron-right"></i>
            <span className="active">
              {product.collection || "Product Details"}
            </span>
          </div>
        </div>

        {/* PRODUCT DETAIL CARD */}

        <div className="pd-card row g-0">
          <div className="col-12 col-lg-6 pd-gallery-col">
            <div className="pd-gallery">
              <div className="pd-thumb-list d-none d-lg-flex flex-column">
                {gallery.map((img, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className={`pd-thumb ${activeImage === idx ? "active" : ""}`}
                    onClick={() => setActiveImage(idx)}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} />
                  </button>
                ))}
              </div>

              {/* main image */}
              <div className="pd-main-image">
                <img src={gallery[activeImage]} alt={product.name} />

                <span className="pd-image-counter d-lg-none">
                  {activeImage + 1}/{gallery.length}
                </span>

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="pd-nav-arrow prev d-lg-none"
                      aria-label="Previous image"
                      onClick={() =>
                        setActiveImage((prev) =>
                          prev === 0 ? gallery.length - 1 : prev - 1,
                        )
                      }
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                      type="button"
                      className="pd-nav-arrow next d-lg-none"
                      aria-label="Next image"
                      onClick={() =>
                        setActiveImage((prev) =>
                          prev === gallery.length - 1 ? 0 : prev + 1,
                        )
                      }
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="col-12 col-lg-6 pd-info-col">
            <div className="pd-info">
              <div className="pd-top-row">
                <span className="pd-sku">{sku}</span>
                <button
                  type="button"
                  className="pd-share-btn"
                  aria-label="Share"
                >
                  <i className="bi bi-share"></i>
                </button>
              </div>

              <h1 className="pd-title">{product.name}</h1>

              <div className="pd-rating">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`bi ${
                      i < Math.round(product.rating)
                        ? "bi-star-fill"
                        : "bi-star"
                    }`}
                  ></i>
                ))}
                <span>{product.rating}</span>
              </div>

              <div className="pd-price-row">
                <span className="pd-price">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="pd-old-price">₹{product.oldPrice}</span>
                )}
                {discount > 0 && (
                  <span className="pd-discount">{discount}% OFF</span>
                )}
              </div>

              <div className="pd-stock">
                <span className="pd-stock-dot"></span>
                In stock
              </div>

              <div className="pd-actions">
                <div className="pd-qty">
                  <button
                    type="button"
                    onClick={decrement}
                    aria-label="Decrease quantity"
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={increment}
                    aria-label="Increase quantity"
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>

                <button type="button" className="pd-add-cart-btn">
                  <i className="bi bi-bag"></i>
                  ADD TO CART
                </button>
              </div>

              <button type="button" className="pd-buy-now-btn">
                BUY IT NOW
              </button>

              {/* ACCORDION */}
              <div className="pd-accordion">
                {accordionData.map((panel) => (
                  <div className="pd-accordion-item" key={panel.key}>
                    <button
                      type="button"
                      className="pd-accordion-head"
                      onClick={() => togglePanel(panel.key)}
                    >
                      <span>{panel.title}</span>
                      <i
                        className={`bi ${
                          openPanel === panel.key ? "bi-dash-lg" : "bi-plus-lg"
                        }`}
                      ></i>
                    </button>
                    {openPanel === panel.key && (
                      <div className="pd-accordion-body">
                        <p>{panel.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

   

        <h3 className="pd-section-title text-center">Curated Picks For You</h3>

        <div className="row pd-curated-grid gx-3 gy-4">
          {curatedPicks.map((item) => (
            <div className="col-6 col-md-3" key={item.id}>
              <Link
                to={`/productdetail/${item.id}`}
                className="pd-curated-card"
              >
                <div className="pd-curated-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <span className="pd-curated-sku">
                  CS-DR-{String(item.id).padStart(3, "0")}
                </span>
                <h6 className="pd-curated-name">{item.name}</h6>
                <div className="pd-curated-price">
                  <span className="price">₹{item.price}</span>
                  <span className="old-price">₹{item.oldPrice}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="klarna-banner">
          <div className="klarna-left">
            <h2 className="klarna-logo">Klarna.</h2>
          </div>

          <div className="klarna-image">
            <img src={Discover2} alt="Pets" />
          </div>

          <div className="klarna-content">
            <p>Pay with 4 installment, 0% interest</p>
            <h3>
              <strong>Buy Now,</strong> Pay Later
            </h3>
          </div>

          <div className="klarna-action">
            <button className="klarna-btn">DISCOVER NOW</button>
          </div>
        </div>

        <ShopAllProducts />
      </div>

      <NewsletterBanner />
    </>
  );
};

export default ProductDetail;
