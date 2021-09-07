/* eslint-disable new-cap */
"use strict";
let crypto = require("crypto");

let uuid = require("uuid");
let {Model, DataTypes} = require("sequelize");

let Permission = require("./Permission");

class User extends Model {
    static get priority() {
        return 3;
    }

    async addPermission(name) {
        let permission = await Permission.getByName(name);
        if(!permission) return false;

        // @ts-ignore
        User.addPermission(permission);
        return true;
    }

    async removePermission(name) {
        let permission = await Permission.getByName(name);
        if(!permission) return false;

        // @ts-ignore
        User.removePermission(permission);
        return true;
    }

    async hasPermission(name) {
        debugger;

        // @ts-ignore
        return false;
    }

    static async isValidUid(uid) {
        let user = await User.findOne({
            where: {
                id: uid || ""
            }
        });
        return user !== null;
    }

    static async doLogin(username, password) {
        const hashedPassword = this.hashPassword(password);
        return await User.findOne({where: {username, password: hashedPassword}});
    }

    static hashPassword(password) {
        return crypto
            .createHash("SHA256")
            .update(password)
            .digest()
            .toString("base64");
    }

    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: () => uuid.v4(),
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING(64),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize
        });
    }
}

module.exports = User;
