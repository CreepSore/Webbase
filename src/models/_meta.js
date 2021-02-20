// ! Disabling: This is a Sequelize-standard, and we can't change this.
/* eslint-disable new-cap */
let fs = require("fs");
let path = require("path");
let {Model, DataTypes} = require("sequelize");

module.exports = class Meta extends Model {
    static setup(sequelize) {
        this.init({
            author: {
                type: DataTypes.STRING(64),
                allowNull: false
            },
            setupTime: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                allowNull: false
            },
            version: {
                type: DataTypes.STRING(10),
                allowNull: false
            }
        }, {
            sequelize: sequelize,
            freezeTableName: true,
            tableName: "_meta",
            timestamps: false
        });
    }

    static async firstInit() {
        const packageJson = JSON.parse(fs.readFileSync(path.resolve(path.join("package.json"))).toString());
        await Meta.create({
            author: "HIER",
            setupTime: new Date(),
            version: packageJson.version
        });
    }
};
