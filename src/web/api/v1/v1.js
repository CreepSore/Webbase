"use strict";
let express = require("express");

let usermgmt = require("./usermgmt");
let models = require("./models");
let dbtools = require("./dbtools");

/**
 * @returns {express.Router}
 */
module.exports = function() {
    // eslint-disable-next-line new-cap
    const router = express.Router();

    router.use(dbtools());
    router.use(usermgmt());
    router.use(models());

    return router;
};
