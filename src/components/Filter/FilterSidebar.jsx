import React, { useEffect, useState } from "react";
import { Range } from "react-range";
import { getAllCategories } from "../../service/api";

const FilterSidebar = ({ onFilterChange, activeCategory }) => {
  // Toggler Icon (unchanged)
  const [openSections, setOpenSections] = useState({
    price: false,
    color: false,
    size: false,
    dressStyle: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // 🔥 CATEGORY FROM API
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 🔥 PRICE
  const MIN = 0;
  const MAX = 10000;
  const [values, setValues] = useState([0, 10000]);

  // 🔥 LOAD CATEGORIES
  useEffect(() => {
    loadCategories();
  }, []);

  // 🔥 SYNC URL / PARENT CATEGORY → HIGHLIGHT
  useEffect(() => {
    if (activeCategory) {
      setSelectedCategory(activeCategory);
    }
  }, [activeCategory]);

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(Array.isArray(data) ? data : []);
  };

  // 🔥 APPLY FILTER (UNCHANGED)
  const applyFilter = () => {
    onFilterChange({
      category_id: selectedCategory,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  // 🔥 RESET FILTER (UNCHANGED)
  const resetFilter = () => {
    setSelectedCategory(null);
    setValues([0, 10000]);

    onFilterChange({
      category_id: null,
      minPrice: 0,
      maxPrice: 10000,
    });
  };

  return (
    <div className="filter-sidebar-main">
      {/* Header */}
      <div className="filter-header">
        <li className="mb-0">
          <div className="body-head text-dark">
            <h6 className="mb-0 text-dark">Filter</h6>
            <h6 className="mb-0" style={{ rotate: "90deg" }}>
              <i className="fas fa-sliders"></i>
            </h6>
          </div>
        </li>
        <hr />
      </div>

      {/* 🔥 CATEGORY LIST (UI SAME) */}
      {/* {categories.map((cat) => (
        <li className="mb-2" key={cat.category_id}>
          <button
            className={`filterbtn mx-auto ${selectedCategory === cat.category_id ? "active" : ""
              }`}
            onClick={() => setSelectedCategory(cat.category_id)}
          >
            <div className="btnname">
              <span>{cat.category_name}</span>
            </div>
            <div className="d-flex ms-auto">
              <i className="fas fa-angle-right"></i>
            </div>
          </button>
        </li>
      ))}
      <hr /> */}

      {/* Prices (UI SAME) */}
      <div className="filter-header mb-2">
        <li
          className="mb-0 collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#price"
          onClick={() => toggleSection("price")}
          aria-expanded={openSections.price}
        >
          <div className="body-head">
            <h6 className="mb-0 text-dark">Price</h6>
            <h6 className="mb-0">
              <i
                className={`fas ${openSections.price ? "fa-angle-up" : "fa-angle-right"
                  }`}
              ></i>
            </h6>
          </div>
        </li>
        <hr />

        <div className="collapse" id="price">
          <div className="px-3">
            <Range
              values={values}
              step={10}
              min={MIN}
              max={MAX}
              onChange={(vals) => setValues(vals)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    height: "4px",
                    width: "100%",
                    background: `linear-gradient(to right, var(--border) ${((values[0] - MIN) / (MAX - MIN)) * 100
                      }%, var(--sub) ${((values[0] - MIN) / (MAX - MIN)) * 100
                      }%, var(--sub) ${((values[1] - MIN) / (MAX - MIN)) * 100
                      }%, var(--border) ${((values[1] - MIN) / (MAX - MIN)) * 100
                      }%)`,
                    borderRadius: "3px",
                    margin: "20px 0",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    height: "10px",
                    width: "10px",
                    backgroundColor: "var(--sub)",
                    borderRadius: "50%",
                    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  }}
                />
              )}
            />

            <div className="d-flex align-items-center column-gap-3">
              <input
                type="number"
                className="form-control"
                value={values[0]}
                readOnly
              />
              <input
                type="number"
                className="form-control"
                value={values[1]}
                readOnly
              />
            </div>
          </div>
          <hr />
        </div>
      </div>

      {/* 🔥 APPLY / RESET (UI SAME) */}
      <div className="d-flex gap-2 px-2 mt-3">
        <button className="darkbtn w-100" onClick={applyFilter}>
          Apply Filter
        </button>
        <button className="lightbtn w-100" onClick={resetFilter}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
