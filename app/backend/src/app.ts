import * as express from 'express';
import { errorMiddleware } from './middlewares';
import userRoutes from './routes/users.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.get('/', (_req, res) => res.json({ message: 'ok' }));

    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(errorMiddleware);
  }

  private routes(): void {
    this.app.use(userRoutes);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;