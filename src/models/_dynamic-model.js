let {Model} = require("sequelize");

class IDynamicModel extends Model{
    static async setup(sequelize) {}
    static async firstInit(sequelize) {}
    static async afterInit(sequelize) {}
}

module.exports = IDynamicModel;
