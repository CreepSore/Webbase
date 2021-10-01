"use strict";

let SequelizeLoader = require("../loader/SequelizeLoader");
let PermissionGroup = require("../model/PermissionGroup");
let Permission = require("../model/Permission");

class PermissionCommandHandler {
    static async execute(args) {
        let sequelizeLoader = new SequelizeLoader();
        await sequelizeLoader.start();

        if(!args[0] || args[0] === "help") {
            console.log("INFO", `Usage PermissionCommandHandler:
  perm group add <groupName>
  perm group remove <groupName>
  perm group list
  perm group addperm <groupName> <permissionName>
  perm group removeperm <groupName> <permissionName>
  perm group listperm <groupName>
  perm perm add <permissionName> <permissionDescription>
  perm perm remove <permissionName>
  perm perm list
`);
            return;
        }

        try {
            if(args[0] === "group") {
                await this.runGroupCommand(args);
            }
            else if(args[0] === "perm") {
                await this.runPermCommand(args);
            }
            else {
                console.log("ERROR", `Invalid command [${args[0]}]`);
            }
        }
        catch(err) {
            console.log("ERROR", `An error occured: ${err}:\n${JSON.stringify(err, null, 2)}`);
        }
    }

    static async runGroupCommand(args) {
        if(args[1] === "add") {
            await this.addPermissionGroup(args[2], args[3]);
        }
        else if(args[1] === "remove") {
            await this.removePermissionGroup(args[2]);
        }
        else if(args[1] === "list") {
            await this.listPermissionGroup();
        }
        else if(args[1] === "addperm") {
            await this.addPermissionGroupPermission(args[2], args[3]);
        }
        else if(args[1] === "removeperm") {
            await this.removePermissionGroupPermission(args[2], args[3]);
        }
        else if(args[1] === "listperm") {
            await this.listPermissionGroupPermission(args[2]);
        }
        else {
            console.log("ERROR", "Invalid group command");
        }
    }

    static async addPermissionGroup(name, description) {
        await PermissionGroup.create({
            name,
            description
        });
        console.log("INFO", `New Permission Group [${name}] created.`);
    }

    static async removePermissionGroup(name) {
        await PermissionGroup.destroy({
            where: {name}
        });

        console.log("INFO", `Permission Group [${name}] deleted.`);
    }

    static async listPermissionGroup() {
        let groups = await PermissionGroup.findAll();
        console.log("INFO", `Perm-Groups:
${groups.map(g => `  - ${g.name}: ${g.description}`).join("\n")}`);
    }

    static async addPermissionGroupPermission(groupName, permName) {
        let group = await PermissionGroup.findOne({where: {name: groupName}});
        if(!group) {
            console.log("ERROR", `Permission group [${groupName}] not found`);
            return;
        }

        let perm = await Permission.findOne({where: {name: permName}});
        if(!perm) {
            console.log("ERROR", `Permission [${permName}] not found`);
            return;
        }

        group.addPermission(perm);
        console.log("INFO", `Permission [${permName}] added to group [${groupName}]`);
    }

    static async removePermissionGroupPermission(groupName, permName) {
        let group = await PermissionGroup.findOne({where: {name: groupName}});
        if(!group) {
            console.log("ERROR", `Permission group [${groupName}] not found`);
            return;
        }

        let perm = await Permission.findOne({where: {name: permName}});
        if(!perm) {
            console.log("ERROR", `Permission [${permName}] not found`);
            return;
        }

        group.removePermission(perm);
        console.log("INFO", `Permission [${permName}] removed from group [${groupName}]`);
    }

    static async listPermissionGroupPermission(groupName) {
        let group = await PermissionGroup.findOne({where: {name: groupName}, include: [Permission]});
        if(!group) {
            console.log("ERROR", `Permission group [${groupName}] not found`);
            return;
        }

        console.log("INFO", `Permissions of group [${group.name}]:
${group.Permissions.map(p => `  - ${p.name}: ${p.description}`).join("\n")}`);
    }

    static async runPermCommand(args) {
        if(args[1] === "add") {
            await this.addPermission(args[2], args[3]);
        }
        else if(args[1] === "remove") {
            await this.removePermission(args[2]);
        }
        else if(args[1] === "list") {
            await this.listPermission();
        }
        else {
            console.log("ERROR", "Invalid perm command");
        }
    }

    static async addPermission(name, description) {
        await Permission.create({name, description});
        console.log("INFO", `New Permission [${name}] created.`);
    }

    static async removePermission(name) {
        await Permission.destroy({where: {name}});
        console.log("INFO", `Permission [${name}] deleted.`);
    }

    static async listPermission() {
        let permissions = await Permission.findAll();
        console.log("INFO", `Permissions:
${permissions.map(p => `  - ${p.name}: ${p.description}`).join("\n")}`);
    }
}

module.exports = PermissionCommandHandler;
