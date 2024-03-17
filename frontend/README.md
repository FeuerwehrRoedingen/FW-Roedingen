# Feuerwehr Rödingen Monorepo

This Monorepo contains every project the IT Department is currently working on.
Everything is written in Typescript and uses Node (maybe bun in the future). The Monorepo is managed by TurboRepo.

## Projects
- API: Backend server that handles all our data
- Door: User account management (currently on hold due to changes in auth stucture)
- Internal: Website which houses some services like chats, calendar and inventory management
- Management: WebApp which allows to remotely access Servers over ssh or VNC (used to do maintance work on our Raspberry PIs Displaying Groupalarm monitors)
- Management-API: small express server that can connect the www to servers behind a firewall, without any port forwarding
- Mobile: Same functionality as internal but in portrait mode, currently on hold because we dont know if we may even publish apps to the app/play store
- Web: Public website, housing our info and some games once they are ready