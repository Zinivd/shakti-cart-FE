import React from "react";
import WishlistCard from "../../components/Card/Wishlist/Wishlist";

const Wishlist = () => {
  return (
    <div className="mt-2">
      <div className="body-head mb-3">
        <h4 className="mb-0">
          <span>|</span> Wishlist
        </h4>
      </div>
      <WishlistCard />
    </div>
  );
};

export default Wishlist;
