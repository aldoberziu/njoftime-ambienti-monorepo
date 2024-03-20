import Dropdown from "../Dropdown";
import InputField from "../InputField";
import styles from "./MoreOptions.module.css";
import { cities, structures, zones } from "../../Constants";
import { FilterIcon } from "../../icons";
import Button from "../Button";
import Text from "../Text";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "../../store";

const MoreOptions = ({ onToggle }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [filterString, setFilterString] = useState({});
  const [selectedCity, setSelectedCity] = useState("");

  const toggleModal = () => {
    setModal(!modal);
    onToggle(modal);
    const grid = document.getElementById("feeds-grid");
    setTimeout(function () {
      grid.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleSelector = (input) => {
    let { field, data } = input;
    setFilterString((state) => ({ ...state, [field]: data }));
    if(field === "city") setSelectedCity(data);
  };
  const handleFilter = async () => {
    const filtered = Object.fromEntries(
      Object.entries(filterString).filter(
        ([key, value]) => key !== undefined && value !== undefined
      )
    );
    dispatch(filterActions.filter(filtered));
  };
  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={toggleModal}></div>
      <div className={styles.modalContent}>
        <div className={`${styles.locationSelectors} ${styles.tile}`}>
          <Dropdown
            name="Zgjidh qytetin"
            field="city"
            options={cities}
            selectedValue={handleSelector}
          />
          <Dropdown
            name="Zgjidh zonen"
            field="zone"
            options={zones}
            selectedCity={selectedCity}
            selectedValue={handleSelector}
          />
        </div>
        <div className={`${styles.gridSelectors} ${styles.tile}`}>
          <InputField
            type="number"
            field="minF"
            placeholder="Kati min"
            selectedValue={handleSelector}
          />
          <InputField
            type="number"
            field="maxF"
            placeholder="Kati max"
            selectedValue={handleSelector}
          />
          <Dropdown
            name="Zgjidh qytetin"
            field="city"
            options={structures}
            selectedValue={handleSelector}
          />
          <InputField
            type="number"
            field="minP"
            placeholder="Cmimi minimal"
            selectedValue={handleSelector}
          />
          <InputField
            type="number"
            field="maxP"
            placeholder="Cmimi maksimal"
            selectedValue={handleSelector}
          />
          <InputField
            type="number"
            field="rooms"
            placeholder="Dhoma"
            selectedValue={handleSelector} /*to be decided later*/
          />
        </div>
        <div className={`${styles.bottomSelectors} ${styles.tile}`}>
          <Dropdown
            name="Ashensor"
            field="elevator"
            options={[
              { _id: "true", title: "Po" },
              { _id: "false", title: "Jo" },
            ]}
            selectedValue={handleSelector}
          />
          <InputField
            type="number"
            field="celNumber"
            placeholder="nr tel" /*to be decided later*/
          />
        </div>
        <Button
          onClick={() => {
            handleFilter();
            toggleModal();
          }}
          className={styles.filterButton}
        >
          <Text sh2 className={styles.sh2}>
            Filter <Image src={FilterIcon} alt="" />
          </Text>
        </Button>
      </div>
      {/* <button className={styles.closeModal} onClick={toggleModal}>
        CLOSE
      </button> */}
    </div>
  );
};

export default MoreOptions;
