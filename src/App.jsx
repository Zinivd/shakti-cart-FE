import "./App.css";
import "./Style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Navbar from "./layouts/Navbar/Navbar.jsx";
import ResponsiveNav from "./layouts/Navbar/ResponsiveNav.jsx";
import NavOffcanvas from "./layouts/Navbar/NavOffcanvas.jsx";
import Footer from "./layouts/Footer/Footer.jsx";

// Pages
import Home from "./pages/Home/Home.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import Products from "./pages/Products/Products.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Cart/Checkout.jsx";
import Address from "./pages/Cart/Address.jsx";
import Login from "./pages/Portal/Login.jsx";
import Register from "./pages/Portal/Register.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer
          theme="dark"
          position="bottom-right"
          autoClose={2000}
        />

        <Navbar />
        <ResponsiveNav />
        <NavOffcanvas />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/address" element={<Address />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
