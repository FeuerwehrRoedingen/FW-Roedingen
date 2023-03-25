import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function init (){
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      );
      template = await vite.transformIndexHtml(req.originalUrl, template);

      const { render } = await vite.ssrLoadModule('/react/entry-server.ts');
      const appHtml = await render(req.originalUrl);
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  })

  app.listen(5173);
}
init();
