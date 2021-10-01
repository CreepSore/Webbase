/* eslint-disable new-cap */
"use strict";
let {Model, DataTypes, Op} = require("sequelize");
let uuid = require("uuid");

let Translation = require("./Translation");

class Locale extends Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.STRING(36),
                primaryKey: true,
                defaultValue: () => uuid.v4()
            },
            identifier: {
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            }
        }, {
            sequelize
        });
    }

    static async getByIdentifier(identifier) {
        return await this.findOne({
            where: {
                identifier
            }
        });
    }

    async createMissingTranslations() {
        let myTranslations = await this.getTranslations();
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

    static async onFirstInstall() {
        try {
            await Locale.bulkCreate([
                {identifier: "en", name: "English"},
                {identifier: "de", name: "Deutsch"}
            ]);
        }
        catch(err) {
            console.log("ERROR", "Couldn't initialize default locales properly.");
        }
    }
}

module.exports = Locale;
