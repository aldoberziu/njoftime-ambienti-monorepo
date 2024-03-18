import FilterEl from "../FilterEl";
import { categories } from "../../Constants";
import styles from "./FilterContainer.module.css";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../store";
import { useState } from "react";

const FilterContainer = (props) => {
  const dispatch = useDispatch();
  const { filter: parentFilter } = props;
  const [filter, setFilter] = useState(parentFilter);

  const resetCategory = () => {
    dispatch(categoryActions.category(""));
    setFilter(false);
    props.retrieveFilter(filter);
  };
  return (
    <div className={styles.filterContainer} id="filter-container">
      <div className={styles.resetFilter} onClick={resetCategory}>
        <Button>Reset Filter</Button>
      </div>
      <div className={styles.filterCategoriesContainer}>
        <div className={styles.filterCategories}>
          {categories.map((el, index) => (
            <FilterEl category={el} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
