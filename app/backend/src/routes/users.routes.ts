import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/users.controller';
import { UserService } from '../services/users.service';
import * as asyncHandler from 'express-async-handler';
import { authenticateToken, validateUserInput, validateUserLogin } from '../middlewares';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/users/register',
  asyncHandler(validateUserInput),
  asyncHandler((req: Request, res: Response) => userController.createUser(req, res)),
);

userRoutes.get(
  '/users/login',
  asyncHandler(validateUserLogin),
  asyncHandler((req: Request, res: Response) => userController.userLogin(req, res)),
);

userRoutes.get(
  '/users/:id',
  asyncHandler(authenticateToken),
  asyncHandler((req: Request, res: Response) => userController.getUserById(req, res)),
);

userRoutes.get(
  '/users',
  asyncHandler(authenticateToken),
  asyncHandler((req: Request, res: Response) => userController.getAllUsers(req, res)),
);


export default userRoutes;