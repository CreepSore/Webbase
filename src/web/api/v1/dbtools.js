"use strict";
let express = require("express");
let oracle = require("oracledb");
oracle.outFormat = oracle.OUT_FORMAT_OBJECT;
oracle.extendedMetaData = true;

module.exports = function() {
    // eslint-disable-next-line new-cap
    let router = express.Router();

    router.post("/api/v1/runQuery/:user/:password/:host", async(req, res) => {
        const {user, password, host} = req.params;
        const {query, params} = req.body;

        try {
            let connection = await oracle.getConnection({
                user,
                password,
                connectString: host
            });

            try {
                const result = await connection.execute(query, params || []);
                res.json({success: true, data: result});
            }
            catch(err) {
                res.json({success: false, error: err.message});
            }
            finally {
                connection.close();
            }
        }
        catch(err) {
            res.json({success: false, error: err.message});
        }
    });

    return router;
};
