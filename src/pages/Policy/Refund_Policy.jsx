import React from "react";
import "./Policy.css";

const Refund_Policy = () => {
  return (
    <div class="policy-main">
      <div class="policy-div">
        <div class="policy-header">
          <h1>RETURN & REFUND POLICY</h1>
          <span>Updated December 15, 2025</span>
        </div>
      </div>

      <div class="policy-content">
        <div class="content-head">
          <p>
            At ShaktiCart Pvt Ltd, customer satisfaction is our top priority. We
            offer a “No Questions Asked Return at Delivery” policy to ensure a
            worry-free shopping experience for our customers in Erode, Tamil
            Nadu.
          </p>
        </div>

        <hr />

        <div class="content-list">
          <ul>
            <li>
              <h5>1. Return at the Time of Delivery</h5>
              <p>
                If for any reason you are not satisfied with the product
                delivered, you can return it immediately at the time of delivery
                – no questions asked. Our delivery executive will take back the
                returned product on the spot.
              </p>
            </li>
            <li>
              <h5>2. Refund Process</h5>
              <p class="mb-1">Once the product is returned at delivery:</p>
              <p class="mb-1">
                A credit note equal to the value of the returned product will be
                issued.
              </p>
              <p class="mb-1">
                This amount will be credited to your ShaktiCart Pvt Ltd account.
              </p>
              <p class="mb-1">
                You can use this credit for your future purchases with us.
              </p>
            </li>
            <li>
              <h5>3. Please Note</h5>
              <p class="mb-1">
                No cancellation or refund requests will be accepted after the
                delivery is completed.
              </p>
              <p class="mb-1">
                This policy applies only at the time of delivery and is valid
                only for customers within Erode, Tamil Nadu
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Refund_Policy;
