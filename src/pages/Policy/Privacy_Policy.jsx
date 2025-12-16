import React from "react";
import "./Policy.css";

const Privacy_Policy = () => {
  return (
    <div className="policy-main">
      <div className="policy-div">
        <div className="policy-header">
          <h1>PRIVACY POLICY</h1>
          <span>Updated December 15, 2025</span>
        </div>
      </div>

      <div className="policy-content">
        <div className="content-head">
          <h2>Introduction</h2>
          <p>
            Welcome to ShaktiCart Pvt Ltd. We value your privacy and are
            committed to protecting your personal information. This Privacy
            Policy outlines our practices regarding the collection, use, and
            disclosure of information that you may provide through our website.
          </p>
        </div>

        <hr />

        <div className="content-list">
          <ul>
            <h3 className="mb-4">Information We Collect</h3>
            <li>
              <h5>1. Personal Information</h5>
              <p>
                We may collect personal information from you when you
                voluntarily provide it to us through our website. This includes,
                but is not limited to, your name, email address, phone number,
                and payment information.
              </p>
            </li>
            <li>
              <h5>2. Non-Personal Information</h5>
              <p>
                We may collect non-personal information about your interactions
                with our website. This includes, but is not limited to, your IP
                address, browser type, operating system, and browsing behavior.
              </p>
            </li>
            <li>
              <h5>3. Cookies and Tracking Technologies</h5>
              <p>
                We use cookies and similar tracking technologies to enhance your
                experience on our website. Cookies help us understand how you
                use our website, personalize content, and improve our services.
              </p>
            </li>
          </ul>

          <ul>
            <h3 className="my-4">How We Use Your Information</h3>
            <li>
              <h5>1. To Provide and Improve Our Services</h5>
              <p>
                We use your personal information to deliver and enhance our
                services, process transactions, and respond to your inquiries.
              </p>
            </li>
            <li>
              <h5>2. To Communicate With You</h5>
              <p>
                We may use your contact information to send you updates,
                promotional materials, and other communications related to our
                services. You can opt out of receiving these communications at
                any time.
              </p>
            </li>
            <li>
              <h5>3. To Analyze and Improve Our Website</h5>
              <p>
                We use non-personal information to analyze trends, track user
                movements, and gather demographic information. This helps us
                improve our website and tailor it to our users' needs.
              </p>
            </li>
          </ul>

          <ul>
            <h3 className="my-4">How We Share Your Information</h3>
            <li>
              <h5>1. Third-Party Service Providers</h5>
              <p>
                We may share your information with third-party service providers
                who perform services on our behalf. These providers are
                obligated to protect your information and use it only for the
                purposes we specify.
              </p>
            </li>
            <li>
              <h5>2. Legal Compliance</h5>
              <p>
                We may disclose your information if required by law or in
                response to a valid request from a law enforcement authority or
                government agency.
              </p>
            </li>
            <li>
              <h5>3. Business Transfers</h5>
              <p>
                In the event of a merger, acquisition, or sale of our assets,
                your information may be transferred to the new entity.
              </p>
            </li>
            <li>
              <h5>4. Security</h5>
              <p>
                We implement reasonable security measures to protect your
                personal information from unauthorized access, use, or
                disclosure. However, no method of transmission over the Internet
                or electronic storage is 100% secure.
              </p>
            </li>
          </ul>

          <ul>
            <h3 className="my-4">Your Rights</h3>
            <li>
              <h5>1. Access and Update Your Information</h5>
              <p>
                You have the right to access and update your personal
                information. If you wish to review or correct your information,
                please contact us at{" "}
                <a href="mailto: support@sakthicart.in">
                  support@sakthicart.in
                </a>
              </p>
            </li>
            <li>
              <h5>2. Opt-Out</h5>
              <p>
                You have the right to opt out of receiving marketing
                communications from us. You can do this by following the
                unsubscribe instructions in our emails or by contacting us
                directly.
              </p>
            </li>
            <li>
              <h5>3. Data Deletion</h5>
              <p>
                You have the right to request the deletion of your personal
                information. Please contact us if you wish to delete your
                information from our records.
              </p>
            </li>
            <li>
              <h5>4. Changes to This Privacy Policy</h5>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on our
                website. You are advised to review this Privacy Policy
                periodically for any updates.
              </p>
            </li>
            <li>
              <h5>12. Contact Us</h5>
              <p>
                If you have any questions about these Terms, please contact us
                at: <br />
                ShaktiCart Pvt Ltd (NH 47- Near Hotel) Erode, India - 000 002.
                {" "}<a href="mailto: support@sakthicart.in">
                  support@sakthicart.in
                </a>
                <br />
                By using our Website and Services, you acknowledge that you have
                read, understood, and agree to be bound by these Terms and
                Conditions. If you have any questions or concerns about this
                Privacy Policy, please contact us at: <br />
                ShaktiCart Pvt Ltd (NH 47- Near Hotel) Erode, India- 000 002.{" "}
                <a href="mailto: support@sakthicart.in">
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
