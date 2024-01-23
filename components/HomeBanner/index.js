import { BannerImage } from '../../icons';
import Search from '../SearchBar';
import styles from './HomeBanner.module.css'

const Banner = () => {
    return ( 
        <div className={styles.bannerContainer}>
            <img src={BannerImage} className={styles.bannerImage}/>
            <Search />
        </div>
     );
}
 
export default Banner;