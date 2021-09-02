"use strict";
let path = require("path");

let express = require("express");
let expressSession = require("express-session");
let expressWs = require("express-ws");
let helmet = require("helmet");
let uuid = require("uuid");

let ApiRouter = require("../web/ApiRouter");
let ViewRouter = require("../web/ViewRouter");

class ExpressLoader {
    /**
     * @param {import("../service/ConfigModel")["web"]} webConfig
     * @returns {Promise<express.Application>}
     */
    async start(webConfig, sessionStore = null) {
        this.cfg = webConfig;
        this.app = express();

        this.app.set("trust proxy", true);
        this.app.set("view engine", "ejs");
        this.app.set("views", path.resolve(__dirname, "..", "web", "view"));

        this.app.use(helmet({
            contentSecurityPolicy: false
        }));

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.raw());

        this.app.use(expressSession({
            secret: this.cfg.sessionSecret || uuid.v4(),
            saveUninitialized: true,        // This probably isn't EU compliant haha lmao
            resave: false,
            store: sessionStore
        }));
        expressWs(this.app);

        this.app.use(express.static(path.resolve(__dirname, "..", "web", "static")));

        this.app.use(async(req, res, next) => {
            console.log("WEBINFO", `Request: [${req.method}]@[${req.url}] from [${JSON.stringify(req.ips)}]; SessionData: [${JSON.stringify(req.session)}]; Body: ${JSON.stringify(req.body)}`);
            next();
        });

        this.apiRouter = ApiRouter.create(webConfig);
        this.viewRouter = ViewRouter.create(webConfig);

        this.app.use(this.apiRouter);
        this.app.use(this.viewRouter);

        this.server = this.app.listen(this.cfg.port, this.cfg.hostname);

        return this.app;
    }

    async stop() {
        this.server.close();
    }
}

module.exports = ExpressLoader;
