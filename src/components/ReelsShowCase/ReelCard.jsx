import React from "react";

const ReelCard = ({ productImg, caption, position, onClick }) => {
  return (
    <div className="reel-card" data-pos={position} onClick={onClick}>
      <div className="reel-card-img">
        <img
          src={productImg}
          alt={caption}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/400x600/f0f0f0/999999?text=Image";
          }}
        />
        <span className="reel-brand-tag">Fly Birds</span>
      </div>

      <div className="reel-card-footer">
        <p>{caption}</p>
        <span className="reel-add-icon">
          <i className="fa fa-plus"></i>
        </span>
      </div>
    </div>
  );
};

export default ReelCard;
