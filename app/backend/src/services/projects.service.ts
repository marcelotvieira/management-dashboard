import { Prisma } from '@prisma/client';
import { ClientService } from './clients.service';
import { prisma } from './prisma';

export class ProjectService {
  private projectModel = prisma.projects;
  private clientService = new ClientService;

  public async createProject(data: Prisma.ProjectsUncheckedCreateInput) {
    this.clientService.updateClientById(
      data.clientId,
      { lastContact: (new Date().toISOString()) },
    );
    
    const newProject = await this.projectModel.create({ data });
    return newProject;
  }

  public async getAllProjects(userId: string) {
    const users = await this.projectModel.findMany({
      where: { userId },
      include: {
        client: true,
        tasks: true,
      }
    });
    return users;
  }
}