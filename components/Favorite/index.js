import { EmptyHeart } from "../../icons";
import Text from "../Text";
import Image from "next/image";

const FavoriteButton = (props) => {
    const feedId = props.feedId;
  return (
    <div>
      <Image src={EmptyHeart} className="heart-icon" />
    </div>
  );
};

export default FavoriteButton;
