import handleError from "./handleError"
import type { Session } from "@auth0/nextjs-auth0"

export default function(session?: Session) : never{

  //TODO log unauthorized access

  const error = {
    name: '401',
    message: 'Unauthorized: Du solltest hier nicht sein. Dieser vorfall wird gemledet.',
    cause: {},
    stack: '',
  }

  handleError(error);
}