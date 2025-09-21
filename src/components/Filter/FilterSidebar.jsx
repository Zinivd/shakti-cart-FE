import React from "react";

const FilterSidebar = () => {
  return (
    <div className="filter-sidebar-main">
      <li class="mb-3">
        <div class="body-head mb-3">
          <h6>Filter</h6>
          <h6 style={{ rotate: "90deg" }}><i class="fas fa-sliders"></i></h6>
        </div>
      </li>
      <hr />
      <li class="mb-3">
        <button
          class="filterbtn mx-auto collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#collapse0"
          aria-expanded="false"
        >
          <div class="btnname">
            <span>Category</span>
          </div>
          <div class="righticon d-flex ms-auto">
            <i class="fa-solid fa-angle-right toggle-icon"></i>
          </div>
        </button>
        <div class="collapse" id="collapse0">
          <ul class="btn-toggle-nav list-unstyled text-start ps-3 pe-0 py-2">
            <li>
              <input type="checkbox" class="filter-checkbox" />
              <label for=""></label>
            </li>
          </ul>
        </div>
      </li>
      <hr />
    </div>
  );
};

export default FilterSidebar;
