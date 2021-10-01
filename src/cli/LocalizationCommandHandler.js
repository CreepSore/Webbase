"use strict";

let SequelizeLoader = require("../loader/SequelizeLoader");
let Locale = require("../model/Locale");
let Translation = require("../model/Translation");

class LocalizationCommandHandler {
    static getHelp() {
        return `Usage LocalizationCommandHandler:
  loc addLang <name> <localeId>
  loc set <localeId> <key> <value>
  loc get <localeId> <key>
  loc locales
  loc translations <localeId>
  loc export <file> [localeId]
  loc import <file>
`;
    }

    static async execute(args) {
        let sequelizeLoader = new SequelizeLoader();
        await sequelizeLoader.start();

        if(!args[0] || args[0] === "help") {
            console.log("INFO", this.getHelp());
            return;
        }

        let result = await((async() => {
            if(args[0] === "addLang") {
                await this.addLanguage(args[1], args[2]);
            }
            else if(args[0] === "set") {
                await this.setTranslation(args[1], args[2], args[3]);
            }
            else if(args[0] === "get") {
                await this.getTranslation(args[1], args[2]);
            }
            else if(args[0] === "locales") {
                await this.runListLanguagesCommand();
            }
            else if(args[0] === "translations") {
                if(!args[1]) return false;
                await this.runListTranslationsCommand(args[1]);
            }
            return true;
        })());

        if(!result) {
            console.log("INFO", this.getHelp());
        }
    }

    static async addLanguage(name, localeId) {
        let localeObj;
        try {
            localeObj = await Locale.create({
                identifier: localeId,
                name
            });
        }
        catch {
            console.log("WARN", "Locale already exists. Only creating missing translations ...");
            localeObj = await Locale.getByIdentifier(localeId);
        }

        await localeObj.createMissingTranslations();

        console.log("INFO", `Language ${name} with localeId ${localeId} added.`);
    }

    static async setTranslation(localeId, key, value) {
        Translation.setTranslation(localeId, key, value);
        console.log("INFO", `Translation [${key}] set to [${value}] for locale ${localeId}.`);
    }

    static async getTranslation(localeId, key) {
        let translation = await Translation.getTranslation(key, localeId);
        console.log("INFO", `Translation [${key}] for locale [${localeId}]: ${translation}`);
    }

    static async runListLanguagesCommand() {
        let locales = await Locale.findAll();
        let localeList = locales.map(locale => {
            // @ts-ignore
            return `  - [${locale.name}]: [${locale.identifier}]`;
        }).join("\n");

        console.log("INFO", `Locales:
${localeList}`);
    }

    static async runListTranslationsCommand(language) {
        let translations = await Translation.findAll({
            include: [
                {
                    model: Locale,
                    where: {
                        identifier: language
                    }
                }
            ]
        });
        let translationList = translations.map(translation => {
            // @ts-ignore
            return `  - [${translation.translationKey}]: [${translation.value}]`;
        }).join("\n");

        console.log("INFO", `Translations for locale ${language}:
${translationList}`);
    }

    // @ts-ignore
    static async runExportCommand(file, localeId) {
        // TODO export translations
    }

    // @ts-ignore
    static async runImportCommand(file) {
        // TODO: import translations
    }
}

module.exports = LocalizationCommandHandler;
