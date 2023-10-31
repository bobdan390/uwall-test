const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          main: [
            env === "development" && require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs,
          ].filter(Boolean),
          uwallProvider: "./src/chrome/uwallProvider.ts",
          contentManager: "./src/chrome/contentManager.ts",
          background: "./src/chrome/background.ts",
        },
        optimization: {
          ...webpackConfig.optimization,
          minimizer: [
            ...webpackConfig.optimization.minimizer,
            new TerserPlugin({
              terserOptions: { keep_classnames: true, keep_fnames: true },
            }),
          ],
        },
        module: {
          ...webpackConfig.module,
          rules: [
            ...webpackConfig.module.rules,
            {
              test: /\.tsx?$/,
              use: [
                {
                  loader: "ts-loader",
                  options: {
                    compilerOptions: {
                      noEmit: false,
                    },
                  },
                },
              ],
              exclude: /node_modules/,
            },
          ],
        },
        output: {
          ...webpackConfig.output,
          filename: "static/js/[name].js",
        },
        performance: {
          ...webpackConfig.performance,
          hints: false,
        },
        resolve: {
          ...webpackConfig.resolve,
          alias: {
            ...webpackConfig.resolve.alias,
            "~": path.resolve(__dirname, "src"),
          },
        },
      };
    },
  },
};
