import { Prisma } from '@prisma/client';
import { ApiError } from '../ApiError';
import { prisma } from './prisma';

export class UserService {
  private userModel = prisma.users;

  public async createUser(data: Prisma.UsersCreateInput) {
    const newUser = await this.userModel.create({ data });
    return newUser;
  }

  public async getUserById(id: string) {
    const user = await this.userModel.findFirst({
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

  public async getRoleById(id: string) {
    const user = await this.userModel.findFirst({
      where: { id },
      select: { role: true }
    });
    if (!user) ApiError.notFound('User not found');
    return user;
  }

  public async getAllUsers() {
    const users = await this.userModel.findMany();
    return users;
  }

}