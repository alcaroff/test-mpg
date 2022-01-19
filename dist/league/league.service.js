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
exports.leagueService = void 0;
const couchbase_1 = require("../couchbase");
const database_service_1 = require("../database/database.service");
class LeagueService {
    createLeague({ id, adminId, name, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const league = yield database_service_1.databaseService.getDocument(id);
            if (league)
                throw { message: "League already exists", code: 403 };
            const admin = yield database_service_1.databaseService.getDocument(adminId);
            if (!admin)
                throw { message: "User not found", code: 404 };
            yield couchbase_1.collection.insert(id, {
                id,
                adminId,
                name,
                description,
                type: "mpg_league",
            });
            return database_service_1.databaseService.getDocument(id);
        });
    }
    getLeagueUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const league = yield database_service_1.databaseService.getDocument(id);
            if (!league)
                throw { message: "League not found", code: 404 };
            if (league.usersTeams) {
                const userIds = Object.keys(league.usersTeams);
                const users = yield couchbase_1.cluster.query(`SELECT name FROM mpg USE KEYS $ids`, {
                    parameters: {
                        ids: userIds,
                    },
                });
                return { users: users.rows };
            }
            else {
                return { users: [] };
            }
        });
    }
}
exports.leagueService = new LeagueService();
