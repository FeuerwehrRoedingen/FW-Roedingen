# Feuerwehr Rödingen Monorepo

## API
> Endpoints for :
> - web functions
> - Databases
> - servers

## Blockchain
> Blockchain that manages all kind of transactions  
> FireCoin is WIP

## Internal
> Internal Website for stuff like
> - Managing servers
> - Chat
> - Orga stuff
> - Editing the contents of the public website
> - Access to Prisma Studio and Pocketbase admin UI

## Mobile
> Mobile app to access (some) functionality of the internal website  
> (WIP)

## Tablet
> (iOS) App for using with a vehicle equipped with a rPI running the vehicle software

## Vehicle
> Service that monitors vehicle specific data and allows connecting to it  
> should run on a Raspberry Pi

## Web
> Public web Page at www.feuerwehr-roedingen.de

# Monorepo

Everything is written in Typescriptt, because TS is the best programming language, dont @ me. Turborepo allows interconnected Repos to be developed alongside each other and speeds up the build process.

# GH

Inside the Firehouse are 2 Raspberry pis. 
- Alarmmonitor  @ 192.168.2.201
- Alarmmonitor2 @ 192.168.2.202

Both have a static etho interface and a dynamic wlan0 interface connected to the router for redundancy.

## Alarmmonitor

Hangs above the entrance door.

Services: 
- Docker (master)
- NGINX
- Groupalarm Monitor connected to HDMI0

Containers:
- NGINX
- Internal Website
- LocalInteractions (WIP)

Ports: 

- NGINX 8080
- Internal Website 3000

## Alarmmonitor2

Hangs between the HLF-20 and the GW-L2.

Services: 
- Docker (slave)
- Groupalarm Monitor connected to HDMI0

Containers:
- API 
- Pocketbase

Ports: 

- API 3025
- API HTTPS 3024
- Pocketbase 8090
