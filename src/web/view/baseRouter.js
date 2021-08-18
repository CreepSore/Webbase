let express = require("express");

let adminRouter = require("./admin/adminRouter");

module.exports = function() {
    let router = express.Router();

    router.get("/", (req, res) => {
        res.render("login");
    });

    router.use(adminRouter());

    return router;
};
