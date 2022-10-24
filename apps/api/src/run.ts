import chalk from 'chalk'
import ip from 'ip'

import { http_server } from "./index.js";

// Server Identity
const PORT = parseInt(process.env.port || '8080', 10);
const ADDRESS = ip.address();
const HOSTNAME = process.env.host || ADDRESS;

http_server.listen(PORT, HOSTNAME, () => {
  console.log(chalk.cyan('[ready]'),`server listening on port ${PORT} as host ${HOSTNAME}`);
  console.log(chalk.green('[info]'), `access over network on ${ADDRESS}:${PORT}`)
})