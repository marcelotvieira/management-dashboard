import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/users.controller';
import { UserService } from '../services/users.service';
import * as asyncHandler from 'express-async-handler';
import { errorMiddleware, validateUserInput } from '../middlewares';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/users/register',
  asyncHandler(validateUserInput),
  asyncHandler((req: Request, res: Response) => userController.createUser(req, res)),
  errorMiddleware
);

userRoutes.get(
  '/users/:id/role',
  asyncHandler((req: Request, res: Response) => userController.getRoleById(req, res)),
);


userRoutes.get(
  '/users/:id',
  asyncHandler((req: Request, res: Response) => userController.getUserById(req, res)),
  errorMiddleware
);

userRoutes.get(
  '/users',
  asyncHandler((req: Request, res: Response) => userController.getAllUsers(req, res)),
  errorMiddleware
);


export default userRoutes;