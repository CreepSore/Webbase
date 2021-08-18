let express = require("express");

module.exports = function() {
    let router = express.Router();

    router.get("/api/v1/usermgmt/getSessionParameter/:param", function(req, res) {
        // @ts-ignore
        let shared = req.session.shared;
        res.send({success: true, data: (shared || {})[req.params.param]});
    });

    router.post("/api/v1/usermgmt/setSessionParameter/:param", function(req, res) {
        // @ts-ignore
        req.session.shared = req.session.shared || {};
        // @ts-ignore
        req.session.shared[req.params.param] = req.body.value;
        res.send({success: true});
    });

    return router;
};
