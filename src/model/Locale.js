let path = require("path");

let {Model, DataTypes} = require("sequelize");
let uuid = require("uuid");

class Locale extends Model {
    static async getByIdentifier(identifier) {
        return await this.findOne({
            where: {
                identifier
            }
        });
    }

    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.STRING(36),
                primaryKey: true,
                defaultValue: () => uuid.v4()
            },
            identifier: {
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            }
        }, {
            sequelize
        });
    }
}

module.exports = Locale;
