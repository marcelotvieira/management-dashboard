import { Request, Response } from 'express';
import { UserService } from '../services/users.service';


export class UserController {
  private _service: UserService;

  constructor(service: UserService) {
    this._service = service;
  }

  public async createUser(req: Request, res: Response) {
    const newUser = await this._service.createUser(req.body);
    res.status(200).json(newUser);
  }

  public async getUserById(req: Request, res: Response) {
    const user = await this._service.getUserById(req.params.id);
    res.status(200).json(user);
  }

  public async getAllUsers(_req: Request, res: Response) {
    const users = await this._service.getAllUsers();
    res.status(200).json(users);
  }
}