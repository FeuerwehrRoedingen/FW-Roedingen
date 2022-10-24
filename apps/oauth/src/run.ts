/* * * * * * * * * * * * * * * * * *
 * Feuerwehr Rödingen OAuth Server *
 *                                 *
 * Index.ts                        *
 * Created by Thomas Düren         *
 * * * * * * * * * * * * * * * * * */

import chalk from 'chalk'
import ip from 'ip';

import { http_server } from './index.js'

const PORT = process.env.port || 3030;
const HOSTNAME = 'auth.feuerwehr-roedingen.de';

// Start the Server
http_server.listen(PORT, () => {
  console.log(chalk.magenta('[ready]'),`server listening on port ${PORT} as ${HOSTNAME}`);
  console.log(chalk.magenta('[ready]'),`access on https://localhost:${PORT}, over network https://${ip.address()}:${PORT}`)
});
