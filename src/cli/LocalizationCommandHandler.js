"use strict";

let SequelizeLoader = require("../loader/SequelizeLoader");

class LocalizationCommandHandler {
    static async execute(args) {
        let sequelizeLoader = new SequelizeLoader();
        await sequelizeLoader.start();
        // TODO: Implement export to CSV
        // TODO: Implement import from CSV
    }
}

module.exports = LocalizationCommandHandler;
