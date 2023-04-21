# Feuerwehr Rödingen Monorepo

## Client
> ### **Applications that users need to install**
> **Currently on Hold !!**
> ### Mobile
> - Mobile version of internal website
> - without Server and Database monitoring
> ### Tablet
> - Application to be installed on a Tablet
> - TODO when everything else is done

## Games
> ### **Firefighting inspired games for the Website**
> ### Fireverse
> - Firefighting clone of the Metaverse (C++)
> ### Fireverse Web
> - Web version of the Fireverse (WebAssembly)

## Server
> ### **Applications that need Hosting on a Server**
> ### API
> - Access Point for all our Data.
> - Provides a Proxy for the Database
> - functions to retrieve data 
> - endpoints for authentication
> ### Door
> - WIP 
> - signUp function 
> - edit account and forgot password logic
> ### Internal
> - Internal Website
> - Contains sensitive private Data, strong authentication required
> - Messaging ?
> - Allows Monitoring of servers and Databases
> ### Web
> - Public Website
> - Contains all Public information, no need for authentication

# Hosting

## Email
- AWS Workmail
- AWS SES (Smtp service)
## Applications
- API      : AWS EC2
- Door     : Vercel
- Internal : Vercel
- Web      : Vercel
## Database
- AWS RDS
- AWS RDS Proxy
