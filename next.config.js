/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/njoftime/**",
      },
    ],
  },
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_WEBSITE_URL: process.env.REACT_APP_WEBSITE_URL,
  },
};

module.exports = nextConfig;
