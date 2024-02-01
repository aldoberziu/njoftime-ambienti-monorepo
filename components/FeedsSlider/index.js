import axios from "axios";
import Link from "next/link.js";
import { getApiDomain } from "../../config/appInfo";
import { useEffect, useState } from "react";
import styles from "./FeedsSlider.module.css";
import Text from "../Text";
import { EmptyHeart } from "../../icons";
import Slider from "../Slider";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import FavoriteButton from "../Favorite";
import { cities, zones, structures } from "../../Constants";

const FeedsSlider = () => {
  const sCategory = useSelector((state) => state.category);

  const [feeds, setFeeds] = useState([]);
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const getFeeds = async () => {
    setLoading(true);
    if (sCategory === "" || sCategory === undefined) {
      await axios.get(getApiDomain() + "/feeds").then((response) => setFeeds(response.data.data));
      setLoading(false);
      setFilter(false);
    } else {
      await axios
        .get(getApiDomain() + `/feeds?category=${sCategory}`)
        .then((response) => setFeeds(response?.data?.data));
        setFilter(true);
        setLoading(false);
        const filter = document.getElementById("filter-container");
        filter.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    getFeeds();
  }, [sCategory]);

  if (loading) {
    return <Loader />;
  } else if (feeds.length === 0 && loading === false) {
    //skam dizajn per ket
    return (
      <div className={styles.centerEl}>
        <Text sh2>Nuk u gjet asnjë rezultat.</Text>
      </div>
    );
  }

  if (feeds) {
    return (
      <div>
        {filter && loading === false && (
          <div className={styles.centerEl}>
            <Text sh2>
              U gjet{feeds.length === 1 ? "" : "ën"} {feeds.length} rezultat
              {feeds.length === 1 ? "" : "e"}.
            </Text>
          </div>
        )}
        <div className={styles.displayFlex}>
          {feeds.map((feed) => (
            <div className={styles.portraitSingleContainer} key={feed._id}>
              <div className={styles.portraitImageContainer}>
                <Slider /*className="slider"*/ />
              </div>
              {/* <Link href={`/feeds/${feed._id}`}> */}
                <div className={styles.portraitSpecificsContainer}>
                  <Text ui1 className={styles.title}>
                    {feed.location?.zone
                      ? zones.map((zone) => {
                          if (feed.location.zone === zone._id) {
                            return `${zone.zone}, `;
                          }
                        })
                      : ""}
                    {feed.location?.city
                      ? cities.map((city) => {
                          if (feed.location.city === city._id) {
                            return `${city.city}`;
                          }
                        })
                      : " "}
                  </Text>
                  <Text ui3 className={styles.ui3}>
                    Ambienti: {feed.rooms} + {feed.toilet} {feed.garage ? "+ Garazh" : ""} /{" "}
                    {feed.furnishing}
                  </Text>
                  <Text ui3 className={styles.ui3}>
                    Sipërfaqja: {feed.area} m2
                  </Text>
                  <Text ui3 className={styles.ui3}>
                    Kati: {feed.floor}, Ashensor: {feed.elevator ? "Po" : "Jo"}
                  </Text>
                  <div className={styles.bottomContainer}>
                    <Text ui1>
                      <strong>${feed.price}</strong>/muaj
                    </Text>
                    <FavoriteButton feedId={feed._id} />
                  </div>
                </div>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>No feeds found!</h1>
    </div>
  );
};

export default FeedsSlider;
