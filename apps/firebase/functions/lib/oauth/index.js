/* * * * * * * * * * * * * * * * * *
 * Feuerwehr Rödingen OAuth Server *
 *                                 *
 * Main.ts                         *
 * Created by Thomas Düren         *
 * * * * * * * * * * * * * * * * * */
import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { join } from 'path';
import * as Dotenv from 'dotenv';
import expressOAuthServer from 'express-oauth-server';
import { model } from './model.js';
const env = Dotenv.config();
if (env.error) {
    process.exit(1);
}
// Create Express app
export const express_server = express();
export const http_server = createServer(express_server);
// Add Body Parser
express_server.use(bodyParser.json());
express_server.use(bodyParser.urlencoded({ extended: false }));
// Add OAuth Server
const authServer = new expressOAuthServer(model);
// statically serve public folder
express_server.use(express.static(join(__dirname, 'public')));
// OAuth Methods
express_server.post('/oauth/token', authServer.token({
    requireClientAuthentication: { authorization_code: false }
}));
express_server.get('/oauth/authorize', function (req, res) {
    res.status(200).sendFile(join(__dirname, 'dist/login.html'));
});
express_server.post('/oauth/authorize', function (req, res) {
    if (req.body.username !== 'thomas.dueren@feuerwehr-rödingen.de') {
        return res.status(401).end();
    }
    return authServer.authorize();
});
express_server.get('/secret', authServer.authenticate(), function (req, res) {
    // Will require a valid access_token.
    res.send('Secret area');
});
express_server.get('/public', function (req, res) {
    // Does not require an access_token.
    res.send('Public area');
});
// Error handler
express_server.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Internal Error').end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O3FDQUtxQztBQUVyQyxPQUFPLE9BQTZCLE1BQU0sU0FBUyxDQUFBO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUE7QUFDbkMsT0FBTyxVQUFVLE1BQU0sYUFBYSxDQUFBO0FBQ3BDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUIsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDakMsT0FBTyxrQkFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUd0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBRWxDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUMzQixJQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUM7SUFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pCO0FBRUQscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUN4QyxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBRXZELGtCQUFrQjtBQUNsQixjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFFN0QsbUJBQW1CO0FBQ25CLE1BQU0sVUFBVSxHQUFHLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFakQsaUNBQWlDO0FBQ2pDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUU3RCxnQkFBZ0I7QUFDaEIsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNuRCwyQkFBMkIsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRTtDQUMzRCxDQUFDLENBQUMsQ0FBQztBQUVKLGNBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsVUFBUyxHQUFHLEVBQUUsR0FBRztJQUN0RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQztBQUMvRCxDQUFDLENBQUMsQ0FBQztBQUNILGNBQWMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFBUyxHQUFHLEVBQUUsR0FBRztJQUN2RCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLHFDQUFxQyxFQUFDO1FBQzlELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUM5QjtJQUNELE9BQU8sVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBYyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFlBQVksRUFBRSxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUc7SUFDeEUscUNBQXFDO0lBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFjLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHO0lBQzdDLG9DQUFvQztJQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDO0FBRUgsZ0JBQWdCO0FBQ2hCLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFVLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFnQjtJQUNuRixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDL0MsQ0FBQyxDQUFDLENBQUMifQ==