"use strict";
let express = require("express");

let adminRouter = require("./admin/adminRouter");

module.exports = function() {
    // eslint-disable-next-line new-cap
    let router = express.Router();

    router.get("/", (req, res) => {
        res.render("login");
    });

    router.use(adminRouter());

    return router;
};
