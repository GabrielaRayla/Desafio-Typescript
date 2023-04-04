import { TeamService } from "../services/teamService.js";
import { Response, Request } from "express";
import { NameValidator, StringValidator } from "../middlewares/validators.js";

import { ITeam, ITeamResponse } from "../interfaces/teamInterfaces.js";
import {
  ApiResponse,
  ApiResponseData,
  IDecode,
  IUserResponse,
} from "../interfaces/userInterfaces.js";

const TAG = "team controller";

const teamService = new TeamService();

export class TeamController {
  public async createTeam(req: Request, res: Response) {
    const response: ApiResponse<ApiResponseData> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const body = req.body;
      const decoded: IDecode<IUserResponse> = body.decoded;

      if (!decoded.user.is_admin) {
        throw "Error: não é um Administrador";
      }
      const team: ITeam = req.body;

      new NameValidator(team.name);
      new StringValidator(team.leader);

      const serviceResponse = await teamService.createTeam(team);

      response.message = "Equipe criada com sucesso!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Não foi possível criar a Equipe!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }

  public async deleteTeam(req: Request, res: Response) {
    const response: ApiResponse<ITeamResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const serviceResponse = await teamService.deleteTeam(req.params.team_id);

      response.message = "Equipe deletada com sucesso!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Não foi possível deletar o time!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }

  public async addMemberTeam(req: Request, res: Response) {
    const response: ApiResponse<IUserResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const body = req.body;
      const decoded: IDecode<IUserResponse> = body.decoded;

      if (
        decoded.user.id === undefined ||
        decoded.user.is_admin === undefined
      ) {
        throw "Usuário não logado";
      }

      const serviceResponse = await teamService.addMemberTeam(
        decoded.user.id,
        decoded.user.is_admin,
        req.params.user_id,
        req.params.team_id
      );

      response.message = "Usuário adicionado à equipe com sucesso!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Não foi possível adicionar o usuário à equipe!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }
  public async removeMemberTeam(req: Request, res: Response) {
    const response: ApiResponse<IUserResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const body = req.body;
      const decoded: IDecode<IUserResponse> = body.decoded;

      if (
        decoded.user.id === undefined ||
        decoded.user.is_admin === undefined
      ) {
        throw "Usuário não logado";
      }

      const serviceResponse = await teamService.removeMemberTeam(
        decoded.user.id,
        decoded.user.is_admin,
        req.params.user_id,
        req.params.team_id
      );

      response.message = "Usuário removido do time com sucesso!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Não foi possível remover o usuário do time!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }

  public async getViewMembers(req: Request, res: Response){
    const response: ApiResponse<IUserResponse[]> = {
      message: "",
      data: null,
      error: null,
    }
    try{
      const { decoded }: any = req.body;
      const userId = decoded.user.id;
      const teamId = req.params.team_id;
      
      const members = await teamService.getViewMembers(userId, teamId);  

      response.message = "Membros da equipe encontrados!";
      response.data = members;
      response.error = null;

    }catch(err){
      console.log(TAG, "\n", err);

      response.message = "Não foi possível encontrar os membros da equipe!";
      response.data = null;
      response.error = err;

      res.status(500);
      res.json(response);
    }
  }
  
  public async getOneTeam(req: Request, res: Response){
    const response: ApiResponse<IUserResponse[]> = {
      message: "",
      data: null,
      error: null,
    }
    try {
      const { decoded }:any = req.body
      const userId = decoded.user.id
      const teamId = req.params.team_id
      const team = teamService.getOneTeam(decoded, teamId)
      
      response.message = "Equipe encontrada!"
      // response.data = team
      response.error = null
    } catch (err) {
      console.log(TAG, "\n", err);

      response.message = "Não Foi Possivel Encontrar Equipe!";
      response.data = null;
      response.error = err;

      res.status(500);
      res.json(response);
    }
  }
  public async getAllTeams(req: Request, res: Response){
    const response: ApiResponse<IUserResponse[]> = {
      message: "",
      data: null,
      error: null,
    }
    try {
      const { decoded }:any = req.body
      const userId = decoded.user.id
      // const teamId = req.params.team_id
      const teams = await teamService.getAllTeams(decoded.user)
      
      response.message = "Equipes encontradas!"
      // response.data= teams
      response.error = null
    } catch (err) {
      console.log(TAG, "\n", err);

      response.message = "Não Foi Possivel Encontrar as Equipes!";
      response.data = null;
      response.error = err;

      res.status(500);
      res.json(response);
    }
  }
}
