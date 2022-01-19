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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoutes = void 0;
const joi_1 = __importDefault(require("joi"));
const team_service_1 = require("./team.service");
exports.teamRoutes = [
    {
        method: "PATCH",
        path: "/team/{id}",
        handler: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield team_service_1.teamService.updateTeam(request.params.id, request.payload);
            }
            catch (e) {
                console.error(e);
                return h.response(e.message || "Internal Error").code(e.code || 500);
            }
        }),
        options: {
            validate: {
                params: joi_1.default.object({
                    id: joi_1.default.string().regex(/^mpg_team_\d{1,}_\d{1,}$/),
                }),
                payload: joi_1.default.object({
                    name: joi_1.default.string().required(),
                }),
            },
        },
    },
];
