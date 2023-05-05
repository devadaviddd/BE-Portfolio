"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserUseCase = void 0;
const usecases_1 = require("../usecases");
const init_repository_1 = require("./init-repository");
exports.createUserUseCase = new usecases_1.CreateUserUseCase(init_repository_1.userRepository);
