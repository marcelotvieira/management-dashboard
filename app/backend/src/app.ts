import * as express from 'express';

class App {
    public app: express.Express;

    constructor() {
        this.app = express();
        this.app.get('/', (_req, res) => res.json({ message: 'ok' }));
    }

    public start(PORT: string | number): void {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}

export default App;