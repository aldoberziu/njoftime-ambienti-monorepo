import styles from './FilterEl.module.css';
import Text from '../Text';
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { categoryActions } from "../../store";

const FilterEl = ( props ) => {
  const category = props.category;
  
  const dispatch = useDispatch();

  const changeCategory = (id) => {
    dispatch(categoryActions.category(id))
  }

  return (
    <div className={styles.category} onClick={() => {changeCategory(category._id)}}>
        <Image src={category.icon} alt='Filter Icon' width={60} height={60}/>
      <Text ui1 className={styles.title}>{category.category}</Text>
    </div>
  );
};

export default FilterEl;

