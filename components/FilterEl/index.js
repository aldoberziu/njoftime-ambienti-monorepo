import styles from './FilterEl.module.css';
import Text from '../Text';
import { useDispatch } from 'react-redux';
const FilterEl = ( props ) => {
  const category = props.category;
  
  const dispatch = useDispatch();

  const changeCategory = (id) => {
    dispatch({ type: 'changeCategory', category: id});
  }

  return (
    <div className={styles.category} onClick={() => {changeCategory(category._id)}}>
        <img src={category.icon}/>
      <Text ui1 className={styles.title}>{category.category}</Text>
    </div>
  );
};

export default FilterEl;

