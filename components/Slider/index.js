import { PortraitCardImg, PortraitCardImg2, PortraitCardImg3, PortraitCardImg4 } from "../../icons";
import Image from "next/image";
import styles from "./Slider.module.css";
import { useState } from "react";
const Slider = (props) => {
  const { images } = props;
  const dummyImages = [PortraitCardImg, PortraitCardImg2, PortraitCardImg3, PortraitCardImg4];
  const [slide, setSlide] = useState(0);
  const nextSlide = () => {
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  };
  const previousSlide = () => {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  };
  return (
    <div className={styles.slider}>
      <span className={`${styles.arrow} ${styles.arrowLeft}`} onClick={previousSlide}>
        ←
      </span>
      {(images?.length > 0 ? images : dummyImages).map((image, index) => {
        return (
          <Image
            src={image}
            layout="fill"
            alt=""
            key={index}
            className={
              slide === index ? `${styles.slide}` : `${styles.slide} ${styles.slideHidden}`
            }
          />
        );
      })}
      <span className={`${styles.arrow} ${styles.arrowRight}`} onClick={nextSlide}>
        →
      </span>
      <span className={styles.indicators}>
        {(images?.length > 0 ? images : dummyImages).map((_, index) => {
          return (
            <span
              key={index}
              onMouseEnter={() => setSlide(index)}
              className={
                slide === index
                  ? `${styles.indicator} ${styles.indicatorActive}`
                  : `${styles.indicator} ${styles.indicatorInactive}`
              }
            ></span>
          );
        })}
      </span>
    </div>
  );
};

export default Slider;
