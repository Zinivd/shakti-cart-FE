import React, { useState } from "react";
import "./NewsLetter.css";

const NewsletterBanner = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="newsletter-main">
      <div className="newsletter-content text-center">
        <h3>Subscribe to our emails</h3>

        <p>Be the first to know about new collections and exclusive offers.</p>

        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterBanner;
