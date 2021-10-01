/* eslint-disable new-cap */
"use strict";
let {Model, DataTypes} = require("sequelize");
let uuid = require("uuid");

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
