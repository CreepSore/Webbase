"use strict";
let fs = require("fs");
let path = require("path");

let CustomerLogicHandler = require("./CustomerLogicHandler");

class CustomerLogicFactory {
    static async createAndInitializeCustomerLogicHandler() {
        let handler = new CustomerLogicHandler();
        let resolvedLogicPath = CustomerLogicFactory.getCustomerLogicPath();

        await Promise.all((await fs.promises.readdir(resolvedLogicPath))
            .map(async file => {
                if (!file.endsWith(".js") || file.startsWith("_")) return;
                try {
                    let LogicConstructor = require(path.join(resolvedLogicPath, file));
                    let logicInstance = new LogicConstructor();
                    await handler.registerCustomerLogic(logicInstance, false);
                }
                catch(error) {
                    console.log("ERROR", error);
                }
            }));

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
