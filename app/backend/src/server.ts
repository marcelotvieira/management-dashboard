
import { Users } from '@prisma/client';
import App from './app';
import { prisma } from './services/prisma';

const PORT = process.env.APP_PORT || 3001;

const createUser = async (data: Users) => {
  await prisma.users.create({ data });
};

createUser({ id: 'isudhdsiuhf', firstName: 'marcelo', lastName: 'Vieira', password: 'dfuihds', email: 'iusdhfiusdhfdush' });

new App().start(PORT);