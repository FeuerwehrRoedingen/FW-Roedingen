import { SMTPServer, SMTPServerOptions } from 'smtp-server'
import { readFileSync } from 'fs'
import { join } from 'path'

import { 
  authenticationCallback,
  closeCallback,
  connectionCallback,
  dataCallback,
  mailCallback,
  rctpToCallback
} from './Callbacks'


const init = ():SMTPServer|undefined => {
  try {
    const cert = readFileSync(join(__dirname, '.cert/cert.pem'), 'base64');
    const key  = readFileSync(join(__dirname, '.cert/key.pem'), 'base64');

    const options: SMTPServerOptions = {
      allowInsecureAuth: false,
      authMethods: [],
      authOptional: false,
      banner: 'This is a banner test',
      closeTimeout: 30_000,
      disableReverseLookup: true,
      hideSTARTTLS: false,
      hidePIPELINING: false,
      hide8BITMIME: false,
      hideSMTPUTF8: false,
      lmtp: false,
      logger: true,
      maxClients: Infinity,
      name: 'feuerwehr-roedingen.de',
      onAuth: authenticationCallback,
      onClose: closeCallback,
      onConnect: connectionCallback,
      onData: dataCallback,
      onMailFrom: mailCallback,
      onRcptTo: rctpToCallback,
      secure: true,
      size: 5_000,
      sniOptions: {},
      socketTimeout: 60_000,
      useProxy: false,
      useXClient: false,
      useXForward: false,
      //Certificate
      cert: cert,
      key : key
    };

    return new SMTPServer(options);
  }
  catch(error){
    if(error){
      process.exit(1);
    }
  }
}

export default init;
