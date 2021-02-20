let path = require("path");
let ConfigHandler = require("../config/config");

/**
 * @returns {import("../config/config-model")} ConfigModel
 */
module.exports = function setupConfig() {
    const cfgHandler = new ConfigHandler(path.join(__dirname, "..", ".."), path.join(__dirname, "..", ".."));
    cfgHandler.exportTemplate();
    const cfg = cfgHandler.getConfig();
    if(!cfg) throw new Error(`Could not find config file at [${cfgHandler.configPath}]`);
    return cfg;
};
