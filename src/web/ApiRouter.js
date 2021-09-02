"use strict";
let express = require("express");

let v1Router = require("./api/v1/v1");

class ApiRouter {
    /**
     * @returns {express.Router}
     */
    static create() {
        // eslint-disable-next-line new-cap
        let router = express.Router();

        router.use(v1Router());

        return router;
    }
}

module.exports = ApiRouter;
