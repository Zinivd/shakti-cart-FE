import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import Card_2 from "../../components/Card/Discover/Card2";
import Product from "../../components/Card/Product/Product";
import OfferProduct from "../../components/Card/Offer/OfferProduct";
import Offer from "../../components/Card/Offer/Offer";
import Gallery from "../../components/Card/PrdtDetails/Gallery";
import ShareProduct from "../../components/Card/PrdtDetails/ShareProduct";
import ProductContent from "../../components/Card/PrdtDetails/ProductContent";
import Description from "../../components/Card/PrdtDetails/Description";
import Reviews from "../../components/Card/Reviews/Reviews";
import Comments from "../../components/Card/Reviews/Comments";
import { getProductById } from "../../service/api";
import AddReview from "../../components/Popup/AddReview";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  // const apiCalled = useRef(false); 

useEffect(() => {
  if (!id) return;

  fetchProductDetails();
}, [id]);
  const fetchProductDetails = async () => {
  try {
    setLoading(true);
    setProduct(null);

    const response = await getProductById(id);

    if (response?.data?.success) {
      setProduct(response.data.data);
    }
  } catch (error) {
    console.error("Product API error", error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="main">
        <div className="main-header">
          <div className="body-head">
            <h6>Loading product details...</h6>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="main">
        <div className="main-header">
          <div className="body-head">
            <h6>Product not found</h6>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="main-header">
        <div className="body-head">
          <h6 className="d-flex column-gap-2 flex-wrap">
            <Link to="/">
              Home <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/categories">
              All Categories <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/products">{product.category_name}</Link>
            <i className="fa fa-angle-right ps-1"></i>
            <Link className="active">{product.product_name}</Link>
          </h6>
        </div>

        <div className="product-details-main">
          <div className="product-details-left">
            <Gallery images={product.images} />
          </div>

          <div className="product-details-center">
            <ProductContent product={product} />
          </div>

          <div className="product-details-right">
            {/* <OfferProduct /> */}
            <ShareProduct productName={product.product_name} productId={id} />
          </div>
        </div>

        <div className="product-description my-3">
          <div className="body-head d-block mt-5">
            <h4 className="mb-3">
              <span>|</span> Product Description
            </h4>
            <h6 className="text-decoration-underline">Description</h6>
          </div>
          <Description product={product} />
        </div>

        <div className="main-header">
          <div className="body-head d-block">
            <h4 className="mb-3">
              <span>|</span> Ratings
            </h4>
            <h6 className="text-decoration-underline">Ratings</h6>
          </div>
          <div className="reviews-main my-3">
            <Reviews productId={id} />
          </div>
        </div>

        <div className="product-description my-3">
          <div className="body-head">
            <h4 className="mb-0">
              <span>|</span> User Comments
            </h4>
            <a data-bs-toggle="modal" data-bs-target="#addReview">
              <button className="cartbtn">Add Review</button>
            </a>
          </div>
          <div className="body-head mt-3">
            <div className="d-flex align-items-center column-gap-3">
              <h6>Ratings</h6>
              <h6 className="text-decoration-underline">Comments</h6>
            </div>
          </div>
         <Comments productId={id} />
<AddReview productId={id} onSuccess={() => window.location.reload()} />

        </div>

        <div className="main-header">
          {/* <Card_2 categoryId={product.category_id} /> */}
        </div>

        <div className="main-header">
          <div className="body-head mb-4">
            <h5>
              Similar <span>Products</span>
            </h5>
          </div>
          <Product
  categoryId={product.category_id}
  currentProductId={id}
  hideAds={true}
/>
          {/* <div className="d-flex align-items-center justify-content-center my-3">
            <Link to="/products">
              <button className="darkbtn">
                View All <i className="fa fa-arrow-right ps-1"></i>
              </button>
            </Link>
          </div> */}
        </div>

        <div className="main-header">
          {/* <Offer /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
