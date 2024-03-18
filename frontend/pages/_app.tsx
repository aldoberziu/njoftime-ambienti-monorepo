import "../styles/globals.css";
import React from "react";
import { useEffect } from "react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import * as SuperTokensConfig from "../../frontend/config/frontendConfig";
import Session from "supertokens-auth-react/recipe/session";
import { Provider } from "react-redux";
import store from "../../frontend/store/index";

if (typeof window !== "undefined") {
  SuperTokensReact.init(SuperTokensConfig.frontendConfig());
}

function MyApp({ Component, pageProps }): JSX.Element {
  useEffect(() => {
    async function doRefresh() {
      if (pageProps.fromSupertokens === "needs-refresh") {
        if (await Session.attemptRefreshingSession()) {
          location.reload();
        } else {
          // user has been logged out
          SuperTokensReact.redirectToAuth();
        }
      }
    }
    doRefresh();
  }, [pageProps.fromSupertokens]);
  if (pageProps.fromSupertokens === "needs-refresh") {
    return null;
  }

  return (
    <Provider store={store}>
      <SuperTokensWrapper>
        <Component {...pageProps} />
      </SuperTokensWrapper>
    </Provider>
  );
}

export default MyApp;
