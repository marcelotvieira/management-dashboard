import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { prisma } from './prisma';

export class ClientService {
  private clientModel = prisma.clients;

  public async createClient(req: Request) {
    const currentUserId = req.headers.authorization;
    const newClient = await this.clientModel.create({ data: {
      ...req.body,
      userId: currentUserId,
    }});
    return newClient;
  }

  public async getAllClients(userId: string) {
    const users = await this.clientModel.findMany({
      where: { userId }
    });
    return users;
  }

  public async updateClientById(id: string, payload: Prisma.ClientsUpdateInput ) {
    const updated = await this.clientModel.update({
      where: { id },
      data: {
        ...payload,
      }
    },
    );
    console.log(updated);
    return updated;
  }
}