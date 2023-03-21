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

  public async updateProjectById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this._service.updateProjectById(id, req.body);
    res.status(200).json(response);
  }

  public async deleteProjectById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this._service.deleteProjectById(id);
    res.status(200).json({ message: 'Deleted', data: {...response } });
  }
}