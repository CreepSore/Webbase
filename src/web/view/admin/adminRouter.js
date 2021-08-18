let express = require("express");

let translationRouter = require("./translation/translationRouter");

module.exports = function() {
    let router = express.Router();

    router.use(translationRouter());

    return router;
};
