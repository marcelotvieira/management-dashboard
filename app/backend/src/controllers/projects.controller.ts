import { ProjectService } from '../services/projects.service';
import { Request, Response } from 'express';

export class ProjectController {
  private _service: ProjectService;

  constructor(service: ProjectService) {
    this._service = service;
  }

  public async createProject(req: Request, res: Response) {
    console.log('PROJECT CONTROLLER');
    console.log(req.body);
    const newProject = await this._service.createProject(req.body);
    res.status(200).json(newProject);
  }

  public async getAllProjects(_req: Request, res: Response) {
    const users = await this._service.getAllProjects();
    res.status(200).json(users);
  }
}