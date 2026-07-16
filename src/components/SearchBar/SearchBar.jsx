import React from "react";

const SearchBar = () => {
  return (
    <div className="mobile-search-bar d-lg-none">
  <i className="bx bx-search text-center"></i>
  <input
    type="text"
    className="form-control border-0"
    name="search"
    id="mobile-search"
    placeholder="Search for products..."
  />
</div>
  );
};

export default SearchBar;
