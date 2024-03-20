"use client";
import Session from "supertokens-node/recipe/session";
import supertokensNode from "supertokens-node";
import { backendConfig } from "../../config/backendConfig";
import { useDispatch, useSelector } from "react-redux";
import FeedsGrid from "../../components/FeedsGrid";
import FeedsSlider from "../../components/FeedsSlider";
import FilterContainer from "../../components/FilterContainer";
import Banner from "../../components/HomeBanner";
import axios from "axios";
import { getApiDomain } from "../../config/appInfo";
import { useEffect, useState, useRef } from "react";
import { userActions } from "../../store";
import Loader from "../../components/Loader";
import { cities } from "../../Constants";
import styles from "../../styles/HomePage.module.css";

const Feeds = ({ user, feeds: dbFeeds }) => {
  const dispatch = useDispatch();
  const sCategory = useSelector((state) => state.category.category);
  const searchValue = useSelector((state) => state.search.searchValue);
  const filterString = useSelector((state) => state.filter.filterString);

  const [sliderFeeds, setSliderFeeds] = useState([]);
  const [gridFeeds, setGridFeeds] = useState([]);
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(user) dispatch(userActions.user(user));
    setSliderFeeds(dbFeeds);
    setGridFeeds(dbFeeds);
    setLoading(false);
  }, []); //kjo sduhet t jet infinit por s esht

  const handleFilter = (state) => {
    if (state === false) {
      setFilter(false);
    }
  };

  useEffect(() => {
    if (sCategory !== "") {
      setFilter(true);
      const filteredFeeds = dbFeeds.filter((feed) => feed.category.includes(sCategory));
      setSliderFeeds(filteredFeeds);
      const slider = document.getElementById("filter-container");
      slider?.scrollIntoView({ behavior: "smooth" });
    }
  }, [sCategory]);

  useEffect(() => {
    if (searchValue !== "") {
      const searchElements = searchValue.split(" ");
      const words = searchElements.filter((item) => isNaN(item));

      const searchedIDs = dbFeeds
        .map((dbFeed) => ({
          ...dbFeed,
          location: {
            ...dbFeed.location,
            city: cities.find(({ _id }) => _id === dbFeed.location.city)?.title,
          },
        }))
        .filter((feed) =>
          words.some((el) => feed.location.city.toLowerCase().includes(el.toLowerCase()))
        )
        .map((feed) => ({ _id: feed._id }));
      const feeds = dbFeeds.filter((feed) => searchedIDs.some((el) => feed._id.includes(el._id)));
      setGridFeeds(feeds);
    } else if (filterString !== undefined) {
      let { city, zone, structure, minP, maxP, minF, maxF, elevator, rooms } = filterString || {};

      let filteredFeeds = dbFeeds
        .filter((el) => city == undefined || city.includes(el.location.city))
        .filter((el) => zone == undefined || zone.includes(el.location.zone))
        .filter((el) => structure == undefined || structure.includes(el.structure))
        .filter((el) => minP == undefined || parseInt(minP) <= el.price)
        .filter((el) => maxP == undefined || parseInt(maxP) >= el.price)
        .filter((el) => minF == undefined || parseInt(minF) <= el.floor)
        .filter((el) => maxF == undefined || parseInt(maxF) >= el.floor)
        .filter((el) => rooms == undefined || parseInt(rooms) == el.rooms)
        .filter((el) => elevator == undefined || elevator == el.elevator);

      setGridFeeds(filteredFeeds);
    }
  }, [searchValue, filterString]);

  // get loading state from each child component and using the if statement run this nigga
  // might be wrong cuz its supposed to run all components again after each loader showup
  // but who fuckin cares do e shofim e bojm me overlay as it should be

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Banner />
        <div className={styles.globalWrapper}>
          <FilterContainer filter={filter} retrieveFilter={handleFilter} />
          <FeedsSlider
            feeds={sCategory === "" ? dbFeeds : sliderFeeds}
            loading={loading}
            filter={filter}
          />
          <FeedsGrid
            feeds={searchValue === "" && filterString === "" ? dbFeeds : gridFeeds}
            loading={loading}
          />
        </div>
      </>
    );
  }
};

export async function getServerSideProps(context) {
  supertokensNode.init(backendConfig());
  let session;
  try {
    session = await Session.getSession(context.req, context.res, {
      overrideGlobalClaimValidators: () => {
        return [];
      },
    });
  } catch (err) {
    if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
      return { props: { fromSupertokens: "needs-refresh" } };
    } else if (err.type === Session.Error.UNAUTHORISED) {
      return { props: { fromSupertokens: "needs-refresh" } };
    }
    throw err;
  }
  // const res = await axios.get(getApiDomain() + `/api/users/${session.getUserId()}`);

  // let feeds = await axios.get(getApiDomain() + "/api/feeds");

  return {
    props: {
      // user: res.data.user,
      user: null,
      feeds: [
        {
          location: { city: "3", zone: "33", country: "1", street: "Rruga Abdyl Frashëri" },
          _id: "65cb7f92efaacca92c882d41",
          category: "2",
          furnishing: "Pjesërisht e mobiluar",
          toilet: "1",
          capacity: "4",
          area: "105",
          floor: 3,
          elevator: true,
          garage: true,
          structure: "5",
          price: 9490,
          currency: "LEK",
          rooms: "3",
          createdAt: 1707835282457,
          expiresAt: 1712938508863,
          activePlan: "4",
          active: true,
          __v: 0,
          images: [],
          modifiedAt: 1710346508863,
          id: "65cb7f92efaacca92c882d41",
        },
        {
          location: { city: "3", zone: "33", country: "1", street: "Rruga Abdyl Frashëri" },
          _id: "65cb8467e8f19a4f5b053af5",
          category: "2",
          furnishing: "Pjesërisht e mobiluar",
          toilet: "1",
          capacity: "4",
          area: "105",
          floor: 3,
          elevator: true,
          garage: true,
          structure: "5",
          price: 9490,
          currency: "LEK",
          rooms: "3",
          createdAt: 1707836519953,
          expiresAt: 1712850919882,
          activePlan: "2",
          active: true,
          __v: 0,
          images: [],
          modifiedAt: 1710258919882,
          id: "65cb8467e8f19a4f5b053af5",
        },
        {
          location: { country: "", city: "2", zone: "28", street: "Rruga Knp kavaj " },
          _id: "65fae1a3d79417ffec2d0fff",
          category: "2",
          furnishing: "Pjesërisht e mobiluar",
          toilet: "2",
          description: "pershkrim per pronen imobilare",
          capacity: "5",
          area: "120",
          floor: 8,
          elevator: true,
          garage: true,
          structure: "1",
          price: 0,
          currency: "ALL",
          rooms: "",
          images: [
            "https://res.cloudinary.com/njoftime/image/upload/v1710940577/nz3d4ublwtgl8h4lw6rz.jpg",
            "https://res.cloudinary.com/njoftime/image/upload/v1710940577/l2iohgx4k95nj78tf1k9.jpg",
            "https://res.cloudinary.com/njoftime/image/upload/v1710940578/mo80zljga3fb1lac4wwz.jpg",
          ],
          createdAt: 1710940576508,
          expiresAt: 1713532775531,
          activePlan: "5",
          active: true,
          __v: 0,
          modifiedAt: 1710940775531,
          id: "65fae1a3d79417ffec2d0fff",
        },
      ],
    },
  };
}

export default Feeds;
