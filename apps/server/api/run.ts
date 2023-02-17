import chalk from 'chalk'
import { config } from 'dotenv'
import ip from 'ip'

import { configureServer } from "./src/index.js"
import { startPB } from 'fw-roedingen-pocketbase'

config();

startPB();

const ADDRESS = ip.address();

const http = configureServer();

http.listen(3025, ADDRESS, () => {
  console.log(chalk.cyan('[ready]'),`server listening on port 3025 as ${ADDRESS}`);
  console.log(chalk.green('[info]'),`access over network on http://${ADDRESS}:3025`)
})
.listen(3025, () => {
  console.log(chalk.cyan('[ready]'),`server listening on port 3025 as localhost`);
  console.log(chalk.green('[info]'),`access over network on http://localhost:3025`)
})
