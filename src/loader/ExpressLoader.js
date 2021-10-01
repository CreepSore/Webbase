"use strict";
let path = require("path");

let express = require("express");
let expressSession = require("express-session");
let expressWs = require("express-ws");
let helmet = require("helmet");
let uuid = require("uuid");

let ApiRouter = require("../web/ApiRouter");
let ViewRouter = require("../web/ViewRouter");

let CustomerLogicHandler = require("../service/customer-logic/CustomerLogicHandler");
let User = require("../model/User");

/**
 * @typedef {Object} CustomRoute
 * @property {string} method
 * @property {string} relativePath
 * @property {Function} handler
 * @property {boolean=} ignorePermissions
 */

class ExpressLoader {
    async setConfig() {
        this.app.set("trust proxy", true);
        this.app.set("view engine", "ejs");
        this.app.set("views", path.resolve(__dirname, "..", "web", "view"));
        await CustomerLogicHandler.instance.runAllCustomerLogicFunction("expressSetConfig", {app: this.app, expressLoader: this});
    }

    async initializeMiddleware(sessionStore) {
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

        await CustomerLogicHandler.instance.runAllCustomerLogicFunction("expressInitMiddleware", {app: this.app, expressLoader: this});
    }

    async initializeUserexit() {
        this.apiRouter = ApiRouter.create();
        this.viewRouter = ViewRouter.create();

        await CustomerLogicHandler.instance.runAllCustomerLogicFunction("expressInitRoutesPre", {app: this.app, expressLoader: this});
        this.app.use(this.apiRouter);
        this.app.use(this.viewRouter);
        await CustomerLogicHandler.instance.runAllCustomerLogicFunction("expressInitRoutesPost", {app: this.app, expressLoader: this});
    }

    /**
     * Initializes and registers a custom-route array on the specified express app
     * @param {express.Application} app
     * @param {*} customRoutes
     */
    static async configureCustomRoutes(app, customRoutes) {
        // eslint-disable-next-line new-cap
        let router = express.Router();
        customRoutes.forEach(route => {
            if(!route.method || !route.relativePath || !route.handler) {
                console.log("ERROR", "Missing parameters from custom route.");
            }

            const url = `/api/v1/custom${route.relativePath}`;
            router[route.method.toLowerCase()](url, async(req, res, next) => {
                const permKey = `CUSTOM:${route.relativePath}:${route.method.toUpperCase()}`;
                if(!route.ignorePermissions && (!res.locals.user || !(await res.locals.user.hasPermission(permKey)))) {
                    console.log("ERROR", `User [${res.locals.user}] does not have permission to access [${url}]; required permission = [${permKey}]`);
                    return res.json({success: false, error: "INVALID_PERMISSION"});
                }

                return route.handler(req, res, next);
            });
            console.log("INFO", `Successfully registered custom route [${route.method.toUpperCase()}][${url}]@[CUSTOM]`);
        });
        app.use(router);
    }

    /**
     * @param {import("../service/ConfigModel")["web"]} webConfig
     * @returns {Promise<express.Application>}
     */
    async start(webConfig, sessionStore = null) {
        this.cfg = webConfig;
        this.app = express();

        await this.setConfig();
        await this.initializeMiddleware(sessionStore);
        await this.initializeUserexit();

        this.server = this.app.listen(this.cfg.port, this.cfg.hostname);

        return this.app;
    }

    async stop() {
        this.server.close();
    }
}

module.exports = ExpressLoader;
