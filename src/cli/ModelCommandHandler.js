"use strict";

let SequelizeLoader = require("../loader/SequelizeLoader");

class ModelCommandHandler {
    static async execute(args) {
        let sequelizeLoader = new SequelizeLoader();
        let sequelize = await sequelizeLoader.start();
        let Model = sequelize.models[args[0]];
        if(!Model && args[0]) {
            console.log("ERROR", `Invalid model [${args[0]}] specified.`);
            return;
        }

        if(!args[0] || !args[1] || args[1] === "help") {
            console.log("INFO", `Usage ModelCommandHandler:
  model <model> metadata
  model <model> get
  model <model> getByPk <pk>
  model <model> getFilter <where>
  model <model> delete <where>
  model <model> update <data> <where>
  model <model> create <data>
  
where and data are JSON strings. Remember to put them in apastrophes.`);

            return;
        }

        try {
            if(args[1] === "metadata") {
                await ModelCommandHandler.getMetadata(Model);
            }
            else if(args[1] === "get") {
                await ModelCommandHandler.get(Model);
            }
            else if(args[1] === "getByPk") {
                await ModelCommandHandler.getByPk(Model, args[2]);
            }
            else if(args[1] === "getFilter") {
                await ModelCommandHandler.getFilter(Model, JSON.parse(args[2]));
            }
            else if(args[1] === "delete") {
                await ModelCommandHandler.delete(Model, JSON.parse(args[2]));
            }
            else if(args[1] === "update") {
                await ModelCommandHandler.update(Model, JSON.parse(args[2]), JSON.parse(args[3]));
            }
            else if(args[1] === "create") {
                await ModelCommandHandler.create(Model, JSON.parse(args[2]));
            }
            else {
                console.log("ERROR", `Invalid command [${args[1]}] specified.`);
            }
        }
        catch(err) {
            console.log("ERROR", `Failed to execute command: ${err}; ${JSON.stringify(err, null, 2)}`);
        }
    }

    static async getMetadata(Model) {
        let result = Model.rawAttributes;
        console.log("INFO", JSON.stringify(result, null, 2));
    }

    static async get(Model) {
        let result = await Model.findAll();
        console.log("INFO", JSON.stringify(result, null, 2));
    }

    static async getByPk(Model, pk) {
        let result = await Model.findByPk(pk);
        console.log("INFO", JSON.stringify(result, null, 2));
    }

    static async getFilter(Model, where) {
        let result = await Model.findAll({
            where
        });
        console.log("INFO", JSON.stringify(result, null, 2));
    }

    static async delete(Model, where) {
        let result = await Model.destroy({
            where
        });
        console.log("INFO", JSON.stringify(result, null, 2));
    }

    static async update(Model, data, where) {
        let result = await Model.update(data, {
            where
        });
        console.log("INFO", JSON.stringify(result, null, 2));
    }

    static async create(Model, data) {
        let result = await Model.create(data);
        console.log("INFO", JSON.stringify(result, null, 2));
    }
}

module.exports = ModelCommandHandler;