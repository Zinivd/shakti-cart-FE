import React from "react";
import { Link } from "react-router-dom";

const GridCard = ({ items }) => {
  return (
    <div className="grid-parent">
      {items.map((item, index) => (
        <div className={`grid-cards grid-${index + 1}`} key={index}>
          <h4>{item.gridHeader}</h4>
          <img
            src={item.gridImg}
            height="250px"
            className="d-flex"
            alt={item.gridHeader}
          />
          <h6>RS ₹{item.gridPrice}</h6>
        </div>
      ))}
    </div>
  );
};

export default GridCard;
