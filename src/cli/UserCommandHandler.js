"use strict";

let SequelizeLoader = require("../loader/SequelizeLoader");
let PermissionGroup = require("../model/PermissionGroup");
let Permission = require("../model/Permission");
let User = require("../model/User");

class UserCommandHandler {
    static async execute(args) {
        let sequelizeLoader = new SequelizeLoader();
        await sequelizeLoader.start();

        if(!args[0] || args[0] === "help") {
            console.log("INFO", `Usage ModelCommandHandler:
  user exists <uid>
  user setActive <uid> <newActiveState>
  user get
  user getPermissions <uid>
  user setPermissionGroup <uid> <group>
  user create <username> <password> [email]
  user help

where and data are JSON strings. Remember to put them in apastrophes.`);

            return;
        }

        try {
            if(args[0] === "setActive") {
                let newState = null;
                if(args[2] === "true") {
                    newState = true;
                }
                else if(args[2] === "false") {
                    newState = false;
                }

                if(newState === null) {
                    console.log("ERROR", "Invalid state.");
                    return;
                }

                await UserCommandHandler.setActive(args[1], newState);
            }
            else if(args[0] === "exists") {
                await UserCommandHandler.exists(args[1]);
            }
            else if(args[0] === "get") {
                await UserCommandHandler.get();
            }
            else if(args[0] === "setPermissionGroup") {
                await UserCommandHandler.setPermissionGroup(args[1], args[2]);
            }
            else if(args[0] === "getPermissions") {
                await UserCommandHandler.getPermissions(args[1]);
            }
            else if(args[0] === "hasPermission") {
                await UserCommandHandler.hasPermission(args[1], args[2]);
            }
            else if(args[0] === "create") {
                await UserCommandHandler.create(args[1], args[2], args[3]);
            }
            else {
                console.log("ERROR", `Invalid command [${args[0]}] specified.`);
            }
        }
        catch(err) {
            console.log("ERROR", `Failed to execute command: ${err}; ${JSON.stringify(err, null, 2)}`);
        }
    }

    static async get() {
        let users = await User.findAll({include: [PermissionGroup]});
        let toPrint = users.map(u => {
            // @ts-ignore
            return ` - [${u.id}] [username:${u.username}] [email:${u.email}] [active:${u.active}] [group:${u.PermissionGroup?.name || ""}]`;
        }).join("\n");

        if(toPrint.length === 0) {
            console.log("INFO", "No users found.");
            return;
        }

        console.log("INFO", toPrint);
    }

    static async setActive(uid, newActiveState) {
        let user = await User.findByPk(uid);
        if(!user) {
            console.log("ERROR", `User with id ${uid} does not exist.`);
            return;
        }

        // @ts-ignore
        user.active = newActiveState;
        await user.save();
        console.log("INFO", `Active state of User with id ${uid} is now ${newActiveState}.`);
    }

    static async exists(uid) {
        console.log("INFO", (await User.isValidUid(uid)) ? `User with id ${uid} exists.` : `User with id ${uid} does not exist.`);
    }

    static async getPermissions(uid) {
        let user = await User.findByPk(uid, {include: [
            {
                model: PermissionGroup,
                include: [Permission]
            }
        ]});

        if(!user) {
            console.log("ERROR", `User with id ${uid} does not exist.`);
            return;
        }

        // @ts-ignore
        let toPrint = (user.PermissionGroup?.Permissions || []).map(p => ` - ${p.name}: ${p.description}`).join("\n");
        // @ts-ignore
        console.log("INFO", `Permissions of user [${user.id}][${user.PermissionGroup?.name || ""}] ${user.username}:`);
        console.log("INFO", toPrint);
    }

    static async hasPermission(uid, permission) {
        let user = await User.findByPk(uid, {include: [
            {
                model: PermissionGroup,
                include: [Permission]
            }
        ]});

        if(!user) {
            console.log("ERROR", `User with id ${uid} does not exist.`);
            return;
        }

        // @ts-ignore
        if(await user.hasPermission(permission)) {
            console.log("INFO", `User with id ${uid} has permission ${permission}.`);
        }
        else {
            console.log("ERROR", `User with id ${uid} does not have permission ${permission}.`);
        }
    }

    static async setPermissionGroup(uid, group) {
        let user = await User.findByPk(uid);
        if(!user) {
            console.log("ERROR", `User with id ${uid} does not exist.`);
            return;
        }

        await user.updatePermissionGroup(group);

        // @ts-ignore
        console.log("INFO", `Permission group of User with id ${uid} is now ${group}.`);
    }

    static async create(username, password, email) {
        let hashedPw = User.hashPassword(password);

        let user = await User.create({
            username,
            password: hashedPw,
            email,
            active: false
        });

        // @ts-ignore
        console.log("INFO", `Created user with id ${user.id}`);

        let defaultGroup = await PermissionGroup.findOne({where: {name: "DEFAULT"}});
        if(defaultGroup) {
            // @ts-ignore
            await user.setPermissionGroup(defaultGroup);
            await user.save();
            // @ts-ignore
            console.log("INFO", `Set default group to ${defaultGroup.name}`);
        }
        else {
            console.log("WARN", "Default group does not exist. Not setting any group.");
        }
    }
}

module.exports = UserCommandHandler;
