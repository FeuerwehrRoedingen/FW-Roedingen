
import { redirect } from 'next/navigation'

export function handleError(error: Error):never{

  const name = encodeURIComponent(error.name);
  const message = encodeURIComponent(error.message);
  const cause = error.cause ? encodeURIComponent(JSON.stringify(error.cause)) : '';
  const stack = error.stack ? encodeURIComponent(error.stack): '';

  redirect(`/error?message=${message}&name=${name}&cause=${cause}&stack=${stack}`);
}

export function handleNotFound():never{
  const error = {
    name: '404',
    message: 'Not Found',
  }

  handleError(error);
}

export function handleUnauthorized():never{
  const error = {
    name: '401',
    message: 'Unauthorized',
  }

  handleError(error);
}
