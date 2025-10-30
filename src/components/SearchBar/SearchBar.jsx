import React from "react";

const SearchBar = () => {
  return (
    <div>
      <ul className="navbar-nav col-sm-12 px-3 d-md-none mt-2 mb-3">
        <li className="search-bar">
          <i className="bx bx-search text-center"></i>
          <input
            type="text"
            className="form-control border-0"
            name="search"
            id="search"
            placeholder="Search for products..."
          />
        </li>
      </ul>
    </div>
  );
};

export default SearchBar;
