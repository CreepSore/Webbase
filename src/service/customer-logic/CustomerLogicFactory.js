"use strict";
let fs = require("fs");
let path = require("path");

let CustomerLogicHandler = require("./CustomerLogicHandler");

class CustomerLogicFactory {
    static async createAndInitializeCustomerLogicHandler() {
        let handler = new CustomerLogicHandler();
        let resolvedLogicPath = CustomerLogicFactory.getCustomerLogicPath();

        let files = fs.readdirSync(resolvedLogicPath);
        let toAwait = files
            .filter(x => fs.statSync(path.join(resolvedLogicPath, x)).isDirectory())
            .map(async pluginDirectory => {
                let finalPath = path.join(resolvedLogicPath, pluginDirectory, "index.js");
                if(!fs.existsSync(finalPath)) {
                    console.log("WARN", `No index.js found at [${finalPath}]`);
                    return;
                }

                try {
                    let LogicConstructor = require(finalPath);
                    let logicInstance = new LogicConstructor();
                    await handler.registerCustomerLogic(logicInstance, false);
                }
                catch(error) {
                    console.log("ERROR", `An error occured while trying to load plugin at [${finalPath}]`);
                    console.log("ERROR", error);
                }
            });

        await Promise.all(toAwait);

        await handler.loadAllCustomerImplementations();
        return handler;
    }

    static getCustomerLogicPath() {
        let resolvedPath = path.join(__dirname, "..", "..", "custom");
        fs.existsSync(resolvedPath) || fs.mkdirSync(resolvedPath);
        return resolvedPath;
    }
}

module.exports = CustomerLogicFactory;

/**
try {
    let LogicConstructor = require(path.join(resolvedLogicPath, file));
    let logicInstance = new LogicConstructor();
    await handler.registerCustomerLogic(logicInstance, false);
}
catch(error) {
    console.log("ERROR", error);
}
 */