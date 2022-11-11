const path = require("path");

module.exports = {
    mode: process.env.mode,
    devtool: "inline-source-map",
    entry: "./src/index.ts",
    target: "web",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./js/bundle.js",
        publicPath: "/",
        library: "Pixel",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "babel-loader" },
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        open: true,
        port: 3000,
    },
};
