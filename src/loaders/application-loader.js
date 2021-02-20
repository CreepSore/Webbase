let {LoggerService, LoggerLevels} = require("../services/logger-service");
let sequelizeLoader = require("./sequelize-loader");
let configLoader = require("./config-loader");
let expressLoader = require("./express-loader");

/**
 * @typedef {import("express").Application} Express
 * @typedef {import("sequelize").Sequelize} Sequelize
 */

module.exports = class ApplicationLoader {
    async start() {
        LoggerService.log(LoggerLevels.INFO, "---------- BEGIN EXECUTION ----------", "ApplicationLoader::start");
        try {
            const cfg = configLoader();
            const sequelize = await sequelizeLoader();
            expressLoader(cfg, sequelize, (param) => {
                const {express} = param;
                this.setupMiddlewares(express, sequelize);
                this.setupApiRoutes(express, sequelize);
                this.setupViewRoutes(express);
            });
        }
        catch (err) {
            LoggerService.log(LoggerLevels.CRITICAL, err.stack);
        }
    }

    stop() {
        LoggerService.log(LoggerLevels.INFO, "---------- END EXECUTION ----------", "ApplicationLoader::stop");
        // No shutdown logic; Irrelevant
    }

    // ! Disabling: We don't care about this during the
    // !            development process
    /* eslint-disable no-unused-vars */
    /**
     * @param {Express} express
     * @param {Sequelize} sequelize
     */
    setupMiddlewares(express, sequelize) {
        LoggerService.log(LoggerLevels.INFO, "Initializing Middlewares", "ApplicationLoader::setupMiddlewares");
    }

    /**
     * @param {Express} express
     * @param {Sequelize} sequelize
     */
    setupApiRoutes(express, sequelize) {
        LoggerService.log(LoggerLevels.INFO, "Initializing ApiRoutes", "ApplicationLoader::setupApiRoutes");
        express.post("/api/v1/model/:model/:method", (req, res) => require("../web/api/v1/model")(req, res, sequelize));
    }

    /**
     * @param {Express} express
     */
    setupViewRoutes(express) {
        LoggerService.log(LoggerLevels.INFO, "Initializing ViewRoutes", "ApplicationLoader::setupViewRoutes");
        express.get("/", (req, res) => res.render("index"));
    }
};
