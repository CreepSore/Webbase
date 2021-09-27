"use strict";
let path = require("path");

let express = require("express");
let expressSession = require("express-session");
let expressWs = require("express-ws");
let helmet = require("helmet");
let uuid = require("uuid");

let ApiRouter = require("../web/ApiRouter");
let ViewRouter = require("../web/ViewRouter");

let User = require("../model/User");

class ExpressLoader {
    async setConfig() {
        this.app.set("trust proxy", true);
        this.app.set("view engine", "ejs");
        this.app.set("views", path.resolve(__dirname, "..", "web", "view"));
    }

    async initializeMiddleware() {
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
            // @ts-ignore
            if(req.session.uid) {
                // @ts-ignore
                let user = await User.findByPk(req.session.uid);
                res.locals.user = user;
            }
            console.log("WEBINFO", `Request: [${req.method}]@[${req.url}] from [${JSON.stringify(req.ips)}]; SessionData: [${JSON.stringify(req.session)}]; Body: ${JSON.stringify(req.body)}`);
            next();
        });
    }

    async initializeUserexit() {
        this.apiRouter = ApiRouter.create();
        this.viewRouter = ViewRouter.create();

        this.app.use(this.apiRouter);
        this.app.use(this.viewRouter);
    }

    /**
     * @param {import("../service/ConfigModel")["web"]} webConfig
     * @returns {Promise<express.Application>}
     */
    async start(webConfig, sessionStore = null) {
        this.cfg = webConfig;
        this.app = express();

        await this.setConfig();
        await this.initializeMiddleware();
        await this.initializeUserexit();

        this.server = this.app.listen(this.cfg.port, this.cfg.hostname);

        return this.app;
    }

    async stop() {
        this.server.close();
    }
}

module.exports = ExpressLoader;
