/* eslint-disable new-cap */
"use strict";
let path = require("path");

let {Model, DataTypes} = require("sequelize");
let uuid = require("uuid");

class Version extends Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.STRING(36),
                primaryKey: true,
                defaultValue: () => uuid.v4()
            },
            component: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            version: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            major: {
                type: DataTypes.VIRTUAL,
                get() {
                    return Number((this.get("version") || "").split(".")[0], 10);
                }
            },
            minor: {
                type: DataTypes.VIRTUAL,
                get() {
                    return Number((this.get("version") || "").split(".")[1], 10);
                }
            },
            servicepack: {
                type: DataTypes.VIRTUAL,
                get() {
                    return Number((this.get("version") || "").split(".")[2], 10);
                }
            }
        }, {
            sequelize
        });
    }

    static async onFirstInstall() {
        await Version.create({
            component: "SCHEMA",
            version: require(path.join(__dirname, "..", "..", "package.json")).version || "INVALID"
        }, {
            raw: true
        });
    }
}

module.exports = Version;
