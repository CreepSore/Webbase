"use strict";
let express = require("express");

let usermgmt = require("./usermgmt");
let models = require("./models");

/**
 * @returns {express.Router}
 */
module.exports = function() {
    // eslint-disable-next-line new-cap
    const router = express.Router();

    router.use(usermgmt());
    router.use(models());

    return router;
};
