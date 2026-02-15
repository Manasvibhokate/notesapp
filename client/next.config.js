/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",     // tells Next.js to generate static site
  images: {
    unoptimized: true,  // required for static hosting
  },
};

module.exports = nextConfig;
