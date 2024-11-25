/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.postimg.cc",
      },
      {
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
