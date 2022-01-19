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
exports.userService = void 0;
const couchbase_1 = require("../couchbase");
class UserService {
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield couchbase_1.cluster.query(`SELECT * FROM mpg USE KEYS $id LIMIT 1`, {
                parameters: {
                    id,
                },
            });
            if (rows.length === 0)
                return null; // if user is not found, return null
            const league = rows[0].mpg;
            return league;
        });
    }
}
exports.userService = new UserService();
