import { cluster } from "../couchbase";

class DatabaseService {
  async getDocument(key: string): Promise<null | any> {
    const { rows } = await cluster.query(
      `SELECT * FROM mpg USE KEYS $key LIMIT 1`,
      {
        parameters: {
          key,
        },
      }
    );
    if (rows.length === 0) return null; // if user is not found, return null
    const league = rows[0].mpg;
    return league;
  }
}

export const databaseService = new DatabaseService();
