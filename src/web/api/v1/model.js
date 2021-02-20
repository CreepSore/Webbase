/**
 * @typedef {import("sequelize").Sequelize} Sequelize
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Sequelize} sequelize
 */
module.exports = async(req, res, sequelize) => {
    const {model, method} = req.params;
    const foundModel = sequelize.model(model);
    if(!foundModel) {
        return res.json({success: false, error: "INVALID_MODEL"}).end();
    }

    try {
        switch(method.toUpperCase()) {
            case "GET":
                return res.json({success: true, result: await foundModel.findAll(req.body.options || {})}).end();

            case "UPDATE":
                return res.json({success: true, result: await foundModel.update(req.body.values, req.body.options || {})}).end();

            case "DELETE":
                return res.json({success: true, result: await foundModel.destroy(req.body.options || {})}).end();

            case "INSERT":
                return res.json({success: true, result: await foundModel.create(req.body.options || {})}).end();

            default:
                return res.json({success: false, error: "INVALID_METHOD"}).end();
        }
    }
    catch (err) {
        return res.json({success: false, error: "UNCAUGHT", errorstack: err.stack});
    }
};
