/* eslint-disable new-cap */
"use strict";
let {Model, DataTypes} = require("sequelize");
let uuid = require("uuid");

class Permission extends Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.STRING(36),
                primaryKey: true,
                defaultValue: () => uuid.v4()
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.TEXT({length: "long"}),
                allowNull: true,
                defaultValue: ""
            }
        }, {
            sequelize
        });
    }

    static get priority() {
        return 1;
    }

    static async getByName(name) {
        return await this.findOne({
            where: {
                name
            }
        });
    }

    static async onFirstInstall() {
        try {
            await Permission.bulkCreate([
                {name: "ALL", description: "Wildcard permission"},
                {name: "LOGIN", description: "Login permission"},
                {name: "TRANSLATE", description: "Permissions to use the translation page"}
            ]);
        }
        catch(err) {
            console.log("ERROR", "Couldn't initialize default permgroups properly.");
        }
    }
}

module.exports = Permission;
