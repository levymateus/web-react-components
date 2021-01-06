const path = require("path")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

module.exports = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-essentials",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: path.resolve(__dirname, ".."),
      use: [
        {
          loader: require.resolve("ts-loader"),
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            tsconfigPath: path.resolve(__dirname, "..", "tsconfig.json"),
          },
        },
      ],
    });

    config.resolve.extensions.push(".ts", ".tsx", ".js")
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ];
    return config;
  },
};
