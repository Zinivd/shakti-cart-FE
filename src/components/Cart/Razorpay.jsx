// RazorPay.jsx
import { useNavigate } from "react-router-dom";
import {
  loadRazorpay,
  removeCartProduct,
  verify_checkout,
} from "../../service/api";

const RazorpayButton = ({ checkoutData, cartItems = [] }) => {
  const navigate = useNavigate();

  const startPayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: checkoutData.key, // Dynamic key from API
      amount: checkoutData.amount, // Amount already in paise from API (includes shipping)
      currency: checkoutData.currency,
      name: checkoutData.name,
      description: "Order Payment",
      order_id: checkoutData.order_id, // Razorpay order ID from API

      handler: function (response) {
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);
        console.log("Payment Success:", response);

        const payload = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        verify_checkout(payload);

        // Remove cart items after successful payment
        cartItems.forEach((item) => {
          removeCartProduct({ product_id: item.product_id });
        });

        navigate("/profile");
      },

      prefill: {
        name: checkoutData.prefill.name,
        email: checkoutData.prefill.email,
        contact: checkoutData.prefill.contact, // Dynamic contact from API
      },

      theme: {
        color: "#3399cc",
      },

      notes: checkoutData.notes, // Include order notes
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button className="formbtn" onClick={startPayment}>
      Pay Now
    </button>
  );
};

export default RazorpayButton;
