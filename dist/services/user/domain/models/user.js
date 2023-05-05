"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const exceptions_1 = require("../../../../exceptions");
const utils_1 = require("../../../../utils");
const uuid_1 = require("uuid");
class User {
    constructor(props) {
        this.props = props;
        if (!props) {
            throw new exceptions_1.BadRequestException('Props of user is null/undefined');
        }
        const { username, email, fullName, major, company, school, avatar, password, id } = props;
        if ((0, utils_1.isStringEmptyOrUndefined)(username)) {
            throw new exceptions_1.BadRequestException('Email is null/undefined');
        }
        if ((0, utils_1.isStringEmptyOrUndefined)(password)) {
            throw new exceptions_1.BadRequestException('Password is null/undefined');
        }
        if ((0, utils_1.isStringEmptyOrUndefined)(username)) {
            throw new exceptions_1.BadRequestException('Username is null/undefined');
        }
        if ((0, utils_1.isStringEmptyOrUndefined)(fullName)) {
            throw new exceptions_1.BadRequestException('FullName is null/undefined');
        }
        if ((0, utils_1.isStringEmptyOrUndefined)(email)) {
            throw new exceptions_1.BadRequestException('Email is null/undefined');
        }
        if (!id) {
            this.props.id = (0, uuid_1.v4)();
        }
    }
    accessProps() {
        const { username, email, fullName, major, company, school, avatar, password, id } = this.props;
        return {
            username,
            email,
            fullName,
            major,
            company,
            school,
            avatar,
            password,
            id
        };
    }
}
exports.User = User;
