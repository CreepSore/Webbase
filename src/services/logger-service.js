
let fs = require("fs");
let path = require("path");

const LoggerLevels = {
    DEBUG: "Debug",
    INFO: "Info",
    WARN: "Warn",
    ERROR: "Error",
    CRITICAL: "Critical"
};

class LoggerService {
    static newline = "\r\n";

    static levelSpacing() {
        if(!this._levelSpacing) {
            this._levelSpacing = Object.keys(LoggerLevels)
                .map(key => LoggerLevels[key].length)
                .sort((a, b) => b - a)[0];
        }
        return this._levelSpacing;
    }

    /**
     * @param {String} level
     * @param {String} message
     * @param {String|null} segment
     * @param {"console"|"file"|"json"|"json_formatted"|null} type
     * @returns {String}
     */
    static format(level, message, segment = null, type = "console") {
        switch(type) {
            case "json":
                return JSON.stringify({timestamp: new Date().toISOString(), message: message, segment: segment});
            case "json_formatted":
                return JSON.stringify({timestamp: new Date().toISOString(), message: message, segment: segment}, null, 2);
            case "file":
                return `[${new Date().toISOString()}][${level.padStart(this.levelSpacing(), " ")}]${segment ? `[${segment}]` : ""} ${message}${this.newline}`;
            case "console":
            default:
                return `[${new Date().toISOString()}][${level.padStart(this.levelSpacing(), " ")}]${segment ? `[${segment}]` : ""} ${message}`;
        }
    }

    /**
     * @param {String} level
     * @param {String} message
     * @param {String|null} segment
     */
    static logToFile(level, message, segment = null, file = null) {
        let finalPath = file || path.join(__dirname, "..", "..", "latest.log");
        fs.mkdirSync(path.dirname(finalPath), {recursive: true});
        fs.appendFileSync(finalPath, this.format(level, message, segment, "file"));
    }

    /**
     * @param {String} level
     * @param {String} message
     * @param {String|null} segment
     */
    static logToConsole(level, message, segment = null) {
        console.log(this.format(level, message, segment, "console"));
    }

    /**
     * @param {String} level
     * @param {String} message
     * @param {String|null} segment
     */
    static log(level, message, segment = null) {
        this.logToConsole(level, message, segment);
        this.logToFile(level, message, segment);
    }
}

module.exports = {
    LoggerService,
    LoggerLevels
};
