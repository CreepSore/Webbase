"use strict";
let path = require("path");

let CustomerLogicFactory = require("./src/service/customer-logic/CustomerLogicFactory");

const staticPath = path.resolve(__dirname, "src", "web", "static");
const pagesPath = path.resolve(staticPath, "js", "pages");
const compiledPath = path.resolve(staticPath, "js", "compiled");

const defaultPaths = {
    staticPath,
    pagesPath,
    compiledPath,
    pluginPath: CustomerLogicFactory.getCustomerLogicPath()
};

const getDefaultConfig = function() {
    return {
        entry: {
            regeneratorRuntime: "regenerator-runtime/runtime",
            login: path.resolve(pagesPath, "login.jsx")
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
};

module.exports = async() => {
    let config = getDefaultConfig();
    let customerLogicHandler = await CustomerLogicFactory.createAndInitializeCustomerLogicHandler(false);

    for(let customerLogic of customerLogicHandler.sortedCustomerLogic) {
        let result = await customerLogicHandler.runCustomerLogicFunction(customerLogic, "getWebpackConfig", {paths: defaultPaths});
        if(!result) continue;

        config = await Object.assign(config, result);
    }

    return config;
};
