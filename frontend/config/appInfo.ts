const apiBasePath = "/api/auth/";

export const websiteDomain = process.env.REACT_APP_WEBSITE_URL || "http://localhost:3001";

export function getApiDomain() {
  return process.env.REACT_APP_API_URL || "http://localhost:3001";
}

export function getWebsiteDomain() {
  return process.env.REACT_APP_WEBSITE_URL || "http://localhost:3000";
}

export const appInfo = {
  appName: "Njoftime Ambienti",
  websiteDomain,
  apiDomain: getApiDomain(),
  apiBasePath,
};
