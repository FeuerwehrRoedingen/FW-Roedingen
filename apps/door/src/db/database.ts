import SequelizeAdapter from '@next-auth/sequelize-adapter'
import { Sequelize } from 'sequelize'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const DB = new Sequelize(
  {
    dialect: 'sqlite',
    storage: join(__dirname, './database.db')
  }
)

export const adapter = SequelizeAdapter(DB);

DB
  .authenticate()
  .then(() => {
    console.log('Connection to SQLite DB successful');
  })
  .catch(error => {
    console.error('Error while connecting to SQLite DB');
    console.error(error);
  });
