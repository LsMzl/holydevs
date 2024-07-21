/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
         {
            protocol: "https",
            hostname: "img.clerk.com",
         },
         {
            protocol: "https",
            hostname: "api.dicebear.com",
         },
      ],
   },
   experimental: {
      serverActions: {
         bodySizeLimit: "5mb",
      },
   },
};

export default nextConfig;
