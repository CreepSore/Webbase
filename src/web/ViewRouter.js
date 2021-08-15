let express = require("express");

let baseRouter = require("./view/baseRouter");

class ViewRouter {
    /**
     * @param {import("../service/ConfigModel")["web"]} webConfig
     * @returns {express.Router}
     */
    static create(webConfig) {
        let router = express.Router();

        router.use(baseRouter());

        return router;
    }
}

module.exports = ViewRouter;
