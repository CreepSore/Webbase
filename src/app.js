let fs = require("fs");
let path = require("path");

let Application = require("./loader/WebApplication");

const LOG_PATH = path.resolve(__dirname, "..", "console.log");

const linuxTerminalColors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    fgblack: "\x1b[30m",
    fgred: "\x1b[31m",
    fggreen: "\x1b[32m",
    fgyellow: "\x1b[33m",
    fgblue: "\x1b[34m",
    fgmagenta: "\x1b[35m",
    fgcyan: "\x1b[36m",
    fgwhite: "\x1b[37m",
    bgblack: "\x1b[40m",
    bgred: "\x1b[41m",
    bggreen: "\x1b[42m",
    bgyellow: "\x1b[43m",
    bgblue: "\x1b[44m",
    bgmagenta: "\x1b[45m",
    bgcyan: "\x1b[46m",
    bgwhite: "\x1b[47m",
};

const logLevelMapping = {
    INFO: {date: `${linuxTerminalColors.bgblue}${linuxTerminalColors.fgwhite}`, text: `${linuxTerminalColors.reset}${linuxTerminalColors.fgblue}`},
    ERROR: {date: `${linuxTerminalColors.bgred}${linuxTerminalColors.fgwhite}`, text: `${linuxTerminalColors.reset}${linuxTerminalColors.fgred}`},
    WARN: {date: `${linuxTerminalColors.bgyellow}${linuxTerminalColors.fgblack}`, text: `${linuxTerminalColors.reset}${linuxTerminalColors.fgyellow}`},
    CRITICAL: {date: `${linuxTerminalColors.bgred}${linuxTerminalColors.fgwhite}`, text: `${linuxTerminalColors.reset}${linuxTerminalColors.fgred}`}
};

const overwriteConsoleLog = function() {
    let originalLog = console.log;
    console.log = function(level, ...data) {
        let color = null;
        if(data.length > 0 && level) {
            color = logLevelMapping[String(level).toUpperCase()];
        }

        let toPrint = data;
        if(data.length === 0) toPrint = [level];

        toPrint.join(" ").split("\n").forEach(line => {
            let toAppend = `${color ? color.date : ""}[${new Date().toISOString()}]${data.length !== 0 ? `[${level.toUpperCase().padStart(8, " ")}]` : ''}${color ? color.text : ""} ${line}${linuxTerminalColors.reset}`;

            originalLog(toAppend); 
        });
    };
};

const main = async function() {
    overwriteConsoleLog();
    let exitHandler = () => app.stop();

    process.on("SIGINT", exitHandler);
    process.on("SIGTERM", exitHandler);
    process.on("SIGUSR1", exitHandler);
    process.on("SIGUSR2", exitHandler);

    let app = new Application();
    await app.start();
};

main();
