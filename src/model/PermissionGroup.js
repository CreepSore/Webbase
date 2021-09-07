/* eslint-disable new-cap */
"use strict";
let {Model, DataTypes, Op} = require("sequelize");
let uuid = require("uuid");

let Permission = require("./Permission");

class PermissionGroup extends Model {
    static get priority() {
        return 2;
    }

    static async getPermission(name) {
        return await this.findOne({
            where: {
                name
            }
        });
    }

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

    static async onFirstInstall() {
        try {
            const defaultGroup = await PermissionGroup.create({
                name: "DEFAULT",
                description: "Default permission group"
            });

            let defaultPerms = await Permission.findAll({
                where: {
                    name: {[Op.or]: ["LOGIN"]}
                }
            });

            await Promise.all(defaultPerms.map(async perm => {
                // @ts-ignore
                await defaultGroup.addPermission(perm);
                // @ts-ignore
                console.log("INFO", `Added default permission [${perm.name}] to group [DEFAULT]`);
            }));

            let adminGroup = await PermissionGroup.create({
                name: "ADMIN",
                description: "Admin permission group"
            });

            let adminPerms = await Permission.findOne({
                where: {
                    name: "ALL"
                }
            });

            // @ts-ignore
            await adminGroup.addPermission(adminPerms);
        }
        catch(err) {
            console.log("ERROR", `Couldn't initialize default permgroups properly: ${err}`);
        }
    }
}

module.exports = PermissionGroup;
