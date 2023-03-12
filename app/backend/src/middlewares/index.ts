import { NextFunction, Request, Response } from 'express';
import { userSchema } from '../validations';
import { ApiError } from '../ApiError';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../services/prisma';

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

export const authenticateToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) ApiError.badRequest('Unauthorized');
  try {
    const decoded = jwt.verify(req.headers.authorization as string, 'secretKey' );
    req.body = decoded;
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
  res.status(400).json({ message: error });
  next();
};

