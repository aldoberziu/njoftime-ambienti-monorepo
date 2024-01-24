import { BannerImage } from '../../icons';
import Image from 'next/image'
import Search from '../SearchBar';
import styles from './HomeBanner.module.css'

const Banner = () => {
    return ( 
        <div className={styles.bannerContainer}>
            <Image src={BannerImage} className={styles.bannerImage}/>
            <Search />
        </div>
     );
}
 
export default Banner;