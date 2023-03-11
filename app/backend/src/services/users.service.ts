import { Prisma } from '@prisma/client';
import { ApiError } from '../ApiError';
import { prisma } from './prisma';

export class UserService {

  public async createUser(data: Prisma.UsersCreateInput) {
    const newUser = await prisma.users.create({ data });
    return newUser;
  }

  public async getUserById(id: string) {
    const user = await prisma.users.findFirst({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      }
    });
    if (!user) ApiError.notFound('User not found');
    return user;
  }

  public async getAllUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

}