import { TeamRepo } from "../repository/teamRepository.js";
import { ITeam } from "../interfaces/teamInterfaces.js";
import { UUID } from "crypto";

const teamRepo = new TeamRepo();

const TAG = "teamService";

export class TeamService {
  public async createTeam(team: ITeam) {
    try {
      const dbResponse = await teamRepo.createTeam(team);
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }
  public async deleteTeam(idSquad: string) {
    try {
      //consertar os tipos da resposta dbResponse
      const dbResponse = await teamRepo.deleteTeam(idSquad);
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }

  public async addMemberTeam(
    userLogin: string,
    userIsAdmin: boolean,
    userId: string,
    teamId: string
  ) {
    try {
      //consertar os tipos da resposta dbResponse
      const dbResponse = await teamRepo.addMemberTeam(
        userLogin,
        userIsAdmin,
        userId,
        teamId
      );
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }
  public async removeMemberTeam(
    userLogin: string,
    userIsAdmin: boolean,
    userId: string,
    teamId: string
  ) {
    try {
      //consertar os tipos da resposta dbResponse
      const dbResponse = await teamRepo.removeMemberTeam(
        userLogin,
        userIsAdmin,
        userId,
        teamId
      );
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }

  public async getAllTeams(user: any) {
    try {
      const teams = await teamRepo.getAllTeams(user);
      return teams;
    } catch (error) {
      console.log(TAG, "Não foi Possivel encontrar as equipes!");
    }
  }

  public async getOneTeam(user: any, teamId: any) {
    try {
      const teams = await teamRepo.getOneTeam(teamId);
      return teams;
    } catch (error) {
      console.log(TAG, "Não foi Possivel encontrar a equipe!");
      throw error;
    }
  }

  public async getViewMembers(user: string, teamId: string) {
    try {
      const members = await teamRepo.getViewMembers(teamId);
      return members;
    } catch (error) {
      console.log(TAG, "Não foi Possivel encontrar a equipe!");
      throw error
    }
  }
}
