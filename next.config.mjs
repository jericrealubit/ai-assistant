// next.config.mjs

// Correctly configure Webpack to handle .md files
export default {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });
    return config;
  },
};
