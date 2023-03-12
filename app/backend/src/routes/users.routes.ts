import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/users.controller';
import { UserService } from '../services/users.service';
import * as asyncHandler from 'express-async-handler';
import { authenticateToken, validateUserInput } from '../middlewares';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/users/register',
  asyncHandler(validateUserInput),
  asyncHandler((req: Request, res: Response) => userController.createUser(req, res)),
);

userRoutes.get(
  '/users/role',
  asyncHandler(authenticateToken),
  asyncHandler((req: Request, res: Response) => userController.getRole(req, res)),
);

userRoutes.get(
  '/users/login',
  asyncHandler((req: Request, res: Response) => userController.userLogin(req, res)),
);

userRoutes.get(
  '/users/:id',
  asyncHandler((req: Request, res: Response) => userController.getUserById(req, res)),
);

userRoutes.get(
  '/users',
  asyncHandler((req: Request, res: Response) => userController.getAllUsers(req, res)),
);


export default userRoutes;