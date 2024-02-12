import styles from "./FeedsGrid.module.css";
import Text from "../Text";
import { useRouter } from "next/router";
import Slider from "../Slider";
import FavoriteButton from "../Favorite";
import { cities, zones, structures } from "../../Constants";
import Loader from "../Loader";

const FeedsGrid = (props) => {
  const router = useRouter();
  const { feeds, loading } = props;

  if (loading) {
    return <Loader />;
  } else {
    if (feeds) {
      return (
        <div>
          <div className={styles.displayBlock2x} id="feeds-grid">
            {feeds.map((feed) => (
              <div
                className={styles.singleContainer}
                onClick={() => router.push(`/feeds/${feed._id}`)}
                key={feed._id}
              >
                <div className={styles.imageContainer}>
                  <Slider /*className="slider"*/ />
                </div>
                <div className={styles.specificsContainer}>
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
  }

  return (
    <div>
      <h1>No feeds found!</h1>
    </div>
  );
};

export default FeedsGrid;
