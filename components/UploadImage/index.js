import Image from "next/image";
import styles from "./UploadImage.module.css";
import { ImageUploader } from "../../icons";
import { useState, useEffect } from "react";
import toBase64 from '../../utils/toBase64';

const UploadImage = (props) => {
  const { field} = props;
  const [selectedValue, setSelectedValue] = useState([]);

  const handleValue = async (e) => {
    const base64 = await toBase64(e.target.files[0]);
    setSelectedValue({ field: field, data: base64 });
  };

  useEffect(() => {
    props?.selectedValue?.(selectedValue);
  }, [selectedValue]);
  
  return (
    <div className={styles.imageUploader}>
      <label htmlFor="upload-photo" className={styles.label}>
        <Image src={ImageUploader} className={styles.image} alt="" />
      </label>
      <input
        type="file"
        name="photo"
        id="upload-photo"
        className={styles.inputField}
        onChange={handleValue}
      />
    </div>
  );
};

export default UploadImage;
