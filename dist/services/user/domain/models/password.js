"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
class Password {
    static isValid(value) {
        return this.passwordRegex.test(value);
    }
}
Password.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?]).{8,}$/;
exports.Password = Password;
