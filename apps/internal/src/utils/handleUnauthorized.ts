import handleError from "./handleError"

export default function() : never{
  const error = {
    name: '401',
    message: 'Unauthorized',
    cause: {},
    stack: '',
  }

  handleError(error);
}