let express = require("express");

let models = require("./models");

/**
 * @returns {express.Router}
 */
module.exports = function() {
    const router = express.Router();

    router.use(models());

    return router;
};
