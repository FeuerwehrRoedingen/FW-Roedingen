import chalk from 'chalk'

import init from './Server'


const hostname = 'feuerwehr-roedingen.de';
const port = 465
const server = init();

if(!server){
  process.exit(1);
}

server.on('error', err => {
  console.error(err);
})
server.on('close', () => {
  console.log('goodbye');
})

server.listen(port, hostname, () => {
  console.log(chalk.green('info'),`server listening on port ${port} as host ${hostname}`)
})
