const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env) => {
  const isDevMode = !env.production;

  const rootFolder = isDevMode ? "./" : "docs";

  const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "index.html"),
    favicon: path.join(__dirname, "favicon.ico"),
  });

  return {
    entry: "./src/index.ts",
    output: {
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].js",
      assetModuleFilename: "[name].[contenthash][ext][query]",
      asyncChunks: true,
      path: path.resolve(__dirname, rootFolder),
      clean: true,
      publicPath: isDevMode ? "/" : "./",
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
    plugins: isDevMode
      ? [htmlPlugin]
      : [new MiniCssExtractPlugin(), htmlPlugin],
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          enforce: "pre",
          use: ["babel-loader", "source-map-loader"],
        },
        {
          test: /\.(jpg|png|gif|webp)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "img/",
                publicPath: "img/",
              },
            },
          ],
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
      minimize: !isDevMode,
      splitChunks: {
        chunks: "async",
      },
      minimizer: [new CssMinimizerPlugin()],
    },
  };
};
