"use strict";

import * as express from "express";
import * as sequelize from "sequelize";
import * as expressSession from "express-session";
import User from "../../model/User";
import ExpressLoader from "../../loader/ExpressLoader";
import SequelizeLoader from "../../loader/SequelizeLoader";

export type CustomerLogicDependencies = {
    sharedObjects: Map<string, any>
};

export type OnLoginCallbackParams = {
    user: User,
    expressSession: expressSession.Session
};

export type ExpressInitializationParams = {
    app: express.Application,
    expressLoader: ExpressLoader
}

export type SequelizeInitializationParams = {
    sequelize: sequelize.Sequelize,
    sequelizeLoader: SequelizeLoader
}
