import React from "react";
import {
  Shoes,
  Foods,
  Sports,
  Jewels,
  Notes,
  Bags,
  Skin,
  Electronics,
} from "../../../../public/Assets.js";
import FeatureCard from "./FeatureCard.jsx";
import "./Feature.css";

const Feature = (props) => {
  const featureData = [
    {
      featureColor: "blue",
      featureImg: Shoes,
      featureHead: "Shoes Collection",
    },
    {
      featureColor: "green",
      featureImg: Electronics,
      featureHead: "Electronics",
    },
    {
      featureColor: "purple",
      featureImg: Skin,
      featureHead: "Skincare",
    },
    {
      featureColor: "grass",
      featureImg: Bags,
      featureHead: "Bags",
    },
    {
      featureColor: "brown",
      featureImg: Notes,
      featureHead: "NoteBook",
    },
    {
      featureColor: "sky",
      featureImg: Jewels,
      featureHead: "Handicrafts",
    },
    {
      featureColor: "yellow",
      featureImg: Sports,
      featureHead: "Sportwear Items",
    },
    {
      featureColor: "gray",
      featureImg: Foods,
      featureHead: "Food Products",
    },
  ];
  return (
    <div className="feature">
      <div className="feature-list">
        {featureData.map((item, index) => (
          <FeatureCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Feature;
