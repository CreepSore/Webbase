"use strict";
let path = require("path");
let fs = require("fs");

let SequelizeLoader = require("../loader/SequelizeLoader");
let Locale = require("../model/Locale");
let Translation = require("../model/Translation");
let LanguageService = require("../service/database-logic/LanguageService");

class LocalizationCommandHandler {
    static getHelp() {
        return `Usage LocalizationCommandHandler:
  loc addLang <name> <localeId>
  loc set <localeId> <key> <value>
  loc get <localeId> <key>
  loc locales
  loc translations <localeId>
  loc export <file> [localeId]
  loc import <file> [overrideExisting=false]
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
            else if(args[0] === "export") {
                if(!args[1]) return false;
                await this.runExportCommand(args[1], args[2]);
            }
            else if(args[0] === "import") {
                if(!args[1]) return false;
                await this.runImportCommand(args[1], args[2] === "true");
            }
            return true;
        })());

        if(!result) {
            console.log("INFO", this.getHelp());
        }
    }

    static async addLanguage(name, localeId) {
        try {
            await Locale.create({
                identifier: localeId,
                name
            });
        }
        catch {
            console.log("WARN", "Locale already exists. Only creating missing translations ...");
        }

        await LanguageService.createMissingTranslations(localeId);

        console.log("INFO", `Language ${name} with localeId ${localeId} added.`);
    }

    static async setTranslation(localeId, key, value) {
        LanguageService.setTranslation(localeId, key, value);
        console.log("INFO", `Translation [${key}] set to [${value}] for locale ${localeId}.`);
    }

    static async getTranslation(localeId, key) {
        let translation = await LanguageService.getTranslation(key, localeId);
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
        let resolvedPath = path.resolve(file);
        if(fs.existsSync(resolvedPath)) {
            console.log("ERROR", `Failed to export: File already exists at [${resolvedPath}]`);
            return;
        }

        let where = {};
        if(localeId) {
            where = {
                identifier: localeId
            };
        }

        let translations = await Translation.findAll({
            include: [{
                model: Locale,
                where
            }],
            order: [
                [Locale, "identifier", "ASC"],
                ["translationKey", "ASC"]
            ]
        });

        const header = "Locale.identifier\tTranslation.translationKey\tTranslation.value";
        // @ts-ignore
        const lines = translations.map(t => `${t.Locale.identifier}\t${t.translationKey}\t${t.value}`);
        const content = [header, ...lines].join("\n");
        fs.writeFileSync(resolvedPath, content, "utf8");
        console.log("INFO", `Translations exported to [${resolvedPath}]`);
    }

    // @ts-ignore
    static async runImportCommand(file, overrideExisting) {
        let resolvedPath = path.resolve(file);
        if(!fs.existsSync(resolvedPath)) {
            console.log("ERROR", `Failed to import: File does not exists at [${resolvedPath}]`);
            return;
        }

        let content = fs.readFileSync(resolvedPath, "utf8");
        let lines = content.split("\n");
        let header = lines.shift();
        let headerParts = header.split("\t");
        if(headerParts.length !== 3) {
            console.log("ERROR", `Failed to import: Invalid header [${header}]`);
            return;
        }

        let indexLocale = headerParts.indexOf("Locale.identifier");
        let indexTranslationKey = headerParts.indexOf("Translation.translationKey");
        let indexValue = headerParts.indexOf("Translation.value");

        await Promise.all(lines.map(async(line) => {
            let parts = line.split("\t");
            if(parts.length !== 3) {
                console.log("ERROR", `Failed to import: Invalid line [${line}]`);
                return false;
            }

            let locale = parts[indexLocale];
            let translationKey = parts[indexTranslationKey];
            let value = parts[indexValue];

            if(!overrideExisting) {
                let existingTranslation = await Translation.findOne({
                    where: {
                        translationKey
                    },
                    include: [{
                        model: Locale,
                        where: {
                            identifier: locale
                        }
                    }]
                });

                if(existingTranslation) {
                    console.log("WARN", `Translation [${translationKey}]@[${locale}] already exists. Skipping ...`);
                    return false;
                }
            }

            console.log("INFO", `Translation [${translationKey}]@[${locale}] set to [${value}]`);
            return await LanguageService.setTranslation(locale, translationKey, value);
        }));
    }
}

module.exports = LocalizationCommandHandler;
