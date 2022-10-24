import { SMTPServerAddress, SMTPServerAuthentication, SMTPServerAuthenticationResponse, SMTPServerDataStream, SMTPServerSession } from "smtp-server"


export const authenticationCallback = (
  auth: SMTPServerAuthentication,
  session: SMTPServerSession,
  callback: (err?: Error | null | undefined, response?: SMTPServerAuthenticationResponse | undefined) => void
) => {
  if(auth.method !== 'PLAIN'){
    let error = new Error('unsupported authentication method')
    callback(error, undefined);
    return;
  }
}
export const closeCallback = (
  session: SMTPServerSession,
  callback: (err?: Error | null | undefined) => void
) => {
  
}
export const connectionCallback = (
  session: SMTPServerSession,
  callback: (err?: Error | null | undefined) => void
) => {

}
export const dataCallback = (
  stream: SMTPServerDataStream,
  session: SMTPServerSession,
  callback: (err?: Error | null | undefined) => void
) => {

}

export const mailCallback = (
  address: SMTPServerAddress,
  session: SMTPServerSession,
  callback: (err?: Error | null | undefined) => void
) => {

}
export const rctpToCallback = (
  address: SMTPServerAddress,
  session: SMTPServerSession,
  callback: (err?: Error | null | undefined) => void
) => {

}
