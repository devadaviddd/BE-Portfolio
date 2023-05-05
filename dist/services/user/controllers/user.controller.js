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
exports.createUser = void 0;
const usecases_1 = require("../usecases");
const di_1 = require("../di");
const utils_1 = require("../../../utils");
const createUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dto = request.body;
        const input = new usecases_1.CreateUserUseCaseInput(dto);
        const result = yield di_1.createUserUseCase.execute(input);
        return response.send({
            message: result.message,
            result: result.result,
        });
    }
    catch (error) {
        return utils_1.ApiErrorMapper.toErrorResponse(error, response);
    }
});
exports.createUser = createUser;
