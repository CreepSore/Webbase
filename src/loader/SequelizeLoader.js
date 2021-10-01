"use strict";
let path = require("path");

let {Sequelize} = require("sequelize");

// Models
let Version = require("../model/Version");
let Locale = require("../model/Locale");
let Translation = require("../model/Translation");
let User = require("../model/User");
let Permission = require("../model/Permission");
let PermissionGroup = require("../model/PermissionGroup");
const { timingSafeEqual } = require("crypto");

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
     * Initializes all models
     * @returns {Promise<void>}
     * @memberof SequelizeLoader
     */
    async initializeModels() {
        Version.initialize(this.sequelize);
        Locale.initialize(this.sequelize);
        Translation.initialize(this.sequelize);
        Permission.initialize(this.sequelize);
        PermissionGroup.initialize(this.sequelize);
        User.initialize(this.sequelize);

        Locale.hasMany(Translation);
        Translation.belongsTo(Locale);

        User.belongsTo(PermissionGroup);
        PermissionGroup.hasMany(User);

        PermissionGroup.belongsToMany(Permission, {through: "PermissionGroupPermissions"});
        Permission.belongsToMany(PermissionGroup, {through: "PermissionGroupPermissions"});
    }

    /**
     * Drops all models or only those specified in dropFilter
     * @param {Array} [dropFilter=null]
     * @memberof SequelizeLoader
     */
    async doDropAction(dropFilter = null) {
        if(!dropFilter) {
            await this.sequelize.drop();
            console.log("WARN", "Dropping all known Models ...");
        }
        else {
            await Promise.all(Object.keys(this.sequelize.models).map(async modelKey => {
                const Model = this.sequelize.models[modelKey];

                if(dropFilter.includes(modelKey) || dropFilter.includes(Model)) {
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

    /**
     * Syncs models with the database
     * @param {Object} syncActions
     */
    async doSyncAction(syncActions) {
        try {
            await this.sequelize.sync({alter: !syncActions.drop && syncActions.alter});
            if(syncActions.drop || !syncActions.alter) {
                await Promise.all(Object.keys(this.sequelize.models)
                    .map(key => this.sequelize.models[key])
                    .sort((a, b) => {
                        // @ts-ignore
                        if((a.priority || 999) > (b.priority  || 999)) return -1;
                        // @ts-ignore
                        if((a.priority || 999) < (b.priority  || 999)) return 1;
                        return 0;
                    })
                    .map(async Model => {
                        // @ts-ignore
                        if(Model.onFirstInstall) {
                            // @ts-ignore
                            await Model.onFirstInstall();
                            console.log("INFO", `Running first install initialization for model [${Model.name}]`);
                        }
                    }));
            }
        }
        catch(err) {
            console.log("CRITICAL", `Failed to sync database properly: ${JSON.stringify(err, null, 2)}; ${err}`);
            process.exit(1);
        }

        await Version.afterSync();
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

        await this.initializeModels();

        syncActions.drop && await this.doDropAction(syncActions.dropFilter);

        if(syncActions.sync) {
            await this.doSyncAction(syncActions);
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
