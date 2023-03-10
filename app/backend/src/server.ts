
import App from "./app";
import { prisma } from './services/prisma';

const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);