/* eslint-disable new-cap */
"use strict";

let {Model, DataTypes} = require("sequelize");
let uuid = require("uuid");

let Locale = require("./Locale");

class Translation extends Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.STRING(36),
                primaryKey: true,
                defaultValue: () => uuid.v4()
            },
            translationKey: {
                type: DataTypes.TEXT({length: "long"}),
                allowNull: false
            },
            value: {
                type: DataTypes.TEXT({length: "long"}),
                allowNull: true
            }
        }, {
            sequelize
        });
    }

    static async setTranslation(locale, key, value) {
        let localeObj = await Locale.getByIdentifier(locale);
        if(!localeObj) return;

        let existing = await this.findOne({
            where: {
                translationKey: key,
                LocaleId: localeObj.get("id")
            }
        });
        if(existing) {
            await existing.update({
                value
            });
        }
        else {
            await this.create({
                LocaleId: localeObj.get("id"),
                translationKey: key,
                value
            });
        }
    }

    /**
     * Formats a text according to the given KeyValuePairs
     * @static
     * @param {string} text
     * @param {Object<string, string>} replaceKeys
     * @memberof Translation
     */
    static async formatTranslation(text, replaceKeys) {
        let result = text;
        [...text.matchAll(/(?<=[^\\])\${([^}]+)}/g)].forEach(match => {
            let matchText = match[0];
            let matchKey = match[1];
            let regex = new RegExp(`\\${matchText}`, "g");
            result = text.replace(regex, replaceKeys[matchKey] || matchText);
        });
        return result;
    }

    static async createTranslationOnAllLocales(key) {
        let locales = await Locale.findAll();

        await Promise.all(locales.map(async locale => {
            try {
                await this.create({
                    LocaleId: locale.get("id"),
                    translationKey: key
                });
            }
            catch {
                // we don't care about existing entries
            }
        }));
    }

    /**
     * Fetches a translation and formats it according to the given KeyValuePairs
     * @param {string} key
     * @param {string} localeIdentifier
     * @param {Object<string, string>} replaceKeys
     * @param {boolean} autocreate specifies if missing translations should be initialized automatically
     * @returns {Promise<string>}
     */
    static async getTranslation(key, localeIdentifier, replaceKeys = {}, autocreate = false) {
        // TODO: Rework so locale 'en' is default
        let existingTranslation = await this.findOne({
            where: {
                translationKey: key
            },
            include: [{
                model: Locale,
                where: {
                    identifier: localeIdentifier
                }
            }]
        });

        // @ts-ignore
        let text = existingTranslation?.value ?? key;

        if(autocreate && !existingTranslation) {
            await this.createTranslationOnAllLocales(key);
        }

        text = await this.formatTranslation(text, replaceKeys);

        return text;
    }

    static getCustomExpressRoutes() {
        return [
            {
                method: "GET",
                relativePath: "/getAll", // See the / at the beginning
                /**
                 * @param {import("express").Request} req
                 * @param {import("express").Response} res
                 */
                handler: async(req, res) => {
                    const translations = await this.findAll({
                        include: [Locale]
                    });

                    res.json({success: true, data: translations});
                }
            },
            {
                method: "POST",
                relativePath: "/getTranslation/:locale/:key",
                /**
                 * @param {import("express").Request} req
                 * @param {import("express").Response} res
                 */
                handler: async(req, res) => {
                    const {locale, key} = req.params;
                    const translatedText = await this.getTranslation(key, locale, req.body || {});

                    res.json({success: true, data: translatedText});
                }
            },
            {
                method: "POST",
                relativePath: "/setTranslation/:locale/:key",
                handler: async(req, res) => {
                    const {locale, key} = req.params;
                    let translation = await this.findOne({
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
                        let localeObj = await Locale.getByIdentifier(locale);
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

module.exports = Translation;
