import { EmptyHeart, FilledHeart } from "../../icons";
import Text from "../Text";
import Image from "next/image";
import axios from "axios";
import styles from "./Favorite.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getApiDomain } from "../../config/appInfo";
import { useSelector } from "react-redux";

const FavoriteButton = ({favorite, feedId}) => {
  const user = useSelector((state) => state.loggedUser);
  const { userId } = user._id;
  console.log({user})

  const router = useRouter();

  const addToFavorites = async () => {
    if (user._id !== "") {
      await axios.patch(getApiDomain() + `/users/addToFavorite`, {
        userId,
        feedId,
      });
    } else {
      router.push("/auth");
    }
  };
  return (
    <div onClick={addToFavorites}>
      {favorite ? (
        <Image src={FilledHeart} className={styles.heartIcon} alt="" />
      ) : (
        <Image src={EmptyHeart} className={styles.heartIcon} alt="" />
      )}
    </div>
  );
};

export default FavoriteButton;
