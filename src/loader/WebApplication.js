"use strict";
let path = require("path");

let ExpressSessionStore = require("express-session").Store;
let SequelizeStore = require("connect-session-sequelize")(ExpressSessionStore);

let ConfigModel = require("../service/ConfigModel");
let SequelizeLoader = require("./SequelizeLoader");
let ExpressLoader = require("./ExpressLoader");

class WebApplication {
    _running = false;

    /**
     * Creates an instance of WebApplication.
     * @memberof WebApplication
     */
    constructor() {
        this.sequelizeLoader = new SequelizeLoader();
        this.expressLoader = new ExpressLoader();
    }

    /**
     * Starts the application
     * @return {Promise<void>}
     * @memberof WebApplication
     */
    async start() {
        if(this._running) return;
        const cfg = await this.loadConfig();
        this.sequelize = await this.sequelizeLoader.start(cfg.database);

        if(!(await this.sequelizeLoader.checkDb())) {
            console.log("CRITICAL", "Database not installed correctly. Please run [npm run install].");
            await this.stop();
            return;
        }

        this.sessionStore = new SequelizeStore({
            db: this.sequelize
        });
        this.sessionStore.sync();
        this.express = await this.expressLoader.start(cfg.web, this.sessionStore);

        this._running = true;
        console.log("INFO", `Initialized successfully with configuration: ${JSON.stringify(cfg, null, 2)}`);
    }

    /**
     * Stops the application
     * @return {Promise<void>}
     * @memberof WebApplication
     */
    async stop() {
        if(!this._running) return;
        console.log("INFO", "Stopping Application ...");
        try {
            this.sessionStore.stopExpiringSessions();
            await this.expressLoader.stop();
            await this.sequelizeLoader.stop();
        }
        catch(err) {
            console.log("CRITICAL", `Failed to safely stop all modules [${err.message}]. Forcing stop ...`);
        }

        process.exit(0);
    }

    /**
     * Restarts the application
     * @memberof WebApplication
     */
    async restart() {
        await this.stop();
        await this.start();
    }

    /**
     * Loads the configuration
     * @returns {Promise<ConfigModel>}
     * @memberof WebApplication
     */
    async loadConfig() {
        const templatePath = path.resolve(__dirname, "..", "..", "config.template.json");
        const configPath = path.resolve(__dirname, "..", "..", "config.json");
        try {
            await ConfigModel.saveTemplateTo(templatePath);
            return await ConfigModel.import(configPath);
        }
        catch(err) {
            console.log("CRITICAL", `Startup of application failed critically because of invalid configuration files.
Please check if the configuration exists at [${configPath}]`);
            process.exit(1);
        }
    }
}

module.exports = WebApplication;
