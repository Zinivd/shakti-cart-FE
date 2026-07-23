import "./App.css";
import "./Style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
import Forgot from "./pages/Portal/Forgot.jsx";
import Create from "./pages/Portal/Create.jsx";
import Verification from "./pages/Portal/Verification.jsx";
import GmailOtp from "./pages/Portal/GmailOtp.jsx";
import WhatsappOtp from "./pages/Portal/WhatsappOtp.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Terms_Condition from "./pages/Policy/Terms_Condition.jsx";
import Privacy_Policy from "./pages/Policy/Privacy_Policy.jsx";
import Refund_Policy from "./pages/Policy/Refund_Policy.jsx";
import Shipping_Policy from "./pages/Policy/Shipping_Policy.jsx";
import AddAddress from "./components/Popup/AddAddress.jsx";
// import EditAddress from "./components/Popup/EditAddress.jsx";
import AddReview from "./components/Popup/AddReview.jsx";
import AllCategories from "./pages/AllCategories/AllCategories.jsx";
import CategoryProduct from "./pages/CategoryProduct/CategoryProducts.jsx";
import ProductDetail from "./pages/ProductDetails/ProductDetail.jsx";

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
          <ResponsiveNav />
          <NavOffcanvas />
          <AddAddress />
          {/* <EditAddress /> */}
          {/* <AddReview /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/address" element={<Address />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/create" element={<Create />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/gmailotp" element={<GmailOtp />} />
            <Route path="/whatsappotp" element={<WhatsappOtp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products-details/:id" element={<ProductDetails />} />
            <Route path="/terms-and-condition" element={<Terms_Condition />} />
            <Route path="/privacy-policy" element={<Privacy_Policy />} />
            <Route path="/refund-policy" element={<Refund_Policy />} />
            <Route path="/shipping-policy" element={<Shipping_Policy />} />
            <Route path="/allcategories" element={<AllCategories />} />
            <Route path="/categoryproducts" element={<CategoryProduct />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
