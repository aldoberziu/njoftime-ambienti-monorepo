import { useState } from "react";
import PriceRange from "../PriceRange";
import FloorRange from "../FloorRange";
import styles from "./MoreOptions.module.css";
import { cities, zones, structures } from "../../Constants";
import Button from "../Button";
import Text from "../Text";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { FilterIcon } from "../../icons";

const MoreOptions = ({ onToggle }) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    onToggle(modal);
    const grid = document.getElementById("feeds-grid");
    setTimeout(function () {
      grid.scrollIntoView({ behavior: "smooth" });
    }, 500)
  };
  const [selectedCity, setSelectedCity] = useState("DEFAULT");
  const [selectedZone, setSelectedZone] = useState("DEFAULT");
  const [selectedStructure, setSelectedStructure] = useState("DEFAULT");
  const [priceRange, setPriceRange] = useState([]);
  const [floorRange, setFloorRange] = useState([]);
  const [filterIcon, setFilterIcon] = useState(false);

  const handleCityChange = (e) => {
    const selectedElement = e.target.value;
    setSelectedCity(selectedElement);
  };
  const handleZoneChange = (e) => {
    const selectedElement = e.target.value;
    setSelectedZone(selectedElement);
  };
  const handleStructureChange = (e) => {
    const selectedElement = e.target.value;
    setSelectedStructure(selectedElement);
  };
  const handlePriceValues = (prices) => {
    setPriceRange(prices);
  };
  const handleFloorValues = (floors) => {
    setFloorRange(floors);
  };
  const buildFilterString = async () => {
    let filterString = "/?";

    if (selectedCity !== "DEFAULT") {
      filterString === "/?"
        ? (filterString = filterString + `city=${selectedCity}`)
        : (filterString = filterString + `&city=${selectedCity}`);
    }
    if (selectedZone !== "DEFAULT") {
      filterString === "/?"
        ? (filterString = filterString + `zone=${selectedZone}`)
        : (filterString = filterString + `&zone=${selectedZone}`);
    }
    if (selectedStructure !== "DEFAULT") {
      filterString === "/?"
        ? (filterString = filterString + `structure=${selectedStructure}`)
        : (filterString = filterString + `&structure=${selectedStructure}`);
    }
    if (priceRange[0] !== 2500) {
      filterString === "/?"
        ? (filterString = filterString + `minP=${priceRange[0]}`)
        : (filterString = filterString + `&minP=${priceRange[0]}`);
    }
    if (priceRange[1] !== 7500) {
      filterString === "/?"
        ? (filterString = filterString + `maxP=${priceRange[1]}`)
        : (filterString = filterString + `&maxP=${priceRange[1]}`);
    }
    dispatch({ type: "filterString", filterString: filterString });
  };
  const showIcon = () => {
    setFilterIcon(true);
  };
  const hideIcon = () => {
    setFilterIcon(false);
  };

  return (
    <div className={styles.modal}>
      <div onClick={toggleModal} className={styles.overlay}></div>
      <div className={styles.modalContent}>
        <div className={styles.dropdownSelectors}>
          <select defaultValue={selectedCity} className="sh2 select" onChange={handleCityChange}>
            <option disabled value="DEFAULT">
              Zgjidh qytetin
            </option>
            {cities.map((el) => (
              <option value={el._id}>{el.city}</option>
            ))}
          </select>
          <select defaultValue={selectedZone} className="sh2 select" onChange={handleZoneChange}>
            <option disabled value="DEFAULT">
              Zgjidh zonen
            </option>
            {zones.map((el) => {
              if (el.cityId === selectedCity) {
                return <option value={el._id}>{el.zone}</option>;
              }
            })}
          </select>
        </div>
        <div className={styles.rangeSliders}>
          <PriceRange sendTheValues={handlePriceValues} />
          <FloorRange sendTheValues={handleFloorValues} />
        </div>
        <div className="elevator">
          <label htmlFor="elevator">Ashensor: </label>
          <input type="checkbox" id="elevator" name="elevator" value={true} />
        </div>
        <div className={styles.dropdownSelectors}>
          <select
            defaultValue={selectedStructure}
            className="sh2 select"
            onChange={handleStructureChange}
          >
            <option disabled value="DEFAULT">
              Zgjidh strukturën
            </option>
            {structures.map((el) => (
              <option value={el._id}>{el.structure}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterContainer}>
          <Button
            onClick={() => {
              buildFilterString();
              toggleModal();
            }}
            onMouseEnter={showIcon}
            onMouseLeave={hideIcon}
            className={styles.filterButton}
          >
            <Text sh2 className={styles.sh2}>
              Filter{" "}
              <Image
                src={FilterIcon}
                className={`${filterIcon ? styles.showFilterIcon : styles.hideFilterIcon}`}
              />
            </Text>
          </Button>
        </div>
        <button className={styles.closeModal} onClick={toggleModal}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default MoreOptions;
