import Image from "next/image";
import styles from "./UploadImage.module.css";
import { ImageUploader } from "../../icons";

const UploadImage = () => {
  return (
    <div className={styles.imageUploader}>
      <label for="upload-photo" className={styles.label}>
        <Image src={ImageUploader} className={styles.image} />
      </label>
      <input type="file" name="photo" id="upload-photo" className={styles.inputField} />
    </div>
  );
};

export default UploadImage;
