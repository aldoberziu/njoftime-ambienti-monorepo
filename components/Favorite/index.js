import { EmptyHeart, FilledHeart } from "../../icons";
import Text from "../Text";
import Image from "next/image";
import axios from "axios";
import styles from "./Favorite.module.css";
import Session from "supertokens-web-js/recipe/session";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getApiDomain } from "../../config/appInfo";

const FavoriteButton = (props) => {
  const router = useRouter();
  const { feedId } = props;

  const [userId, setUserId] = useState("");
  const [userFavorites, setUserFavorites] = useState([]);

  async function doesSessionExist() {
    if (await Session.doesSessionExist()) {
      let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
      let userID = accessTokenPayload.rsub;
      setUserId(userID);
    }
  }

  const addToFavorites = async () => {
    if (userId) {
      await axios.patch(getApiDomain() + `/users/addToFavorite`, {
        userId,
        feedId,
      });
    } else {
      router.push("/auth");
    }
  };

  useEffect(() => {
    doesSessionExist();
  }, []);
  useEffect(() => {
    if (userId !== "") {
      axios
        .get(getApiDomain() + `/users/${userId}`)
        .then((res) => setUserFavorites(res.data.data.favorites))
        .catch((err) => console.log(err));
    }
  });
  return (
    <div onClick={addToFavorites}>
      {(userFavorites || []).includes(feedId) && (
        <Image src={FilledHeart} className={styles.heartIcon} alt="" />
      )}
      {!(userFavorites || []).includes(feedId) && (
        <Image src={EmptyHeart} className={styles.heartIcon} alt="" />
      )}
    </div>
  );
};

export default FavoriteButton;
