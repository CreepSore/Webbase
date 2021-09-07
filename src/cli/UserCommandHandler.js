"use strict";

let SequelizeLoader = require("../loader/SequelizeLoader");
let User = require("../model/User");

class UserCommandHandler {
    static async execute(args) {
        let sequelizeLoader = new SequelizeLoader();
        let sequelize = await sequelizeLoader.start();

        if(!args[0] || args[0] === "help") {
            console.log("INFO", `Usage ModelCommandHandler:
  user exists <uid>
  user setActive <uid> <newActiveState>
  
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
            else {
                console.log("ERROR", `Invalid command [${args[0]}] specified.`);
            }
        }
        catch(err) {
            console.log("ERROR", `Failed to execute command: ${err}; ${JSON.stringify(err, null, 2)}`);
        }
    }

    static async get() {
        let users = await User.findAll();
        let toPrint = users.map(u => {
            // @ts-ignore
            return ` - ${u.username}, ${u.email}, ${u.active}`;
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
}

module.exports = UserCommandHandler;
