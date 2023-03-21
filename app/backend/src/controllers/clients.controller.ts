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

  public async updateClientById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this._service.updateClientById(id, req.body);
    res.status(200).json(response);
  }

  public async deleteClientById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this._service.deleteClientById(id);
    res.status(200).json({ message: 'Deleted', data: {...response } });
  }
}