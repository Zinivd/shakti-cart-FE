import React from "react";
import { Link } from "react-router-dom";

const EllipsisCard = (props) => {
  return (
    <Link className={`ellipsis-card`}>
      <div className="ellipsis-img">
        <img src={props.ellipsisImg} alt="" />
      </div>
      <h6 className="text-center">{props.ellipsish6}</h6>
    </Link>
  );
};

export default EllipsisCard;
