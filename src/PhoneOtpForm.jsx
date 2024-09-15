import React, { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handlePhoneSubmit = (event) => {
    event.preventDefault(); // prevents deafault behaviour which refreshes the page.

    // phone validations
    const regexValidation = /[^0-9]/g;
    if (phoneNumber.length < 10 || regexValidation.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    // call BE API
    //show OTP
    setShowOtpInput(true);
  };
  const onOtpSubmit = (otp) => {
    console.log("Login Successful", otp);
  };
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
