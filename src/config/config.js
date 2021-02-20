
let fs = require("fs");
let path = require("path");
let ConfigModel = require("./config-model");

module.exports = class ConfigHandler {
    /**
     * @param {String} cfgPath
     * @param {String} templatePath
     */
    constructor(cfgPath, templatePath) {
        this._cfgpath = path.join(cfgPath, "config.json");
        this._templatepath = path.join(templatePath, "config.template.json");
        this._config = null;
    }

    get configPath() {
        return this._cfgpath;
    }

    /**
     * @returns {ConfigModel}
     */
    getConfig() {
        if(this._config === null) {
            if(!this.configExists()) {
                return null;
            }
            try {
                this._config = JSON.parse(fs.readFileSync(this._cfgpath).toString());
            }
            catch (ex) {
                return null;
            }
        }

        return this._config;
    }

    /**
     * @returns {Boolean}
     */
    configExists() {
        return fs.existsSync(this._cfgpath);
    }

    /**
     * @returns {Boolean}
     */
    templateExists() {
        return fs.existsSync(this._templatepath);
    }

    exportTemplate() {
        if(this.templateExists()) {
            fs.unlinkSync(this._templatepath);
        }

        fs.writeFileSync(this._templatepath, JSON.stringify(new ConfigModel(), null, 4));
    }
};
