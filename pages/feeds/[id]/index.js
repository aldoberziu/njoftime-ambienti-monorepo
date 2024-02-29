import axios from "axios";
import Link from "next/link";
import { getApiDomain } from "../../../config/appInfo";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import Text from "../../../components/Text";

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  return {
    props: {
      id,
    },
  };
}

const DetailedFeed = ({ id }) => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDetailedFeed = async () => {
    await axios
      .get(getApiDomain() + `/feeds/${id}`)
      .then((response) => setFeed(response.data.data));
    setLoading(false);
  };
  useEffect(() => {
    getDetailedFeed();
  }, [feed]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <div>
          <Text sh2>ID: {feed._id}</Text>
          <Text sh2>Category: {feed.category}</Text>
          <Text sh2>Toilets: {feed.toilet}</Text>
          <Text sh2>Capacity: {feed.capacity} people</Text>
          <Text sh2>City: {feed.city}</Text>
          <Text sh2>Area: {feed.area} m2</Text>
          <Text sh2>
            Floor: {feed.floor === 0 ? "Ground Floor" : feed.floor}
            {feed.floor === 0
              ? ""
              : feed.floor === 1
              ? "st"
              : feed.floor === 2
              ? "nd"
              : feed.floor === 3
              ? "rd"
              : "nth"}
          </Text>
          <Text sh2>Elevator: {feed.elevator ? "Yes" : "No"}</Text>
          <Text sh2>Structure: {feed.structure}</Text>
          <Text sh2>Price: {feed.price}L</Text>
          {feed.images.map((image) => (
            <a href={image}>{image}<br></br></a>
          ))}
          <Text sh2>CreatedAt: {new Date(feed.createdAt).toString()}</Text>
          <Text sh2>ModifiedAt: {new Date(feed.modifiedAt).toString()}</Text>
          <Text sh2>ExpiresAt: {new Date(feed.expiresAt).toString()}</Text>
          <Text sh2>Plan: {feed.activePlan}</Text>
          <Link href={`/feeds/${feed._id}/plans`}>Update Plan</Link>
        </div>
        <Link href={"/feeds"}>Go Back</Link>
      </div>
    );
  }
};

export default DetailedFeed;
