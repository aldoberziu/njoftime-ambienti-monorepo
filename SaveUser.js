import axios from "axios";
import { getApiDomain } from "./config/appInfo";
import { useEffect } from "react";
import Session from 'supertokens-web-js/recipe/session';

const SaveUser = () => {
  useEffect(() => {
    async function doesSessionExist() {
      if (await Session.doesSessionExist()) {
        let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
        await axios.post(getApiDomain() + `/users/${accessTokenPayload.rsub}`);
      }
    }
    doesSessionExist();
  }, []);
  return (<div></div>);
};

export default SaveUser;
