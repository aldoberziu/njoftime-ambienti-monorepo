import styles from "./InputField.module.css";
import { useState, useEffect } from "react";

const InputField = (props) => {
  const [selectedValue, setSelectedValue] = useState({ field: "", data: "DEFAULT" });
  const { type, placeholder, value, field, className } = props;
  let classNames = [];
  if (className) classNames.push(`${className} `);

  const handleValue = (e) => {
    setSelectedValue({ field: field, data: e.target.value });
  };

  useEffect(() => {
    props?.selectedValue?.(selectedValue);
  }, [selectedValue]);

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${styles.inputField} ${classNames}`}
      value={value}
      onChange={handleValue}
    />
  );
};

export default InputField;
