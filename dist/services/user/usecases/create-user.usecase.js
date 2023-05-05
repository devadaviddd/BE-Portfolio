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
exports.CreateUserUseCase = exports.CreateUserUseCaseResponse = exports.CreateUserUseCaseInput = void 0;
const exceptions_1 = require("../../../exceptions");
const domain_1 = require("../domain");
class CreateUserUseCaseInput {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.CreateUserUseCaseInput = CreateUserUseCaseInput;
class CreateUserUseCaseResponse {
    constructor(message, result) {
        this.message = message;
        this.result = result;
    }
}
exports.CreateUserUseCaseResponse = CreateUserUseCaseResponse;
class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dto } = input;
            const { email, username, fullName, major, company, school, avatar, password, } = dto;
            if (!email || !username || !fullName || !password) {
                const missingFields = [];
                if (!email)
                    missingFields.push('email');
                if (!username)
                    missingFields.push('username');
                if (!fullName)
                    missingFields.push('fullName');
                if (!password)
                    missingFields.push('password');
            }
            const isNotValidEmail = !domain_1.Email.isValid(email);
            if (isNotValidEmail) {
                throw new exceptions_1.BadRequestException('Email is not valid');
            }
            const isNotValidUsername = !domain_1.Username.isValid(username);
            if (isNotValidUsername) {
                throw new exceptions_1.BadRequestException('Username is not valid');
            }
            const isNotValidPassword = !domain_1.Password.isValid(password);
            if (isNotValidPassword) {
                throw new exceptions_1.BadRequestException('Password is not valid');
            }
            const user = new domain_1.User({
                email,
                username,
                fullName,
                major,
                company,
                school,
                avatar,
                password,
            });
            yield this.userRepository.create(user);
            const message = 'Create user Successfully';
            return {
                message,
                result: user.accessProps()
            };
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
