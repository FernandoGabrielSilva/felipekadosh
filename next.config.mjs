/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        hostname: "i.postimg.cc",
      },
    ],
  },
};

export default nextConfig;
