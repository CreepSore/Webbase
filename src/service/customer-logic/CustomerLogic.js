/* eslint-disable no-unused-vars */
"use strict";

/**
 * @typedef {import("./types").CustomerLogicDependencies} CustomerLogicDependencies
 * @typedef {import("./types").OnLoginCallbackParams} OnLoginCallbackParams
 * @typedef {import("./types").ExpressInitializationParams} ExpressInitializationParams
 * @typedef {import("./types").SequelizeInitializationParams} SequelizeInitializationParams
 * @typedef {import("./types").WebpackGetConfigParams} WebpackGetConfigParams
 */

class CustomerLogic {
    /** @type {CustomerLogicDependencies} */
    #dependencies;

    /**
     * You can perform additional login checks here.
     * Return false if the use shouldn't be logged in.
     * If ANY CustomerLogic return false, the user will not be logged in.
     * @param {OnLoginCallbackParams} onLoginCallbackParams
     * @return {Promise<boolean>}
     * @memberof CustomerLogic
     */
    async onLogin(onLoginCallbackParams) {return true;}

    /**
     * Gets executed when express is intializing the settings
     * @param {ExpressInitializationParams} expressInitializationParams
     * @return {Promise<void>}
     * @memberof CustomerLogic
     */
    async expressSetConfig(expressInitializationParams) {}

    /**
     * Gets executed after express initialized the middlewares.
     * @param {ExpressInitializationParams} expressInitializationParams
     * @return {Promise<void>}
     * @memberof CustomerLogic
     */
    async expressInitMiddleware(expressInitializationParams) {}

    /**
     * Gets executed before express initializes the routes.
     * @param {ExpressInitializationParams} expressInitializationParams
     * @return {Promise<void>}
     * @memberof CustomerLogic
     */
    async expressInitRoutesPre(expressInitializationParams) {}

    /**
     * Gets executed after express initialized the routes.
     * @param {ExpressInitializationParams} expressInitializationParams
     * @return {Promise<void>}
     * @memberof CustomerLogic
     */
    async expressInitRoutesPost(expressInitializationParams) {}

    /**
     * Gets executed when sequelize is initializing the models
     * @param {SequelizeInitializationParams} sequelizeInitializationParams
     * @memberof CustomerLogic
     */
    async sequelizeInitModels(sequelizeInitializationParams) {}

    /**
     * Gets executed when sequelize is initializing the models
     * @param {SequelizeInitializationParams} sequelizeInitializationParams
     * @memberof CustomerLogic
     */
    async sequelizeOnFirstInstall(sequelizeInitializationParams) {}

    /**
     * Gets executed when sequelize is initializing the models
     * @param {WebpackGetConfigParams} webpackGetConfigParams
     * @returns {Promise<object>}
     * @memberof CustomerLogic
     */
    async getWebpackConfig(webpackGetConfigParams) {}

    getPriority() {return 0;}
    async onLoad() {}
    async onUnload() {}
    async injectDependencies(dependencies) {
        this.#dependencies = dependencies;
    }
}

module.exports = CustomerLogic;
