import { collection } from "../couchbase";
import { databaseService } from "../database/database.service";

class TeamService {
  async updateTeam(id: string, data: { name: string }) {
    let team = await databaseService.getDocument(id);
    if (!team) throw { message: "Team not found", code: 404 };
    const newTeam = { ...team, name: data.name };
    await collection.replace(id, newTeam);
    return newTeam;
  }
}

export const teamService = new TeamService();
