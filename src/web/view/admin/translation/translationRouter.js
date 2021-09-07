"use strict";
let express = require("express");


module.exports = function() {
    // eslint-disable-next-line new-cap
    let router = express.Router();

    router.get("/admin/translation/", async(req, res) => {
        if(!res.locals.user || !(await res.locals.user.hasPermission("TRANSLATE"))) {
            return res.redirect("/");
        }
        res.render("admin/translation/index");
    });

    return router;
};
