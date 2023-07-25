import { ProjectController } from '../controllers/projects.controller';
import { ProjectService } from '../services/projects.service';
import { Request, Response, Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { authenticateToken, validateProjectInput } from '../middlewares';



const projectRoutes = Router();
const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

projectRoutes.post(
  '/projects',
  asyncHandler(authenticateToken),
  asyncHandler(validateProjectInput),
  asyncHandler((req: Request, res: Response) => projectController.createProject(req, res)),
);

projectRoutes.get(
  '/projects',
  asyncHandler(authenticateToken),
  asyncHandler((req: Request, res: Response) => projectController.getAllProjects(req, res)),

);

projectRoutes.post(
  '/projects/:id',
  asyncHandler(authenticateToken),
  asyncHandler(validateProjectInput),
  asyncHandler((req: Request, res: Response) => projectController.updateProjectById(req, res))
);

projectRoutes.delete(
  '/projects/:id',
  asyncHandler(authenticateToken),
  asyncHandler((req: Request, res: Response) => projectController.deleteProjectById(req, res))
);
export default projectRoutes;