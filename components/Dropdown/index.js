import { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = (props) => {
  const [selectedValue, setSelectedValue] = useState({ field: "", data: "DEFAULT" });
  const { name, options, field } = props;

  const handleValue = (e) => {
    setSelectedValue({ field: field, data: e.target.value });
  };

  useEffect(() => {
    props?.selectedValue?.(selectedValue);
  }, [selectedValue]);

  return (
    <select defaultValue={"DEFAULT"} className={styles.select} onChange={handleValue}>
      <option disabled value="DEFAULT" className={styles.option}>
        {name}
      </option>
      {options?.map((el) => (
        <option value={el?._id} className={styles.option}>
          {el?.title}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
