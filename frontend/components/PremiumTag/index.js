import styles from "./PremiumTag.module.scss";
import { colors } from "../../Constants";
import { PremiumStar } from "../../icons";
import Image from "next/image";

const PremiumTag = ({ activePlan }) => {
  let color = colors.find(({ _id }) => _id === activePlan)?.title
  return (
    <div className={styles.container} style={{ '--border-color': color }}>
      <Image src={PremiumStar} alt=""/>
    </div>
  );
};

export default PremiumTag;
