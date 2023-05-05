"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Username = void 0;
class Username {
    static isValid(value) {
        if (value)
            return this.usernameRegex.test(value);
        return false;
    }
}
Username.usernameRegex = /^[a-z][a-zA-Z0-9._-]{1,50}$/;
exports.Username = Username;
