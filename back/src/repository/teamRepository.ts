import pool from "../pool/index.js";
import { ITeam, ITeamResponse } from "../interfaces/teamInterfaces.js";
import { connectDb } from "./data/connection.js";
import { teamQuery } from "./data/teamQueries.js";
import { query } from "./data/queries.js";

const TAG = "teamRepository";

export class TeamRepo {
  public async createTeam(team: ITeam) {
    try {
      // Verificando se já está cadastrado no banco de dados
      const teamVerifyLeader = await connectDb(teamQuery.getLeader, [
        team.leader,
      ]);
      if (teamVerifyLeader.length !== 0) {
        throw "Usuário já é lider de uma equipe";
      }
      const verifyUser = await connectDb(teamQuery.getUser, [team.leader]);
      if (verifyUser.length === 0) {
        throw "Usuário não está cadastrado";
      }

      if (verifyUser[0].is_admin) {
        throw "Usuário é administrador, portanto não pode ser líder";
      }

      const response = await connectDb(teamQuery.insertTeam, [
        team.name,
        team.leader,
      ]);

      const data: ITeamResponse = response[0];
      //     console.log(data, "response from DB")
      return data;
    } catch (error) {
      console.log(TAG, "error caught at createTeam()");
      throw error;
    }
  }
}
