"use strict";
let ModelCommandHandler = require("../cli/ModelCommandHandler.js");
let UserCommandHandler = require("../cli/UserCommandHandler.js");
let PermissionCommandHandler = require("../cli/PermissionCommandHandler.js");

const mapping = {
    model: ModelCommandHandler,
    user: UserCommandHandler,
    perm: PermissionCommandHandler
};

class CliApplication {
    _running = false;

    /**
     * Creates an instance of InstallerApplication.
     * @memberof CliApplication
     */
    constructor(args) {
        this.args = args;
    }

    /**
     * Starts the application
     * @return {Promise<void>}
     * @memberof CliApplication
     */
    async start() {
        if(this._running) return;

        const handler = mapping[this.args._[0]];
        if(!handler) {
            console.log("ERROR", `Handler with name [${this.args._[0]}] not found.`);
            console.log("INFO", "Available handlers:");
            console.log("INFO", Object.keys(mapping).map(x => ` - ${x}`).join("\n"));
            return;
        }

        if(!handler.execute) {
            console.log("ERROR", `Handler with name [${this.args._[0]}] has no execute method.`);
            return;
        }

        await handler.execute(this.args._.slice(1));

        this._running = false;
    }

    /**
     * Stops the application
     * @return {Promise<void>}
     * @memberof CliApplication
     */
    async stop() {
        if(!this._running) return;
        console.log("ERROR", "Can't cancel running commands because of safety reasons.");
    }

    /**
     * Restarts the application
     * @memberof CliApplication
     */
    async restart() {
        console.log("ERROR", "Can't cancel running commands because of safety reasons.");
    }
}

module.exports = CliApplication;
