"use strict";
let {Op} = require("sequelize");

let Locale = require("../../model/Locale");
let Translation = require("../../model/Translation");

class LanguageService {
    static async setTranslation(locale, key, value) {
        let localeObj = await this.getLocaleByIdentifier(locale);
        if(!localeObj) return;

        let existing = await Translation.findOne({
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
            await Translation.create({
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
                await Translation.create({
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
        let existingTranslation = await Translation.findOne({
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

    static async getLocaleByIdentifier(identifier) {
        return await Locale.findOne({
            where: {
                identifier
            }
        });
    }

    static async createMissingTranslations(localeIdentifier) {
        let locale = await this.getLocaleByIdentifier(localeIdentifier);
        let myTranslations = await locale.getTranslations();
        let allTranslationKeys = (await Translation.findAll({
            attributes: ["translationKey"],
            group: ["translationKey"],
            having: {
                translationKey: {
                    [Op.notIn]: myTranslations.map(translation => translation.translationKey)
                }
            }
        })).map(x => x.translationKey);

        await Promise.all(allTranslationKeys.map(tKey => {
            return Translation.setTranslation(this.get("identifier"), tKey, "");
        }));
    }
}

module.exports = LanguageService;
