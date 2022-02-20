const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
  return merge(
    {
      mode,
      entry: "./src/index.js",
      devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
      },
      output: {
        publicPath: "/",
        path: path.resolve(__dirname, "dist"),
        filename: "[hash].bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.jpe?g|png$/,
            exclude: /node_modules/,
            use: ["url-loader", "file-loader"],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
    },
    modeConfiguration(mode)
  );
};
