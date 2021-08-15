let fs = require("fs");

class ConfigModel {
    constructor(createDefault = true) {
        if(createDefault) {
            this.web = {
                hostname: "127.0.0.1",
                port: 8080,
                sessionSecret: ""       // Leave empty to generate a random one
            };

            this.database = {
                hostname: "127.0.0.1",
                port: 3306,
                username: "username",
                password: "password",
                database: "world",
                dialect: "mysql"
            };
        }
    }

    /**
     * Gets a certain value of a key if it exists
     * @param {string} key
     * @param {any} [defaultValue=null]
     * @memberof ConfigModel
     */
    get(key, defaultValue = null) {
        let splittedKey = key.split(".");
        let result = this;
        splittedKey.forEach(key => {
            if(!key || result === null || result === undefined) return; 
            result = result[key];
        });

        return result !== null && result !== undefined ? result : defaultValue;
    }

    /**
     * Saved a config to the specified file path.
     * @static
     * @param {fs.PathLike} path
     * @returns {Promise}
     * @memberof ConfigModel
     */
    saveTo(path, overwrite = false) {
        if(fs.existsSync(path)) {
            if(!overwrite) {
                console.log("WARN", `Can't overwrite existing config at path [${path}]`);
                return;
            }
            fs.unlinkSync(path);
        }
        return fs.promises.writeFile(path, JSON.stringify(this, null, 4));
    }

    /**
     * Imports a config from the specified file path.
     * @static
     * @param {fs.PathLike} path
     * @returns {Promise<ConfigModel>}
     * @memberof ConfigModel
     */
    static async import(path) {
        return JSON.parse((await fs.promises.readFile(path)).toString());
    }

    /**
     * Saves a template to the specified file path.
     * @static
     * @param {fs.PathLike} path The absolute path to the destination
     * @returns {Promise<ConfigModel>} The saved config model
     * @memberof ConfigModel
     */
    static saveTemplateTo(path) {
        const template = new ConfigModel(true);
        return template.saveTo(path, true).then(() => template);
    }
}

module.exports = ConfigModel;
