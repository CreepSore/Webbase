"use strict";
let path = require("path");

let {Sequelize} = require("sequelize");

// Models
let Version = require("../model/Version");
let Locale = require("../model/Locale");
let Translation = require("../model/Translation");
/**
 * @typedef {Object} SyncActions
 * @property {boolean=} drop
 * @property {Array<import("sequelize").Model | any>=} dropFilter
 * @property {boolean=} alter
 * @property {boolean=} sync
 * @property {boolean=} log
 */

class SequelizeLoader {
    /**
     * Returns if the db is setup correctly
     * This only checks if the models are present.
     * Before calling this, start() has to be called first.
     * @return {Promise<boolean>}
     * @memberof SequelizeLoader
     */
    async checkDb() {
        try {
            await Promise.all(Object.keys(this.sequelize.models).map(async modelKey => {
                const Model = this.sequelize.models[modelKey];
                await Model.findAll();
            }));
            return true;
        }
        catch(err) {
            console.log("ERROR", `Database not configured correctly: ${JSON.stringify(err, null, 2)}`);
            return false;
        }
    }

    /**
     * @param {SyncActions} syncActions
     * @returns {Promise<Sequelize>}
     */
    async start(syncActions = {}) {
        this.sequelize = new Sequelize({
            dialect: "sqlite",
            storage: path.resolve(__dirname, "..", "..", "storage.db"),
            logging: syncActions.log
        });

        Version.initialize(this.sequelize);
        Locale.initialize(this.sequelize);
        Translation.initialize(this.sequelize);

        Locale.hasMany(Translation);
        Translation.belongsTo(Locale);

        if(syncActions.drop) {
            if(!syncActions.dropFilter) {
                await this.sequelize.drop();
                console.log("WARN", "Dropping all known Models ...");
            }
            else {
                await Promise.all(Object.keys(this.sequelize.models).map(async modelKey => {
                    const Model = this.sequelize.models[modelKey];

                    if(syncActions.dropFilter.includes(modelKey) || syncActions.dropFilter.includes(Model)) {
                        return;
                    }

                    try {
                        console.log("WARN", `Dropping Model [${modelKey}]`);
                        await this.sequelize.models[modelKey].drop({cascade: true});
                    }
                    catch {
                        console.log("ERROR", `Failed to drop Model [${modelKey}]`);
                    }
                }));
            }
        }

        if(syncActions.sync) {
            try {
                await this.sequelize.sync({alter: !syncActions.drop && syncActions.alter});
            }
            catch(err) {
                console.log("CRITICAL", `Failed to sync database properly: ${JSON.stringify(err, null, 2)}`);
                process.exit(1);
            }

            await Version.afterSync();
        }
        else if(syncActions.alter) {
            console.log("ERROR", "Calling syncActions.alter without specifying syncActions.sync");
        }

        return this.sequelize;
    }

    async stop() {
        await this.sequelize.close();
    }
}

module.exports = SequelizeLoader;
