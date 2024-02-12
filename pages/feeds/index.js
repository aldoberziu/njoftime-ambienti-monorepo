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
import { useEffect, useState } from "react";
import { userActions } from "../../store";
import { cities, zones } from "../../Constants";
import Loader from "../../components/Loader";

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
    dispatch(userActions.user(user));
    // if (feeds.length === 0) {
    setSliderFeeds(dbFeeds);
    setGridFeeds(dbFeeds);
    setLoading(false);
    // }
  }, []); //kjo sduhet t jet infinit por s esht

  const handleFilter = (state) => {
    if (state === false) {
      setFilter(false);
    }
  };

  useEffect(() => {
    if (sCategory !== "") {
      setLoading(true);
      setFilter(true);
      axios.get(getApiDomain() + `/feeds?category=${sCategory}`).then((res) => {
        setSliderFeeds(res.data.data);
        setLoading(false);
      });
      const slider = document.getElementById("filter-container");
      slider.scrollIntoView({ behavior: "smooth" });
    }
  }, [sCategory]);

  useEffect(() => {
    if (searchValue !== "") {
      setLoading(true);
      try {
        axios
        .get(getApiDomain() + `/feeds/search/${searchValue}`)
          .then((response) => setGridFeeds(response?.data?.data));
        const grid = document.getElementById("feeds-grid");
        grid.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.log(err);
      }
    } else if (filterString !== "") {
      setLoading(true);
      try {
        axios
          .get(getApiDomain() + `/feeds/filter${filterString}`)
          .then((response) => setGridFeeds(response?.data?.data));
        const grid = document.getElementById("feeds-grid");
        grid.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.log(err.message);
      }
    }
    setLoading(false);
  }, [searchValue, filterString]);

  // get loading state from each child component and using the if statement run this nigga
  // might be wrong cuz its supposed to run all components again after each loader showup
  // but who fuckin cares do e shofim e bojm me overlay as it should be

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Banner />
      <div style={{ padding: "40px" }}>
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
  const res = await axios.get(getApiDomain() + `/users/${session.getUserId()}`);

  let feeds = await axios.get(getApiDomain() + "/feeds");

  return {
    props: { user: res.data.user, feeds: feeds.data.data },
  };
}

export default Feeds;
