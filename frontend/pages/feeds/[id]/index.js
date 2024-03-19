import axios from "axios";
import Link from "next/link";
import { getApiDomain } from "../../../config/appInfo";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import Text from "../../../components/Text";

import Slider from "../../../components/Slider";
import FavoriteButton from "../../../components/Favorite";
import PremiumTag from "../../../components/PremiumTag";
import styles from "../../../components/FeedsGrid/FeedsGrid.module.css";

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const feed = await axios.get(getApiDomain() + `/api/feeds/${id}`);
  const feeds = await axios.get(getApiDomain() + `/api/feeds/`);
  return {
    props: {
      feed: feed.data.data,
      feedsData: feeds.data.data,
    },
  };
}

const DetailedFeed = ({ feed: data, feedsData }) => {
  const [feed, setFeed] = useState(data);
  // const [loading, setLoading] = useState(true);
  return (
    // <div>
    //   <div>
    //     <Text sh2>ID: {feed._id}</Text>
    //     <Text sh2>Category: {feed.category}</Text>
    //     <Text sh2>Toilets: {feed.toilet}</Text>
    //     <Text sh2>Capacity: {feed.capacity} people</Text>
    //     <Text sh2>City: {feed.city}</Text>
    //     <Text sh2>Area: {feed.area} m2</Text>
    //     <Text sh2>
    //       Floor: {feed.floor === 0 ? "Ground Floor" : feed.floor}
    //       {feed.floor === 0
    //         ? ""
    //         : feed.floor === 1
    //         ? "st"
    //         : feed.floor === 2
    //         ? "nd"
    //         : feed.floor === 3
    //         ? "rd"
    //         : "nth"}
    //     </Text>
    //     <Text sh2>Elevator: {feed.elevator ? "Yes" : "No"}</Text>
    //     <Text sh2>Structure: {feed.structure}</Text>
    //     <Text sh2>Price: {feed.price}L</Text>
    //     {feed.images.map((image) => (
    //       <a href={image}>
    //         {image}
    //         <br></br>
    //       </a>
    //     ))}
    //     <Text sh2>CreatedAt: {new Date(feed.createdAt).toString()}</Text>
    //     <Text sh2>ModifiedAt: {new Date(feed.modifiedAt).toString()}</Text>
    //     <Text sh2>ExpiresAt: {new Date(feed.expiresAt).toString()}</Text>
    //     <Text sh2>Plan: {feed.activePlan}</Text>
    //     <Link href={`/feeds/${feed._id}/updatePlan`}>Update Plan</Link>
    //   </div>
    //   <Link href={"/feeds"}>Go Back</Link>
    // </div>
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
              <PremiumTag activePlan={feed.activePlan}/>
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
};
export default DetailedFeed;
