import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center m-auto flex-column gap-3">
      <div class="loader-spinner"></div>
      <h6 className="mb-0 loader-h6">Loading...</h6>
    </div>
  );
};

export default Loader;
