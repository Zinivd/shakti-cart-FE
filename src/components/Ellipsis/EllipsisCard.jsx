import React from "react";
import { Link } from "react-router-dom";

const EllipsisCard = ({
  id,
  ellipsisImg,
  ellipsish6,
  brand,
  price,
  slashprice,
}) => {
  const shortProductName =
    ellipsish6?.length > 22 ? `${ellipsish6.slice(0, 22)}...` : ellipsish6;

  return (
    <li className="splide__slide">
      <Link className="ellipsis-card" to={`/productdetail/${id}`}>
        <div className="ellipsis-img">
          <div className="ellipsis-img-overlay"></div>

          <img src={ellipsisImg || "/placeholder.png"} alt={ellipsish6} />

          <div className="ellipsis-product-info">
            <div className="ellipsis-product-left">
              <div className="ellipsis-brand">{brand}</div>

              <div className="ellipsis-product-name">{shortProductName}</div>
            </div>

            <div className="ellipsis-price">
              <div className="ellipsis-selling-price">₹{price}</div>

              {slashprice && Number(slashprice) > Number(price) && (
                <div className="ellipsis-slash-price">₹{slashprice}</div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default EllipsisCard;
