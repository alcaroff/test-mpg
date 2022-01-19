import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { teamService } from "./team.service";

export const teamRoutes: ServerRoute[] = [
  {
    method: "PATCH",
    path: "/team/{id}",
    handler: async (request, h) => {
      try {
        return await teamService.updateTeam(
          request.params.id,
          request.payload as any
        );
      } catch (e: any) {
        console.error(e);
        return h.response(e.message || "Internal Error").code(e.code || 500);
      }
    },
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string().regex(/^mpg_team_\d{1,}_\d{1,}$/),
        }),
        payload: Joi.object({
          name: Joi.string().required(),
        }),
      },
    },
  },
];
