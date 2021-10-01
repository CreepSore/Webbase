"use strict";
let path = require("path");

let CustomerLogic = require("../../service/customer-logic/CustomerLogic");
let ExpressLoader = require("../../loader/ExpressLoader");

let Translation = require("../../model/Translation");
let Locale = require("../../model/Locale");
let Version = require("../../model/Version");
let LanguageService = require("../../service/database-logic/LanguageService");

/**
 * @typedef {import("../../service/customer-logic/types").ExpressInitializationParams} ExpressInitializationParams
 * @typedef {import("../../service/customer-logic/types").SequelizeInitializationParams} SequelizeInitializationParams
 */

class CustomLoginLogic extends CustomerLogic {
    /**
     * Gets executed before express initializes the routes.
     * @param {ExpressInitializationParams} expressInitializationParams
     * @return {Promise<void>}
     * @memberof CustomLoginLogic
     */
    async expressInitRoutesPre(expressInitializationParams) {
        let {app} = expressInitializationParams;
        ExpressLoader.configureCustomRoutes(app, CustomLoginLogic.getTranslationCustomExpressRoutes());
    }

    /**
     * Gets executed when sequelize is initializing the models
     * @param {SequelizeInitializationParams} sequelizeInitializationParams
     * @memberof CustomerLogic
     */
    async sequelizeInitModels(sequelizeInitializationParams) {
        let {sequelize} = sequelizeInitializationParams;
        Locale.initialize(sequelize);
        Translation.initialize(sequelize);

        Locale.hasMany(Translation);
        Translation.belongsTo(Locale);
    }

    /**
     * Gets executed when sequelize is initializing the models
     * @memberof CustomerLogic
     */
    async sequelizeOnFirstInstall() {
        await Version.create({
            component: "LOCALIZATION",
            version: require(path.join(__dirname, "..", "..", "package.json")).version || "INVALID"
        });
    }

    /**
     * @static
     * @return {import("../../loader/ExpressLoader").CustomRoute[]}
     * @memberof CustomLoginLogic
     */
    static getTranslationCustomExpressRoutes() {
        return [
            {
                method: "GET",
                relativePath: "/Translation/getAll", // See the / at the beginning
                ignorePermissions: true,
                /**
                 * @param {import("express").Request} req
                 * @param {import("express").Response} res
                 */
                handler: async(req, res) => {
                    const translations = await Translation.findAll({
                        include: [Locale]
                    });

                    res.json({success: true, data: translations});
                }
            },
            {
                method: "POST",
                relativePath: "/Translation/getTranslation/:locale/:key",
                ignorePermissions: true,
                /**
                 * @param {import("express").Request} req
                 * @param {import("express").Response} res
                 */
                handler: async(req, res) => {
                    const {locale, key} = req.params;
                    const translatedText = await LanguageService.getTranslation(key, locale, req.body || {});

                    res.json({success: true, data: translatedText});
                }
            },
            {
                method: "POST",
                relativePath: "/Translation/setTranslation/:locale/:key",
                handler: async(req, res) => {
                    const {locale, key} = req.params;
                    let translation = await Translation.findOne({
                        where: {
                            translationKey: key
                        },
                        include: [{
                            model: Locale,
                            where: {
                                identifier: locale
                            }
                        }]
                    });

                    if(!translation) {
                        let localeObj = await LanguageService.getLocaleByIdentifier(locale);
                        if(!localeObj) {
                            return res.json({success: false, error: "INVALID_LOCALE"});
                        }

                        // @ts-ignore
                        translation = await localeObj.createTranslation({
                            translationKey: key,
                            value: req.body.value
                        });
                    }

                    await translation.update({
                        value: req.body.value
                    });

                    res.json({success: true});
                }
            }
        ];
    }
}

module.exports = CustomLoginLogic;
