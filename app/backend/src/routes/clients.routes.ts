import { Router, Request, Response } from 'express';
import { ClientController } from '../controllers/clients.controller';
import * as asyncHandler from 'express-async-handler';

import { ClientService } from '../services/clients.service';
import { authenticateToken, validateClientInput } from '../middlewares';

const clientRoutes = Router();
const clientService = new ClientService();
const clientController = new ClientController(clientService);

clientRoutes.post(
  '/clients/register',
  asyncHandler(authenticateToken),
  asyncHandler(validateClientInput),
  asyncHandler((req: Request, res: Response) => clientController.createClient(req, res)),
);

clientRoutes.get(
  '/clients',
  asyncHandler(authenticateToken),
  asyncHandler((req: Request, res: Response) => clientController.getAllClients(req, res)),
);

clientRoutes.post(
  '/clients/:id',
  asyncHandler(authenticateToken),
  asyncHandler(validateClientInput),
  asyncHandler((req: Request, res: Response) => clientController.updateClientById(req, res))
);

clientRoutes.delete(
  '/clients/:id',
  asyncHandler(authenticateToken),
  asyncHandler((req: Request, res: Response) => clientController.deleteClientById(req, res))
);


export default clientRoutes;