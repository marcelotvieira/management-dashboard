import { ClientService } from '../services/clients.service';
import { Request, Response } from 'express';

export class ClientController {
  private _service: ClientService;

  constructor(service: ClientService) {
    this._service = service;
  }

  public async createClient(req: Request, res: Response) {
    const newClient = await this._service.createClient(req);
    res.status(200).json(newClient);
  }

  public async getAllClients(req: Request, res: Response) {
    const users = await this._service.getAllClients(req.headers.authorization as string);
    res.status(200).json(users);
  }
}