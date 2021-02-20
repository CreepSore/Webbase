let ApplicationLoader = require("./loaders/application-loader");

const main = function() {
    const app = new ApplicationLoader();
    app.start();
};

main();
