import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { leagueService } from "./league.service";

export const leagueRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/league/{id}/users",
    handler: async (request, h) => {
      try {
        return await leagueService.getLeagueUsers(request.params.id);
      } catch (e: any) {
        console.error(e);
        return h.response(e.message || "Internal Error").code(e.code || 500);
      }
    },
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string().regex(/^mpg_league_\d{1,}$/),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/league",
    handler: async (request, h) => {
      try {
        return await leagueService.createLeague(request.payload as any);
      } catch (e: any) {
        console.error(e);
        return h.response(e.message || "Internal Error").code(e.code || 500);
      }
    },
    options: {
      validate: {
        payload: Joi.object({
          id: Joi.string().regex(/^mpg_league_\d{1,}$/),
          adminId: Joi.string()
            .required()
            .regex(/^user_\d{1,}$/),
          name: Joi.string().required(),
          description: Joi.string(),
        }),
      },
    },
  },
];
