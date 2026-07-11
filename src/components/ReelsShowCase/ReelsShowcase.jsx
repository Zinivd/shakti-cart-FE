import React, { useState, useRef } from "react";
import ReelCard from "./ReelCard.jsx";
import "./ReelsShowcase.css";
import { Reels_1, Reels_2, Reels_3, Reels_5 } from "../../../public/Assets.js";

const bannerImg =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600";

const reelsData = [
  {
    id: 1,
    productImg: Reels_1,
    caption: "NaviBlue Chudi",
  },
  {
    id: 2,
    productImg: Reels_2,
    caption: "Cargo Shirt",
  },
  {
    id: 3,
    productImg: Reels_3,
    caption: "White Shirt",
  },
  {
    id: 4,
    productImg: Reels_5,
    caption: "Modern Style",
  },
];

const getPosition = (index, activeIndex) => {
  const diff = index - activeIndex;
  if (diff === 0) return "0";
  if (diff === -1) return "-1";
  if (diff === 1) return "1";
  if (diff === -2) return "-2";
  if (diff === 2) return "2";
  return diff < 0 ? "far-left" : "far-right";
};

const ReelsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const goTo = (index) => {
    if (index < 0 || index >= reelsData.length) return;
    setActiveIndex(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const SWIPE_THRESHOLD = 40;
    if (touchDeltaX.current > SWIPE_THRESHOLD) {
      goTo(activeIndex - 1);
    } else if (touchDeltaX.current < -SWIPE_THRESHOLD) {
      goTo(activeIndex + 1);
    }
    touchDeltaX.current = 0;
  };

  return (
    <div className="reels-showcase-main">
      <div className="reels-banner">
        <img src={bannerImg} alt="Flybirds Banner" />
        <div className="reels-banner-overlay">
          <p className="reels-banner-brand">Flybirds</p>
          <h2 className="reels-banner-title">KEEPS YOU CHIC</h2>
          <h4 className="reels-banner-subtitle">FROM DAY TO NIGHT</h4>
        </div>
      </div>

      <div className="reels-section">
        <div className="reels-section-head text-center">
          <h5>Reel It, Feel It!</h5>
          <p>
            From studio to street — quick looks that make a statement, captured
            in motion.
          </p>
        </div>

        <div
          className="reels-list"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {reelsData.map((item, index) => (
            <ReelCard
              key={item.id}
              {...item}
              position={getPosition(index, activeIndex)}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <div className="reels-progress">
          <div
            className="reels-progress-fill"
            style={{
              width: `${100 / reelsData.length}%`,
              left: `${(100 / reelsData.length) * activeIndex}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ReelsShowcase;
