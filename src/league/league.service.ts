import { collection, cluster } from "../couchbase";
import { databaseService } from "../database/database.service";

class LeagueService {
  async createLeague({
    id,
    adminId,
    name,
    description,
  }: {
    id: string;
    adminId: string;
    name: string;
    description?: string;
  }) {
    const league = await databaseService.getDocument(id);
    if (league) throw { message: "League already exists", code: 403 };
    const admin = await databaseService.getDocument(adminId);
    if (!admin) throw { message: "User not found", code: 404 };
    await collection.insert(id, {
      id,
      adminId,
      name,
      description,
      type: "mpg_league",
    });
    return databaseService.getDocument(id);
  }

  async getLeagueUsers(id: string) {
    const league = await databaseService.getDocument(id);
    if (!league) throw { message: "League not found", code: 404 };
    if (league.usersTeams) {
      const userIds = Object.keys(league.usersTeams);
      const users = await cluster.query(`SELECT name FROM mpg USE KEYS $ids`, {
        parameters: {
          ids: userIds,
        },
      });
      return { users: users.rows };
    } else {
      return { users: [] };
    }
  }
}

export const leagueService = new LeagueService();
