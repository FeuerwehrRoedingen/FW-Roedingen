import chalk from 'chalk'
import { config } from 'dotenv'
import ip from 'ip'

import { configureServer } from "./src/index.js";

config();

const isProd = process.env.NODE_ENV === 'production';

const PORT = parseInt(process.env.PORT ||'3024');
const ADDRESS = ip.address();
const HOSTNAME = isProd ? 'api.feuerwehr-roedingen.de':ADDRESS;

const {https, http} = configureServer();

https.listen(PORT, HOSTNAME, () => {
  console.log(chalk.cyan('[ready]'),`server listening on port ${PORT} as ${HOSTNAME}`);
  console.log(chalk.green('[info]'),`access over network on https://${ADDRESS}:${PORT}`)
});
http.listen(3025, ADDRESS, () => {
  console.log(chalk.cyan('[ready]'),`server listening on port 3025 as ${ADDRESS}`);
  console.log(chalk.green('[info]'),`access over network on http://${ADDRESS}:3025`)
})
.listen(3025, 'localhost', () => {
  console.log(chalk.cyan('[ready]'),`server listening on port 3025 as localhost`);
  console.log(chalk.green('[info]'),`access over network on http://localhost:3025`)
})
