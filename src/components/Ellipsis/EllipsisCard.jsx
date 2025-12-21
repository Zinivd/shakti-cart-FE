import React from "react";
import { Link } from "react-router-dom";

const EllipsisCard = ({ ellipsisImg, ellipsish6 }) => {
  return (
    <Link className="ellipsis-card splide__slide">
      <div className="ellipsis-img">
        <img
          src={ellipsisImg || "/placeholder.png"} // 🔥 SAFE
          alt={ellipsish6}
        />
      </div>
      <h6 className="text-center">{ellipsish6}</h6>
    </Link>
  );
};

export default EllipsisCard;
