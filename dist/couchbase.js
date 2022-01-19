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
exports.defaultQueries = exports.connectCouchbase = exports.collection = exports.bucket = exports.cluster = void 0;
const couchbase_1 = require("couchbase");
exports.cluster = null;
exports.bucket = null;
exports.collection = null;
const connectCouchbase = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.cluster = yield (0, couchbase_1.connect)("127.0.0.1:8091", {
        username: "admin",
        password: "monpetitgazon",
    });
    exports.bucket = exports.cluster.bucket("mpg");
    exports.collection = exports.bucket.defaultCollection();
    return exports.cluster;
});
exports.connectCouchbase = connectCouchbase;
// NOT USED
const defaultQueries = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.cluster.query("CREATE PRIMARY INDEX `idx_mpg_1` ON `mpg`");
    yield exports.cluster.query(`INSERT INTO mpg VALUES ('user_1', { 'id': 'user_1', 'type': 'user', 'name': 'Greg' }),
  ('user_2', { 'id': 'user_2', 'type': 'user', 'name': 'Ben' }),
  ('user_3', { 'id': 'user_3', 'type': 'user', 'name': 'Theo' }),
  ('user_4', { 'id': 'user_4', 'type': 'user', 'name': 'Max' }),
  ('mpg_league_1', { 'id': 'mpg_league_1', 'type': 'mpg_league', 'adminId': 'user_1', 'name': 'la ligue 1', 'description': 'super', 'usersTeams': { 'user_1': 'mpg_team_1_1', 'user_3': 'mpg_team_1_2' } }),
  ('mpg_league_2', { 'id': 'mpg_league_2', 'type': 'mpg_league', 'adminId': 'user_2', 'name': 'la ligue deux', 'description': 'top' }),
  ('mpg_league_3', { 'id': 'mpg_league_3', 'type': 'mpg_league', 'adminId': 'user_3', 'name': 'la ligue 3', 'description': 'ouais', 'usersTeams': {} }),
  ('mpg_team_1_1', { 'id': 'mpg_team_1_1', 'type': 'mpg_team', 'name': 'la team de Greg' }),
  ('mpg_team_1_2', { 'id': 'mpg_team_1_2', 'type': 'mpg_team', 'name': 'la team de Theo' })
  `);
});
exports.defaultQueries = defaultQueries;
