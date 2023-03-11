import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export class UserService {

  public async createUser(data: Prisma.UsersCreateInput) {
    const newUser = await prisma.users.create({ data });
    return newUser;
  }

  public async getUserById(id: string) {
    const newUser = await prisma.users.findFirst({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      }
    });
    return newUser;
  }

  public async getAllUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

}