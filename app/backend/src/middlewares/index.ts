import { NextFunction, Request, Response } from 'express';
import { clientValidateSchema, projectValidateSchema, userLoginSchema, userSchema } from '../validations';
import { ApiError } from '../ApiError';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../services/prisma';
import { Prisma } from '@prisma/client';


export const validateUserInput = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { error } = userSchema.validate(req.body);
  if (error) ApiError.badRequest(error.details[0].message);
  
  const emails = await prisma.users.findMany({
    select: { email: true }
  });
  if (emails.some((data) => data.email === req.body.email)) {
    ApiError.badRequest('Email already in use');
  }
  next();
};

export const validateProjectInput = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { error } = projectValidateSchema.validate(req.body);
  if (error) ApiError.badRequest(error.details[0].message);
  const userClients = await prisma.clients.findMany({
    where: { userId: req.headers.authorization },
  });
  const isValidClient = userClients.some((client) => client.id === req.body.clientId);
  if (!isValidClient) ApiError.notFound('Client not found');
  next();
};

export const validateClientInput = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { error } = clientValidateSchema.validate(req.body);
  if (error) ApiError.badRequest(error.details[0].message);
  next();
};

export const validateUserLogin = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) ApiError.badRequest(error.details[0].message);
  next();
};

export const authenticateToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) ApiError.unauthorized('Unauthorized');
  try {
    const decoded = jwt.verify(authorization as string, 'secretKey') as jwt.JwtPayload;
    req.headers.authorization = decoded.id;
    next();
  } catch (error) {
    ApiError.unauthorized('Unauthorized');
  }
};

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ApiError) {
    console.log(`Error: ${error.message}`);
    return res.status(400).json({ message: error.message });
  }
  console.log(`Error: ${error}`);
  const prismaError = error as Prisma.PrismaClientKnownRequestError;
  res.status(400).json({ type: 'unhandled', message: prismaError.meta });
  next();
};

