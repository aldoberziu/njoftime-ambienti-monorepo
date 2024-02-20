import styles from "./AddFeed.module.css";
import Dropdown from "../Dropdown";
import Input from "../InputField";
import Button from "../Button";
import { cities, zones, structures, categories, furnishing } from "../../Constants";
import { useState } from "react";
import Text from "../Text";
import UploadImage from "../UploadImage";

const AddFeed = () => {
  const [feedInput, setFeedInput] = useState({
    /*nqs do ti kesh empty fieldsat gjithsesi. define em here*/
  });

  const handleFeedInput = (input) => {
    let { field, data } = input;
    setFeedInput((state) => ({ ...state, [field]: data }));
  };
  console.log(feedInput);

  return (
    <div className={styles.container}>
      <Text sh3>Publiko njoftimin me formularin me posht</Text>
      <div className={`${styles.tile} ${styles.pattern1}`}>
        <Dropdown
          name="Kategoria"
          field="category"
          options={categories}
          selectedValue={handleFeedInput}
        />
        <Input type="text" field="title" placeholder="Titulli" selectedValue={handleFeedInput} />
        <Input
          type="text"
          field="description"
          placeholder="Pershkrimi i njoftimit"
          selectedValue={handleFeedInput}
          className={`${styles.textarea} ${styles.lastChild}`}
        />
      </div>
      <div className={`${styles.tile} ${styles.pattern2}`}>
        <Dropdown
          name="Struktura"
          field="structure"
          options={structures}
          selectedValue={handleFeedInput}
        />
        <Input
          type="number"
          field="capacity"
          placeholder="Kapaciteti"
          selectedValue={handleFeedInput}
        />
        <Input type="number" field="floor" placeholder="Kati" selectedValue={handleFeedInput} />
      </div>
      <div className={`${styles.tile} ${styles.pattern3}`}>
        <Input
          type="number"
          field="area"
          placeholder="Siperfaqja neto m²"
          selectedValue={handleFeedInput}
        />
        <Dropdown
          name="Mobilimi"
          field="furnishing"
          options={furnishing}
          selectedValue={handleFeedInput}
        />
        <Input type="number" field="toilet" placeholder="Tualete" selectedValue={handleFeedInput} />
        <Dropdown
          name="Ashensor"
          field="elevator"
          options={[
            { _id: true, title: "Po" },
            { _id: false, title: "Jo" },
          ]}
          selectedValue={handleFeedInput}
        />
      </div>
      <div className={styles.uploadSection}>
        <Text sh3>Vendosni Foto te ambientit*</Text>
        <div className={styles.uploaders}>
          <UploadImage />
          <UploadImage />
          <UploadImage />
          <UploadImage />
        </div>
      </div>
      <div className={`${styles.tile} ${styles.pattern1}`}>
        <Dropdown name="Qyteti" field="city" options={cities} selectedValue={handleFeedInput} />
        <Dropdown
          name="Zona"
          field="zone"
          options={zones.filter(({ cityId }) => cityId === feedInput.city)}
          selectedValue={handleFeedInput}
        />
        <Input
          type="text"
          field="street"
          placeholder="Shkruaj sakte emrin e rruges..."
          selectedValue={handleFeedInput}
          className={styles.lastChild}
        />
      </div>
      {/* <Button>Publiko</Button> */}
    </div>
  );
};

export default AddFeed;