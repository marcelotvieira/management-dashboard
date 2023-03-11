import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/users.controller';
import { UserService } from '../services/users.service';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post('/users/register', (req: Request, res: Response) => userController.createUser(req, res));

userRoutes.get('/users/:id', (req: Request, res: Response) => userController.getUserById(req, res));

userRoutes.get('/users', (req: Request, res: Response) => userController.getAllUsers(req, res));

export default userRoutes;