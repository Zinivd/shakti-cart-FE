import React from "react";
import "./Policy.css";

const Privacy_Policy = () => {
  return (
    <div className="policy-main">
      <div className="policy-div">
        <div className="policy-header">
          <h1>SHIPPING POLICY</h1>
          <span>Updated December 15, 2025</span>
        </div>
      </div>

      <div className="policy-content">
        <div className="content-head">
          <h2>Introduction</h2>
          <p>
            Welcome to ShaktiCart Pvt Ltd. We value your shipping and are
            committed to protecting your personal information. This Shipping
            Policy outlines our practices regarding the collection, use, and
            disclosure of information that you may provide through our website.
          </p>
        </div>

        <hr />

        <div className="content-list">
          <ul>
            <li>
              <h5>1. Shipping Rates</h5>
              <p>
                Shipping rates are calculated based on the weight of your order
                and your location.
              </p>
            </li>
            <li>
              <h5>2. Shipping Times</h5>
              <p>
                Orders are typically processed, shipped and delivered within 5-7
                business days.
              </p>
            </li>
            <li>
              <h5>3. International Shipping</h5>
              <p>
                We offer international shipping to select countries. Please note
                that customs duties and taxes may apply. Orders will be
                delivered within 5-7 business days.
              </p>
            </li>
            <li>
              <h5>4. Order Tracking</h5>
              <p>
                Once your order has shipped, you will receive a tracking number
                via email.
              </p>
            </li>
            <li>
              <h5>5. Changes to This Shipping Policy</h5>
              <p>
                We reserve the right to update or change our Shipping Policy at
                any time. We will notify you of any changes by posting the new
                policy on our website.
              </p>
            </li>
            <li>
              <h5>6. Contact Us</h5>
              <p>
                If you have any questions about these Policy, please contact us
                at: <br />
                ShaktiCart Pvt Ltd (NH 47- Near Hotel) Erode, India - 000 002.
                <a href="mailto: support@sakthicart.in" className="ps-2">
                  support@sakthicart.in
                </a>
                <br />
                By using our Website and Services, you acknowledge that you have
                read, understood, and agree to be bound by these Shipping
                Policy. If you have any questions, please contact us at: <br />
                ShaktiCart Pvt Ltd (NH 47- Near Hotel) Erode, India- 000 002.
                <a href="mailto: support@sakthicart.in" className="ps-2">
                  support@sakthicart.in
                </a>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Privacy_Policy;
