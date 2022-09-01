import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import next from 'next';
import { exec } from 'child_process';

import { connect, database } from './db/Database';

const dev = process.env.NODE_ENV !== 'production'
const hostname = dev ? 'localhost' : 'feuerwehr-rödingen.de';
const port = 8433
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

async function bootstrap(){
  //start prisma studio
  exec("npx prisma studio --browser none", (error, stdout, stderr) => {
    if(error){
      throw new Error(error.message);
    }
    console.log(`\x1b[35mchild_process \x1b[0m- ${stdout}`)
    console.error(`\x1b[35mchild_process \x1b[31mError \x1b[0m- ${stderr}`)
  })
  //start Database
  await connect();
  //start app
  await app.prepare();
  try{
    let server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
      try{
        const parsedUrl = parse(req.url!, true)
        const { pathname, query } = parsedUrl
        
        await handle(req, res, parsedUrl);
      }
      catch(error){
        //render error page  
      }
    })
    server.listen(port, ()=>{
      console.log('\x1b[32mready \x1b[0m- started server on url: http://localhost:' + port);
    })
  }
  catch(error){
    if(dev){
      console.log(`\x1b[31mError \x1b[0m- ${error}`)
    }
  }
}
bootstrap();
