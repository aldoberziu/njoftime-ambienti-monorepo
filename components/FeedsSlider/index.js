import styles from "./FeedsSlider.module.css";
import Text from "../Text";
import Slider from "../Slider";
import Loader from "../Loader";
import FavoriteButton from "../Favorite";
import { cities, zones, categories, structures, countries } from "../../Constants";
import { useRouter } from "next/router";

const FeedsSlider = (props) => {
  const router = useRouter();
  let { feeds, loading, filter } = props;

  let feedsData = feeds.map((feed) => ({
    ...feed,
    category: categories.find(({ _id }) => _id === feed.category).title,
    structure: structures.find(({ _id }) => _id === feed.structure).title,
    location: {
      city: cities.find(({ _id }) => _id === feed.location.city).title,
      zone: zones.find(({ _id }) => _id === feed.location.zone).title,
      country: countries.find(({ _id }) => _id === feed.location.country).title,
    },
  }));

  if (loading) {
    return <Loader />;
  } else if (feeds.length === 0 && loading === false) {
    //skam dizajn per ket
    return (
      <>
        <div className={styles.centerEl}>
          <Text sh2>Nuk u gjet asnjë rezultat.</Text>
        </div>
        <div className={styles.displayFlex} id="feeds-slider"></div>
      </>
    );
  }

  if (feedsData) {
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
        <div className={styles.sliderContainer} id="feeds-slider">
          {feedsData.map((feed) => (
            <div
              className={styles.portraitSingleContainer}
              onClick={() => router.push(`/feeds/${feed._id}`)}
              key={feed._id}
            >
              <div className={styles.portraitImageContainer}>
                <Slider /*className="slider"*/ />
              </div>
              <div className={styles.portraitSpecificsContainer}>
                <Text ui1 className={styles.title}>
                  {`${feed.location?.zone}, ${feed.location?.city}`/*, ${feed.location?.country}*/}
                </Text>
                {/* <Text ui3>{feed.category}</Text> */}
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
                    <strong>
                      {feed.currency === "EUR"
                        ? `€${feed.price}`
                        : feed.currency === "USD"
                        ? `$${feed.price}`
                        : `${feed.price}L`}
                    </strong>
                    /Muaj
                  </Text>
                  <FavoriteButton feedId={feed._id} />
                </div>
              </div>
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
