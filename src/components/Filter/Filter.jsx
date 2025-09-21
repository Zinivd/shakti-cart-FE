import React, { useState } from "react";
import FilterSidebar from "./FilterSidebar.jsx";
import "./Filter.css";

const Filter = () => {
const [open, setOpen] = useState(false);
  return (
    <div className="filter-aside">
      <div class="flex-sidebar">
        <div class="flex-shrink-0 filter-sidebar">
          <ul class="main-ul list-unstyled ps-0 pt-2">
            <FilterSidebar />
          </ul>
        </div>
      </div>

      <div
        class="offcanvas offcanvas-start offcanvas-filter"
        tabindex="-1"
        id="offcanvas-filter"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <button
            type="button"
            class="btn-close bg-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body p-0">
          <div class="flex-shrink-0 filter-sidebar">
            <ul class="list-unstyled mt-2 ps-0">
              <FilterSidebar />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
