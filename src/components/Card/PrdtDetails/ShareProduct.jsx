import React from "react";
import { Link } from "react-router-dom";

const ShareProduct = () => {
  return (
    <div className="share-product mt-3">
      <h5 className="text-uppercase mb-2">Share Now</h5>
      <div className="d-flex align-items-center justify-content-between flex-wrap column-gap-2">
        <Link>
          <button className="iconbtn">
            <i className="fa-brands fa-twitter"></i>
          </button>
        </Link>
        <Link>
          <button className="iconbtn">
            <i className="fa-brands fa-facebook-f"></i>
          </button>
        </Link>
        <Link>
          <button className="iconbtn">
            <i className="fa-brands fa-instagram"></i>
          </button>
        </Link>
        <Link>
          <button className="iconbtn">
            <i className="fa-brands fa-youtube"></i>
          </button>
        </Link>
        <Link>
          <button className="iconbtn">
            <i className="fa-brands fa-pinterest"></i>
          </button>
        </Link>
      </div>
      <hr className="my-2" />
      <label>
        <i className="fas fa-truck-fast"></i>&nbsp; Ships from{" "}
        <span className="text-dark fw-bold">Professional Courier</span>
      </label>
    </div>
  );
};

export default ShareProduct;
