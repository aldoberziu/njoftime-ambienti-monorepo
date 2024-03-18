const apiBasePath = "/api/auth/";
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

export const websiteDomain = process.env.REACT_APP_WEBSITE_URL;
console.log({ websiteDomain });

export function getApiDomain() {
  console.log("api", process.env.REACT_APP_API_URL || "http://localhost:3001");
  return process.env.REACT_APP_API_URL || "http://localhost:3001";
}

export function getWebsiteDomain() {
  console.log("website", process.env.REACT_APP_WEBSITE_URL || "http://localhost:3001");
  return process.env.REACT_APP_WEBSITE_URL || "http://localhost:3000";
}

export const appInfo = {
  appName: "SuperTokens Demo App",
  websiteDomain,
  apiDomain: websiteDomain,
  apiBasePath,
};
