const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = (env) => {
  const rootFolder = "docs";

  const isDevMode = !env.production;

  return {
    entry: "./src/index.ts",
    output: {
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].js",
      assetModuleFilename: "[name].[contenthash][ext][query]",
      asyncChunks: true,
      path: path.resolve(__dirname, rootFolder),
      clean: true,
      publicPath: "./",
    },
    devtool: "source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, rootFolder),
      },
      historyApiFallback: {
        index: "/",
      },
      port: 8008,
    },
    plugins: [].concat(isDevMode ? [] : [new MiniCssExtractPlugin()], [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "index.html"),
      }),
    ]),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            ,
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.([tj]s)$/,
          exclude: /node_modules/,
          enforce: "pre",
          use: ["babel-loader", "source-map-loader"],
        },
      ],
    },
    resolve: {
      alias: {
        src: "/src",
      },
      modules: [path.resolve("./node_modules"), path.resolve("./src")],
      extensions: [".*", ".js", ".ts"],
    },
    stats: {
      children: true,
      errorDetails: true,
    },
    optimization: {
      usedExports: false,
      minimize: true,
      splitChunks: {
        chunks: "async",
      },
      minimizer: [new CssMinimizerPlugin()],
    },
  };
};
