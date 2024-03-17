# Feuerwehr Rödingen

## Status

Development is done. Production is ready. Will go live once the Internel Connection at the Fire Department is better.

## How to

Requires an SQLite Database to run Prisma.

```bash
npx prisma generate
```

Needs to be behind an NGINX Proxy to route all Websocket and HTTP Connections properly. (only production)

run with

```bash
npm install
npm run dev
```

## currently working on
