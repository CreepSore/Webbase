/* eslint-disable new-cap */
"use strict";

let {Model, DataTypes} = require("sequelize");
let uuid = require("uuid");

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
}

module.exports = Translation;
