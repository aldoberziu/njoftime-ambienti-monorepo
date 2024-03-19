import styles from "./PremiumTag.module.scss";
import { PremiumStar } from "../../icons";
import Image from "next/image";

const PremiumTag = ({ activePlan }) => {
  let color;
  // color = activePlan.replace("4", "red");
  color = activePlan.replace("3", "green");//to be fixed
  return (
    <div className={styles.container} style={{ '--border-color': color }}>
      <Image src={PremiumStar} alt=""/>
    </div>
  );
};

export default PremiumTag;
