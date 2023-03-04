import chalk from 'chalk'
import { config } from 'dotenv'
import ip from 'ip'

import { bundleLogin, bundleSignUp } from './src/components/bundle'
import { configureServer } from "./src/index.js"

config();

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

bundleLogin()
  .then(() => console.log(chalk.green('[info]'),'done bundling login'));
bundleSignUp()
  .then(() => console.log(chalk.green('[info]'),'done bundling signup'));

