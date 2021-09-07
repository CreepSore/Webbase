"use strict";

let SequelizeLoader = require("../loader/SequelizeLoader");
let PermissionGroup = require("../model/PermissionGroup");
let Permission = require("../model/Permission");

class PermissionCommandHandler {
    static async execute(args) {
        let sequelizeLoader = new SequelizeLoader();
        await sequelizeLoader.start();
        // TODO: IMPLEMENT haha funni
    }
}

module.exports = PermissionCommandHandler;
