import React, { useState } from "react";
import { TShirt1, TShirt2, TShirt3 } from "../../../../public/Assets";
import "./Reviews.css";

const Comments = () => {
  const [expandedIndexes, setExpandedIndexes] = useState({});

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const comment = [
    {
      id: 1,
      name: "John Doe",
      date: "02-Sept-2025",
      rating: "4.5",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ducimus commodi molestias numquam ex exercitationem? Dolor alias, necessitatibus vel nihil assumenda eaque eius! Fugit rem voluptas mollitia explicabo maxime exercitationem omnis quasi rerum eos, voluptates aspernatur, perferendis at assumenda dolor aliquid repudiandae iusto vitae tempora? Doloremque fugit nobis fuga cumque recusandae, voluptas ad delectus aspernatur dolores, reiciendis?",
    },
  ];
  return (
    <div className="comments">
      {comment.map((item, index) => (
        <div className="comments-div mb-3" key={index}>
          <h6
            className={`comments-descp ${expandedIndexes[index] ? "expanded" : ""}`}
            key={index}
          >
            {item.comment}
          </h6>
          {item.comment.length > 50 && (
            <button
              className="toggle-btn"
              onClick={() => toggleExpand(index)}
            >
              {expandedIndexes[index] ? "Show less" : "Read more"}
            </button>
          )}

          <div className="comments-img my-3">
            <img src={TShirt1} alt="" />
            <img src={TShirt2} alt="" />
            <img src={TShirt3} alt="" />
          </div>

          <div className="star-div d-flex align-items-center column-gap-3 mb-3">
            <div className="stars d-flex align-items-center column-gap-1">
              <i className="bx bxs-star text-warning"></i>
              <i className="bx bxs-star text-warning"></i>
              <i className="bx bxs-star text-warning"></i>
              <i className="bx bx-star"></i>
              <i className="bx bx-star"></i>
            </div>
            <span>{item.rating}</span>
          </div>

          <div className="comments-user">
            <h6>{item.name}</h6>
            <h5>|</h5>
            <h6>{item.date}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
