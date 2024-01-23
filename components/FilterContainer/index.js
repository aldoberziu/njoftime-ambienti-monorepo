import FilterEl from "../FilterEl";
import { categories } from "../../Constants";
import styles from "./FilterContainer.module.css";
import Button from "../Button";
import { useDispatch } from "react-redux";

const FilterContainer = () => {
  const dispatch = useDispatch();

  const resetCategory = () => {
    dispatch({ type: "changeCategory", category: "" });
  };
  return (
    <div className={styles.filterContainer} id="filter-container">
      <div className={styles.resetFilter} onClick={resetCategory}>
        <Button>Reset Filter</Button>
      </div>
      <div className={styles.filterCategoriesContainer}>
        <div className={styles.filterCategories}>
          {categories.map((el) => (
            <FilterEl category={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
