let express = require("express");


module.exports = function() {
    let router = express.Router();

    router.get("/admin/translation/", (req, res) => {
        res.render("admin/translation/index");
    });

    return router;
};
