import * as express from 'express';
import { errorMiddleware } from './middlewares';
import userRoutes from './routes/users.routes';
import clientRoutes from './routes/clients.routes';
import projectRoutes from './routes/projects.routes';
import * as cors from 'cors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.get('/', (_req, res) => res.json({ message: 'ok' }));
    this.config();
    this.routes();
    this.errorConfig();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use(userRoutes);
    this.app.use(clientRoutes);
    this.app.use(projectRoutes);
  }

  private errorConfig(): void {
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;