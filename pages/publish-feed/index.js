import AddFeed from "../../components/AddFeed";
import SessionReact from "supertokens-auth-react/recipe/session";

const PublishFeed = () => {
  return (
    <SessionReact.SessionAuth>
      <AddFeed />
    </SessionReact.SessionAuth>
  );
};

export default PublishFeed;
