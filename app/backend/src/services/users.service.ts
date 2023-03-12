import { Prisma, Users } from '@prisma/client';
import { ApiError } from '../ApiError';
import { prisma } from './prisma';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IUserTokenPayload } from '../typescript/User/user.interface';


export class UserService {
  private userModel = prisma.users;

  public async createUser(data: Prisma.UsersCreateInput) {
    const body = data;
    body.password = await bcrypt.hash(data.password, await bcrypt.genSalt(10));
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
        role: true,
      }
    });

    if (!user) ApiError.notFound('User not found');
    return user;
  }

  public async userLogin(email: string, password: string) {
    const user = await this.userModel.findFirst({
      where: { email }
    });
    if (!user) return ApiError.notFound('Invalid credentials');
    if (await bcrypt.compare(password, user.password)) {
      ApiError.badRequest('Invalid credentials');
    }
    const token = this.generateJwt(user);
    return token;
  }

  public async generateJwt(payload: Users) {
    const user: IUserTokenPayload = {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    };
    const token = jwt.sign(user, 'secretKey');
    return { token };
  }

  public async getRole(payload: IUserTokenPayload) {
    const user = await this.userModel.findFirst({
      where: { id: payload.id },
      select: { role: true }
    });
    return user;
  }

  public async getAllUsers() {
    const users = await this.userModel.findMany();
    return users;
  }

}