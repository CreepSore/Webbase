

/**
 * @typedef {Object} WebConfig
 * @property {String} host
 * @property {Number} port
 */

module.exports = class ConfigModel {
    constructor() {
        this.web = {
            address: "0.0.0.0",
            port: 8089,
            sessionSecret: "Leave empty for random generated secret"
        };
    }

    static checkModel(model) {
        const defaultKeys = Object.keys(new ConfigModel());
        const keys = Object.keys(model);

        for(let i = 0; i < defaultKeys.length; i++) {
            if(!keys.includes(defaultKeys[i])) {
                return false;
            }
        }

        return true;
    }
};
