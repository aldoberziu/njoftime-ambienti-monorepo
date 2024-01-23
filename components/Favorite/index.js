import { EmptyHeart } from "../../icons";
import Text from "../Text";

const FavoriteButton = (props) => {
    const feedId = props.feedId;
  return (
    <div>
      <img src={EmptyHeart} className="heart-icon" />
    </div>
  );
};

export default FavoriteButton;
