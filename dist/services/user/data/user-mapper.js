"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMongoDBMapper = void 0;
const utils_1 = require("../../../utils");
const domain_1 = require("../domain");
class UserMongoDBMapper extends utils_1.DatabaseMapper {
    stringMapToCompanies(strs) {
        const companies = strs.map((element) => new domain_1.Company({ name: element }));
        return companies;
    }
    stringMapToSchools(strs) {
        const schools = strs.map((element) => new domain_1.School({ name: element }));
        return schools;
    }
    toDomain(dataModel) {
        const user = new domain_1.User({
            id: dataModel._id,
            avatar: dataModel.avatar,
            company: dataModel.company ? this.stringMapToCompanies(dataModel.company) : undefined,
            email: dataModel.email,
            fullName: dataModel.fullname,
            major: dataModel.major,
            password: dataModel.password,
            school: dataModel.school ? this.stringMapToSchools(dataModel.school) : undefined,
            username: dataModel.username,
        });
        return user;
    }
    fromDomain(domainModel) {
        var _a, _b;
        const user = domainModel.accessProps();
        const data = {
            _id: user.id,
            avatar: user.avatar,
            company: (_a = user.company) === null || _a === void 0 ? void 0 : _a.map((element) => element.toString()),
            email: user.email,
            fullname: user.fullName,
            major: user.major,
            password: user.password,
            school: (_b = user.school) === null || _b === void 0 ? void 0 : _b.map((element) => element.toString()),
            username: user.username
        };
        return data;
    }
}
exports.UserMongoDBMapper = UserMongoDBMapper;
