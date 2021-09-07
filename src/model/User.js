/* eslint-disable new-cap */
"use strict";
let crypto = require("crypto");

let uuid = require("uuid");
let {Model, DataTypes} = require("sequelize");

let Permission = require("./Permission");
let PermissionGroup = require("./PermissionGroup");

class User extends Model {
    static get priority() {
        return 3;
    }

    async hasPermission(name) {
        // @ts-ignore
        let user = await User.findByPk(this.id, {include: [
            {
                model: PermissionGroup,
                include: [Permission]
            }
        ]});

        if(!user) {
            // @ts-ignore
            console.log("ERROR", `User with id ${this.id} does not exist. This should very much not happen.`);
            return false;
        }

        // @ts-ignore
        return (user.PermissionGroup?.Permissions || []).some(p => p.name === name);
    }

    async updatePermissionGroup(group) {
        let newGroup = await PermissionGroup.findOne({where: {name: group}});
        if(!newGroup) {
            console.log("ERROR", `Group with name ${group} does not exist.`);
            return;
        }

        // @ts-ignore
        await this.setPermissionGroup(newGroup);
        await this.save();
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
            password: {               type: DataTypes.STRING(255),
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
