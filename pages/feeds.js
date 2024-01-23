import { useState } from "react";
import FeedsGrid from "../components/FeedsGrid";
import FeedsSlider from "../components/FeedsSlider";
import FilterContainer from "../components/FilterContainer";
import Banner from "../components/HomeBanner";

const Feeds = () => {
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
