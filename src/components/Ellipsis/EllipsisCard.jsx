import React from "react";
import { Link } from "react-router-dom";

const EllipsisCard = ({ ellipsisImg, ellipsish6 }) => {
  return (
    <li className="splide__slide">
      <Link className="ellipsis-card" to="/categories">
        <div className="ellipsis-img">
          <div className="ellipsis-img-overlay"></div>
          <img src={ellipsisImg || "/placeholder.png"} alt={ellipsish6} />
        </div>
        {/* <h6 className="text-center">{ellipsish6}</h6> */}
      </Link>
    </li>
  );
};

export default EllipsisCard;
