import chalk from 'chalk'
import { config } from 'dotenv'

import { Server } from './src/server.js'

config();

if(!process.env.SECRET){
  console.error(chalk.redBright('[WARNING]'),'no Secret provided')
  process.exit(1);
}

Server.instance.run();
