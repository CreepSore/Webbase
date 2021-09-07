"use strict";
let path = require("path");

const staticPath = path.resolve(__dirname, "src", "web", "static");
const pagesPath = path.resolve(staticPath, "js", "pages");
const compiledPath = path.resolve(staticPath, "js", "compiled");

module.exports = {
    entry: {
        regeneratorRuntime: "regenerator-runtime/runtime",
        login: path.resolve(pagesPath, "login.jsx"),
        translationEditor: path.resolve(pagesPath, "translation-editor.jsx")
    },
    output: {
        path: compiledPath,
        filename: "[name].js"
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            { test: /\.css$/, use: ["vue-style-loader", "css-loader"] }
        ]
    },
    plugins: [ ]
};
