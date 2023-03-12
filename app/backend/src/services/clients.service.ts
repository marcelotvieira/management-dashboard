import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export class ClientService {
  private clientModel = prisma.clients;

  public async createClient(req: Request) {
    const currentUser = jwt
      .verify(req.headers.authorization as string, 'secretKey') as jwt.JwtPayload;
    const newClient = await this.clientModel.create({ data: {
      ...req.body,
      userId: currentUser.id,
    }});
    return newClient;
  }

  public async getAllClients() {
    const users = await this.clientModel.findMany({
      include: {
        user: true,
        projects: true,
      }
    });
    return users;
  }
}