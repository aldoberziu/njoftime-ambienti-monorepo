import { useState, useEffect } from "react";
import Text from "../Text";
import { UpArrow, DownArrow } from "../../icons";
import styles from "./FloorRange.module.css";
import Image from 'next/image'

const FloorRangeAccordion = ({ sendTheValues }) => {
  const [accordion, setAccordion] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  const toggleAccordion = () => {
    const accordionContent = document.querySelector(".floor-content");
    setAccordion(!accordion);
    accordionContent.style.display = accordionContent.style.display === "block" ? "none" : "block";
  };

  useEffect(() => {
    const rangeValueMin = document.getElementById("floor-range-value-min"),
      rangeMin = document.getElementById("floorRangeMin"),
      setTheMinValue = () => {
        const newValue = Number(
            ((rangeValueMin.value - rangeValueMin.min) * 100) /
              (rangeValueMin.max - rangeValueMin.min)
          ),
          newPosition = 10 - newValue * 0.2;
        rangeMin.innerHTML = `<span>${rangeValueMin.value}</span>`;
        rangeMin.style.left = `calc(${newValue}% + (${newPosition}px))`;
        setMinValue(rangeValueMin.value);
      };
    document.addEventListener("DOMContentLoaded", setTheMinValue);
    rangeValueMin.addEventListener("input", setTheMinValue);
  }, [minValue]);
  useEffect(() => {
    const rangeValueMax = document.getElementById("floor-range-value-max"),
      rangeMax = document.getElementById("floorRangeMax"),
      setTheMaxValue = () => {
        const newValue = Number(
            ((rangeValueMax.value - rangeValueMax.min) * 100) /
              (rangeValueMax.max - rangeValueMax.min)
          ),
          newPosition = 10 - newValue * 0.2;
        rangeMax.innerHTML = `<span>${rangeValueMax.value}</span>`;
        rangeMax.style.left = `calc(${newValue}% + (${newPosition}px))`;
        setMaxValue(rangeValueMax.value);
      };
    document.addEventListener("DOMContentLoaded", setTheMaxValue);
    rangeValueMax.addEventListener("input", setTheMaxValue);
  }, [maxValue]);
  useEffect(() => {
    const rangeInput = document.querySelectorAll(".floor-range-input input"),
      range = document.querySelector(".floor-slider .floor-progress");
    let floorGap = 5;

    rangeInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value),
          maxVal = parseInt(rangeInput[1].value);
        if (maxVal - minVal < floorGap) {
          if (e.target.className === "range-min") {
            rangeInput[0].value = maxVal - floorGap;
          } else {
            rangeInput[1].value = minVal + floorGap;
          }
        } else {
          range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
          range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
      });
    });
    sendTheValues([minValue, maxValue]);
  }, [minValue, maxValue]);

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionItem}>
        <div className={styles.accordionHeader} onClick={toggleAccordion}>
          <Text sh3>Floor Range</Text>
          <div className={styles.toggleIcon}>
            <Image src={accordion ? UpArrow : DownArrow} alt=""/>
          </div>
        </div>
        <div className={`${styles.floorContent} floor-content`}>
          <div className={`${styles.floorSlider} floor-slider`}>
            <div className={`${styles.floorProgress} floor-progress`}/>
          </div>
          <div className={`${styles.floorRangeInput} floor-range-input`}>
            <div id="range-input-container">
              <div className={`${styles.rangeValue} range-value`} id="floorRangeMin"></div>
              <input
                type="range"
                id="floor-range-value-min"
                className={`${styles.inputTypeRange} range-min input-type-range`}
                min={0}
                max={50}
                defaultValue={minValue}
                step={1}
              />
            </div>
            <div id="range-input-container">
              <div className={`${styles.rangeValue} range-value`} id="floorRangeMax"></div>
              <input
                type="range"
                id="floor-range-value-max"
                className={`${styles.inputTypeRange} range-max input-type-range`}
                min={0}
                max={50}
                defaultValue={maxValue}
                step={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorRangeAccordion;
