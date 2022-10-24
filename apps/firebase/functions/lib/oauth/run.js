/* * * * * * * * * * * * * * * * * *
 * Feuerwehr Rödingen OAuth Server *
 *                                 *
 * Index.ts                        *
 * Created by Thomas Düren         *
 * * * * * * * * * * * * * * * * * */
import chalk from 'chalk';
import ip from 'ip';
import { http_server } from './index.js';
const PORT = process.env.port || 3030;
const HOSTNAME = 'auth.feuerwehr-roedingen.de';
// Start the Server
http_server.listen(PORT, () => {
    console.log(chalk.magenta('[ready]'), `server listening on port ${PORT} as ${HOSTNAME}`);
    console.log(chalk.magenta('[ready]'), `access on https://localhost:${PORT}, over network https://${ip.address()}:${PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3J1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7cUNBS3FDO0FBRXJDLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUN6QixPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFcEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUV4QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDdEMsTUFBTSxRQUFRLEdBQUcsNkJBQTZCLENBQUM7QUFFL0MsbUJBQW1CO0FBQ25CLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUMsNEJBQTRCLElBQUksT0FBTyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBQywrQkFBK0IsSUFBSSwwQkFBMEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUE7QUFDM0gsQ0FBQyxDQUFDLENBQUMifQ==