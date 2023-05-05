"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCollectionRepository = void 0;
const mongodb_1 = require("mongodb");
const data_1 = require("../../../data");
const exceptions_1 = require("../../../exceptions");
class UserCollectionRepository extends data_1.MongoDBRepository {
    constructor(config, mapper) {
        super(config, mapper);
        this.client = new mongodb_1.MongoClient(this.config.url);
    }
    // export interface MongoDBConfig {
    //   database: string,
    //   collection: string
    // }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataModel = this.mapper.fromDomain(user);
                const database = this.client.db(this.config.database);
                const userCollection = database.collection(this.config.collection);
                const newUser = yield userCollection.insertOne(dataModel);
            }
            catch (error) {
                throw new exceptions_1.UnknownException(error);
            }
        });
    }
    findByEmails(emails) {
        throw new Error("Method not implemented.");
    }
    update(email, newUser) {
        throw new Error("Method not implemented.");
    }
    findByEmail(email) {
        throw new Error("Method not implemented.");
    }
    delete(email, version) {
        throw new Error("Method not implemented.");
    }
    viewUsers() {
        throw new Error("Method not implemented.");
    }
}
exports.UserCollectionRepository = UserCollectionRepository;
