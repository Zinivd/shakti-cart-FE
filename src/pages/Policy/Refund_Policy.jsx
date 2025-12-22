import React from "react";
import "./Policy.css";

const Refund_Policy = () => {
  return (
    <div className="policy-main">
      <div className="policy-div">
        <div className="policy-header">
          <h1>RETURN & REFUND POLICY</h1>
          <span>Updated December 15, 2025</span>
        </div>
      </div>

      <div className="policy-content">
        <div className="content-head">
          <p>
            At ShaktiCart Pvt Ltd, customer satisfaction is our top priority. We
            offer a “No Questions Asked Return at Delivery” policy to ensure a
            worry-free shopping experience for our customers in Erode, Tamil
            Nadu.
          </p>
        </div>

        <hr />

        <div className="content-list">
          <h3 className="mb-4">Return Policies</h3>
          <ul>
            <li>
              <h5>1. Eligibility for Returns</h5>
              <p>
                To be eligible for a return, your item must be unused and in the same condition that you received it.
              </p>
            </li>
            <li>
              <h5>2. Return Process</h5>
              <p>To initiate a return, please contact our customer support team within 5-7 days of receiving your item.</p>
            </li>
            <li>
              <h5>3. Return Shipping</h5>
              <p>
                You will be responsible for paying for your own shipping costs for returning your item.
              </p>
            </li>
            <li>
              <h5>4. Return Time Frame</h5>
              <p>
                In case of a approved return, your replacement will be delivered within 5-7 days of receiving your item.
              </p>
            </li>
          </ul>
        </div>
        <div className="content-list">
          <h3 className="mb-4">Refund Policies</h3>
          <ul>
            <li>
              <h5>1. Eligibility for Refunds</h5>
              <p>
                Refunds are only available for products that are returned in their original condition within 5-7 days of purchase.
              </p>
            </li>
            <li>
              <h5>2. Refund Process</h5>
              <p>To request a refund, please contact our customer support team with your order details.</p>
            </li>
            <li>
              <h5>3. Refund Timeframe</h5>
              <p>
                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item and the approval or rejection of your refund. Once approved, refunds will take 5-7 days to be credited into the beneficiary’s bank account
              </p>
            </li>
            <li>
              <h5>4. Exchanges</h5>
              <p>
                We only replace items if they are defective or damaged. Incase of exchanges, we will initiate the process within 3-4 days and the replacement will be delivered within 5-7 days
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Refund_Policy;
