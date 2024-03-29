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
import { filterActions } from "../../store";

const MoreOptions = ({ onToggle }) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    onToggle(modal);
    const grid = document.getElementById("feeds-grid");
    setTimeout(function () {
      grid.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };
  const [selectedCity, setSelectedCity] = useState("DEFAULT");
  const [selectedZone, setSelectedZone] = useState("DEFAULT");
  const [selectedStructure, setSelectedStructure] = useState("DEFAULT");
  const [priceRange, setPriceRange] = useState([]);
  const [floorRange, setFloorRange] = useState([]);
  const [selectedElevator, setSelectedElevator] = useState(false);
  const [filterIcon, setFilterIcon] = useState(false);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };
  const handleStructureChange = (e) => {
    setSelectedStructure(e.target.value);
  };
  const handlePriceValues = (prices) => {
    setPriceRange(prices);
  };
  const handleFloorValues = (floors) => {
    setFloorRange(floors);
  };
  const handleElevator = () => {
    setSelectedElevator(!selectedElevator);
  };
  const buildFilterString = async () => {
    if (selectedCity !== "DEFAULT") {
      dispatch(filterActions.filter({ type: "city", payload: selectedCity }));
    }
    if (selectedZone !== "DEFAULT") {
      dispatch(filterActions.filter({ type: "zone", payload: selectedZone }));
    }
    if (selectedStructure !== "DEFAULT") {
      dispatch(filterActions.filter({ type: "structure", payload: selectedStructure }));
    }
    if (priceRange[0] !== 2500) {
      dispatch(filterActions.filter({ type: "minP", payload: priceRange[0] }));
    }
    if (priceRange[1] !== 7500) {
      dispatch(filterActions.filter({ type: "maxP", payload: priceRange[1] }));
    }
    if (floorRange[0] !== 0) {
      dispatch(filterActions.filter({ type: "minF", payload: floorRange[0] }));
    }
    if (floorRange[1] !== 10) {
      dispatch(filterActions.filter({ type: "maxF", payload: floorRange[1] }));
    }
    if (!!selectedElevator) {
      dispatch(filterActions.filter({ type: "elevator", payload: selectedElevator }));
    }
    // dispatch(filterActions.filter(filterString));
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
              <option value={el._id}>{el.title}</option>
            ))}
          </select>
          <select defaultValue={selectedZone} className="sh2 select" onChange={handleZoneChange}>
            <option disabled value="DEFAULT">
              Zgjidh zonen
            </option>
            {zones.map((el) => {
              if (el.cityId === selectedCity) {
                return <option value={el._id}>{el.title}</option>;
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
          <input
            type="checkbox"
            id="elevator"
            name="elevator"
            defaultValue={selectedElevator}
            onChange={handleElevator}
          />
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
              <option value={el._id}>{el.title}</option>
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
                alt=""
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
