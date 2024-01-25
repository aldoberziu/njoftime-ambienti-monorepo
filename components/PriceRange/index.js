import { useState, useEffect } from "react";
import Text from "../Text";
import Image from 'next/image'
import { UpArrow, DownArrow } from "../../icons";
import styles from "./PriceRange.module.css";

const PriceRangeAccordion = ({sendTheValues}) => {
  const [accordion, setAccordion] = useState(false);
  const [minValue, setMinValue] = useState(2500);
  const [maxValue, setMaxValue] = useState(7500);

  const toggleAccordion = () => {
    const accordionContent = document.querySelector(".price-content");
    setAccordion(!accordion);
    accordionContent.style.display = accordionContent.style.display === "block" ? "none" : "block";
  };

  useEffect(() => {
    const rangeValueMin = document.getElementById("price-range-value-min"),
      rangeMin = document.getElementById("rangeMin"),
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
    const rangeValueMax = document.getElementById("price-range-value-max"),
      rangeMax = document.getElementById("rangeMax"),
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
    const rangeInput = document.querySelectorAll(".range-input input"),
      range = document.querySelector(".price-slider .progress");
    let priceGap = 1000;

    rangeInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value),
          maxVal = parseInt(rangeInput[1].value);
        if (maxVal - minVal < priceGap) {
          if (e.target.className === "range-min") {
            rangeInput[0].value = maxVal - priceGap;
          } else {
            rangeInput[1].value = minVal + priceGap;
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
          <Text sh3>Price Range</Text>
          <div className={styles.toggleIcon}>
            <Image src={accordion ? UpArrow : DownArrow} alt="" />
          </div>
        </div>
        <div className={`${styles.priceContent} price-content`}>
          <div className={`${styles.priceSlider} price-slider`}>
            <div className={`${styles.progress} progress`} />
          </div>
          <div className={`${styles.rangeInput} range-input`}>
            <div id="range-input-container">
              <div className={`${styles.rangeValue} range-value`} id="rangeMin"></div>
              <input
                type="range"
                id="price-range-value-min"
                className={`${styles.inputTypeRange} range-min input-type-range`}
                min={0}
                max={10000}
                defaultValue={minValue}
                step={100}
              />
            </div>
            <div id="range-input-container">
              <div className={`${styles.rangeValue} range-value`} id="rangeMax"></div>
              <input
                type="range"
                id="price-range-value-max"
                className={`${styles.inputTypeRange} range-max input-type-range`}
                min={0}
                max={10000}
                defaultValue={maxValue}
                step={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeAccordion;
