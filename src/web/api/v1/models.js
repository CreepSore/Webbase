let express = require("express");

let Version = require("../../../model/Version");

module.exports = function() {
    let router = express.Router();
    let op = require("sequelize").Op;

    let baseModel = Version;

    Object.keys(baseModel).forEach(modelKey => {
        const model = baseModel[modelKey];

        router.get(`/api/v1/model/${modelKey}/metadata`, async(req, res) => {
            res.json(model.rawAttributes);
        });

        router.get(`/api/v1/model/${modelKey}`, async(req, res) => {
            let result = await model.findAll();
            res.json(result);
        });

        router.get(`/api/v1/model/${modelKey}/:id`, async(req, res) => {
            let result = await model.findByPk(req.params.id);
            res.json(result);
        });

        router.post(`/api/v1/model/${modelKey}/filter`, async(req, res) => {
            let result = await model.findAll({
                where: req.body
            });
            res.json(result);
        });

        router.post(`/api/v1/model/${modelKey}/delete`, async(req, res) => {
            let result = await model.destroy({
                where: {
                    id: req.body?.id
                }
            });
            res.json(result);
        });

        router.post(`/api/v1/model/${modelKey}/update`, async(req, res) => {
            let result = await model.update(req.body.data, {
                where: req.body.where
            });
            res.json(result);
        });

        router.post(`/api/v1/model/${modelKey}/create`, async(req, res) => {
            let result = await model.create(req.body);
            res.json(result);
        });
    });

    return router;
};
