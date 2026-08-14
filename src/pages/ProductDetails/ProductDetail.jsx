import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Product from "../../components/Card/Product/Product.jsx";
import NewsletterBanner from "../../components/NewsLetterBanner/NewsLetter.jsx";
import {
  getProductById,
  getAllProducts,
  getProductQuantities,
  addToCart,
} from "../../service/api";
import Loader from "../../components/Loader/Loader";
import { Discover2 } from "../../assets/Assets.js";
import { toast } from "react-toastify";
import "./ProductDetails.css";

const categoryLabelMap = {
  men: "Men's Wear",
  women: "Women's Wear",
  kids: "Kids Wear",
  wedding: "Wedding Collection",
  nightSuit: "Night Suits",
  bottomWear: "Bottom Wear",
};

const PLACEHOLDER_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ---- ALL HOOKS FIRST, NO CONDITIONAL RETURNS BEFORE THEM ----
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openPanel, setOpenPanel] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  // ---- SIZE / STOCK STATE (same pattern as ProductContent.jsx) ----
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeQuantities, setSizeQuantities] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  // ---- COLOR STATE (new) ----
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const selectedSizeStock = useMemo(() => {
    if (!selectedSize) return 0;
    return sizeQuantities.find((s) => s.size === selectedSize)?.qty || 0;
  }, [sizeQuantities, selectedSize]);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getProductById(id);

      if (response?.data?.success) {
        setProduct(response.data.data);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.log(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const loadAllProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();
      setAllProducts(response?.data?.data?.data || []);
    } catch (error) {
      console.log(error);
      setAllProducts([]);
    }
  }, []);

  
  const fetchQuantities = useCallback(async () => {
    if (!id) return;

    try {
      const res = await getProductQuantities(id);

      if (res?.data?.success) {
        const quantities = res.data.data?.quantities || [];

        const normalized = quantities.map((item) => ({
          size: item.size,
          qty: Number(item.quantity),
          unit: item.unit,
        }));

        setSizeQuantities(normalized);
      } else {
        setSizeQuantities([]);
      }
    } catch (error) {
      console.log(error);
      setSizeQuantities([]);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchQuantities();
    }
    
    setActiveImage(0);
    setQuantity(1);
    setSelectedSize("");
    setSelectedColorIndex(0);
  }, [id, fetchProduct, fetchQuantities]);

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]);

  
  useEffect(() => {
    if (!sizeQuantities.length || selectedSize) return;

    const firstAvailable = sizeQuantities.find((s) => s.qty > 0)?.size || "";
    setSelectedSize(firstAvailable);
    setQuantity(1);
  }, [sizeQuantities, selectedSize]);


  useEffect(() => {
    if (quantity > selectedSizeStock) {
      setQuantity(selectedSizeStock || 1);
    }
  }, [selectedSizeStock]); 

  
  const normalized = useMemo(() => {
    if (!product) return null;

    const price = Number(product.selling_price ?? product.price ?? 0);
    const oldPrice = Number(product.actual_price ?? product.oldPrice ?? 0);
    const discount =
      oldPrice > price && oldPrice > 0
        ? Math.round(((oldPrice - price) / oldPrice) * 100)
        : 0;

  
    const categoryRaw = product.category;
    const categoryName =
      typeof categoryRaw === "string"
        ? categoryRaw
        : categoryRaw?.category_name || categoryRaw?.name || "";
    const categoryId =
      typeof categoryRaw === "object" ? categoryRaw?.category_id : undefined;

  
    const colors = (product.colors || []).map((c) => ({
      id: c.id,
      colorId: c.color_id,
      name: c.color?.name || "",
      code: c.color?.code || "",
      images: c.images?.length > 0 ? c.images : [PLACEHOLDER_IMG],
      inventories: c.inventories || [],
    }));

    const flatImages = product.images || [];

    return {
      id: product.product_id ?? product.id,
      sku: product.product_id ?? product.id,
      name: product.product_name || product.name || "Product",
      brand: product.brand,
      category: categoryName,
      categoryId,
      collection: product.collection,
      rating: Number(product.rating || 4),
      price,
      oldPrice,
      discount,
      description: product.description,
      colors,
      images:
        colors.length > 0
          ? colors[0].images
          : flatImages.length > 0
            ? flatImages
            : [PLACEHOLDER_IMG],
    };
  }, [product]);


  const curatedPicks = useMemo(() => {
    if (!normalized) return [];

    return allProducts
      .filter(
        (p) =>
          p.category === normalized.category && p.product_id !== normalized.id,
      )
      .slice(0, 4)
      .map((p) => ({
        id: p.product_id,
        image: p.images?.[0] || PLACEHOLDER_IMG,
        name: p.product_name,
        price: Number(p.selling_price || 0),
        oldPrice: Number(p.actual_price || 0),
      }));
  }, [allProducts, normalized]);

  const togglePanel = (key) => {
    setOpenPanel((prev) => (prev === key ? null : key));
  };

  
  const increment = () =>
    setQuantity((q) => (q < selectedSizeStock ? q + 1 : q));
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/productdetail/${normalized.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: normalized.name || "Check this product",
          text: "Check out this product",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Product link copied to clipboard");
      }
    } catch (error) {
      console.error("Share failed:", error);
      toast.error("Unable to share product");
    }
  };

 
  const handleAddToCart = async () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      toast.error("Please Login to Add Products to Cart");
      navigate("/login");
      return false;
    }

    if (sizeQuantities.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return false;
    }

    if (sizeQuantities.length > 0 && selectedSizeStock === 0) {
      toast.error("Selected size is out of stock");
      return false;
    }

    if (sizeQuantities.length > 0 && quantity > selectedSizeStock) {
      toast.error("Quantity exceeds available stock");
      return false;
    }

    setCartLoading(true);
    try {
      const cartData = {
        product_id: normalized.id,
        size: selectedSize || undefined,
        quantity,
      };

      const response = await addToCart(cartData);

      if (response?.data?.success) {
        toast.success("Product added to cart");
        return true;
      } else {
        toast.error(response?.data?.message || "Failed to add product");
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return false;
    } finally {
      setCartLoading(false);
    }
  };

  const handleBuyNow = async () => {
    const success = await handleAddToCart();
    if (success) navigate("/cart");
  };

  
  if (loading) return <Loader />;

  if (!normalized) {
    return (
      <div className="main product-details-page">
        <p className="no-products">Product not found.</p>
      </div>
    );
  }

  const accordionData = [
    {
      key: "description",
      title: "Description",
      content:
        normalized.description ||
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

  const hasColors = normalized.colors && normalized.colors.length > 0;
  const activeColor = hasColors
    ? normalized.colors[selectedColorIndex] || normalized.colors[0]
    : null;
  const gallery = hasColors ? activeColor.images : normalized.images;

  const handleSelectColor = (idx) => {
    setSelectedColorIndex(idx);
    setActiveImage(0); 
  };

  return (
    <>
      <div className="main">
        <div className="container pd-breadcrumb-wrap">
          <div className="pd-breadcrumb">
            <Link to="/">Home</Link>
            <i className="bi bi-chevron-right"></i>
            <Link to="/all-categories">All Categories</Link>
            <i className="bi bi-chevron-right"></i>
            <Link
              to={`/categoryproducts?category_id=${normalized.categoryId || ""}&category=${encodeURIComponent(
                normalized.category,
              )}`}
            >
              {categoryLabelMap[normalized.category?.toLowerCase()] ||
                (normalized.category
                  ? `${normalized.category} Wear`
                  : "Category")}
            </Link>
            <i className="bi bi-chevron-right"></i>
            <span className="active">
              {normalized.collection || "Product Details"}
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
                    <img src={img} alt={`${normalized.name} ${idx + 1}`} />
                  </button>
                ))}
              </div>

              <div className="pd-main-image">
                <img src={gallery[activeImage]} alt={normalized.name} />

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
                <span className="pd-sku">{normalized.sku}</span>
                <button
                  type="button"
                  className="pd-share-btn"
                  aria-label="Share"
                  onClick={handleShare}
                >
                  <i className="bi bi-share"></i>
                </button>
              </div>

              <h1 className="pd-title">{normalized.name}</h1>

              <div className="pd-rating">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`bi ${
                      i < Math.round(normalized.rating)
                        ? "bi-star-fill"
                        : "bi-star"
                    }`}
                  ></i>
                ))}
                <span>{normalized.rating}</span>
              </div>

              <div className="pd-price-row">
                <span className="pd-price">₹{normalized.price}</span>
                {normalized.oldPrice > 0 && (
                  <span className="pd-old-price">₹{normalized.oldPrice}</span>
                )}
                {normalized.discount > 0 && (
                  <span className="pd-discount">
                    {normalized.discount}% OFF
                  </span>
                )}
              </div>

              {hasColors && (
                <div className="pd-colors mt-3">
                  <h6 className="mb-2">
                    Colour{activeColor?.name ? `: ${activeColor.name}` : ""}
                  </h6>
                  <div className="colors-div">
                    {normalized.colors.map((c, idx) => (
                      <button
                        key={c.id ?? idx}
                        type="button"
                        className={`colorswatch ${
                          selectedColorIndex === idx ? "active" : ""
                        }`}
                        onClick={() => handleSelectColor(idx)}
                        title={c.name || `Colour ${idx + 1}`}
                      >
                        <img src={c.images[0]} alt={c.name || "colour"} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            
              {sizeQuantities.length > 0 && (
                <div className="pd-sizes mt-3">
                  <h6 className="mb-2">Sizes Available</h6>
                  <div className="sizes-div">
                    {sizeQuantities.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`sizebtn ${selectedSize === s.size ? "active" : ""}`}
                        disabled={!s.qty}
                        onClick={() => {
                          if (!s.qty) return;
                          setSelectedSize(s.size);
                          setQuantity(1);
                        }}
                        title={!s.qty ? "Out of stock" : s.size}
                      >
                        {s.size ?? "All Sizes Available"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pd-stock">
                <span className="pd-stock-dot"></span>
                {sizeQuantities.length > 0
                  ? selectedSizeStock > 0
                    ? "In stock"
                    : "Out of stock"
                  : "In stock"}
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

                <button
                  type="button"
                  className="pd-add-cart-btn"
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                >
                  <i className="bi bi-bag"></i>
                  {cartLoading ? "ADDING..." : "ADD TO CART"}
                </button>
              </div>

              <button
                type="button"
                className="pd-buy-now-btn"
                onClick={handleBuyNow}
                disabled={cartLoading}
              >
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

        {curatedPicks.length > 0 && (
          <>
            <h3 className="pd-section-title text-center">
              Curated Picks For You
            </h3>

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
                      {item.oldPrice > 0 && (
                        <span className="old-price">₹{item.oldPrice}</span>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

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

        <Product paginated showTabs currentProductId={normalized.id} />
      </div>

      <NewsletterBanner />
    </>
  );
};

export default ProductDetail;