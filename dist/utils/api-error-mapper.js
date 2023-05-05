"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorMapper = void 0;
const exceptions_1 = require("../exceptions");
class ApiErrorMapper {
    static toErrorResponse(error, response) {
        if (error instanceof exceptions_1.UnknownException) {
            return response.status(500).send({
                message: error.message,
            });
        }
        if (error instanceof exceptions_1.UnAuthenticated) {
            return response.status(401).send({
                message: error.message,
            });
        }
        if (error instanceof exceptions_1.UnAuthorized) {
            return response.status(403).send({
                message: error.message,
            });
        }
        if (error instanceof exceptions_1.BadRequestException) {
            return response.status(400).send({
                message: error.message,
            });
        }
        if (error instanceof exceptions_1.NotFoundException) {
            return response.status(404).send({
                message: error.message,
            });
        }
        return response.status(500).send({
            message: error.message,
        });
    }
}
exports.ApiErrorMapper = ApiErrorMapper;
