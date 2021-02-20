let path = require("path");
let {EventEmitter} = require("events");
let express = require("express");
let expressSession = require("express-session");
let helmet = require("helmet");
let uuid = require("uuid");

/**
 * @typedef {import("../config/config-model")} ConfigModel
 * @typedef {import("sequelize").Sequelize} Sequelize
 */

class ExpressHandler extends EventEmitter{
    /**
     * @param {ConfigModel} cfg
     * @param {Sequelize} sequelize
     */
    constructor(cfg, sequelize) {
        super();
        this._express = express();
        this._cfg = cfg;
        this._sequelize = sequelize;
    }

    setup() {
        const app = this._express;
        app.use(helmet({
            contentSecurityPolicy: false
        }));
        app.use(expressSession({
            secret: this._cfg.web.sessionSecret || uuid.v4(),
            resave: true,
            saveUninitialized: true
        }));
        app.use(express.raw());
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(express.static(path.join(__dirname, "..", "web", "static")));
        app.set("views", path.join(__dirname, "..", "web", "views"));
        app.set("view engine", "ejs");

        this.emit("setup", {
            express: this._express,
            sequelize: this._sequelize
        });

        app.listen(this._cfg.web.port, this._cfg.web.address);
    }
}

/**
 * @param {ConfigModel} cfg
 * @param {Sequelize} sequelize
 * @param {Function} onSetup
 * @returns {ExpressHandler}
 */
module.exports = function(cfg, sequelize, onSetup) {
    const expressHandler = new ExpressHandler(cfg, sequelize);
    expressHandler.once("setup", onSetup);
    expressHandler.setup();
    return expressHandler;
};
