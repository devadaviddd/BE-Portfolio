"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    static isValid(value) {
        return this.emailRegex.test(value);
    }
}
Email.emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
exports.Email = Email;
