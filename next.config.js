module.exports = {
  images: {
    domains: ["lh3.googleusercontent.com", "cdn.pixabay.com", "fhlkhextimngjhecwwrd.supabase.co", "picsum.photos", "placeimg.com"],
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
