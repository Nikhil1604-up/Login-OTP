import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    //allow only one input
    newOtp[index];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1])
      //Move focus to next input if current field is filled
      inputRefs.current[newOtp.indexOf("")].focus();
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    //optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backscape" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    )
      //Move focus to previous input on backspace
      inputRefs.current[index - 1].focus();
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            value={value}
            ref={(input) => (inputRefs.current[index] = input)}
            onChange={(e) => handleChange(index, e)}
            index
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
