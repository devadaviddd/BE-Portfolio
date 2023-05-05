"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const data_1 = require("../data");
const userCollectionConfig = {
    database: 'Portfolio',
    collection: 'User',
    url: process.env.MONGO_DATABASE
};
const userMongoDBMapper = new data_1.UserMongoDBMapper();
exports.userRepository = new data_1.UserCollectionRepository(userCollectionConfig, userMongoDBMapper);
