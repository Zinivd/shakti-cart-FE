import React from "react";
import { Logo_Main } from "../../../public/Assets.js";
import FilterSidebar from "./FilterSidebar.jsx";
import "./Filter.css";

const Filter = ({ onFilterChange, activeCategory }) => {
  return (
    <div className="filter-aside">
      <div className="flex-sidebar">
        <div className="flex-shrink-0 filter-sidebar">
          <ul className="main-ul list-unstyled ps-0 pt-2">
            <FilterSidebar
              onFilterChange={onFilterChange}
              activeCategory={activeCategory}
            />
          </ul>
        </div>
      </div>

      <div className="offcanvas offcanvas-bottom h-75 offcanvas-filter" id="filter-offcanvas">
        <div className="offcanvas-body p-0">
          <FilterSidebar
            onFilterChange={onFilterChange}
            activeCategory={activeCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
