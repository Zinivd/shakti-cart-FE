import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartProducts, placeOrder, getUserAddresses, addAddress } from "../../service/api";
import { toast } from "react-toastify";
import Shipping from "../../components/Cart/Shipping";
import Summary from "../../components/Cart/Summary";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    company: "",
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  
  // Other states
  const [saveAddress, setSaveAddress] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [savingAddress, setSavingAddress] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email || "guest@email.com";

  useEffect(() => {
    loadCart();
    loadAddresses();
  }, []);

  const loadCart = async () => {
    try {
      const res = await getCartProducts();
      if (res?.data?.success) {
        setCartItems(res.data.data || []);
      }
    } catch (err) {
      console.error("Cart load failed", err);
    }
  };

  const loadAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const data = await getUserAddresses(userEmail);
      const addressList = data?.data?.data || [];
      setAddresses(addressList);
      
      // Auto-select first address if available
      if (addressList.length > 0) {
        setSelectedAddress(addressList[0].id);
      }
    } catch (err) {
      console.error("Failed to load addresses", err);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinueToDelivery = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.firstName || !formData.phone || !formData.city || 
        !formData.state || !formData.pincode) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSavingAddress(true);

      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        building_name: formData.company || "N/A",
        address_1: formData.streetAddress || "",
        address_2: "",
        city: formData.city,
        district: formData.country || formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark || "",
        address_type: "home",
      };

      const result = await addAddress(userEmail, payload);

      if (result?.data?.success || result?.success) {
        toast.success("Address added successfully");
        
        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          country: "",
          company: "",
          streetAddress: "",
          landmark: "",
          city: "",
          state: "",
          pincode: "",
          phone: "",
        });

        // Reload addresses
        await loadAddresses();
      } else {
        toast.error(result?.data?.message || result?.message || "Failed to save address");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err.message || "An error occurred");
    } finally {
      setSavingAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      setPlacingOrder(true);

      const selectedAddressData = addresses.find(addr => addr.id === selectedAddress);

      // Transform address data to match API expectations
      const transformedAddress = {
        building: selectedAddressData.building_name || "",
        address_line1: selectedAddressData.address_1 || "",
        address_line2: selectedAddressData.address_2 || "",
        city: selectedAddressData.city || "",
        district: selectedAddressData.district || "",
        state: selectedAddressData.state || "",
        pincode: selectedAddressData.pincode || "",
        landmark: selectedAddressData.landmark || "",
        address_type: selectedAddressData.address_type || "home"
      };

      const payload = {
        payment_mode: "UPI",
        address: transformedAddress,
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      const res = await placeOrder(payload);

      if (res?.data?.success) {
        toast.success("Order placed successfully");
        navigate("/home");
      } else {
        toast.error("Order failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setPlacingOrder(false);
    }
  };

  const formatAddress = (item) => {
    return `${item.building_name}, ${item.address_1}, ${item.address_2 || ''}, ${item.city}, ${item.state} - ${item.pincode}`;
  };

  // Pincode Validation
  const pincodeValidate = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setFormData(prev => ({ ...prev, pincode: value }));
    }
  };

  // Phone Validation
  const phoneValidate = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setFormData(prev => ({ ...prev, phone: value }));
    }
  };

  return (
    <div className="main">
      <div className="main-header pb-0">
        <div className="body-head d-block">
          <h6 className="d-flex column-gap-2 flex-wrap mb-3">
            <Link to="/">
              Home
              <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/Cart">
              Cart
              <i className="fa fa-angle-right ps-1"></i>
            </Link>
            <Link to="/Checkout" className="active">
              Checkout
            </Link>
          </h6>
        </div>
      </div>

      <hr />

      <div className="checkout-main">
        <div className="checkout-left">
          <div className="body-head d-block">
            <h4 className="mb-3">
              <span>|</span> Check Out
            </h4>
            <h5 className="mb-3">
              {addresses.length > 0 ? "Select Delivery Address" : "Billing Details"}
            </h5>
          </div>

          {loadingAddresses ? (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : addresses.length > 0 ? (
            // Show existing addresses
            <div className="address-form mb-4">
              <div className="address-main">
                {addresses.map((item) => (
                  <div className="address-card mb-3" key={item.id}>
                    <label>
                      <div className="d-flex align-items-center justify-content-between">
                        <h5 className="mb-2">{item.name}</h5>
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={selectedAddress === item.id}
                          onChange={() => setSelectedAddress(item.id)}
                        />
                      </div>
                      <h6 className="mb-2">+91 {item.phone}</h6>
                      <h6 className="mb-2 addressType">{formatAddress(item)}</h6>
                      <button type="button" className="addressbtn mb-2">
                        {item.address_type.toUpperCase()}
                      </button>
                    </label>
                  </div>
                ))}
              </div>
              
              <button 
                className="formbtn mt-3"
                onClick={() => setAddresses([])}
              >
                + Add New Address
              </button>
            </div>
          ) : (
            // Show form if no addresses
            <div className="form">
              <form onSubmit={handleContinueToDelivery}>
                <div className="row">
                  <div className="col-sm-12 col-md-6 mb-3">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <label htmlFor="country">Country / Region</label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      placeholder="Country / Region"
                      value={formData.country}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <label htmlFor="streetAddress">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="streetAddress"
                      placeholder="Street Address"
                      value={formData.streetAddress}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <label htmlFor="landmark">Landmark</label>
                    <input
                      type="text"
                      className="form-control"
                      name="landmark"
                      placeholder="Apartment, suite, unit etc. (optional)"
                      value={formData.landmark}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="col-sm-12 col-md-4 mb-3">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="col-sm-12 col-md-4 mb-3">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="col-sm-12 col-md-4 mb-3">
                    <label htmlFor="pincode">Pin Code *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="pincode"
                      placeholder="Pin Code"
                      value={formData.pincode}
                      onChange={pincodeValidate}
                      required
                    />
                  </div>
                  <div className="col-sm-12 col-md-4 mb-3">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={phoneValidate}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <button 
                    type="submit" 
                    className="formbtn"
                    disabled={savingAddress}
                  >
                    {savingAddress ? "Saving..." : "Continue to Delivery"}
                  </button>
                </div>
                <div className="d-flex align-items-center column-gap-2">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                  />
                  <label htmlFor="saveaddress1" className="mb-0">
                    Save my information for a faster checkout
                  </label>
                </div>
              </form>
            </div>
          )}

          <Shipping />

          {/* Place Order Button - Only show if address is selected */}
          {addresses.length > 0 && (
            <button
              className="darkbtn mt-3 w-100"
              onClick={handlePlaceOrder}
              disabled={placingOrder || !selectedAddress}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          )}
        </div>

        <div className="checkout-right">
          <Summary cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;