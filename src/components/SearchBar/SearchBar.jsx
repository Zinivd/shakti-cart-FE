import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProductsWithTags} from "../../service/api.js";
import "./SearchBar.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [allProducts, setAllProducts] = useState([]);
  const [loadedOnce, setLoadedOnce] = useState(false);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch the full product+tags list once (lazy — first time the user focuses/types)
  const loadProducts = async () => {
    if (loadedOnce || loading) return;
    setLoading(true);
    try {
      const res = await getAllProductsWithTags();
      const data = res?.data?.data || res?.data || [];
      setAllProducts(Array.isArray(data) ? data : []);
      setLoadedOnce(true);
    } catch (error) {
      console.error("SearchBar: failed to load products", error);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter whenever query or product list changes
  useEffect(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const matches = allProducts.filter((product) => {
      const tagMatch = Array.isArray(product.tags)
        ? product.tags.some((tag) => tag.toLowerCase().includes(term))
        : false;
      const nameMatch = (product.name || "").toLowerCase().includes(term);
      const categoryMatch = (product.category || "").toLowerCase().includes(term);
      return tagMatch || nameMatch || categoryMatch;
    });

    setResults(matches.slice(0, 8)); // cap dropdown length
    setShowDropdown(true);
  }, [query, allProducts]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    loadProducts();
    if (query.trim() && results.length) {
      setShowDropdown(true);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (!loadedOnce) loadProducts();
  };

  const handleResultClick = (productId) => {
    setShowDropdown(false);
    setQuery("");
    navigate(`/productdetail/${productId}`);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="search-bar-wrapper" ref={wrapperRef}>
      <div className="search-bar-input-group">
        <i className="bx bx-search search-bar-icon"></i>
        <input
          type="text"
          className="form-control border-0 search-bar-input"
          name="search"
          placeholder="Search for products, tags..."
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="search-bar-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <i className="bx bx-x"></i>
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="search-bar-dropdown">
          {loading && (
            <div className="search-bar-empty">Loading products...</div>
          )}
          {!loading && results.length === 0 && (
            <div className="search-bar-empty">
              No products found for "{query}"
            </div>
          )}
          {!loading &&
            results.map((product) => (
              <div
                key={product.id}
                className="search-bar-result-item"
                onClick={() => handleResultClick(product.id)}
              >
                <div className="search-bar-result-thumb">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="search-bar-result-thumb-placeholder">
                      <i className="bx bx-image"></i>
                    </div>
                  )}
                </div>
                <div className="search-bar-result-info">
                  <div className="search-bar-result-name">{product.name}</div>
                  <div className="search-bar-result-meta">
                    {product.category}
                    {product.subcategory ? ` • ${product.subcategory}` : ""}
                  </div>
                  {Array.isArray(product.tags) && product.tags.length > 0 && (
                    <div className="search-bar-result-tags">
                      {product.tags.slice(0, 3).map((tag, i) => (
                        <span className="search-bar-tag-chip" key={i}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;