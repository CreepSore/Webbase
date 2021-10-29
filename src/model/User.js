/* eslint-disable new-cap */
"use strict";
let crypto = require("crypto");

let uuid = require("uuid");
let {Model, DataTypes} = require("sequelize");

let Permission = require("./Permission");
let PermissionGroup = require("./PermissionGroup");

class User extends Model {
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
            },
            tfaKey: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null
            }
        }, {
            sequelize
        });
    }

    static get priority() {
        return 3;
    }

    async hasPermission(name) {
        let permission = await Permission.findOne({where: {name}});
        if(!permission) {
            await Permission.create({name});
        }

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
        return (user.PermissionGroup?.Permissions || []).some(p => p.name === name || p.name === "ALL");
    }

    async updatePermissionGroup(group) {
        let newGroup = await PermissionGroup.findOne({where: {name: group}});
        if(!newGroup) {
            console.log("ERROR", `Group with name ${group} does not exist.`);
            return false;
        }

        // @ts-ignore
        await this.setPermissionGroup(newGroup);
        await this.save();
        return true;
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
}

module.exports = User;
