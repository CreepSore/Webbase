"use strict";
let express = require("express");

let translationRouter = require("./translation/translationRouter");

module.exports = function() {
    // eslint-disable-next-line new-cap
    let router = express.Router();

    router.use(translationRouter());

    return router;
};
