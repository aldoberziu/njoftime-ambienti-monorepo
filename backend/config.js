const PasswordlessNode = require("supertokens-node/recipe/passwordless");
const SessionNode = require("supertokens-node/recipe/session");
const Dashboard = require("supertokens-node/recipe/dashboard");
const UserRoles = require("supertokens-node/recipe/userroles");
const UserMetadata = require("supertokens-node/recipe/usermetadata");
const apiBasePath = "/api/auth/";

exports.getApiDomain = () => {
  const apiPort = process.env.REACT_APP_API_PORT || 3001;
  const apiUrl =
    process.env.REACT_APP_API_URL === ""
      ? `http://localhost:${apiPort}`
      : process.env.REACT_APP_API_PORT;
  return apiUrl;
};


exports.getWebsiteDomain = () => {
  const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
  const websiteUrl =
    process.env.REACT_APP_WEBSITE_URL === ""
      ? `http://localhost:${websitePort}`
      : process.env.REACT_APP_WEBSITE_PORT;
  return websiteUrl;
};

exports.backendConfig = () => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: "https://st-dev-29e5d5e0-856a-11ee-8cf3-5d664e22d3f6.aws.supertokens.io",
      apiKey: "gooUzpvPLS79=rdHOGRZal-Ctn",
    },
    appInfo: {
      appName: "SuperTokens Demo App",
      websiteDomain: getWebsiteDomain(),
      apiDomain: getWebsiteDomain(),
      apiBasePath,
    },
    recipeList: [
      PasswordlessNode.init({
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        contactMethod: "EMAIL_OR_PHONE",
      }),
      SessionNode.init(),
      Dashboard.init(),
      UserRoles.init(),
      UserMetadata.init(),
    ],
    isInServerlessEnv: true,
  };
};
