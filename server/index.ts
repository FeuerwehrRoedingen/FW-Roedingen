import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import next from 'next';

import Database from './Database';

const dev = process.env.NODE_ENV !== 'production'
const hostname = dev ? 'localhost' : 'feuerwehr-rödingen.de';
const port = 8433
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

async function bootstrap(){
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
      console.log('\x1b[32mready \x1b[0m- started server on url: https://localhost:' + port);
    })
  }
  catch(error){
    //error creating server
  }
}
bootstrap();
