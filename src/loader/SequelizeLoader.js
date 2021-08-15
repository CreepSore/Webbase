let {Sequelize} = require("sequelize");
let Version = require("../model/Version");

// Models

class SequelizeLoader {
    /**
     * @param {import("../service/ConfigModel")["database"]} dbConfig
     * @returns {Promise<Sequelize>}
     */
    async start(dbConfig) {
        this.cfg = dbConfig;
        this.sequelize = new Sequelize(this.cfg.database, this.cfg.username, this.cfg.password, {
            // @ts-ignore
            dialect: this.cfg.dialect,
            host: this.cfg.host,
            port: this.cfg.port,
            logging: false
        });

        Version.initialize(this.sequelize);

        await this.sequelize.sync({alter: true});
        return this.sequelize;
    }

    async stop() {
        await this.sequelize.close();
    }
}

module.exports = SequelizeLoader;
