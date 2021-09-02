"use strict";
let express = require("express");

let models = require("./models");
let dbtools = require("./dbtools");

/**
 * @returns {express.Router}
 */
module.exports = function() {
    // eslint-disable-next-line new-cap
    const router = express.Router();

    router.use(dbtools());
    router.use(models());

    return router;
};
