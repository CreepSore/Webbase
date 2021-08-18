let express = require("express");

let usermgmt = require("./usermgmt");
let models = require("./models");

/**
 * @returns {express.Router}
 */
module.exports = function() {
    const router = express.Router();

    router.use(usermgmt())
    router.use(models());

    return router;
};
