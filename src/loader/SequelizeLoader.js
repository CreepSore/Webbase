let {Sequelize} = require("sequelize");

// Models
let Version = require("../model/Version");
let Locale = require("../model/Locale");
let Translation = require("../model/Translation");

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
        Locale.initialize(this.sequelize);
        Translation.initialize(this.sequelize);

        Locale.hasMany(Translation);
        Translation.belongsTo(Locale);

        await this.sequelize.sync({alter: true});
        Version.afterSync();

        return this.sequelize;
    }

    async stop() {
        await this.sequelize.close();
    }
}

module.exports = SequelizeLoader;
