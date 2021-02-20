let fs = require("fs");
let path = require("path");
let {Sequelize} = require("sequelize");
let {LoggerService, LoggerLevels} = require("../services/logger-service");
let Meta = require("../models/_meta");

/**
 * @param {Sequelize} sequelize
 */
const loadModels = async function(sequelize) {
    const modelPath = path.join(__dirname, "..", "models");

    Meta.setup(sequelize);
    await Meta.sync();
    const firstInit = !(await Meta.findOne());
    if(firstInit) {
        LoggerService.log(LoggerLevels.INFO, "Database found non-initialized. Initializing ...", "sequelize-loader.js::loadModels");
        await Meta.firstInit();
    }
    const meta = await Meta.findOne();
    LoggerService.log(LoggerLevels.INFO, `Database information: ${JSON.stringify(meta, null, 2)}`, "sequelize-loader.js::loadModels");

    const models = [];
    fs.readdirSync(modelPath).forEach(async file => {
        if(file.startsWith("_") || !file.endsWith(".js")) {
            return;
        }

        const dirFilePath = path.join(modelPath, file);
        const fileStat = fs.statSync(dirFilePath);
        if(fileStat.isDirectory()) {
            // TODO: Maybe add recursive support?
            return;
        }

        const Model = require(dirFilePath);
        // ! Javascript is seriously f***** up ...
        // ! Since classes are prototypes, i need to check the constructors string value
        // ! to be sure if the loaded model is a class or not.
        // ! See: https://stackoverflow.com/a/43197340
        if(Model.prototype?.constructor.toString().substring(0, 5) !== "class"
            || !Model.setup) {
            return;
        }

        const regexpMatch = Model.toString().match(/^class ([^ ]+)/);
        if(regexpMatch) {
            models.push(Model);
            const modelName = regexpMatch[1];
            LoggerService.log(LoggerLevels.INFO, `Initializing db-model:  [${modelName}]`, "sequelize-loader.js::loadModels");
            await Model.setup(sequelize);
            await Model.sync();
            if(firstInit && Model.firstInit) {
                await Model.firstInit(sequelize);
            }
        }
    });

    await Promise.all(models.filter(model => model.afterInit).map(model => model.afterInit(sequelize)));
};

module.exports = async function loadSequelize() {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: path.join(__dirname, "..", "..", "storage.db"),
        logging: false
    });

    await loadModels(sequelize);
    LoggerService.log(LoggerLevels.INFO, "Syncing database.", "sequelize-loader.js::loadSequelize");
    return sequelize;
};
