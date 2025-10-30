import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = (props) => {
  return (
    <Link>
      <div className="feature-card mb-4">
        <div className={`feature-card-img mb-2 ${props.featureColor}`}>
          <img src={props.featureImg} width="100%" alt="" />
        </div>
        <div className="feature-bottom">
          <h6 className="mb-1 text-center">{props.featureHead}</h6>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
