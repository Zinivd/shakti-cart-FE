import { useNavigate } from "react-router-dom";
import { loadRazorpay, verify_checkout } from "../../service/api";

const RazorpayButton = ({ total, razorpay_order_id }) => {
  const navigate = useNavigate();
  const startPayment = async () => {
    const res = await loadRazorpay();

    console.log("total", total);
    console.log("razorpay_order_id", razorpay_order_id);

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_test_S8AjOLZATEpF0Y", // 🔴 Public Key only
      amount: total * 100, // in paise
      currency: "INR",
      name: "Shakti Cart",
      description: "Order Payment",
      order_id: razorpay_order_id, // 🔴 Your order ID

      handler: function (response) {
        // Send response to backend for verification
        response.razorpay_payment_id;
        response.razorpay_order_id;
        response.razorpay_signature;
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);
        console.log("Payment Success ---- > :", response);
        navigate('/profile');
        const payload = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: razorpay_order_id,
          razorpay_signature:response.razorpay_signature,
        };
        verify_checkout(payload);
      },

      prefill: {
        name: "Customer Name",
        email: "customer@email.com",
        contact: "9999999999",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return <button className="formbtn" onClick={startPayment}>Pay Now</button>;
};

export default RazorpayButton;
