"use strict";
let express = require("express");

let Version = require("../../../model/Version");

/**
 * @typedef {Object} CustomRoute
 * @property {string} method
 * @property {string} relativePath
 * @property {Function} handler
 * @property {boolean=} ignorePermissions
 */

module.exports = function() {
    // eslint-disable-next-line new-cap
    let router = express.Router();
    let {models} = Version.sequelize;

    Object.keys(models).forEach(modelKey => {
        const Model = models[modelKey];

        // @ts-ignore
        if(Model.getCustomExpressRoutes) {
            /** @type {Array<CustomRoute>} */
            // @ts-ignore
            let routes = Model.getCustomExpressRoutes();

            routes.forEach(route => {
                if(!route.method || !route.relativePath || !route.handler) {
                    console.log("ERROR", `Missing parameters from custom route for model [${Model}]`);
                }

                const url = `/api/v1/model/${modelKey}${route.relativePath}`;
                router[route.method.toLowerCase()](url, async(req, res, next) => {
                    const permKey = `MODEL:${modelKey}:${route.relativePath}:${route.method.toUpperCase()}`;
                    if(!route.ignorePermissions && (!res.locals.user || !(await res.locals.user.hasPermission(permKey)))) {
                        console.log("ERROR", `User [${res.locals.user}] does not have permission to access [${url}]; required permission = [${permKey}]`);
                        return res.json({success: false, error: "INVALID_PERMISSION"});
                    }

                    return route.handler(req, res, next);
                });
                console.log("INFO", `Successfully registered custom route [${route.method.toUpperCase()}][${url}]@[${modelKey}]`);
            });
        }

        router.get(`/api/v1/model/${modelKey}/metadata`, async(req, res) => {
            const permKey = `MODEL:${modelKey}:metadata:GET`;
            if(!res.locals.user || !(await res.locals.user.hasPermission(permKey))) {
                console.log("ERROR", `User [${res.locals.user}] does not have permission [${permKey}]`);
                return res.json({success: false, error: "INVALID_PERMISSION"});
            }
            res.json(Model.rawAttributes);
        });

        router.get(`/api/v1/model/${modelKey}`, async(req, res) => {
            const permKey = `MODEL:${modelKey}::GET`;
            if(!res.locals.user || !(await res.locals.user.hasPermission(permKey))) {
                console.log("ERROR", `User [${res.locals.user}] does not have permission [${permKey}]`);
                return res.json({success: false, error: "INVALID_PERMISSION"});
            }
            let result = await Model.findAll();
            res.json(result);
        });

        router.get(`/api/v1/model/${modelKey}/:id`, async(req, res) => {
            const permKey = `MODEL:${modelKey}:id:GET`;
            if(!res.locals.user || !(await res.locals.user.hasPermission(permKey))) {
                console.log("ERROR", `User [${res.locals.user}] does not have permission [${permKey}]`);
                return res.json({success: false, error: "INVALID_PERMISSION"});
            }
            let result = await Model.findByPk(req.params.id);
            res.json(result);
        });

        router.post(`/api/v1/model/${modelKey}/filter`, async(req, res) => {
            const permKey = `MODEL:${modelKey}:filter:POST`;
            if(!res.locals.user || !(await res.locals.user.hasPermission(permKey))) {
                console.log("ERROR", `User [${res.locals.user}] does not have permission [${permKey}]`);
                return res.json({success: false, error: "INVALID_PERMISSION"});
            }
            let result = await Model.findAll({
                where: req.body
            });
            res.json(result);
        });

        router.post(`/api/v1/model/${modelKey}/delete`, async(req, res) => {
            const permKey = `MODEL:${modelKey}:delete:POST`;
            if(!res.locals.user || !(await res.locals.user.hasPermission(permKey))) {
                console.log("ERROR", `User [${res.locals.user}] does not have permission [${permKey}]`);
                return res.json({success: false, error: "INVALID_PERMISSION"});
            }
            let result = await Model.destroy({
                where: {
                    id: req.body?.id
                }
            });
            res.json(result);
        });

        router.post(`/api/v1/model/${modelKey}/update`, async(req, res) => {
            const permKey = `MODEL:${modelKey}:update:POST`;
            if(!res.locals.user || !(await res.locals.user.hasPermission(permKey))) {
                console.log("ERROR", `User [${res.locals.user}] does not have permission [${permKey}]`);
                return res.json({success: false, error: "INVALID_PERMISSION"});
            }
            let result = await Model.update(req.body.data, {
                where: req.body.where
            });
            res.json(result);
        });

        router.post(`/api/v1/model/${modelKey}/create`, async(req, res) => {
            const permKey = `MODEL:${modelKey}:create:POST`;
            if(!res.locals.user || !(await res.locals.user.hasPermission(permKey))) {
                console.log("ERROR", `User [${res.locals.user}] does not have permission [${permKey}]`);
                return res.json({success: false, error: "INVALID_PERMISSION"});
            }
            let result = await Model.create(req.body);
            res.json(result);
        });
    });

    return router;
};
