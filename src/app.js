"use strict";
let minimist = require("minimist");

let Application = require("./loader/WebApplication");
let Installer = require("./loader/InstallerApplication");
let Logger = require("./service/Logger");

const launchNormal = async function(argv) {
    let app = new Application(argv);
    let exitHandler = () => app.stop();

    process.on("SIGINT", exitHandler);
    process.on("SIGTERM", exitHandler);
    process.on("SIGUSR1", exitHandler);
    process.on("SIGUSR2", exitHandler);

    await app.start();
};

const lauchInstaller = async function(argv) {
    argv.log = true;
    let installer = new Installer(argv);
    await installer.start();
};

const main = async function() {
    Logger.replaceConsoleLog();

    const argv = minimist(process.argv.slice(2), {
        "boolean": ["install", "update", "drop", "log"],
        alias: {
            install: "i",
            update: "u",
            drop: "d",
            log: "l"
        }
    });

    if(argv.install) {
        lauchInstaller(argv);
        return;
    }

    launchNormal(argv);
};

main();
