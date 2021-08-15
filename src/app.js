let fs = require("fs");
let path = require("path");

let Application = require("./loader/WebApplication");

const LOG_PATH = path.resolve(__dirname, "..", "console.log");

const overwriteConsoleLog = function() {
    let originalLog = console.log;
    console.log = function(level, ...data) {
        let toPrint = data;
        if(data.length === 0) toPrint = [level];

        toPrint.join(" ").split("\n").forEach(line => {
            let toAppend = `[${new Date().toISOString()}]${data.length !== 0 ? `[${level.toUpperCase().padStart(8, " ")}]` : ''} ${line}`;
            /*fs.appendFile(LOG_PATH, `${toAppend}\n`, (err) => {
                if(err) {
                    originalLog("Failed to Append to logfile");
                }
            });*/
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
