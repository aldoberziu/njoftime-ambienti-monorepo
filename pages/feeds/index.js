import { useState } from "react";
import FeedsGrid from "../../components/FeedsGrid";
import FeedsSlider from "../../components/FeedsSlider";
import FilterContainer from "../../components/FilterContainer";
import Banner from "../../components/HomeBanner";

const Feeds = () => {
  // get loading state from each child component and using the if statement run this nigga
  // might be wrong cuz its supposed to run all components again after each loader showup
  // but who fuckin cares do e shofim e bojm me overlay as it should be
  return (
    <>
      <Banner />
      <div style={{ padding: "40px" }}>
        <FilterContainer />
        <FeedsSlider />
        <FeedsGrid />
      </div>
    </>
  );
};

export default Feeds;
