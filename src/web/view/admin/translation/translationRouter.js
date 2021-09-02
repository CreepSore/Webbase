"use strict";
let express = require("express");


module.exports = function() {
    // eslint-disable-next-line new-cap
    let router = express.Router();

    router.get("/admin/translation/", (req, res) => {
        res.render("admin/translation/index");
    });

    return router;
};
