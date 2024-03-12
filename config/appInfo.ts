const port = 3000;

const apiBasePath = "/api/auth/";

export const websiteDomain = `http://njoftime-ambienti.vercel.app/${port}`;

export function getApiDomain() {
  const apiPort = 3001;
  const apiUrl = `http://njoftime-ambienti.vercel.app/${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = 3000;
  const websiteUrl = `http://njoftime-ambienti.vercel.app/${websitePort}`;
  return websiteUrl;
}

export const appInfo = {
  appName: "SuperTokens Demo App",
  websiteDomain,
  apiDomain: websiteDomain,
  apiBasePath,
};