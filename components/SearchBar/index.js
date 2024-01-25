import Button from "../Button";
import Text from "../Text";
import Image from "next/image";
import { SearchIcon } from "../../icons";
import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DownArrowTriangle } from "../../icons";
import MoreOptions from "../MoreOptions";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (searchValue) => {
    dispatch({ type: "searchValue", searchValue: searchValue });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(searchValue);
    }
  };
  const getModalState = (data) => {
    setModal(data);
  };
  const showModal = () => {
    setModal(true);
  };

  return (
    <>
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Kërko më shumë..."
            className={styles.searchInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            id="search-input-field"
            onKeyDown={handleKeyPress}
          />
          <Button onClick={() => handleSubmit(searchValue)} className={styles.ui1} id="search-button">
            <Text sh2 className={styles.sh2}>
              Search <Image src={SearchIcon} alt=""/>
            </Text>
          </Button>
        </div>
        <div className={styles.moreOptions}>
          <Button onClick={showModal}>
            <Text sh2 className={styles.sh2}>
              Me shume opsione <Image src={DownArrowTriangle} alt=""/>
            </Text>
          </Button>
        </div>
      </div>
      {modal && <MoreOptions onToggle={getModalState} />}
    </>
  );
};

export default Search;
