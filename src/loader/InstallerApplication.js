"use strict";
let SequelizeLoader = require("./SequelizeLoader");

class InstallerApplication {
    _running = false;

    /**
     * Creates an instance of InstallerApplication.
     * @memberof InstallerApplication
     */
    constructor(args) {
        this.args = args;
        this.sequelizeLoader = new SequelizeLoader();
    }

    /**
     * Starts the application
     * @return {Promise<void>}
     * @memberof InstallerApplication
     */
    async start() {
        if(this._running) return;
        this.sequelize = await this.sequelizeLoader.start({
            sync: this.args.install && !this.args.drop,
            alter: this.args.update,
            drop: this.args.drop,
            log: this.args.log
        });
        this._running = true;
    }

    /**
     * Stops the application
     * @return {Promise<void>}
     * @memberof InstallerApplication
     */
    async stop() {
        if(!this._running) return;
        console.log("ERROR", "Can't cancel db-installation because of safety reasons.");
    }

    /**
     * Restarts the application
     * @memberof InstallerApplication
     */
    async restart() {
        console.log("ERROR", "Can't restart db-installation because of safety reasons.");
    }
}

module.exports = InstallerApplication;
