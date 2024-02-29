import styles from "./FeedsGrid.module.css";
import Text from "../Text";
import { useRouter } from "next/router";
import Slider from "../Slider";
import FavoriteButton from "../Favorite";
import { cities, zones, categories, structures, countries } from "../../Constants";

const FeedsGrid = (props) => {
  const router = useRouter();
  const { feeds } = props;

  let feedsData = feeds.map((feed) => ({
    ...feed,
    category: categories.find(({ _id }) => _id === feed?.category)?.title,
    structure: structures.find(({ _id }) => _id === feed?.structure)?.title,
    location: {
      city: cities.find(({ _id }) => _id === feed.location?.city)?.title,
      zone: zones.find(({ _id }) => _id === feed.location?.zone)?.title,
      country: countries.find(({ _id }) => _id === feed.location?.country)?.title,
    },
  }));

  if (feedsData) {
    return (
      <div>
        <div className={styles.displayBlock2x} id="feeds-grid">
          {feedsData.map((feed) => (
            <div
              className={styles.singleContainer}
              onClick={() => router.push(`/feeds/${feed._id}`)}
              key={feed._id}
            >
              <div className={styles.imageContainer}>
                <Slider className={styles.slider} images={feed.images} />
              </div>
              <div className={styles.specificsContainer}>
                <Text ui1 className={styles.title}>
                  {`${feed?.location?.zone}, ${feed.location?.city}` /*, ${feed.location?.country}*/}
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

export default FeedsGrid;
