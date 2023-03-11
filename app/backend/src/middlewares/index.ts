import { NextFunction, Request, Response } from 'express';
import { userSchema } from '../validations';
import { ApiError } from '../ApiError';
import { prisma } from '../services/prisma';

export const validateUserInput = async (
  req: Request,
  res: Response,
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

