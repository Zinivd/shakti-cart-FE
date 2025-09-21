import React from "react";
import { Logo_Main } from "../../../public/Assets.js";
import FilterSidebar from "./FilterSidebar.jsx";
import "./Filter.css";

const Filter = () => {
  return (
    <div className="filter-aside">
      <div className="flex-sidebar">
        <div className="flex-shrink-0 filter-sidebar">
          <ul className="main-ul list-unstyled ps-0 pt-2">
            <FilterSidebar />
          </ul>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-bottom h-75 offcanvas-filter"
        tabindex="-1"
        id="filter-offcanvas"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <img src={Logo_Main} height="40px" alt="" />
          <button
            type="button"
            className="btn-close bg-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <div className="flex-shrink-0 filter-sidebar">
            <ul className="list-unstyled mt-2 ps-0">
              <FilterSidebar />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
