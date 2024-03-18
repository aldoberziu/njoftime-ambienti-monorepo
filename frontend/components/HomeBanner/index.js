import { BannerImage } from "../../icons";
import Image from "next/image";
import Search from "../SearchBar";
import styles from "./HomeBanner.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Session from "supertokens-web-js/recipe/session";

const Banner = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  
  async function doesSessionExist() {
    if (await Session.doesSessionExist()) {
      let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
      let userID = accessTokenPayload.rsub;
      setUserId(userID);
    }
  }
  useEffect(() => {
    doesSessionExist();
  });

  if (userId !== "") {
    dispatch({ type: "loggedUserId", loggedUserId: userId });
  }
  return (
    <div className={styles.bannerContainer}>
      <Image src={BannerImage} className={styles.bannerImage} alt="" />
      <Search />
    </div>
  );
};

export default Banner;
