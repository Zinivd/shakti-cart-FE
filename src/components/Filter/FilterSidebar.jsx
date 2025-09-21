import React, { useState } from "react";
import { Range } from "react-range";

const FilterSidebar = () => {
  // Toggler Icon
  const [openSections, setOpenSections] = useState({
    size: false,
    dressStyle: false,
  });
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Range Slider
  const MIN = 0;
  const MAX = 10000;
  const [values, setValues] = useState([0, 5000]);

  const productTypes = [
    { productType: "Printed T-Shirts" },
    { productType: "Plain T-Shirts" },
    { productType: "Full Sleeve T-Shirts" },
    { productType: "Half SleeveT-Shirts" },
    { productType: "Tops" },
    { productType: "Kurtis" },
    { productType: "Boxers" },
    { productType: "Joggers" },
    { productType: "Payjamas" },
    { productType: "Jeans" },
  ];

  const colors = [
    { name: "Purple", code: "#8E44AD" },
    { name: "Black", code: "#000000" },
    { name: "Red", code: "#E74C3C" },
    { name: "Orange", code: "#E67E22" },
    { name: "Navy", code: "#2C3E50" },
    { name: "White", code: "#FFFFFF", border: true },
    { name: "Brown", code: "#D35400" },
    { name: "Green", code: "#27AE60" },
    { name: "Yellow", code: "#F1C40F" },
    { name: "Grey", code: "#BDC3C7" },
    { name: "Pink", code: "#F78FB3" },
    { name: "Blue", code: "#3498DB" },
  ];

  const sizes = [
    { size: "XS" },
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
    { size: "XXL" },
    { size: "3XL" },
    { size: "4XL" },
  ];

  const dressStyles = [
    { dressStyle: "Classic" },
    { dressStyle: "Casual" },
    { dressStyle: "Business" },
    { dressStyle: "Sport" },
    { dressStyle: "Elegant" },
    { dressStyle: "Formal" },
  ];

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

      {/* Product Type */}
      {productTypes.map((item, index) => (
        <li className="mb-2" key={index}>
          <button className="filterbtn mx-auto">
            <div className="btnname">
              <span>{item.productType}</span>
            </div>
            <div className="d-flex ms-auto">
              <i className="fas fa-angle-right"></i>
            </div>
          </button>
        </li>
      ))}
      <hr />

      {/* Prices */}
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
                className={`fas ${
                  openSections.price ? "fa-angle-up" : "fa-angle-right"
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
                    background: `linear-gradient(to right, var(--border) ${
                      ((values[0] - MIN) / (MAX - MIN)) * 100
                    }%, var(--sub) ${
                      ((values[0] - MIN) / (MAX - MIN)) * 100
                    }%, var(--sub) ${
                      ((values[1] - MIN) / (MAX - MIN)) * 100
                    }%, var(--border) ${
                      ((values[1] - MIN) / (MAX - MIN)) * 100
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

      {/* Colors */}
      <div className="filter-header mb-2">
        <li
          className="mb-0 collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#color"
          onClick={() => toggleSection("color")}
          aria-expanded={openSections.color}
        >
          <div className="body-head">
            <h6 className="mb-0 text-dark">Colors</h6>
            <h6 className="mb-0">
              <i
                className={`fas ${
                  openSections.color ? "fa-angle-up" : "fa-angle-right"
                }`}
              ></i>
            </h6>
          </div>
        </li>
        <hr />
        <div className="collapse" id="color">
          <div className="colors">
            {colors.map((item, index) => (
              <div className="mb-3 text-center" key={index}>
                <li
                  className="color-box mx-auto"
                  style={{
                    backgroundColor: item.code,
                    border: item.border ? "1px solid var(--border)" : "none",
                  }}
                ></li>
                <span className="color-label">{item.name}</span>
              </div>
            ))}
          </div>
          <hr />
        </div>
      </div>

      {/* Sizes */}
      <div className="filter-header mb-2">
        <li
          className="mb-0 collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#size"
          onClick={() => toggleSection("size")}
          aria-expanded={openSections.size}
        >
          <div className="body-head">
            <h6 className="mb-0 text-dark">Size</h6>
            <h6 className="mb-0">
              <i
                className={`fas ${
                  openSections.size ? "fa-angle-up" : "fa-angle-right"
                }`}
              ></i>
            </h6>
          </div>
        </li>
        <hr />
        <div className="collapse" id="size">
          <div className="sizes">
            {sizes.map((item, index) => (
              <li className="mb-2" key={index}>
                <button className="sizebtn mx-auto">
                  <span>{item.size}</span>
                </button>
              </li>
            ))}
          </div>
          <hr />
        </div>
      </div>

      {/* Dress Style */}
      <div className="filter-header mb-2">
        <li
          className="mb-0 collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#dressStyle"
          onClick={() => toggleSection("dressStyle")}
          aria-expanded={openSections.dressStyle}
        >
          <div className="body-head">
            <h6 className="mb-0 text-dark">Dress Styles</h6>
            <h6 className="mb-0">
              <i
                className={`fas ${
                  openSections.dressStyle ? "fa-angle-up" : "fa-angle-right"
                }`}
              ></i>
            </h6>
          </div>
        </li>
        <hr />
        <div className="collapse" id="dressStyle">
          {dressStyles.map((item, index) => (
            <li className="mb-2" key={index}>
              <button className="filterbtn mx-auto">
                <div className="btnname">
                  <span>{item.dressStyle}</span>
                </div>
                <div className="d-flex ms-auto">
                  <i className="fas fa-angle-right"></i>
                </div>
              </button>
            </li>
          ))}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
