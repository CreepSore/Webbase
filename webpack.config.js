"use strict";
let path = require("path");
let VueLoaderPlugin = require("vue-loader/lib/plugin");

const staticPath = path.resolve(__dirname, "src", "web", "static");
const pagesPath = path.resolve(staticPath, "js", "pages");
const compiledPath = path.resolve(staticPath, "js", "compiled");

module.exports = {
    entry: {
        login: path.resolve(pagesPath, "login.js")
    },
    output: {
        path: compiledPath,
        filename: "[name].js"
    },
    module: {
        rules: [
            { test: /\.vue$/, use: "vue-loader" },
            { test: /\.css$/, use: ["vue-style-loader", "css-loader"] }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
