import styles from "./AddFeed.module.css";
import Dropdown from "../Dropdown";
import Input from "../InputField";
import Button from "../Button";
import { cities, zones, structures, categories, furnishing } from "../../Constants";
import { useState } from "react";
import Text from "../Text";
import UploadImage from "../UploadImage";
import toJSON from "../../utils/toJSON";
import { getApiDomain } from "../../config/appInfo";
import axios from "axios";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const AddFeed = () => {
  const userId = useSessionContext().userId;

  const [feedInput, setFeedInput] = useState({
    category: "",
    furnishing: "",
    toilet: "",
    description: "",
    capacity: "",
    location: {
      country: "",
      city: "",
      zone: "",
      street: "",
    },
    images: [],
    area: "",
    floor: 0,
    elevator: true,
    garage: true,
    structure: "",
    price: 0,
    currency: "ALL",
    rooms: "",
    /*nqs do ti kesh empty fieldsat gjithsesi. define em here*/
  });

  const handleFeedInput = (input) => {
    let { field, data, nested } = input;
    if (!!nested) {
      setFeedInput((state) => ({ ...state, [field]: { ...state.location, [nested]: data } }));
    } else if (field === "images") {
      setFeedInput((state) => ({ ...state, images: [...state.images, data] }));
    } else {
      setFeedInput((state) => ({ ...state, [field]: data }));
    }
    if (field === "elevator" || field === "floor") {
      setFeedInput((state) => ({ ...state, [field]: toJSON(data) }));
    }
  };

  const handleSubmit = async () => {
    let filtered = Object.fromEntries(
      Object.entries(feedInput).filter(([key, value]) => key !== undefined && value !== undefined)
    );
    setFeedInput(filtered);

    await axios.post(getApiDomain() + "/feeds", { feedInput, userId });
  };

  return (
    <div>
      <Head>
        <title>SuperTokens 💫</title>
        <link rel="icon" href="/favicon.ico" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <div className={styles.container}>
        <Text sh3>Publiko njoftimin me formularin me poshte</Text>
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
          <Input
            type="number"
            field="toilet"
            placeholder="Tualete"
            selectedValue={handleFeedInput}
          />
          <Dropdown
            name="Ashensor"
            field="elevator"
            options={[
              { _id: "true", title: "Po" },
              { _id: "false", title: "Jo" },
            ]}
            selectedValue={handleFeedInput}
          />
        </div>
        <div className={styles.uploadSection}>
          <Text sh3>Vendosni Foto te ambientit*</Text>
          <div className={styles.uploaders}>
            <UploadImage selectedValue={handleFeedInput} field="images" index={0} />
            <UploadImage selectedValue={handleFeedInput} field="images" index={1} />
            <UploadImage selectedValue={handleFeedInput} field="images" index={2} />
            <UploadImage selectedValue={handleFeedInput} field="images" index={3} />
          </div>
        </div>
        <div className={`${styles.tile} ${styles.pattern1}`}>
          <Dropdown
            name="Qyteti"
            field="location"
            nested="city"
            options={cities}
            selectedValue={handleFeedInput}
          />
          <Dropdown
            name="Zona"
            field="location"
            nested="zone"
            options={zones.filter(({ cityId }) => cityId === feedInput?.location?.city)}
            selectedValue={handleFeedInput}
          />
          <Input
            type="text"
            field="location"
            nested="street"
            placeholder="Shkruaj sakte emrin e rruges..."
            selectedValue={handleFeedInput}
            className={styles.lastChild}
          />
        </div>
        <Button className={styles.publishButton} onClick={handleSubmit}>
          Publiko
        </Button>
      </div>
    </div>
  );
};

export default AddFeed;
