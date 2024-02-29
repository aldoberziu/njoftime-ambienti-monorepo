import Image from "next/image";
import styles from "./UploadImage.module.css";
import { ImageUploader } from "../../icons";
import { useState, useEffect } from "react";
import toBase64 from "../../utils/toBase64";
import Compressor from "compressorjs";

const UploadImage = (props) => {
  const { field, index } = props;
  const [selectedValue, setSelectedValue] = useState([]);
  const [image, setImage] = useState(null);

  const handleValue = async (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));

    new Compressor(e.target.files[0], {
      quality: 1,
      success: async (res) => {
        const base64 = await toBase64(res);
        setSelectedValue({ field: field, data: base64 });
      },
    });
  };

  useEffect(() => {
    props?.selectedValue?.(selectedValue);
  }, [selectedValue]);

  return (
    <div>
      <div
        className={
          image !== null ? `${styles.imageUploader} ${styles.noPadding}` : styles.imageUploader
        }
      >
        <label htmlFor={`upload-photo-${index}`} className={styles.label}>
          <Image
            src={image !== null ? image : ImageUploader}
            className={styles.image}
            alt=""
            width={image !== null ? 200 : 200}
            height={image !== null ? 200 : 200}
          />
        </label>
        <input
          type="file"
          name="photo"
          id={`upload-photo-${index}`}
          className={styles.inputField}
          onChange={handleValue}
        />
      </div>
    </div>
  );
};

export default UploadImage;
