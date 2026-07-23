import React, { useEffect, useRef, useState } from "react";
import "./Otp.css";

const RESEND_SECONDS = 30;

export default function GmailOtp({
  email = "balamurugan@gmail",
  onBack = () => {},
  onVerify = () => {},
  onResend = () => {},
  onChangeMobile = () => {},
  onContinueWithWhatsapp = () => {},
}) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  const handleVerify = () => {
    if (!isComplete) return;
    onVerify(otp.join(""));
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    setOtp(new Array(6).fill(""));
    onResend();
  };

  return (
    <div className="otp-page">
      <div className="otp-card">
        {/* <div className="otp-image-section">
          <img
            src="/assets/otp-gmail-illustration.png"
            alt="Shakti Cart"
            className="otp-image"
          />
          <span className="otp-image-placeholder">Img</span>
        </div> */}

        <div className="otp-form-section">
          <div className="otp-form-header">
            <div className="otp-title-group">
              <span className="otp-title-bar" />
              <h1 className="otp-title">OTP</h1>
            </div>
            <button type="button" className="otp-back-link" onClick={onBack}>
              Back
            </button>
          </div>
          <p className="otp-subtitle">Join to us</p>

          <div className="otp-center">
            <p className="otp-message">
              We&apos;ve sent a code to your Gmail
              <br />
              <strong>{email}</strong>
            </p>

            <div className="otp-input-group">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="otp-verify-btn"
              disabled={!isComplete}
              onClick={handleVerify}
            >
              Verify &amp; continue
            </button>

            <p className="otp-resend-text">
              Didn&apos;t receive it?{" "}
              <span>
                {secondsLeft > 0
                  ? `Resend in ${formatTime(secondsLeft)}`
                  : "You can resend now"}
              </span>
            </p>

            <button
              type="button"
              className="otp-resend-btn"
              disabled={secondsLeft > 0}
              onClick={handleResend}
            >
              <span className="otp-resend-spinner">&#8635;</span>
              Resend
            </button>

            <button
              type="button"
              className="otp-change-number"
              onClick={onChangeMobile}
            >
              <i className="bi bi-pencil-square"></i> Change the mobile number
            </button>

            <div className="otp-divider">
              <span className="otp-divider-line" />
              <span className="otp-divider-text">OR</span>
              <span className="otp-divider-line" />
            </div>

            <button
              type="button"
              className="otp-whatsapp-btn"
              onClick={onContinueWithWhatsapp}
            >
              <i className="bi bi-whatsapp"></i> Continue With Whats app
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}