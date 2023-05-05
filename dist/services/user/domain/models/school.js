"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.School = void 0;
const exceptions_1 = require("../../../../exceptions");
const utils_1 = require("../../../../utils");
class School {
    constructor(props) {
        this.props = props;
        const { name } = props;
        if (!props) {
            throw new exceptions_1.BadRequestException('Props of school is null / undefined');
        }
        if ((0, utils_1.isStringEmptyOrUndefined)(name)) {
            throw new exceptions_1.BadRequestException('Name is null/undefined');
        }
    }
    readProps() {
        const { name } = this.props;
        return {
            name
        };
    }
}
exports.School = School;
