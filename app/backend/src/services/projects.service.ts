import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export class ProjectService {
  private projectModel = prisma.projects;

  public async createProject(data: Prisma.ProjectsCreateInput) {
    console.log('PROJECT SERVICE');
    const newProject = await this.projectModel.create({ data });
    return newProject;
  }

  public async getAllProjects() {
    const users = await this.projectModel.findMany({
      include: {
        user: true,
        client: true,
      },
    });
    return users;
  }
}