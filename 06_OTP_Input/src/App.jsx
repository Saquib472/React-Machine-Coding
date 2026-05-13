import { useEffect, useRef, useState } from "react";
import "./App.css";

const OTP_DIGITS_COUNT = 5;

function App() {
  const [inputArr, setInputArray] = useState(
    new Array(OTP_DIGITS_COUNT).fill(""),
  ); // It will be like ["","","","",""]
  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus(); // On Page Load the first input box will be focused.
  }, []);

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return; // Checking Value is Number or Not
    const newValue = value.trim(); // Trim the value for Space key
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1); // Only One Number at a time and It will take the last giving value
    setInputArray(newArr);
    newValue && refArr.current[index + 1]?.focus(); // If Value is present then only move Forward
  };

  const handleBackSpace = (e, index) => {
    // Handle The Backspace Deletion. Only if the Current focused input is empty then only it will focus to the previous input.
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  return (
    <div className="container">
      <h1>OTP INPUT</h1>
      <div className="otp-container">
        {inputArr.map((input, index) => {
          return (
            <input
              ref={(input) => (refArr.current[index] = input)} // To focus the input box
              className="otp-input"
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleBackSpace(e, index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
