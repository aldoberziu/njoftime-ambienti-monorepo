const port = 3000;

const apiBasePath = "/api/auth/";

export const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${port}`;

export function getApiDomain() {
  const apiPort = 3001;
  const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = 3000;
  const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
  return websiteUrl;
}

export const appInfo = {
  appName: "SuperTokens Demo App",
  websiteDomain,
  apiDomain: websiteDomain,
  apiBasePath,
};