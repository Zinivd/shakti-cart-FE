import React from "react";
import {
  Ellipsis1,
  Ellipsis2,
  Ellipsis3,
  Ellipsis4,
  Ellipsis5,
  Ellipsis6,
  Ellipsis7,
  Ellipsis8,
} from "../../../public/Assets.js";
import EllipsisCard from "./EllipsisCard.jsx";
import "./Ellipsis.css";

const Ellipsis = () => {
  const ellipsisData = [
    {
      ellipsisImg: Ellipsis1,
      ellipsish6: "Clothing's",
    },
    {
      ellipsisImg: Ellipsis2,
      ellipsish6: "Pen",
    },
    {
      ellipsisImg: Ellipsis3,
      ellipsish6: "Gaming",
    },
    {
      ellipsisImg: Ellipsis4,
      ellipsish6: "Sport Equip",
    },
    {
      ellipsisImg: Ellipsis5,
      ellipsish6: "Kitchen",
    },
    {
      ellipsisImg: Ellipsis6,
      ellipsish6: "Mobile",
    },
    {
      ellipsisImg: Ellipsis7,
      ellipsish6: "Office",
    },
    {
      ellipsisImg: Ellipsis8,
      ellipsish6: "Computers",
    },
  ];
  return (
    <div className="ellipsis">
      <div className="ellipsis-list">
        {ellipsisData.map((item, index) => (
          <EllipsisCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Ellipsis;
