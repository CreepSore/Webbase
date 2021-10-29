"use strict";
let express = require("express");

let CustomerLogicHandler = require("../../../service/customer-logic/CustomerLogicHandler");
let TfaService = require("../../../service/TfaService");

let User = require("../../../model/User");

module.exports = function() {
    // eslint-disable-next-line new-cap
    let router = express.Router();

    router.get("/api/v1/usermgmt/getSessionParameter/:param", function(req, res) {
        // @ts-ignore
        let {shared} = req.session;
        res.send({success: true, data: (shared || {})[req.params.param]});
    });

    router.post("/api/v1/usermgmt/setSessionParameter/:param", function(req, res) {
        // @ts-ignore
        req.session.shared = req.session.shared || {};
        // @ts-ignore
        req.session.shared[req.params.param] = req.body.value;
        res.send({success: true});
    });

    router.post("/api/v1/usermgmt/register", async(req, res) => {
        const {username, password} = req.body;
        if(!username || !password) return res.json({success: false, error: "Please specify a username and a password."}).end();

        const existingUser = await User.findOne({where: {username}});
        if(existingUser) return res.json({success: false, error: "Username does already exist"}).end();


        await User.create({
            username,
            password: User.hashPassword(password),
            active: false
        });

        return res.json({success: true, message: "User created. Please contact the admininstrator to activate your account."}).end();
    });

    router.post("/api/v1/usermgmt/login", async(req, res) => {
        // @ts-ignore
        if(await User.isValidUid(req.session.uid)) {
            return res
                .json({success: false, error: "You are already logged in!", href: "/"});
        }

        const {username, password, tfaCode} = req.body;

        if(!username || !password) {
            return res
                .json({success: false, error: "Please specify a username and a password."});
        }

        let loggedOnUser = await User.doLogin(username, password);
        if(!loggedOnUser) {
            return res
                .json({success: false, error: "Invalid username or password"});
        }

        // @ts-ignore
        if(!loggedOnUser.active) {
            return res
                .json({success: false, error: "Please contact the admininstrator to activate your account."});
        }

        // @ts-ignore
        if(loggedOnUser.tfaKey) {
            if(!tfaCode) return res.json({success: false, error: "Please specify the TFA Code.", tfaRequested: true});
            // @ts-ignore
            if(!TfaService.verify(loggedOnUser.tfaKey, tfaCode)) return res.json({success: false, error: "Invalid TFA Code specified.", tfaRequested: true});
        }

        if(!(await loggedOnUser.hasPermission("LOGIN"))) {
            return res
                .json({success: false, error: "You do not have the permission to login."});
        }

        if((await CustomerLogicHandler.instance.runAllCustomerLogicFunction("onLogin", {
            user: loggedOnUser,
            expressSession: req.session
        })).some(result => result === false)) {
            return res
                .json({success: false, error: "You are not allowed to login."})
                .end();
        }

        // @ts-ignore
        req.session.uid = loggedOnUser.id;
        return res.json({success: true, reload: true}).end();
    });

    return router;
};
