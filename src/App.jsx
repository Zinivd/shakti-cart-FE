import { useState } from "react";
import "./App.css";
import "./Style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Navbar from "./layouts/Navbar/Navbar.jsx";
import Footer from "./layouts/Footer/Footer.jsx";

// Home
import Home from "./pages/Home/Home.jsx";
import Category from "./pages/Category/Category.jsx";

// Common CSS
import "./App.css";
import Products from "./pages/Products/Products.jsx";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <ToastContainer
            theme="dark"
            position="bottom-right"
            autoClose={2000}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/products" element={<Products />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
