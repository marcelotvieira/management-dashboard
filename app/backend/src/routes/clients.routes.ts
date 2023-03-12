import { Router, Request, Response } from 'express';
import { ClientController } from '../controllers/clients.controller';
import * as asyncHandler from 'express-async-handler';

import { ClientService } from '../services/clients.service';
import { authenticateToken } from '../middlewares';

const clientRoutes = Router();
const clientService = new ClientService();
const clientController = new ClientController(clientService);

clientRoutes.post(
  '/clients/register',
  asyncHandler(authenticateToken),
  asyncHandler((req: Request, res: Response) => clientController.createClient(req, res)),
);

clientRoutes.get(
  '/clients',
  asyncHandler(authenticateToken),
  asyncHandler((req: Request, res: Response) => clientController.getAllClients(req, res)),
);

export default clientRoutes;