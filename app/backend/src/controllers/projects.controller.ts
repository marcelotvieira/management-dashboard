import { ProjectService } from '../services/projects.service';
import { Request, Response } from 'express';

export class ProjectController {
  private _service: ProjectService;

  constructor(service: ProjectService) {
    this._service = service;
  }

  public async createProject(req: Request, res: Response) {
    req.body.userId = req.headers.authorization;
    const newProject = await this._service.createProject(req.body);
    res.status(200).json(newProject);
  }

  public async getAllProjects(req: Request, res: Response) {
    const users = await this._service.getAllProjects(req.headers.authorization as string);
    res.status(200).json(users);
  }
}