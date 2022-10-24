import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import type { ViteDevServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

export async function createServer(
  root: string = process.cwd(),
  isProd: boolean = process.env.NODE_ENV === 'production',
  hmrPort: number
){
  const resolve = (p: string) => path.resolve(__dirname, p);

  const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8'):''


  const app = express();
  
  let vite: ViteDevServer;

  if(!isProd){
    vite = await (await import('vite')).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100
        },
        hmr: {
          port: hmrPort
        }
      },
      appType: 'custom'
    })
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default())
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false
      })
    )
  }
    
  app.use('*', async (req, res) => {    
    try {
      const url = req.originalUrl;
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
        )
        
        template = await vite.transformIndexHtml(url, template)
        
        const { render } = await vite.ssrLoadModule('/src/entry-server.js')
        const appHtml = await render(url)
        const html = template.replace(`<!--ssr-outlet-->`, appHtml)
        
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        vite.ssrFixStacktrace(e)
        next(e)
      }
    });
    
    app.listen(5173);
  }
    