let express = require("express");

let v1Router = require("./api/v1/v1");

class ApiRouter {
    /**
     * @param {import("../service/ConfigModel")["web"]} webConfig
     * @returns {express.Router}
     */
    static create(webConfig) {
        let router = express.Router();

        router.use(v1Router());

        return router;
    }
}

module.exports = ApiRouter;
