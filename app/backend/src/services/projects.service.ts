import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export class ProjectService {
  private projectModel = prisma.projects;

  public async createProject(data: Prisma.ProjectsCreateInput) {
    const newProject = await this.projectModel.create({ data });
    return newProject;
  }

  public async getAllProjects(userId: string) {
    const users = await this.projectModel.findMany({
      where: { userId }
    });
    return users;
  }
}