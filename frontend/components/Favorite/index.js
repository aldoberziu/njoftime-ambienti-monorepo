import { EmptyHeart, FilledHeart } from "../../icons";
import Image from "next/image";
import axios from "axios";
import styles from "./Favorite.module.scss";
import { useRouter } from "next/router";
import { getApiDomain } from "../../config/appInfo";
import { useSelector } from "react-redux";
import { userActions } from "../../store";
import { useDispatch } from "react-redux";

const FavoriteButton = ({ feedId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let sUser = useSelector((state) => state.user.loggedUser);
  const userId = sUser?._id;

  const addToFavorites = async (e) => {
    e.stopPropagation();
    if (userId !== "") {
      dispatch(userActions.favorites(feedId));
      await axios.patch(getApiDomain() + `/api/users/addToFavorite`, {
        userId,
        feedId,
      });
    } else {
      router.push("/auth");
    }
  };
  return (
    <div onClick={addToFavorites} className={styles.heartIcon}>
      {(sUser.favorites || []).includes(feedId) && <Image src={FilledHeart} alt="" />}
      {!(sUser.favorites || []).includes(feedId) && <Image src={EmptyHeart} alt="" />}
    </div>
  );
};

export default FavoriteButton;
