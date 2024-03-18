import styles from "./InputField.module.css";
import { useState, useEffect } from "react";

const InputField = (props) => {
  const [selectedValue, setSelectedValue] = useState({/* field: "default", data: "DEFAULT" */});
  const { type, placeholder, value, field, className, nested } = props;
  let classNames = [];
  if (className) classNames.push(`${className} `);

  const handleValue = (e) => {
    setSelectedValue({ field: field, nested: nested, data: e.target.value });
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
