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
import { useEffect } from "react";

const Feeds = ({ user: theLoggedUser }) => {
  // get loading state from each child component and using the if statement run this nigga
  // might be wrong cuz its supposed to run all components again after each loader showup
  // but who fuckin cares do e shofim e bojm me overlay as it should be
  const dispatch = useDispatch();
  const stateUser = useSelector((state) => state.loggedUser);
  console.log({stateUser});

  useEffect(() => {
    if(Object.keys(stateUser).length === 0){
      console.log('useeffect ran')
      dispatch({ type: "loggedUser", loggedUser: theLoggedUser });
    }
  }, [])

  return (
    <>
      <Banner />
      <div style={{ padding: "40px" }}>
        <FilterContainer />
        <FeedsSlider userFavorites={theLoggedUser.favorites} />
        <FeedsGrid userFavorites={theLoggedUser.favorites} />
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

  return {
    props: { user: res.data.user },
  };
}

export default Feeds;
