let path = require("path");

let Application = require("./loader/WebApplication");
let Logger = require("./service/Logger");

const LOG_PATH = path.resolve(__dirname, "..", "console.log");

const main = async function() {
    Logger.replaceConsoleLog();
    let exitHandler = () => app.stop();

    process.on("SIGINT", exitHandler);
    process.on("SIGTERM", exitHandler);
    process.on("SIGUSR1", exitHandler);
    process.on("SIGUSR2", exitHandler);

    let app = new Application();
    await app.start();
};

main();
