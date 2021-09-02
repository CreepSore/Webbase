"use strict";
let express = require("express");

let baseRouter = require("./view/baseRouter");

class ViewRouter {
    /**
     * @returns {express.Router}
     */
    static create() {
        // eslint-disable-next-line new-cap
        let router = express.Router();

        router.use(baseRouter());

        return router;
    }
}

module.exports = ViewRouter;
